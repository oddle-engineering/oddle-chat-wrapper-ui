import {
  requestWebSocketTicket,
  isTicketValid,
  getTicketInfo,
  validateTicketWithServer,
  WebSocketTicketResponse,
  TicketValidationResponse,
} from "../../utils/websocketTicketApi";
import { logClassifiedError } from "../../utils/errorClassification";

export interface AuthData {
  userMpAuthToken: string;
  chatServerKey: string;
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

  /**
   * Maximum retry attempts for ticket requests
   * Default: 3
   */
  maxRetries?: number;

  /**
   * Base delay for retry backoff (ms)
   * Default: 1000 (1 second)
   */
  retryBaseDelay?: number;

  /**
   * Timeout for ticket requests (ms)
   * Default: 30000 (30 seconds) - increased for slow connections
   */
  requestTimeout?: number;

  /**
   * Callback for non-retryable errors (auth failures, permissions, etc.)
   * When called, the TicketManager stops retrying and the error is bubbled up to the application
   */
  onError?: (
    error: Error,
    classification: { reason: string; errorType: string }
  ) => void;
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
  private config: Required<Omit<TicketManagerConfig, "onError">> & {
    onError?: TicketManagerConfig["onError"];
  };

  // Validation cache to prevent repeated validations of the same ticket
  private lastValidationResult: {
    ticket: string;
    valid: boolean;
    timestamp: number;
  } | null = null;
  private validationCacheTTL = 30000; // 30 seconds cache

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
      maxRetries: config.maxRetries ?? 3,
      retryBaseDelay: config.retryBaseDelay ?? 1000,
      requestTimeout: config.requestTimeout ?? 30000, // 30s for slow connections
      onError: config.onError,
    };
  }

  /**
   * Convert WebSocket URL to HTTP URL for ticket requests
   * wss:// -> https://, ws:// -> http://
   * Also handles http:// and https:// (keeps them as-is)
   */
  private convertToHttpUrl(url: string): string {
    return url.replace(/^wss:\/\//, "https://").replace(/^ws:\/\//, "http://");
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
      console.log("TicketManager: Using existing valid ticket");
      return this.ticket.ticket;
    }

    // Otherwise, refresh
    console.log("TicketManager: No valid ticket, refreshing...");
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
      console.log("TicketManager: Refresh already in progress, waiting...");
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
   * Includes automatic retry logic for transient failures
   * @private
   */
  private async _doRefresh(): Promise<string> {
    const maxRetries = this.config.maxRetries;
    const baseDelay = this.config.retryBaseDelay;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      console.log(
        `TicketManager: Requesting new ticket (attempt ${attempt}/${maxRetries})...`,
        {
          apiUrl: this.apiUrl,
        }
      );

      try {
        this.ticket = await requestWebSocketTicket(
          this.apiUrl,
          this.authData,
          this.config.requestTimeout
        );

        console.log("TicketManager: Ticket received successfully", {
          hasTicket: !!this.ticket.ticket,
          expiresAt: this.ticket.expiresAt,
        });

        // Clear validation cache when new ticket is obtained
        this.lastValidationResult = null;

        return this.ticket.ticket;
      } catch (error) {
        console.log(`[TicketManager] Caught error during ticket request:`, {
          error: error instanceof Error ? error.message : error,
          attempt,
          maxRetries,
          hasOnErrorCallback: !!this.config.onError,
        });

        const classification = logClassifiedError(error, "TicketManager");

        // If this is a non-retryable error (CORS, auth, etc.), call onError if provided
        if (!classification.isRetryable) {
          const errorMessage = `Ticket refresh failed (non-retryable - ${
            classification.reason
          }): ${error instanceof Error ? error.message : "Unknown error"}`;

          const ticketError = new Error(errorMessage);

          // If onError callback is provided, call it and let the app handle the error
          if (this.config.onError) {
            this.config.onError(ticketError, {
              reason: classification.reason,
              errorType: classification.errorType,
            });
            // Don't throw - let the application handle the error through the callback
            // Return a rejected promise to maintain the async contract
            throw ticketError;
          } else {
            console.warn(
              `[TicketManager] No onError callback configured, throwing error`
            );
            // No callback provided, throw as before
            throw ticketError;
          }
        }

        // If this is the last attempt, throw the error
        if (attempt === maxRetries) {
          throw new Error(
            `Ticket refresh failed after ${maxRetries} attempts (${
              classification.reason
            }): ${error instanceof Error ? error.message : "Unknown error"}`
          );
        }

        // Otherwise, log and retry with exponential backoff
        const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff: 1s, 2s, 4s
        console.log(
          `TicketManager: Ticket request failed (${classification.reason}), retrying in ${delay}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    // This should never be reached, but TypeScript needs it
    throw new Error("Ticket refresh failed unexpectedly");
  }

  /**
   * Start proactive ticket renewal before expiration
   * Checks ticket validity at regular intervals and renews if needed
   *
   * @param onRenewed - Optional callback when ticket is renewed
   */
  startProactiveRenewal(onRenewed?: () => void): void {
    this.stopProactiveRenewal();

    console.log("TicketManager: Starting proactive renewal", {
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
      console.warn("TicketManager: No ticket to validate");
      return;
    }

    try {
      const info = getTicketInfo(this.ticket);
      const expiresInSeconds = info.expiresIn / 1000;

      // Renew if expiring soon
      if (expiresInSeconds < this.config.renewalThreshold) {
        console.log(
          `TicketManager: Ticket expires in ${expiresInSeconds.toFixed(
            0
          )}s, renewing...`
        );

        await this.refreshTicket();

        console.log("TicketManager: Ticket renewed proactively");
        onRenewed?.();
      }
    } catch (error) {
      const classification = logClassifiedError(
        error,
        "TicketManager:ProactiveRenewal"
      );

      if (!classification.isRetryable) {
        console.warn(
          `TicketManager: Stopping proactive renewal due to non-retryable error: ${classification.reason}`
        );
        this.stopProactiveRenewal();

        // Call onError callback if provided for non-retryable errors during proactive renewal
        if (this.config.onError) {
          const ticketError = new Error(
            `Proactive ticket renewal failed (non-retryable - ${
              classification.reason
            }): ${error instanceof Error ? error.message : "Unknown error"}`
          );
          this.config.onError(ticketError, {
            reason: classification.reason,
            errorType: classification.errorType,
          });
        }
      }
    }
  }

  /**
   * Stop proactive renewal
   */
  stopProactiveRenewal(): void {
    if (this.validationInterval) {
      clearInterval(this.validationInterval);
      this.validationInterval = null;
      console.log("TicketManager: Stopped proactive renewal");
    }
  }

  /**
   * Check if current ticket is valid (local expiration check)
   */
  isValid(): boolean {
    return this.ticket ? isTicketValid(this.ticket) : false;
  }

  /**
   * Validate current ticket with server API
   * This provides authoritative server-side validation
   * Uses a 30-second cache to prevent repeated validations of the same ticket
   */
  async validateWithServer(): Promise<TicketValidationResponse> {
    if (!this.ticket) {
      return {
        valid: false,
        error: "No ticket available to validate",
        code: "NO_TICKET",
      };
    }

    // Check validation cache to prevent repeated validations of the same ticket
    const now = Date.now();
    if (
      this.lastValidationResult &&
      this.lastValidationResult.ticket === this.ticket.ticket &&
      now - this.lastValidationResult.timestamp < this.validationCacheTTL
    ) {
      const cacheAge = ((now - this.lastValidationResult.timestamp) / 1000).toFixed(1);
      console.log(
        `[TicketManager] Using cached validation result (${cacheAge}s old):`,
        {
          valid: this.lastValidationResult.valid,
          ticket: this.ticket.ticket.substring(0, 8) + '...',
        }
      );
      return {
        valid: this.lastValidationResult.valid,
        code: this.lastValidationResult.valid ? "VALID" : "INVALID_CACHED",
      };
    }

    try {
      console.log("[TicketManager] Validating ticket with server API...");

      const result = await validateTicketWithServer(
        this.apiUrl,
        this.ticket.ticket,
        {
          userMpAuthToken: this.authData.userMpAuthToken,
          chatServerKey: this.authData.chatServerKey,
        },
        {
          entityId: this.authData.entityId,
          entityType: this.authData.entityType,
        }
      );

      console.log("[TicketManager] Server validation result:", {
        valid: result.valid,
        error: result.error,
        code: result.code,
        retryable: result.retryable,
      });

      // Cache the validation result (only if it's a definitive answer, not a connectivity issue)
      if (!result.retryable || result.valid) {
        this.lastValidationResult = {
          ticket: this.ticket.ticket,
          valid: result.valid,
          timestamp: now,
        };
        console.log("[TicketManager] Cached validation result for 30 seconds");
      }

      // Log specific guidance based on validation result
      if (!result.valid) {
        if (result.retryable) {
          // Connectivity issue - validation API failed
          console.log(
            "[TicketManager] Validation API failed (connectivity issue) - will get fresh ticket and retry"
          );
        } else {
          // Server definitively says ticket is invalid - clear it immediately
          console.log(
            "[TicketManager] Ticket is definitively invalid - clearing and will get fresh ticket"
          );
          this.ticket = null; // Clear invalid ticket so next call triggers refresh
        }
      }

      return result;
    } catch (error) {
      console.error(
        "[TicketManager] Server validation failed unexpectedly:",
        error
      );
      return {
        valid: false,
        error:
          error instanceof Error
            ? error.message
            : "Server validation failed unexpectedly",
        code: "VALIDATION_ERROR",
        details: {
          reason:
            "Unexpected error during validation - will retry with fresh ticket",
          retryable: true,
        },
      };
    }
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
      console.warn("TicketManager: Error getting ticket info", error);
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
    console.log("TicketManager: Auth data updated");
  }

  /**
   * Clear ticket (e.g., on logout)
   */
  clear(): void {
    this.ticket = null;
    this.lastValidationResult = null; // Clear validation cache
    this.stopProactiveRenewal();
    console.log("TicketManager: Ticket cleared");
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
