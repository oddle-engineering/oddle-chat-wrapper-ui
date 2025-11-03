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
import { 
  requestWebSocketTicket, 
  isTicketValid, 
  getTicketInfo,
  WebSocketTicketResponse 
} from "../utils/websocketTicketApi";

export class WebSocketChatClient {
  private readonly config: ConnectionConfig;
  private readonly connectionState: ConnectionState;
  private readonly wsManager: WebSocketManager;
  private readonly messageHandler: MessageHandler;

  private initResolve?: (value?: any) => void;

  // Client tools and context
  private toolSchemas: any[] = [];
  private contextHelpers: ContextHelpers = {};
  
  // Authentication data and ticket
  private authData: {
    userMpAuthToken?: string;
    chatServerKey?: string;
    userId?: string;
    entityId?: string;
    entityType?: string;
    providerResId?: string;
  } = {};
  private wsTicket: WebSocketTicketResponse | null = null;
  
  // Ticket management
  private ticketCheckInterval: number | null = null;
  private isRefreshingTicket: boolean = false;
  private visibilityChangeHandler: (() => void) | null = null;

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
    if (data?.type === 'authentication_error') {
      console.error('WebSocket authentication failed:', data?.error, (data as any)?.code);
      this.handleAuthenticationFailure(data);
    }

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
    console.log('WebSocket connection opened with ticket authentication');
    // Connection is already authenticated via URL ticket
    // Start periodic ticket validation
    this.startTicketValidation();
    
