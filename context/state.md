# Domain: State Management (Zustand)

## Overview
Global state via Zustand with DevTools. State is split into domain slices, composed into a single `uiStore`. Components use selector hooks — never the raw store object.

## Key Files
| File | Purpose |
|------|---------|
| `src/store/uiStore.ts` | Root store — composes all slices with devtools middleware |
| `src/store/slices/layoutSlice.ts` | Modal open/close, collapse/expand, fullscreen toggle |
| `src/store/slices/chatSlice.ts` | Chat status (idle/active/error), streaming status |
| `src/store/slices/conversationSlice.ts` | Conversation loading state, load errors |
| `src/store/slices/threadSlice.ts` | Current thread ID, provider resource ID |
| `src/store/slices/messagesSlice.ts` | Streaming flags, tool execution state, thinking flag |
| `src/store/index.ts` | Re-exports all hooks and types |
| `src/hooks/useUIState.ts` | Legacy wrapper hook (kept for backwards compat) |

## Slice Responsibilities
```
layoutSlice   — isOpen, isCollapsed, isFullscreen
chatSlice     — chatStatus (ChatStatus enum), streamingStatus (StreamingStatus enum)
conversation  — isLoading, error, conversationId
threadSlice   — threadId, providerResourceId
messagesSlice — isStreaming, isThinking, activeToolCalls[], pendingToolResults[]
```

## How to Add State
1. Add the field + action to the relevant slice (`src/store/slices/*.ts`)
2. Export a selector hook from that slice
3. Re-export from `src/store/index.ts`
4. Never import slice internals directly in components

## Selector Hook Pattern
```ts
// In slice file:
export const useChatStatus = () => useUIStore((s) => s.chatStatus);

// In component:
const chatStatus = useChatStatus();
```

## ChatStatus Enum (`src/constants/chatStatus.ts`)
- `IDLE` — no active session
- `CONNECTING` — WebSocket connecting
- `ACTIVE` — connected and ready
- `STREAMING` — receiving streamed response
- `ERROR` — error state

## StreamingStatus Values
- `IDLE`, `STREAMING`, `COMPLETE`, `ERROR`

## Devtools
- Store is wrapped with Zustand `devtools` middleware
- Store name in DevTools: `oddle-chat-ui`
- Visible in Redux DevTools browser extension

## Gotchas
- `messagesSlice` is the hottest slice — updated on every streaming chunk; keep selectors narrow
- Don't store derived state — compute in selectors or `useMemo`
- `uiStore.ts` imports all slices — circular import risk if slices import from uiStore
- Reset: calling `resetStore()` clears all slices; used when the chat widget closes/unmounts

## Branch Patterns → This Domain
`feature/state-*`, `fix/state-*`, `refactor/store-*`, `refactor/slice-*`
