# Client WebSocket Workflow Documentation

## Overview

The client WebSocket system provides real-time communication between the chat UI and the server. It handles connection management, message routing, tool execution, and reasoning updates with robust reconnection and error handling capabilities.

## Architecture

### Core Components

```
WebSocketChatClient (Main Entry Point)
├── WebSocketManager (Connection Management)
├── ConnectionState (State Tracking)
├── MessageHandler (Message Processing)
│   ├── ReasoningHandler (Reasoning Updates)
│   └── ToolHandler (Tool Execution)
└── Utils
    ├── MessageFactory (Message Creation)
    ├── EventFactory (System Events)
    └── ToolCallFactory (Tool Call Management)
```

## Key Concepts

### 1. **WebSocketChatClient** (`WebSocketChatClient.ts`)
The main entry point that orchestrates all WebSocket functionality:
- **Initialization**: Sets up connection, tools, and event handlers
- **Configuration**: Manages API endpoints, user IDs, and tool schemas
- **Message Sending**: Provides interface for sending chat messages
- **State Management**: Exposes connection status and client tools

### 2. **Connection Management** (`connection/`)

#### WebSocketManager (`WebSocketManager.ts`)
**Why separate from WebSocketChatClient?**
The WebSocketManager is abstracted as a dedicated component to provide:
- **Single Responsibility**: Focuses purely on WebSocket connection management, separate from business logic
- **Reusability**: Can be used by different client implementations beyond chat
- **Testability**: Connection logic can be unit tested independently
- **Maintainability**: Changes to connection behavior don't affect message handling or client API

**Core Responsibilities:**
- **Connection Establishment**: Creates and maintains WebSocket connections with ticket-based URL authentication
- **Ticket Management**: Handles ticket injection into WebSocket URLs for secure connection establishment
- **Reconnection Logic**: Exponential backoff strategy with configurable max attempts and intelligent retry logic
- **Lifecycle Management**: Handles connection states (connecting, open, closing, closed) with proper cleanup
- **Browser Integration**: Responds to visibility changes to reconnect when tab becomes active
- **Error Recovery**: Robust error handling with automatic reconnection and system event notifications
- **Resource Management**: Proper timer cleanup and event listener management to prevent memory leaks

#### ConnectionState (`ConnectionState.ts`)
Tracks connection status:
- `isConnected`: Current connection status
- `isReconnecting`: Whether actively attempting reconnection
- `reconnectAttempts`: Number of failed reconnection attempts
- `reconnectDelay`: Current delay between reconnection attempts

### 3. **Message Processing** (`handlers/`)

#### MessageHandler (`MessageHandler.ts`)
Central message dispatcher that routes incoming WebSocket messages:
- **Session Management**: Handles connection establishment
- **Chat Events**: Processes text deltas and content updates
- **Tool Coordination**: Manages tool call requests and responses
- **System Events**: Handles errors and system notifications

#### BaseHandler (`BaseHandler.ts`)
Abstract base class providing common handler functionality:
- Event handler management
- Update propagation to subhandlers

### 4. **Specialized Handlers**

#### ReasoningHandler (`ReasoningHandler.ts`)
Manages AI reasoning visibility:
- **Reasoning Start/End**: Tracks reasoning sessions
- **Content Updates**: Streams reasoning deltas
- **State Management**: Maintains reasoning visibility state

#### ToolHandler (`ToolHandler.ts`)
Executes client-side tools:
- **Tool Registration**: Manages available client tools
- **Execution**: Safely executes tool calls with error handling
- **Response Management**: Sends results back to server
- **Deduplication**: Prevents duplicate tool executions

## Authentication System

### Ticket-Based Authentication
The WebSocket connection uses a ticket-based authentication system for enhanced security:

1. **Ticket Request**: Client requests a WebSocket ticket via HTTP API using existing authentication
2. **URL Authentication**: Ticket is appended to WebSocket URL as query parameter
3. **Connection Validation**: Server validates ticket during connection establishment
4. **Immediate Authentication**: Connection succeeds/fails immediately - no post-connection handshake

### Ticket Management Features
- **Automatic Refresh**: Proactive ticket renewal before expiration
- **Validation Checks**: Continuous ticket validity monitoring
- **Error Recovery**: Automatic ticket refresh on authentication failures
- **Browser Integration**: Ticket refresh when user returns to tab

## Message Flow

### 1. **Initialization Flow**
```
Client.onInit() → Request Ticket → Connect WebSocket (with ticket) → Send Tool Configuration → Session Established
```

**Detailed Steps:**
1. `WebSocketChatClient.onInit()` called with authentication parameters
2. `requestTicket()` calls HTTP API to get WebSocket ticket
3. `WebSocketManager.connect(ticket)` builds URL with ticket parameter
4. WebSocket connection established with server-side ticket validation
5. Tool configuration sent immediately (no authentication handshake needed)
6. Session established and ready for messages

### 2. **Chat Message Flow**
```
User Input → Client.onTriggerMessage() → WebSocket Send → Server Processing → 
Response Events → MessageHandler → UI Updates
```

