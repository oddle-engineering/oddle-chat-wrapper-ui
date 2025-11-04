import { 
  requestWebSocketTicket, 
  isTicketValid, 
  getTicketInfo,
  WebSocketTicketResponse 
} from "../../utils/websocketTicketApi";

export interface AuthData {
  userMpAuthToken: string;
  chatServerKey: string;
  userId: string;
  entityId?: string;
  entityType?: string;
  providerResId?: string;
}

export interface TicketManagerConfig {
  /**
   * How often to check ticket validity (ms)
   * Default: 60000 (1 minute)
   */
  checkInterval?: number;
  
  /**
   * Renew ticket when this many seconds remain
   * Default: 300 (5 minutes)
   */
  renewalThreshold?: number;
}

/**
 * TicketManager - Centralized WebSocket ticket lifecycle management
 * 
 * Responsibilities:
 * - Request new tickets
 * - Validate ticket expiration
 * - Proactive renewal before expiration
 * - Prevent duplicate refresh requests
 * 
 * Benefits:
 * - Single source of truth for ticket state
 * - No race conditions via promise deduplication
 * - Configurable renewal thresholds
 * - Easy to test in isolation
 */
export class TicketManager {
  private ticket: WebSocketTicketResponse | null = null;
  private refreshPromise: Promise<string> | null = null;
  private validationInterval: number | null = null;
  private authData: AuthData;
  private apiUrl: string;
  private config: Required<TicketManagerConfig>;

  constructor(
    authData: AuthData,
    apiUrl: string,
    config: TicketManagerConfig = {}
  ) {
    this.authData = authData;
    this.apiUrl = this.convertToHttpUrl(apiUrl);
    this.config = {
      checkInterval: config.checkInterval ?? 60000,
      renewalThreshold: config.renewalThreshold ?? 300,
    };
  }

  /**
   * Convert WebSocket URL to HTTP URL for ticket requests
   * wss:// -> https://, ws:// -> http://
   * Also handles http:// and https:// (keeps them as-is)
   */
  private convertToHttpUrl(url: string): string {
    return url
      .replace(/^wss:\/\//, 'https://')
      .replace(/^ws:\/\//, 'http://');
  }

  /**
   * Get a valid ticket, refreshing if necessary
   * This is the main entry point for getting tickets
   * 
   * @returns Valid ticket string
   * @throws Error if ticket refresh fails
   */
  async getValidTicket(): Promise<string> {
    // If we have a valid ticket, return it
    if (this.ticket && isTicketValid(this.ticket)) {
      console.log('TicketManager: Using existing valid ticket');
      return this.ticket.ticket;
    }

    // Otherwise, refresh
    console.log('TicketManager: No valid ticket, refreshing...');
    return this.refreshTicket();
  }

  /**
   * Refresh the ticket, preventing duplicate refreshes
   * Multiple concurrent calls will wait for the same refresh
   * 
   * This prevents race conditions by:
   * 1. Checking if refresh is in progress
   * 2. If yes, returning the same promise (all callers wait together)
   * 3. If no, starting new refresh and storing the promise
   * 
   * @returns Promise that resolves to new ticket string
   */
  async refreshTicket(): Promise<string> {
    // If refresh is already in progress, wait for it
    if (this.refreshPromise) {
      console.log('TicketManager: Refresh already in progress, waiting...');
      return this.refreshPromise;
    }

    // Start new refresh
    this.refreshPromise = this._doRefresh();

    try {
      const ticket = await this.refreshPromise;
      return ticket;
    } finally {
      // Clear promise when done (success or failure)
      this.refreshPromise = null;
    }
  }

  /**
   * Internal method to actually perform the refresh
   * @private
   */
  private async _doRefresh(): Promise<string> {
    console.log('TicketManager: Requesting new ticket...', {
      userId: this.authData.userId,
      apiUrl: this.apiUrl,
    });

    try {
      this.ticket = await requestWebSocketTicket(this.apiUrl, this.authData);
      
      console.log('TicketManager: Ticket received successfully', {
        hasTicket: !!this.ticket.ticket,
        expiresAt: this.ticket.expiresAt,
      });

      return this.ticket.ticket;
    } catch (error) {
      console.error('TicketManager: Failed to refresh ticket', error);
      throw new Error(
        `Ticket refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Start proactive ticket renewal before expiration
   * Checks ticket validity at regular intervals and renews if needed
   * 
   * @param onRenewed - Optional callback when ticket is renewed
   */
  startProactiveRenewal(onRenewed?: () => void): void {
    this.stopProactiveRenewal();

    console.log('TicketManager: Starting proactive renewal', {
      checkInterval: this.config.checkInterval,
      renewalThreshold: this.config.renewalThreshold,
    });

    this.validationInterval = window.setInterval(async () => {
      await this.checkAndRenew(onRenewed);
    }, this.config.checkInterval);
  }

  /**
   * Check ticket validity and renew if needed
   * @private
   */
  private async checkAndRenew(onRenewed?: () => void): Promise<void> {
    if (!this.ticket) {
      console.warn('TicketManager: No ticket to validate');
      return;
    }

    try {
      const info = getTicketInfo(this.ticket);
      const expiresInSeconds = info.expiresIn / 1000;

      // Renew if expiring soon
      if (expiresInSeconds < this.config.renewalThreshold) {
        console.log(
          `TicketManager: Ticket expires in ${expiresInSeconds.toFixed(0)}s, renewing...`
        );
        
        await this.refreshTicket();
        
        console.log('TicketManager: Ticket renewed proactively');
        onRenewed?.();
      }
    } catch (error) {
      console.error('TicketManager: Error during proactive renewal', error);
    }
  }

  /**
   * Stop proactive renewal
   */
  stopProactiveRenewal(): void {
    if (this.validationInterval) {
      clearInterval(this.validationInterval);
      this.validationInterval = null;
      console.log('TicketManager: Stopped proactive renewal');
    }
  }

  /**
   * Check if current ticket is valid
   */
  isValid(): boolean {
    return this.ticket ? isTicketValid(this.ticket) : false;
  }

  /**
   * Get time until ticket expires (in milliseconds)
   */
  getExpiresIn(): number | undefined {
    if (!this.ticket) return undefined;
    
    try {
      const info = getTicketInfo(this.ticket);
      return info.expiresIn;
    } catch (error) {
      console.warn('TicketManager: Error getting ticket info', error);
      return undefined;
    }
  }

  /**
   * Get ticket expiration timestamp
   */
  getExpiresAt(): string | undefined {
    return this.ticket?.expiresAt;
  }

  /**
   * Update authentication data (e.g., after user login)
   */
  updateAuthData(authData: Partial<AuthData>): void {
    this.authData = { ...this.authData, ...authData };
    console.log('TicketManager: Auth data updated');
  }

  /**
   * Clear ticket (e.g., on logout)
   */
  clear(): void {
    this.ticket = null;
    this.stopProactiveRenewal();
    console.log('TicketManager: Ticket cleared');
  }

  /**
   * Get debug information about current ticket state
   */
  getDebugInfo(): {
    hasTicket: boolean;
    isValid: boolean;
    expiresAt?: string;
    expiresIn?: number;
    isRefreshing: boolean;
  } {
    return {
      hasTicket: !!this.ticket,
      isValid: this.isValid(),
      expiresAt: this.getExpiresAt(),
      expiresIn: this.getExpiresIn(),
      isRefreshing: !!this.refreshPromise,
    };
  }
}
