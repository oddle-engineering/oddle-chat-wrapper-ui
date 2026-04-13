# Domain: WebSocket & Connection

## Overview
Real-time bidirectional communication layer. The library wraps a WebSocket connection to a chat server with ticket-based auth and automatic reconnection.

## Key Files
| File | Purpose |
|------|---------|
| `src/client/WebSocketChatClient.ts` | Core client — orchestrates connection, handlers, and events |
| `src/client/connection/WebSocketManager.ts` | WebSocket lifecycle: open/close/reconnect |
| `src/client/connection/ConnectionState.ts` | State machine: DISCONNECTED → CONNECTING → CONNECTED → RECONNECTING |
| `src/client/ticket/TicketManager.ts` | Generates and renews auth tickets; handles expiry |
| `src/hooks/useWebSocketConnection.ts` | React hook wrapping the client for component use |
| `src/client/handlers/BaseHandler.ts` | Base class for message handlers |
| `src/client/handlers/MessageHandler.ts` | Handles chat message events from server |
| `src/client/handlers/ToolHandler.ts` | Handles tool execution events |
| `src/client/handlers/ReasoningHandler.ts` | Handles reasoning/thinking events |

## Message Flow
1. Component calls `sendMessage()` via hook
2. Hook calls `WebSocketChatClient.send()` → `messageFactory` creates outbound message
3. Server streams back events: `message_chunk`, `tool_call`, `reasoning_chunk`, `message_complete`
4. `WebSocketManager` routes each event to the appropriate handler
5. Handler updates Zustand store (`messagesSlice`, `chatSlice`)

## Auth Pattern
- `TicketManager` fetches a short-lived ticket from `websocketTicketApi`
- Ticket is sent in the WebSocket connection URL or initial handshake
- Auto-renews before expiry; hooks `useWebSocketConnection` trigger renewal

## Reconnection Logic
- Exponential backoff in `WebSocketManager`
- Max retries configurable via `ChatConfig.maxReconnectAttempts`
- On reconnect, conversation state is preserved (messages stay, connection status updates)

## Inbound Message Types (`src/client/types/inboundMessages.ts`)
- `message_chunk` — streaming text delta
- `message_complete` — end of message stream
- `tool_call_start` / `tool_call_result` — tool execution lifecycle
- `reasoning_chunk` — thinking/reasoning content
- `error` — server-side error

## Outbound Message Types (`src/client/types/outboundMessages.ts`)
- `user_message` — user sends a chat message
- `cancel_stream` — user cancels in-flight response

## Gotchas
- WebSocket ticket expiry causes silent disconnects — always check `TicketManager` renewal timing
- `ConnectionState` transitions are one-way within a session; a new instance is needed after fatal errors
- Reconnect storms: if multiple tabs open, each reconnects independently — no shared connection
- Handler pipeline is synchronous per-message; heavy ToolHandler work can block MessageHandler

## Branch Patterns → This Domain
`feature/websocket-*`, `fix/websocket-*`, `fix/connection-*`, `feature/connection-*`, `fix/ticket-*`
