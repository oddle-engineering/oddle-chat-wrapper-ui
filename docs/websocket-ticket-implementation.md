# WebSocket Ticket Authentication Implementation Guide

## Overview

This document provides detailed implementation guidance for the ticket-based WebSocket authentication system that uses URL-based authentication instead of post-connection message authentication.

## Implementation Architecture

### 1. Ticket Request Flow

```typescript
// Step 1: Request ticket via HTTP API
const ticket = await requestWebSocketTicket(apiUrl, {
  userMpAuthToken: 'your-auth-token',
  chatServerKey: 'your-server-key',
  userId: 'user-123',
  entityId: 'brand-456',
  entityType: 'BRAND',
  providerResId: ''
});

// Step 2: Connect with ticket in URL
const wsUrl = `${chatServerUrl}/ws?ticket=${ticket.ticket}`;
const websocket = new WebSocket(wsUrl);
```

### 2. WebSocket Manager Integration

The `WebSocketManager` class handles ticket integration:

```typescript
class WebSocketManager {
  private currentTicket: string | null = null;

  // Accept ticket during connection
  connect(ticket?: string): Promise<void> {
    if (ticket) {
      this.currentTicket = ticket;
    }
    const wsUrl = this.buildWebSocketUrl();
    this.ws = new WebSocket(wsUrl);
    // ... rest of connection logic
  }

  // Build URL with ticket parameter
  private buildWebSocketUrl(): string {
    let url = this.config.apiUrl;
    url = url.endsWith('/ws') ? url : url + '/ws';
    
    if (this.currentTicket) {
      const separator = url.includes('?') ? '&' : '?';
      url = `${url}${separator}ticket=${this.currentTicket}`;
    }
    
    return url;
  }

  // Update ticket for reconnections
  updateTicket(ticket: string): void {
    this.currentTicket = ticket;
  }
}
```

### 3. Client Integration

The `WebSocketChatClient` orchestrates the complete flow:

```typescript
class WebSocketChatClient {
  async onInit(props: WebSocketChatClientProps): Promise<void> {
    // Store authentication data
    this.authData = {
      userMpAuthToken: props.userMpAuthToken,
      chatServerKey: props.chatServerKey,
      userId: props.userId,
      // ... other props
    };

    // Request ticket before connecting
    await this.requestTicket();

    // Connect with ticket
    const ticket = this.wsTicket?.ticket;
    await this.wsManager.connect(ticket);
  }

  private async requestTicket(): Promise<void> {
    // Convert WebSocket URL to HTTP for ticket request
    const httpApiUrl = this.config.apiUrl
      .replace(/^wss:\/\//, 'https://')
      .replace(/^ws:\/\//, 'http://');
    
    this.wsTicket = await requestWebSocketTicket(httpApiUrl, {
      userMpAuthToken: this.authData.userMpAuthToken,
      chatServerKey: this.authData.chatServerKey,
      userId: this.authData.userId,
      entityId: this.authData.entityId,
      entityType: this.authData.entityType,
      providerResId: this.authData.providerResId,
    });
  }
}
```

## Key Implementation Details

### 1. Connection Establishment

**Before (Message-Based):**
```typescript
// Connect first
const ws = new WebSocket('wss://server.com/ws');
ws.onopen = () => {
  // Send authentication message after connection
  ws.send(JSON.stringify({
    type: 'ticket_authenticate',
    ticket: 'abc123'
  }));
};
```

**After (URL-Based):**
```typescript
// Authenticate during connection
const ws = new WebSocket('wss://server.com/ws?ticket=abc123');
ws.onopen = () => {
  // Connection is already authenticated
  // Start sending application messages immediately
};
```

### 2. Error Handling

**Connection Rejection:**
```typescript
ws.onerror = (error) => {
  // Connection failed - likely authentication error
  console.error('WebSocket connection failed:', error);
  // Trigger ticket refresh and retry
};

ws.onclose = (event) => {
  if (event.code === 1008) { // Policy Violation
    // Authentication failed
    this.handleAuthenticationFailure();
  }
};
```

### 3. Ticket Refresh and Reconnection

```typescript
async refreshTicketAndReconnect(): Promise<void> {
  try {
    // Clear existing ticket
    this.wsTicket = null;
    
    // Disconnect current connection
    this.wsManager.disconnect();
    
    // Request new ticket
    await this.requestTicket();
    
    // Update ticket in manager and reconnect
    this.wsManager.updateTicket(this.wsTicket!.ticket);
    await this.wsManager.connect();
    
  } catch (error) {
    console.error('Failed to refresh ticket:', error);
    throw error;
  }
}
```

### 4. Proactive Ticket Management

```typescript
// Check ticket validity periodically
private async checkAndRenewTicket(): Promise<void> {
  if (!this.wsTicket) return;

  const ticketInfo = getTicketInfo(this.wsTicket);
  
  // Renew if expires in less than 5 minutes
  if (ticketInfo.expiresIn < 300) {
    await this.renewTicketProactively();
  }
}

// Renew ticket without disconnecting
private async renewTicketProactively(): Promise<void> {
  const oldTicket = this.wsTicket;
  
  try {
    // Request new ticket
    this.wsTicket = null;
    await this.requestTicket();
    
    // Update in WebSocket manager for future connections
    this.wsManager.updateTicket(this.wsTicket!.ticket);
    
  } catch (error) {
    // Restore old ticket if renewal failed
    this.wsTicket = oldTicket;
    throw error;
  }
}
```

