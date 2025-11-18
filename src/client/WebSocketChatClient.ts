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
import { TicketManager, AuthData } from "./ticket";
import { updateThread, updateThreadMetadata } from "../utils/threadApi";

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
  
  // Authentication credentials for HTTP API calls
  private authCredentials: {
    userMpAuthToken?: string;
    chatServerKey?: string;
  } = {};

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

    // Capture sessionId for session-based reconnection
    if (data?.type === InboundMessageType.SESSION_ESTABLISHED) {
      const sessionId = (data as any)?.sessionId;
      if (sessionId) {
        console.log('WebSocketChatClient: SESSION_ESTABLISHED - received sessionId', sessionId);
        this.wsManager.updateSession(sessionId);
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
    
    // Store authentication credentials for HTTP API calls
    this.authCredentials = {
      userMpAuthToken: props.userMpAuthToken,
      chatServerKey: props.chatServerKey,
    };

    // Initialize TicketManager with authentication data
    this.ticketManager = new TicketManager(
      {
        userMpAuthToken: props.userMpAuthToken!,
        chatServerKey: props.chatServerKey!,
        entityId: props.entityId,
        entityType: props.entityType,
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

        // Note: We do NOT start proactive renewal here because:
        // 1. WebSocket ticket is only used for initial authentication
        // 2. Once connected, the persistent connection doesn't require ticket validation
        // 3. Ticket will be refreshed automatically when reconnecting (if expired)
        // 4. Proactive renewal while connected causes issues because:
        //    - New ticket cannot be sent to server on existing connection
        //    - Creates ticket mismatch between client and server
        //    - May cause message sending to fail

        // Note: resolve() will be called when:
        // - tools_configured is received (if tools exist)
        // - session_established is received (if no tools)
      } catch (error) {
        console.error('WebSocketChatClient: Initialization failed', error);
        reject(error);
      }
    });
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
  }

  async onTriggerMessage(params: TriggerMessageParams): Promise<void> {
    if (!this.connectionState.isConnected) {
      throw new Error("Client not connected");
    }

    const { message, media, providerResId } = params;

    try {
      this.messageHandler.clearProcessedToolCalls();

      const chatMessage = MessageFactory.serializeChatMessage({
        content: message,
        media,
        providerResId,
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

  /**
   * Update entity information (entityId and entityType) for a conversation
   * This is useful when a conversation starts without an entity,
   * then later gets associated with one (e.g., user creates/selects an entity)
   * 
   * This method:
   * 1. Makes an HTTP PATCH request to persist the entity attachment on the server
   * 2. Updates the local TicketManager auth data for future ticket renewals
   * 
   * Note: This should be used for changing entity ownership (rare).
   * For updating business context (orderId, tableId, etc.), use updateMetadata() instead.
   * 
   * @param providerResId - Provider resource ID (conversationId) of the thread to update
   * @param entityId - New entity ID to associate with this conversation
   * @param entityType - Entity type (BRAND or ACCOUNT)
   * @returns Promise that resolves when the update is complete
   * 
   * @example
   * await client.updateEntityId('conv_abc123', 'brand_456', 'BRAND');
   */
  async updateEntityId(
    providerResId: string,
    entityId: string,
    entityType: string
  ): Promise<void> {
    if (!this.ticketManager) {
      throw new Error("WebSocketChatClient: Cannot update entityId - TicketManager not initialized");
    }

    console.log(`WebSocketChatClient: Updating entity attachment - providerResId: ${providerResId}, entityId: ${entityId}, entityType: ${entityType}`);
    
    try {
      // Use the updateThread utility function to make the HTTP PATCH request
      await updateThread(
        this.config.apiUrl,
        providerResId,
        {
          entityId,
          entityType,
        },
        this.authCredentials
      );

      console.log("WebSocketChatClient: Thread entity attachment updated on server successfully");

      // Update the auth data in TicketManager for future ticket renewals
      const updateData: Partial<AuthData> = { entityId, entityType };
      this.ticketManager.updateAuthData(updateData);
      
      console.log("WebSocketChatClient: Local auth data updated successfully");
    } catch (error) {
      console.error("WebSocketChatClient: Failed to update entity attachment:", error);
      throw error;
    }
  }

  /**
   * Update thread metadata and/or tag for a conversation
   * This is useful for updating dynamic business context without changing entity ownership
   * 
   * Use this for frequently changing data like:
   * - Order IDs, table IDs, campaign IDs
   * - Status updates, priority changes
   * - Custom app-specific metadata
   * 
   * This method makes an HTTP PATCH request to update only the metadata/tag fields,
   * leaving entityId and entityType unchanged.
   * 
   * @param providerResId - Provider resource ID (conversationId) of the thread to update
   * @param updates - Metadata and/or tag to update
   * @returns Promise that resolves when the update is complete
   * 
   * @example
   * await client.updateMetadata('conv_abc123', {
   *   metadata: { orderId: 'order_789', tableId: 'table_5', status: 'pending' }
   * });
   * 
   * @example
   * await client.updateMetadata('conv_abc123', {
   *   tag: 'high-priority',
   *   metadata: { priority: 'urgent', assignedTo: 'agent-123' }
   * });
   */
  async updateMetadata(
    providerResId: string,
    updates: {
      tag?: string | null;
      metadata?: any;
    }
  ): Promise<void> {
    console.log(`WebSocketChatClient: Updating thread metadata - providerResId: ${providerResId}`);
    
    try {
      await updateThreadMetadata(
        this.config.apiUrl,
        providerResId,
        updates,
        this.authCredentials
      );

      console.log("WebSocketChatClient: Thread metadata updated successfully");
    } catch (error) {
      console.error("WebSocketChatClient: Failed to update thread metadata:", error);
      throw error;
    }
  }
}
