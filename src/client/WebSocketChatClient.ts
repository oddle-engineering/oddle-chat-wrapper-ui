import { ContextHelpers } from "./types/shared";
import {
  ConnectionConfig,
  ConnectionStatus,
  WebSocketChatClientProps,
  DEFAULT_CONNECTION_CONFIG,
  ChatEventHandlers,
  InboundMessageType,
  TriggerMessageParams,
} from "./types";
import { WebSocketManager, ConnectionState } from "./connection";
import { MessageHandler } from "./handlers";
import { MessageFactory } from "./utils/messageFactory";
import { TicketManager } from "./ticket";

export class WebSocketChatClient {
  private readonly config: ConnectionConfig;
  private readonly connectionState: ConnectionState;
  private readonly wsManager: WebSocketManager;
  private readonly messageHandler: MessageHandler;

  private initResolve?: (value?: any) => void;
  private initReject?: (reason?: any) => void;

  // Client tools and context
  private toolSchemas: any[] = [];
  private contextHelpers: ContextHelpers = {};

  // Ticket management - now centralized in TicketManager
  private ticketManager: TicketManager | null = null;

  constructor() {
    this.config = {
      ...DEFAULT_CONNECTION_CONFIG,
    } as ConnectionConfig;

    this.connectionState = new ConnectionState();
    this.wsManager = new WebSocketManager(this.config, this.connectionState);
    this.messageHandler = new MessageHandler({});

    this.setupWebSocketHandlers();
  }

  private setupWebSocketHandlers(): void {
    this.wsManager.setEventHandlers({
      onMessage: (event) => this.handleWebSocketMessage(event),
      onOpen: () => this.handleConnectionOpen(),
      onSystemEvent: (event) => {
        // Forward system events from WebSocket manager
        const handlers = this.messageHandler as any;
        handlers.handlers?.onSystemEvent?.(event);
      },
    });

    this.messageHandler.setSendMessageHandler((data) =>
      this.wsManager.send(data)
    );
  }

  private handleWebSocketMessage(event: MessageEvent): void {
    const data = this.messageHandler.handleMessage(event);

    // Handle authentication errors (if ticket was invalid)
    if (data?.type === "authentication_error") {
      console.error(
        "WebSocket authentication failed:",
        data?.error,
        (data as any)?.code
      );
      this.handleAuthenticationFailure(data);
    }

    // Handle initialization-specific messages
    if (data?.type === InboundMessageType.TOOLS_CONFIGURED) {
      this.initResolve?.();
    }

    if (data?.type === InboundMessageType.SESSION_ESTABLISHED) {
      // Send client tools configuration after session is established
      if (this.toolSchemas && this.toolSchemas.length > 0) {
        this.sendToolConfiguration();
      } else {
        // No tools to configure, resolve initialization
        this.initResolve?.();
      }
    }
  }

  private handleConnectionOpen(): void {
    console.log("WebSocket connection opened with ticket authentication");
    // Connection is already authenticated via URL ticket
    // Ticket renewal is handled by TicketManager (started in onInit)
    
    // Wait for session_established message before sending tool configuration
    // Tool configuration will be sent in handleWebSocketMessage when session_established is received
  }

  private handleAuthenticationFailure(data: any): void {
    const errorData = data as any;
    console.error("Authentication failure details:", {
      error: errorData?.error,
      code: errorData?.code,
      hasTicket: this.ticketManager?.isValid() ?? false,
    });

    // Auto-retry with new ticket if authentication fails
    if (
      errorData?.code === "TICKET_INVALID" ||
      errorData?.code === "TICKET_EXPIRED"
    ) {
      console.log("Attempting to refresh ticket and reconnect...");
      this.refreshTicketAndReconnect().catch((err) => {
        console.error("Failed to refresh ticket:", err);
        // Reject initialization if we can't recover from auth failure
        this.initReject?.(err);
      });
    } else {
      // For other auth errors, reject initialization immediately
      this.initReject?.(new Error(`Authentication failed: ${errorData?.error}`));
    }
  }

  private sendToolConfiguration(): void {
    const message = MessageFactory.serializeConfigureTools(
      this.toolSchemas,
      this.contextHelpers
    );
    this.wsManager.send(message);
  }

  async onInit(props: WebSocketChatClientProps): Promise<void> {
    this.setupEventHandlers(props);
    this.setupToolsAndContext(props);
    this.updateConfig(props);

    // Initialize TicketManager with authentication data
    this.ticketManager = new TicketManager(
      {
        userMpAuthToken: props.userMpAuthToken!,
        chatServerKey: props.chatServerKey!,
        userId: props.userId!,
        entityId: props.entityId,
        entityType: props.entityType,
        providerResId: props.providerResId,
      },
      this.config.apiUrl
    );

    return new Promise(async (resolve, reject) => {
      this.initResolve = resolve;
      this.initReject = reject;

      try {
        // Get valid ticket from TicketManager
        const ticket = await this.ticketManager!.getValidTicket();

        // Connect WebSocket with ticket
        await this.wsManager.connect(ticket);

        // Start proactive ticket renewal to prevent expiration
        this.ticketManager!.startProactiveRenewal(() => {
          this.handleTicketRenewed();
        });

        // Note: resolve() will be called when:
        // - tools_configured is received (if tools exist)
        // - session_established is received (if no tools)
      } catch (error) {
        console.error('WebSocketChatClient: Initialization failed', error);
        reject(error);
      }
    });
  }

