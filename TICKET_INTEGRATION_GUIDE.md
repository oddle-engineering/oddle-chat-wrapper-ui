# Ticket-Based Authentication Integration Guide

## Overview

This guide shows how to integrate **ticket-based authentication** into your **existing chat server**. Instead of sending tokens directly in WebSocket URLs or messages, clients will:

1. **Request a ticket** from your HTTP API before connecting
2. **Use the ticket** to authenticate the WebSocket connection
3. **Server validates** the ticket and establishes authenticated session

## How It Works

### Current Flow (What you probably have now)
```
Client → WebSocket Connection → Send auth data → Validate → Chat
```

### New Ticket Flow
```
Client → HTTP API (get ticket) → WebSocket Connection → Send ticket → Validate ticket → Chat
```

## Client-Side Behavior

### What the Client Will Send

#### 1. HTTP Request for Ticket
```http
POST /api/websocket/ticket
Authorization: Bearer {userMpAuthToken}
X-Chat-Server-Key: {chatServerKey}
Content-Type: application/json

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

#### 2. WebSocket Connection (Clean URL)
```javascript
// No tokens in URL anymore
const ws = new WebSocket("wss://your-chat-server.com/ws");
```

#### 3. First Message After Connection
```json
{
  "type": "ticket_authenticate",
  "ticket": "ws_ticket_abc123def456...",
  "clientInfo": {
    "userAgent": "Mozilla/5.0...",
    "timestamp": "2024-01-15T10:30:15.000Z"
  }
}
```

## Server-Side Implementation

### 1. Add HTTP Ticket Endpoint

Add this endpoint to your existing HTTP server:

```javascript
// Add to your existing Express/HTTP server
app.post('/api/websocket/ticket', async (req, res) => {
  try {
    // 1. Validate authentication (your existing logic)
    const userMpAuthToken = req.headers.authorization?.replace('Bearer ', '');
    const chatServerKey = req.headers['x-chat-server-key'];
    
    if (!userMpAuthToken || !chatServerKey) {
      return res.status(401).json({
        success: false,
        error: 'Missing authentication headers'
      });
    }

    // 2. Use your existing auth validation
    const user = await validateUser(userMpAuthToken); // Your existing function
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid authentication token'
      });
    }

    // 3. Generate ticket
    const ticket = `ws_ticket_${generateRandomString(64)}`;
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours

    // 4. Store ticket (use your existing database/Redis)
    await storeTicket(ticket, {
      userId: req.body.userId,
      entityId: req.body.entityId,
      entityType: req.body.entityType,
      providerResId: req.body.providerResId,
      chatServerKey,
      userMpAuthToken, // Store for later validation
      expiresAt
    });

    // 5. Return ticket
    res.json({
      success: true,
      ticket,
      expiresAt: expiresAt.toISOString()
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to generate ticket'
    });
  }
});
```

### 2. Modify WebSocket Message Handler

Update your existing WebSocket message handler:

```javascript
// In your existing WebSocket server
ws.on('message', async (message) => {
  const data = JSON.parse(message);

  // Handle ticket authentication FIRST
  if (data.type === 'ticket_authenticate') {
    await handleTicketAuthentication(ws, data);
    return;
  }

  // Check authentication for other messages
  if (!ws.authenticated) {
    ws.send(JSON.stringify({
      type: 'authentication_error',
      error: 'Authentication required'
    }));
    return;
  }

  // Your existing message handling logic
  handleChatMessage(ws, data);
  handleToolConfiguration(ws, data);
  // ... rest of your existing handlers
});

// New function to add
async function handleTicketAuthentication(ws, data) {
  try {
    const { ticket } = data;
    
    // 1. Retrieve ticket data (from your database/Redis)
    const ticketData = await getTicket(ticket);
    
    if (!ticketData) {
      ws.send(JSON.stringify({
        type: 'authentication_error',
        error: 'Invalid or expired ticket'
      }));
      return;
    }

    // 2. Check expiration
    if (new Date() > new Date(ticketData.expiresAt)) {
      ws.send(JSON.stringify({
        type: 'authentication_error',
        error: 'Ticket has expired'
      }));
      return;
    }

    // 3. Mark as authenticated (your existing session logic)
    ws.authenticated = true;
    ws.userId = ticketData.userId;
    ws.entityId = ticketData.entityId;
    ws.entityType = ticketData.entityType;
    ws.chatServerKey = ticketData.chatServerKey;

    // 4. Remove ticket (single use)
    await removeTicket(ticket);

    // 5. Send success response
    ws.send(JSON.stringify({
      type: 'authentication_success',
      sessionId: generateSessionId(),
      user: {
        userId: ticketData.userId,
        entityId: ticketData.entityId,
        entityType: ticketData.entityType
      }
    }));

    console.log(`WebSocket authenticated: ${ws.userId}`);

  } catch (error) {
    ws.send(JSON.stringify({
      type: 'authentication_error',
      error: 'Authentication failed'
    }));
  }
}
```

### 3. Ticket Storage Functions

Add these utility functions (adapt to your existing database):

```javascript
// Ticket storage (adapt to your database)
async function storeTicket(ticket, data) {
  // Option A: If you use Redis
  await redis.setex(`ticket:${ticket}`, 7200, JSON.stringify(data));
  
  // Option B: If you use SQL database
  // await db.query(
  //   'INSERT INTO websocket_tickets (id, user_id, entity_id, expires_at, data) VALUES (?, ?, ?, ?, ?)',
  //   [ticket, data.userId, data.entityId, data.expiresAt, JSON.stringify(data)]
  // );
}

