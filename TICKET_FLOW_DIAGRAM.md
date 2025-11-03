# Ticket-Based Authentication Flow Diagram

## Updated Flow Diagram (URL-Based Authentication)

```
┌─────────────┐    HTTP POST     ┌─────────────┐
│   Client    │ ────────────────> │   Server    │
│             │ /api/v1/tickets   │             │
│             │                   │             │
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
│             │ ws://server/ws    │             │
│             │ ?ticket=abc123    │             │
└─────────────┘                   └─────────────┘
       │                                 │
       │                                 ▼
       │                         ┌─────────────┐
       │                         │   Validate  │
       │                         │   Ticket    │
       │                         │  from URL   │
       │                         └─────────────┘
       │                                 │
       │         ┌─────────────┐         │
       │◄────────┤ Connection  │◄────────┘
       │         │ Accepted/   │
       │         │ Rejected    │
       │         └─────────────┘
       │
       ▼
   Authenticated WebSocket Session
   (No additional handshake required)
```

## Key Changes

**Before (Message-Based Auth):**
1. Connect to WebSocket
2. Send authentication message
3. Wait for authentication response
4. Start using connection

**After (URL-Based Auth):**
1. Connect to WebSocket with ticket in URL
2. Server validates during connection establishment
3. Connection succeeds/fails immediately
4. Start using connection if successful

## Benefits

- **Better Security**: Authentication happens at connection time
- **Simpler Flow**: No post-connection handshake required
- **Immediate Feedback**: Connection success/failure is instant
- **Standard Pattern**: Follows common WebSocket authentication practices
