# Ticket-Based Authentication Flow Diagram

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
