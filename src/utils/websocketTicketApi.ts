/**
 * WebSocket Ticket Authentication API
 *
 * This service handles the "ticket-based" authentication system for WebSocket connections.
 * The flow is:
 * 1. Client requests a WebSocket ticket from the HTTP server (userId extracted from userMpAuthToken)
 * 2. Server generates and stores the ticket, returns it to client
 * 3. Client uses ticket in WebSocket connection URL (as query parameter)
 * 4. Server validates ticket during connection establishment and authenticates the connection
 */

export interface WebSocketTicketRequest {
  // Authentication data
  userMpAuthToken: string;
  chatServerKey: string;

  // Optional entity context
  entityId?: string;
  entityType?: string;
  providerResId?: string;

  // Client information for security
  clientInfo?: {
    userAgent?: string;
    timestamp?: string;
  };
}

export interface WebSocketTicketResponse {
  success: boolean;
  ticket: string;
  expiresAt: string; // ISO timestamp
  error?: string;
}

export interface WebSocketTicketError {
  success: false;
  error: string;
  code?: string;
}

/**
 * Request a WebSocket authentication ticket from the server
 * The server will extract userId from the userMpAuthToken
 */
export async function requestWebSocketTicket(
  apiUrl: string,
  ticketRequest: WebSocketTicketRequest
): Promise<WebSocketTicketResponse> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (ticketRequest?.userMpAuthToken) {
    headers["x-oddle-mp-auth-token"] = ticketRequest.userMpAuthToken;
  }
  if (ticketRequest?.chatServerKey) {
    headers["x-oddle-chat-server-key"] = ticketRequest.chatServerKey;
  }
  try {
    const response = await fetch(`${apiUrl}/api/v1/tickets`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        entityId: ticketRequest.entityId,
        entityType: ticketRequest.entityType,
        providerResId: ticketRequest.providerResId,
        clientInfo: {
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          ...ticketRequest.clientInfo,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error ||
          `Failed to get WebSocket ticket: ${response.statusText}`
      );
    }

    const data: WebSocketTicketResponse = await response.json();

    if (!data.success || !data.ticket) {
      throw new Error(data.error || "Invalid ticket response from server");
    }

    return data;
  } catch (error) {
    console.error("Error requesting WebSocket ticket:", error);
    throw error;
  }
}

/**
 * Validate that a ticket is still valid (not expired)
 */
export function isTicketValid(ticket: WebSocketTicketResponse): boolean {
  if (!ticket.success || !ticket.ticket || !ticket.expiresAt) {
    return false;
  }

  const expirationTime = new Date(ticket.expiresAt).getTime();
  const currentTime = Date.now();

  // Add 30 second buffer to avoid race conditions
  return currentTime < expirationTime - 30000;
}

/**
 * Extract ticket expiration info for debugging
 */
export function getTicketInfo(ticket: WebSocketTicketResponse): {
  isValid: boolean;
  expiresIn: number; // seconds
  expired: boolean;
} {
  const isValid = isTicketValid(ticket);
  const expirationTime = new Date(ticket.expiresAt).getTime();
  const currentTime = Date.now();
  const expiresIn = Math.max(
    0,
    Math.floor((expirationTime - currentTime) / 1000)
  );

  return {
    isValid,
    expiresIn,
    expired: currentTime >= expirationTime,
  };
}

/**
 * Ticket validation request payload
 */
export interface TicketValidationRequest {
  ticket: string;
  // Optional context for validation
  entityId?: string;
  entityType?: string;
}

/**
 * Ticket validation response from server
 */
export interface TicketValidationResponse {
  valid: boolean;
  error?: string;
  code?: string;
  retryable?: boolean; // True if this is a temporary API failure, false if ticket is definitively invalid
  details?: {
    expired?: boolean;
    revoked?: boolean;
    invalid?: boolean;
    reason?: string;
    retryable?: boolean; // Deprecated: use top-level retryable instead
  };
}

/**
 * Validate a ticket against the server API
 * This provides authoritative server-side validation, checking for:
 * - Ticket expiration
 * - Ticket revocation
 * - Server-side blacklisting
 * - Other security concerns the server may have
 */
export async function validateTicketWithServer(
  apiUrl: string,
  ticket: string,
  authHeaders: {
    userMpAuthToken: string;
    chatServerKey: string;
  },
  context?: {
    entityId?: string;
    entityType?: string;
  }
): Promise<TicketValidationResponse> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-oddle-mp-auth-token": authHeaders.userMpAuthToken,
      "x-oddle-chat-server-key": authHeaders.chatServerKey,
    };

    const requestBody: TicketValidationRequest = {
      ticket,
      ...context,
    };

    console.log('[TicketAPI] Validating ticket with server:', {
      url: `${apiUrl}/api/v1/tickets/validate`,
      ticket: ticket.substring(0, 8) + '...',
      context
    });

    const response = await fetch(`${apiUrl}/api/v1/tickets/validate`, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Ticket validation failed: ${response.status} ${response.statusText}`);
    }

    const validationResult: TicketValidationResponse = await response.json();

    console.log(`[TicketAPI] Server validation result:`, {
      valid: validationResult.valid,
      error: validationResult.error,
      details: validationResult.details,
    });

    // If server successfully responded, this is a DEFINITIVE answer (not a connectivity issue)
    // Set retryable=false to indicate the client should get a fresh ticket, not retry validation
    if (!validationResult.valid) {
      validationResult.retryable = false; // Server definitively says ticket is invalid
    }

    return validationResult;
  } catch (error) {
    console.error('[TicketAPI] Ticket validation error:', error);
    
    // Distinguish between network errors and server errors for better handling
    let errorCode = "VALIDATION_ERROR";
    let errorMessage = "Validation request failed";
    
    if (error instanceof Error) {
      errorMessage = error.message;
      // Classify common error types
      if (error.message.includes('fetch')) {
        errorCode = "NETWORK_ERROR";
        errorMessage = "Network error during ticket validation - server may be temporarily unavailable";
      } else if (error.message.includes('500') || error.message.includes('502') || error.message.includes('503')) {
        errorCode = "SERVER_ERROR"; 
        errorMessage = "Server error during ticket validation - validation service may be temporarily down";
      } else if (error.message.includes('timeout')) {
        errorCode = "TIMEOUT_ERROR";
        errorMessage = "Timeout during ticket validation - validation service may be slow or overloaded";
      }
    }
    
    console.log(`[TicketAPI] Validation failed with error type: ${errorCode}`);
    
    // Return detailed error information
    return {
      valid: false,
      error: errorMessage,
      code: errorCode,
      retryable: true, // API failure = temporary issue, should retry
      details: {
        reason: "Validation API request failed - will retry with fresh ticket",
        retryable: true, // Indicate this error is retryable
      }
    };
  }
}