  /**
   * Handle proactive ticket renewal
   * Updates the WebSocket manager with new ticket without disconnecting
   */
  private async handleTicketRenewed(): Promise<void> {
    console.log(
      "WebSocketChatClient: Ticket proactively renewed, updating connection..."
    );

    try {
      if (!this.ticketManager) {
        console.warn("TicketManager not initialized");
        return;
      }

      const newTicket = await this.ticketManager.getValidTicket();
      this.wsManager.updateTicket(newTicket);
      console.log("WebSocketChatClient: Connection updated with new ticket");
    } catch (error) {
      console.error(
        "WebSocketChatClient: Failed to update connection with renewed ticket:",
        error
      );
    }
  }

  private setupEventHandlers(props: WebSocketChatClientProps): void {
    const handlers: ChatEventHandlers = {
      onSetMessage: props.onSetMessage,
      onSystemEvent: props.onSystemEvent,
      onReasoningUpdate: props.onReasoningUpdate,
    };

    this.messageHandler.updateEventHandlers(handlers);
  }

  private setupToolsAndContext(props: WebSocketChatClientProps): void {
    this.toolSchemas = props.toolSchemas || [];
    this.contextHelpers = props.contextHelpers;
    if (props.clientTools) {
      this.messageHandler.updateClientTools(props.clientTools);
    }
  }

  private updateConfig(props: WebSocketChatClientProps): void {
    if (props.chatServerUrl) {
      this.config.apiUrl = props.chatServerUrl;
    }
    if (props.userId) {
      this.config.userId = props.userId;
    }
  }

  async onTriggerMessage(params: TriggerMessageParams): Promise<void> {
    if (!this.connectionState.isConnected) {
      throw new Error("Client not connected");
    }

    const { message, app = "UD21", media, convUuid, agentPromptPath } = params;

    try {
      this.messageHandler.clearProcessedToolCalls();

      const chatMessage = MessageFactory.serializeChatMessage({
        content: message,
        app,
        media,
        userId: this.config.userId,
        convUuid,
        agentPromptPath,
        saveToDatabase: false,
      });
      this.wsManager.send(chatMessage);
    } catch (error) {
      throw error;
    }
  }

  disconnect(): void {
    // Stop ticket validation and clear ticket when disconnecting
    this.ticketManager?.stopProactiveRenewal();
    this.ticketManager?.clear();
    this.wsManager.disconnect();
  }

  isClientConnected(): boolean {
    return this.connectionState.isConnected;
  }

  updateContextHelpers(newContext: ContextHelpers): void {
    this.contextHelpers = { ...this.contextHelpers, ...newContext };

    const message = MessageFactory.serializeUpdateContextHelpers(
      this.contextHelpers
    );
    this.wsManager.send(message);
  }

  addClientTools(tools: Record<string, Function>, schemas?: any[]): void {
    this.messageHandler.updateClientTools(tools);

    if (schemas) {
      this.toolSchemas = [...this.toolSchemas, ...schemas];
    }

    const message = MessageFactory.serializeUpdateTools(this.toolSchemas);
    this.wsManager.send(message);
  }

  getConnectionStatus(): ConnectionStatus {
    return {
      connected: this.connectionState.isConnected,
      reconnectAttempts: this.connectionState.reconnectAttempts,
      isReconnecting: this.connectionState.isReconnecting,
      websocketState: this.wsManager.getWebSocketState(),
      hasValidTicket: this.ticketManager?.isValid() ?? false,
      ticketExpiresIn: this.ticketManager?.getExpiresIn(),
    };
  }

  /**
   * Force refresh the WebSocket ticket and reconnect
   * Useful when authentication fails or ticket expires
   */
  async refreshTicketAndReconnect(): Promise<void> {
    console.log("WebSocketChatClient: Refreshing ticket and reconnecting...");

    try {
      if (!this.ticketManager) {
        throw new Error("TicketManager not initialized");
      }

      // Disconnect current connection
      this.wsManager.disconnect();

      // Get fresh ticket (will refresh if needed)
      const newTicket = await this.ticketManager.refreshTicket();

      // Update ticket and reconnect
      this.wsManager.updateTicket(newTicket);
      await this.wsManager.connect();

      console.log(
        "WebSocketChatClient: Successfully refreshed ticket and reconnected"
      );
    } catch (error) {
      console.error(
        "WebSocketChatClient: Failed to refresh ticket and reconnect:",
        error
      );
      throw error;
    }
  }

  /**
   * Check if current ticket is valid
   */
  isTicketValid(): boolean {
    return this.ticketManager?.isValid() ?? false;
  }

  /**
   * Manual reconnection method for UI to call
   * Useful for "Reconnect" buttons or retry logic
   */
  async reconnect(): Promise<void> {
    console.log("WebSocketChatClient: Manual reconnection requested");
    await this.refreshTicketAndReconnect();
  }
}
