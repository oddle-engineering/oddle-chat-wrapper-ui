import { BaseApiService, AuthOptions } from './BaseApiService';

/**
 * Authentication and WebSocket ticket management service
 */

export interface WebSocketTicketRequest {
  userId: string;
  entityId?: string;
  entityType?: string;
  providerResId?: string;
  clientInfo?: {
    userAgent?: string;
    timestamp?: string;
  };
}

export interface WebSocketTicketResponse {
  success: boolean;
  ticket: string;
  expiresAt: string; // ISO timestamp
}

export class AuthApiService extends BaseApiService {
  /**
   * Request a WebSocket authentication ticket
   */
  async requestWebSocketTicket(
    ticketRequest: WebSocketTicketRequest,
    authOptions: AuthOptions
  ): Promise<WebSocketTicketResponse> {
    const requestBody = {
      ...ticketRequest,
      clientInfo: {
        userAgent: navigator?.userAgent,
        timestamp: new Date().toISOString(),
        ...ticketRequest.clientInfo,
      },
    };

    return this.post<WebSocketTicketResponse>(
      '/api/tickets',
      requestBody,
      authOptions
    );
  }

  /**
   * Validate if a ticket is still valid (client-side check)
   */
  isTicketValid(ticket: WebSocketTicketResponse): boolean {
    if (!ticket.success || !ticket.ticket || !ticket.expiresAt) {
      return false;
    }

    const expirationTime = new Date(ticket.expiresAt).getTime();
    const currentTime = Date.now();
    
    // Add 30 second buffer to avoid race conditions
    return currentTime < (expirationTime - 30000);
  }

  /**
   * Get ticket expiration info
   */
  getTicketInfo(ticket: WebSocketTicketResponse): {
    isValid: boolean;
    expiresIn: number; // seconds
    expired: boolean;
  } {
    const isValid = this.isTicketValid(ticket);
    const expirationTime = new Date(ticket.expiresAt).getTime();
    const currentTime = Date.now();
    const expiresIn = Math.max(0, Math.floor((expirationTime - currentTime) / 1000));
    
    return {
      isValid,
      expiresIn,
      expired: currentTime >= expirationTime,
    };
  }
}