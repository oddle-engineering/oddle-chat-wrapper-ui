# Domain: TypeScript Types & Contracts

## Overview
Shared type definitions used across components, store, client, and public API. Two type namespaces: public-facing (`src/types/`) and WebSocket-internal (`src/client/types/`).

## Key Files
| File | Purpose |
|------|---------|
| `src/types/index.ts` | Public types — props, config, messages, enums |
| `src/types/json.d.ts` | `JSONValue` utility type declaration |
| `src/client/types/inboundMessages.ts` | Server → client WebSocket message shapes |
| `src/client/types/outboundMessages.ts` | Client → server WebSocket message shapes |
| `src/client/types/events.ts` | Chat event union types |
| `src/client/types/systemEvents.ts` | System/lifecycle event types |
| `src/client/types/connection.ts` | Connection state and config types |
| `src/client/types/shared.ts` | Types shared across inbound/outbound |
| `src/client/types/index.ts` | Re-exports all client types |

## Core Public Types (`src/types/index.ts`)

### Configuration
```ts
interface ChatConfig {
  apiBase: string;
  entityId: string;
  entityType: EntityType;
  authToken: string;
  maxReconnectAttempts?: number;
  locale?: string;
}

interface AuthConfig {
  apiBase: string;
  entityId: string;
  entityType: EntityType;
  authToken: string;
}
```

### Messages
```ts
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string | MessageContent[];
  timestamp: number;
  toolCalls?: ToolCall[];
  reasoning?: string;
}

interface MessageContent {
  type: 'text' | 'image' | 'tool_use' | 'tool_result';
  // ...varies by type
}
```

### Enums
```ts
enum EntityType { MERCHANT = 'merchant', ORDER = 'order', /* ... */ }
enum AuthTokenType { BEARER = 'bearer', API_KEY = 'api_key' }
enum ChatMode { BUBBLE = 'bubble', INLINE = 'inline', FULLSCREEN = 'fullscreen' }
```

### Props
```ts
interface ChatWrapperProps {
  config: ChatConfig;
  onMessage?: (message: Message) => void;
  onError?: (error: ChatError) => void;
  onConnectionChange?: (state: ConnectionState) => void;
  children?: ReactNode;
}
```

## Client-Side Types (`src/client/types/`)

### Inbound (Server → Client)
```ts
type InboundMessage =
  | MessageChunkEvent
  | MessageCompleteEvent
  | ToolCallStartEvent
  | ToolCallResultEvent
  | ReasoningChunkEvent
  | ErrorEvent;
```

### Outbound (Client → Server)
```ts
type OutboundMessage =
  | UserMessageEvent
  | CancelStreamEvent;
```

## Export API
All public types are re-exported from `src/index.ts`. Internal types in `src/client/types/` are **not** exported to consumers.

## Type Guards Pattern
```ts
// Used in handlers to narrow InboundMessage union
function isMessageChunkEvent(msg: InboundMessage): msg is MessageChunkEvent {
  return msg.type === 'message_chunk';
}
```

## Gotchas
- `MessageContent` is a discriminated union on `type` — always use type guards, not casts
- `EntityType` enum values must match server API exactly — changing them is a breaking change
- `src/client/types/shared.ts` is imported by both inbound and outbound — keep it free of circular deps
- Don't export client-internal types from `src/index.ts` — they're unstable API surface

## Branch Patterns → This Domain
`feature/types-*`, `fix/types-*`, `refactor/types-*`
