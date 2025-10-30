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

export class WebSocketChatClient {
  private readonly config: ConnectionConfig;
  private readonly connectionState: ConnectionState;
  private readonly wsManager: WebSocketManager;
  private readonly messageHandler: MessageHandler;

  private initResolve?: (value?: any) => void;

  // Client tools and context
  private toolSchemas: any[] = [];
  private contextHelpers: ContextHelpers = {};

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

    // Handle initialization-specific messages
    if (data?.type === InboundMessageType.TOOLS_CONFIGURED) {
      this.initResolve?.();
    }

    if (
      data?.type === InboundMessageType.SESSION_ESTABLISHED &&
      (!this.toolSchemas || this.toolSchemas.length === 0)
    ) {
      this.initResolve?.();
    }
  }

  private handleConnectionOpen(): void {
    // Send tool configuration after connection is established
    if (this.toolSchemas && this.toolSchemas.length > 0) {
      this.sendToolConfiguration();
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

    return new Promise((resolve) => {
      this.initResolve = resolve;

      this.wsManager
        .connect()
        .then(() => {
          // Connection successful, but we might need to wait for tool configuration
          if (!this.toolSchemas || this.toolSchemas.length === 0) {
            resolve();
          }
        })
        .catch(() => {
          resolve();
        });
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
    if (props.apiUrl) {
      this.config.apiUrl = props.apiUrl;
    }
    if (props.userId) {
      this.config.userId = props.userId;
    }
  }

  async onTriggerMessage(params: TriggerMessageParams): Promise<void> {
    if (!this.connectionState.isConnected) {
      throw new Error("Client not connected");
    }

    const {
      message,
      app = "UD21",
      media,
      convUuid,
      agentPromptPath,
    } = params;

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
    this.wsManager.disconnect();
  }

  isClientConnected(): boolean {
    return this.connectionState.isConnected;
  }

  updateContextHelpers(newContext: ContextHelpers): void {
    this.contextHelpers = { ...this.contextHelpers, ...newContext };

    const message = MessageFactory.serializeUpdateContextHelpers(this.contextHelpers);
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
    };
  }
}
