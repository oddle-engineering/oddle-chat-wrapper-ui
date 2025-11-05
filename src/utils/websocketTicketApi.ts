/**
 * WebSocket Ticket Authentication API
 *
 * This service handles the "ticket-based" authentication system for WebSocket connections.
 * The flow is:
 * 1. Client requests a WebSocket ticket from the HTTP server
 * 2. Server generates and stores the ticket, returns it to client
 * 3. Client uses ticket in WebSocket connection URL (as query parameter)
 * 4. Server validates ticket during connection establishment and authenticates the connection
 */

export interface WebSocketTicketRequest {
  // Authentication data
  userMpAuthToken: string;
  chatServerKey: string;
  userId: string;

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
        userId: ticketRequest.userId,
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