### 3. **Tool Execution Flow**
```
Server Tool Request → ToolHandler → Execute Client Tool → 
Send Result → Continue Chat Flow
```

### 4. **Reconnection Flow**
```
Connection Lost → Attempt Reconnect → Exponential Backoff → 
Connection Restored → Resume Normal Operation
```

## Message Types

### Inbound Messages
- `SESSION_ESTABLISHED`: Connection ready
- `CHAT_EVENT`: Text deltas, reasoning updates
- `TOOL_CALL_REQUEST`: Execute client tools
- `ERROR`: Error notifications

### Outbound Messages
- `CHAT_MESSAGE`: User input with context
- `CONFIGURE_TOOLS`: Tool schema configuration
- `TOOL_CALL_RESPONSE`: Tool execution results
- `HEARTBEAT_PONG`: Connection keep-alive

## Event System

### System Events
Generated for connection and chat lifecycle events:
- Connection: `ESTABLISHED`, `LOST`, `RESTORED`, `RECONNECTING`
- Chat: `COMPLETED`, `ERROR`

### Chat Event Handlers
- `onSetMessage`: Text content updates
- `onReasoningUpdate`: AI reasoning visibility
- `onSystemEvent`: System notifications

## Configuration

### Connection Config
```typescript
{
  apiUrl: string;           // WebSocket server URL
  userId?: string;          // User identification
  reconnectDelay: number;   // Initial reconnection delay
  maxReconnectAttempts: number; // Max reconnection tries
  heartbeatInterval: number; // Keep-alive interval
}
```

### Client Props
```typescript
{
  toolSchemas: any[];       // Available tool definitions
  contextHelpers: object;   // Context for tool execution
  clientTools: object;      // Executable client functions
  onSetMessage: function;   // Content update handler
  onReasoningUpdate: function; // Reasoning handler
  onSystemEvent: function;  // System event handler
}
```

### Message Parameters
```typescript
interface TriggerMessageParams {
  message: string;          // Message content
  app?: string;            // Application context (default: "UD21")
  media?: string[];        // Media file attachments
  convUuid?: string;       // Conversation UUID
  agentPromptPath?: string; // Agent prompt configuration path
}
```

## Error Handling

### Connection Errors
- Automatic reconnection with exponential backoff
- Maximum attempt limits to prevent infinite loops
- Browser visibility-based reconnection triggers

### Message Errors
- Graceful JSON parsing error handling
- Tool execution error capture and reporting
- Error propagation through system events

### Tool Execution Errors
- Safe execution with try-catch wrapping
- Error details sent back to server
- Continued operation despite tool failures

## Best Practices

### For Developers
1. **Always check connection status** before sending messages
2. **Handle system events** to provide user feedback
3. **Register tools early** in the initialization process
4. **Implement proper error boundaries** in tool functions
5. **Use the factory classes** for message creation

### For Tool Development
1. **Keep tools stateless** where possible
2. **Handle errors gracefully** within tool functions
3. **Return structured data** from tool executions
4. **Avoid long-running operations** in tools
5. **Use contextHelpers** for shared state

## Usage Examples

### Basic Client Setup
```typescript
const client = new WebSocketChatClient();
await client.onInit({
  // Authentication (required for ticket request)
  userMpAuthToken: 'your-auth-token',
  chatServerKey: 'your-server-key', 
  userId: 'user123',
  
  // WebSocket server
  chatServerUrl: 'wss://localhost:8080',
  
  // Optional entity configuration
  entityId: 'brand-123',
  entityType: 'BRAND',
  
  // Tool configuration
  toolSchemas: [/* tool schemas */],
  clientTools: { /* tool implementations */ },
  
  // Event handlers
  onSetMessage: (content) => updateUI(content),
  onSystemEvent: (event) => handleSystemEvent(event),
  onReasoningUpdate: (isThinking, content) => updateReasoning(isThinking, content)
});
```

**Note:** The client automatically:
1. Requests a WebSocket ticket using the provided authentication
2. Connects to WebSocket with ticket in URL for immediate authentication
3. Handles ticket refresh and reconnection automatically

### Sending Messages
```typescript
await client.onTriggerMessage({
  message: 'Hello!',
  app: 'UD21',
  media: [], // media files
  convUuid: 'conv-uuid',
  agentPromptPath: 'agent-prompt-path'
});
```

### Adding Client Tools
```typescript
client.addClientTools(
  { 
    myTool: (params) => ({ result: 'success' })
  },
  [/* tool schemas */]
);
```

## File References

- Main Client: `src/client/WebSocketChatClient.ts:14`
- Connection Manager: `src/client/connection/WebSocketManager.ts:10`
- Message Handler: `src/client/handlers/MessageHandler.ts:14`
- Tool Handler: `src/client/handlers/ToolHandler.ts`
- Message Factory: `src/client/utils/messageFactory.ts:14`
- Event Factory: `src/client/utils/eventFactory.ts:7`

This system provides a robust, scalable foundation for real-time chat applications with tool integration and comprehensive error handling.