## Server-Side Considerations

### 1. URL Parameter Parsing

```typescript
// Express.js example
app.ws('/ws', (ws, req) => {
  const ticket = req.query.ticket;
  
  if (!ticket) {
    ws.close(1008, 'Authentication required');
    return;
  }
  
  // Validate ticket
  if (!isValidTicket(ticket)) {
    ws.close(1008, 'Invalid ticket');
    return;
  }
  
  // Connection authenticated
  handleAuthenticatedConnection(ws, ticket);
});
```

### 2. Ticket Validation

```typescript
function isValidTicket(ticket: string): boolean {
  try {
    const ticketData = decryptTicket(ticket);
    
    // Check expiration
    if (ticketData.expiresAt < Date.now()) {
      return false;
    }
    
    // Check if already used (depending on policy)
    if (ticketData.singleUse && isTicketUsed(ticket)) {
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
}
```

## Migration Guide

### From Message-Based to URL-Based

1. **Update Server**: Modify WebSocket endpoint to parse ticket from URL
2. **Update Client**: Remove `sendTicketAuthentication()` logic
3. **Update Connection**: Pass ticket to `connect()` method
4. **Update URL Building**: Add ticket as query parameter
5. **Update Error Handling**: Handle connection-level auth failures

### Backward Compatibility

If you need to support both authentication methods:

```typescript
// Server-side
app.ws('/ws', (ws, req) => {
  const urlTicket = req.query.ticket;
  
  if (urlTicket) {
    // New URL-based authentication
    if (isValidTicket(urlTicket)) {
      handleAuthenticatedConnection(ws, urlTicket);
    } else {
      ws.close(1008, 'Invalid ticket');
    }
  } else {
    // Legacy message-based authentication
    ws.on('message', (message) => {
      const data = JSON.parse(message);
      if (data.type === 'ticket_authenticate') {
        // Handle legacy auth...
      }
    });
  }
});
```

## Security Considerations

### 1. Ticket Transmission

- **HTTPS Only**: Always use HTTPS for ticket requests
- **WSS Only**: Always use WSS (WebSocket Secure) for connections
- **No Logging**: Ensure tickets are not logged in access logs
- **Short Expiry**: Use short ticket expiration times (e.g., 1 hour)

### 2. Ticket Generation

```typescript
// Server-side ticket generation
function generateTicket(authData: AuthData): string {
  const payload = {
    userId: authData.userId,
    entityId: authData.entityId,
    entityType: authData.entityType,
    issuedAt: Date.now(),
    expiresAt: Date.now() + (60 * 60 * 1000), // 1 hour
    nonce: generateNonce() // Prevent replay attacks
  };
  
  return encrypt(JSON.stringify(payload), SECRET_KEY);
}
```

### 3. Connection Limits

```typescript
// Rate limiting example
const connectionAttempts = new Map();

function checkConnectionRate(clientIP: string): boolean {
  const attempts = connectionAttempts.get(clientIP) || 0;
  
  if (attempts > 10) { // Max 10 attempts per minute
    return false;
  }
  
  connectionAttempts.set(clientIP, attempts + 1);
  setTimeout(() => {
    connectionAttempts.set(clientIP, Math.max(0, attempts - 1));
  }, 60000);
  
  return true;
}
```

## Testing

### 1. Unit Tests

```typescript
describe('WebSocket Ticket Authentication', () => {
  it('should connect with valid ticket', async () => {
    const ticket = 'valid-ticket-123';
    const manager = new WebSocketManager(config, connectionState);
    
    await manager.connect(ticket);
    
    expect(manager.getWebSocketState()).toBe('OPEN');
  });

  it('should fail with invalid ticket', async () => {
    const ticket = 'invalid-ticket';
    const manager = new WebSocketManager(config, connectionState);
    
    await expect(manager.connect(ticket)).rejects.toThrow();
  });
});
```

### 2. Integration Tests

```typescript
describe('Full Authentication Flow', () => {
  it('should complete full auth flow', async () => {
    const client = new WebSocketChatClient();
    
    await client.onInit({
      userMpAuthToken: 'test-token',
      chatServerUrl: 'wss://test-server.com',
      chatServerKey: 'test-key',
      userId: 'test-user'
    });
    
    expect(client.isClientConnected()).toBe(true);
  });
});
```

## Troubleshooting

### Common Issues

1. **Connection Rejected**: Check ticket validity and server logs
2. **Ticket Expired**: Ensure ticket refresh logic is working
3. **URL Parsing**: Verify server correctly parses query parameters
4. **CORS Issues**: Configure CORS for WebSocket upgrades
5. **Proxy Issues**: Ensure proxies pass query parameters

### Debug Logging

```typescript
// Enable debug logging
const client = new WebSocketChatClient();
client.enableDebugLogging = true;

// Check connection status
const status = client.getConnectionStatus();
console.log('Connection:', status.connected);
console.log('Valid Ticket:', status.hasValidTicket);
console.log('Ticket Expires In:', status.ticketExpiresIn);
```

This implementation provides a robust, secure, and scalable foundation for WebSocket authentication using URL-based tickets.