async function getTicket(ticket) {
  // Option A: Redis
  const data = await redis.get(`ticket:${ticket}`);
  return data ? JSON.parse(data) : null;
  
  // Option B: SQL
  // const result = await db.query('SELECT * FROM websocket_tickets WHERE id = ?', [ticket]);
  // return result[0] || null;
}

async function removeTicket(ticket) {
  // Option A: Redis
  await redis.del(`ticket:${ticket}`);
  
  // Option B: SQL
  // await db.query('DELETE FROM websocket_tickets WHERE id = ?', [ticket]);
}

function generateRandomString(length) {
  return require('crypto').randomBytes(length / 2).toString('hex');
}
```

## Database Schema (If Using SQL)

If you're using a SQL database, add this table:

```sql
CREATE TABLE websocket_tickets (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  entity_id VARCHAR(255),
  entity_type VARCHAR(50),
  provider_res_id VARCHAR(255),
  chat_server_key VARCHAR(255) NOT NULL,
  user_mp_auth_token TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_expires (expires_at),
  INDEX idx_user (user_id)
);

-- Cleanup job (run periodically)
DELETE FROM websocket_tickets WHERE expires_at < NOW();
```

## Key Changes Summary

### What You Need to Add:
1. **HTTP endpoint** `/api/websocket/ticket` for ticket generation
2. **Ticket authentication handler** in WebSocket message processing
3. **Ticket storage/retrieval** functions
4. **Database table** for tickets (if using SQL)

### What You Keep:
- **Existing WebSocket server** (just add ticket auth handler)
- **Existing authentication logic** (reuse for ticket generation)
- **Existing chat message handling** (no changes needed)
- **Existing database/Redis** (just add ticket storage)

### What Changes:
- **Client connects with clean URL** (no tokens in WebSocket URL)
- **First message is ticket authentication** instead of direct auth
- **Ticket validation** replaces direct token validation

## Flow Diagram

```
┌─────────────┐    HTTP POST     ┌─────────────┐
│   Client    │ ────────────────> │   Server    │
│             │ /api/websocket/   │             │
│             │     ticket        │             │
└─────────────┘                   └─────────────┘
       │                                 │
       │         ┌─────────────┐         │
       │◄────────┤   Return    │◄────────┘
       │         │   Ticket    │
       │         └─────────────┘
       │
       ▼
┌─────────────┐    WebSocket      ┌─────────────┐
│   Client    │ ────────────────> │   Server    │
│             │   Connection      │             │
└─────────────┘                   └─────────────┘
       │                                 │
       ▼                                 ▼
┌─────────────┐    Send Ticket    ┌─────────────┐
│   Client    │ ────────────────> │   Server    │
│             │ ticket_authenticate│             │
└─────────────┘                   └─────────────┘
       │                                 │
       │         ┌─────────────┐         │
       │◄────────┤ Auth Success│◄────────┘
       │         │  /Error     │
       │         └─────────────┘
       │
       ▼
   Authenticated WebSocket Session
```

## Testing Your Implementation

### 1. Test Ticket Generation
```bash
curl -X POST http://localhost:3000/api/websocket/ticket \
  -H "Authorization: Bearer your-token" \
  -H "X-Chat-Server-Key: UD21" \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user"}'
```

Expected response:
```json
{
  "success": true,
  "ticket": "ws_ticket_abc123...",
  "expiresAt": "2024-01-15T12:30:00.000Z"
}
```

### 2. Test WebSocket Authentication
```javascript
const ws = new WebSocket('ws://localhost:8080/ws');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'ticket_authenticate',
    ticket: 'ws_ticket_abc123...'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
  // Should see: { type: 'authentication_success', ... }
};
```

## Migration Strategy

### Phase 1: Add Ticket Support (Backward Compatible)
- Add ticket endpoint
- Add ticket authentication handler
- Keep existing authentication working

### Phase 2: Client Migration
- Update clients to use ticket authentication
- Monitor both authentication methods

### Phase 3: Remove Old Authentication
- Remove direct token authentication
- Clean up old code

This approach lets you integrate ticket authentication into your existing chat server with minimal changes while maintaining security and scalability!