    // Send tool configuration immediately since we're authenticated
    if (this.toolSchemas && this.toolSchemas.length > 0) {
      this.sendToolConfiguration();
    }
  }


  private handleAuthenticationFailure(data: any): void {
    const errorData = data as any;
    console.error('Authentication failure details:', {
      error: errorData?.error,
      code: errorData?.code,
      hasTicket: !!this.wsTicket?.ticket,
      ticketValid: this.wsTicket ? isTicketValid(this.wsTicket) : false
    });
    
    // Auto-retry with new ticket if authentication fails
    if (errorData?.code === 'TICKET_INVALID' || errorData?.code === 'TICKET_EXPIRED') {
      console.log('Attempting to refresh ticket and reconnect...');
      this.refreshTicketAndReconnect().catch(err => {
        console.error('Failed to refresh ticket:', err);
      });
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

    // Request WebSocket ticket before connecting
    await this.requestTicket();

    return new Promise((resolve) => {
      this.initResolve = resolve;

      // Pass ticket to WebSocket connection
      const ticket = this.wsTicket?.ticket;
      
      this.wsManager
        .connect(ticket)
        .then(() => {
          // Connection successful with ticket authentication
          if (!this.toolSchemas || this.toolSchemas.length === 0) {
            resolve();
          }
        })
        .catch(() => {
          resolve();
        });
    });
  }

  private async requestTicket(): Promise<void> {
    try {
      // Validate that we have required authentication data
      if (!this.authData.userMpAuthToken || !this.authData.chatServerKey || !this.authData.userId) {
        throw new Error('Missing required authentication data for ticket request');
      }

      // Check if we have a valid existing ticket
      if (this.wsTicket && isTicketValid(this.wsTicket)) {
        console.log('Using existing valid WebSocket ticket');
        return;
      }

      console.log('Requesting new WebSocket ticket...', {
        userId: this.authData.userId,
        chatServerKey: this.authData.chatServerKey,
        hasToken: !!this.authData.userMpAuthToken
      });
      
      // Convert WebSocket URL to HTTP URL for ticket request
      // wss:// -> https://, ws:// -> http://
      const httpApiUrl = this.config.apiUrl
        .replace(/^wss:\/\//, 'https://')
        .replace(/^ws:\/\//, 'http://');
      console.log('Using HTTP API URL for ticket request:', httpApiUrl);
      
      this.wsTicket = await requestWebSocketTicket(httpApiUrl, {
        userMpAuthToken: this.authData.userMpAuthToken,
        chatServerKey: this.authData.chatServerKey,
        userId: this.authData.userId,
        entityId: this.authData.entityId,
        entityType: this.authData.entityType,
        providerResId: this.authData.providerResId,
      });

      console.log('WebSocket ticket received successfully:', {
        hasTicket: !!this.wsTicket.ticket,
        expiresAt: this.wsTicket.expiresAt
      });
    } catch (error) {
      console.error('Failed to request WebSocket ticket:', error);
      throw new Error(`WebSocket ticket request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
    
    // Store authentication data for ticket requests
    this.authData = {
      userMpAuthToken: props.userMpAuthToken,
      chatServerKey: props.chatServerKey,
      userId: props.userId,
      entityId: props.entityId,
      entityType: props.entityType,
      providerResId: props.providerResId,
    };
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
    // Stop ticket validation when disconnecting
    this.stopTicketValidation();
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
    let ticketExpiresIn: number | undefined;
    
    if (this.wsTicket) {
      try {
        const ticketInfo = getTicketInfo(this.wsTicket);
        ticketExpiresIn = ticketInfo.expiresIn;
      } catch (error) {
        console.warn('Error getting ticket info:', error);
      }
    }

    return {
      connected: this.connectionState.isConnected,
      reconnectAttempts: this.connectionState.reconnectAttempts,
      isReconnecting: this.connectionState.isReconnecting,
      websocketState: this.wsManager.getWebSocketState(),
      hasValidTicket: this.isTicketValid(),
      ticketExpiresIn,
      isRefreshingTicket: this.isRefreshingTicket,
    };
  }

  /**
   * Force refresh the WebSocket ticket and reconnect
   * Useful when authentication fails or ticket expires
   */
  async refreshTicketAndReconnect(): Promise<void> {
    if (this.isRefreshingTicket) {
      console.log('Ticket refresh already in progress');
      return;
    }

    try {
      this.isRefreshingTicket = true;
      console.log('Refreshing WebSocket ticket and reconnecting...');
      
      // Stop any ongoing ticket validation
      this.stopTicketValidation();
      
      // Clear existing ticket
      this.wsTicket = null;
      
      // Disconnect current connection
      this.wsManager.disconnect();
      
      // Request new ticket
      await this.requestTicket();
      
      // Update ticket in WebSocket manager and reconnect
      this.wsManager.updateTicket(this.wsTicket!.ticket);
      await this.wsManager.connect();
      
      console.log('WebSocket ticket refreshed and reconnected successfully');
    } catch (error) {
      console.error('Failed to refresh ticket and reconnect:', error);
      throw error;
    } finally {
      this.isRefreshingTicket = false;
    }
  }

  /**
   * Check if current ticket is valid
   */
  isTicketValid(): boolean {
    return this.wsTicket ? isTicketValid(this.wsTicket) : false;
  }

  /**
   * Manual reconnection method for UI to call
   * Useful for "Reconnect" buttons or retry logic
   */
  async reconnect(): Promise<void> {
    console.log('Manual reconnection requested');
    await this.refreshTicketAndReconnect();
  }

  /**
   * Start periodic ticket validation to proactively renew before expiration
   */
  private startTicketValidation(): void {
    // Clear any existing interval
    this.stopTicketValidation();
    
    // Check ticket validity every 30 seconds
    this.ticketCheckInterval = window.setInterval(() => {
      this.checkAndRenewTicket();
    }, 30000);
    
    // Listen for page visibility changes to handle user return
    this.setupVisibilityListener();
    
    console.log('Started periodic ticket validation');
  }

  /**
   * Stop periodic ticket validation
   */
  private stopTicketValidation(): void {
    if (this.ticketCheckInterval) {
      clearInterval(this.ticketCheckInterval);
      this.ticketCheckInterval = null;
    }
    
    // Remove visibility change listener
    this.removeVisibilityListener();
  }

  /**
   * Check ticket validity and renew if close to expiration
   */
  private async checkAndRenewTicket(): Promise<void> {
    if (!this.wsTicket || this.isRefreshingTicket) {
      return;
    }

    try {
      const ticketInfo = getTicketInfo(this.wsTicket);
      
      // Renew ticket if it expires in less than 5 minutes (300 seconds)
      if (ticketInfo.expiresIn < 300) {
        console.log(`Ticket expires in ${ticketInfo.expiresIn}s, proactively renewing...`);
        await this.renewTicketProactively();
      }
    } catch (error) {
      console.error('Error checking ticket validity:', error);
    }
  }

  /**
   * Proactively renew ticket without disconnecting
   */
  private async renewTicketProactively(): Promise<void> {
    if (this.isRefreshingTicket) {
      console.log('Ticket refresh already in progress');
      return;
    }

    let oldTicket: WebSocketTicketResponse | null = null;

    try {
      this.isRefreshingTicket = true;
      console.log('Proactively renewing WebSocket ticket...');
      
      // Request new ticket while keeping connection alive
      oldTicket = this.wsTicket;
      this.wsTicket = null; // Clear to force new request
      
      await this.requestTicket();
      
      console.log('Ticket renewed successfully without disconnection');
    } catch (error) {
      console.error('Failed to proactively renew ticket:', error);
      // Restore old ticket if renewal failed
      if (!this.wsTicket && oldTicket) {
        this.wsTicket = oldTicket;
      }
    } finally {
      this.isRefreshingTicket = false;
    }
  }

  /**
   * Setup page visibility listener to detect when user returns
   */
  private setupVisibilityListener(): void {
    if (typeof document === 'undefined') {
      return; // Not in browser environment
    }

    this.removeVisibilityListener(); // Remove any existing listener
    
    this.visibilityChangeHandler = () => {
      if (!document.hidden) {
        // User returned to the page, check connection and ticket
        console.log('User returned to page, checking connection...');
        this.handleUserReturn();
      }
    };

    document.addEventListener('visibilitychange', this.visibilityChangeHandler);
  }

  /**
   * Remove page visibility listener
   */
  private removeVisibilityListener(): void {
    if (this.visibilityChangeHandler && typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
      this.visibilityChangeHandler = null;
    }
  }

  /**
   * Handle user returning to the page after being away
   */
  private async handleUserReturn(): Promise<void> {
    try {
      // Check if connection is still alive
      if (!this.connectionState.isConnected) {
        console.log('Connection lost while away, attempting to reconnect...');
        await this.refreshTicketAndReconnect();
        return;
      }

      // Check if ticket is still valid
      if (!this.isTicketValid()) {
        console.log('Ticket expired while away, refreshing...');
        await this.refreshTicketAndReconnect();
        return;
      }

      // If ticket expires soon, renew it proactively
      if (this.wsTicket) {
        const ticketInfo = getTicketInfo(this.wsTicket);
        if (ticketInfo.expiresIn < 900) { // Less than 15 minutes
          console.log('Ticket expires soon, renewing proactively on user return...');
          await this.renewTicketProactively();
        }
      }
    } catch (error) {
      console.error('Error handling user return:', error);
    }
  }
}
