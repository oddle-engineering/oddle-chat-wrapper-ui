# WebSocket Ticket-Based Authentication API

## Authentication Flow

```mermaid
sequenceDiagram
    participant Client
    participant HTTP Server
    participant WebSocket Server
    participant Database

    Client->>HTTP Server: POST /api/v1/tickets (with auth headers)
    HTTP Server->>Database: Store ticket with metadata
    HTTP Server->>Client: Return ticket + expiration
    Client->>WebSocket Server: Connect to ws://server/ws?ticket=abc123
    WebSocket Server->>Database: Validate ticket from URL
    WebSocket Server->>Client: Connection accepted/rejected
    Note over Client,WebSocket Server: Authenticated WebSocket session
```

## API Endpoints

### 1. Request WebSocket Ticket

**Endpoint:** `POST /api/v1/tickets`

**Headers:**
```http
Content-Type: application/json
Authorization: Bearer {userMpAuthToken}
X-Chat-Server-Key: {chatServerKey}
```

**Request Body:**
```json
{
  "userId": "user-123",
  "entityId": "brand-456",
  "entityType": "BRAND",
  "providerResId": "",
  "clientInfo": {
    "userAgent": "Mozilla/5.0...",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "ticket": "ws_ticket_abc123def456...",
  "expiresAt": "2024-01-15T11:30:00.000Z"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid authentication token",
  "code": "AUTH_INVALID"
}
```

### 2. WebSocket Connection with Ticket

**WebSocket URL with Ticket:** 
```
ws://your-server.com/ws?ticket=ws_ticket_abc123def456...
wss://your-server.com/ws?ticket=ws_ticket_abc123def456...
```

**Connection Process:**
1. Client appends ticket as query parameter to WebSocket URL
2. Server validates ticket during connection establishment
3. Connection is accepted or rejected immediately

**Connection Accepted:**
- WebSocket connection established successfully
- Client can immediately start sending messages
- No additional authentication handshake required

**Connection Rejected:**
- WebSocket connection fails to establish
- Client receives connection error with details
- Common errors: invalid ticket, expired ticket, malformed ticket

**Error Response (via connection failure):**
```json
{
  "type": "authentication_error", 
  "error": "Invalid or expired ticket",
  "code": "TICKET_INVALID"
}
```

## Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `AUTH_INVALID` | Invalid authentication token | 401 |
| `AUTH_MISSING` | Missing authentication header | 401 |
| `SERVER_KEY_INVALID` | Invalid chat server key | 401 |
| `USER_NOT_FOUND` | User not found | 404 |
| `RATE_LIMITED` | Too many ticket requests | 429 |
| `TICKET_INVALID` | Invalid ticket | 401 |
| `TICKET_EXPIRED` | Ticket has expired | 401 |
| `TICKET_USED` | Ticket already used | 401 |

