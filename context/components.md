# Domain: React Components & UI

## Overview
Modular React component library for embedding a chat UI. `ChatWrapper` is the root; all others are composable children or sub-components.

## Key Files
| File | Purpose |
|------|---------|
| `src/components/ChatWrapper.tsx` | Main orchestrator — wires WebSocket, state, and all sub-components |
| `src/components/ChatInput.tsx` | Text input with file upload, send button, markdown awareness |
| `src/components/ToolingHandle.tsx` | Visualizes tool execution (progress, result, errors) |
| `src/components/MessageItem.tsx` | Renders a single message — supports markdown, tool calls, images |
| `src/components/PromptInput.tsx` | Advanced input with suggestions and slot injection |
| `src/components/SuggestedPrompts.tsx` | Initial prompt chip list (shown when conversation is empty) |
| `src/components/Reasoning.tsx` | Collapsible reasoning/thinking block |
| `src/components/ConnectionNotification.tsx` | Banner for connection status changes |
| `src/components/ImagePreviewModal.tsx` | Lightbox for generated/uploaded images |
| `src/components/AnimatedPlaceholder.tsx` | Cycling placeholder text in input |
| `src/components/chat/ChatHeader.tsx` | Top header with title and controls |
| `src/components/chat/ChatContent.tsx` | Scrollable message list container |
| `src/components/chat/ChatBubbleButton.tsx` | Floating trigger button |
| `src/components/error/ChatErrorBoundary.tsx` | Top-level error boundary |
| `src/components/error/WebSocketErrorBoundary.tsx` | Isolates WS errors from UI |
| `src/components/error/FileUploadErrorBoundary.tsx` | Isolates upload errors |
| `src/styles/chat-wrapper.css` | All component styles (BEM-like class names) |

## Component Hierarchy
```
ChatBubbleButton (trigger)
└── ChatWrapper (root)
    ├── ChatHeader
    ├── ChatContent
    │   ├── SuggestedPrompts (empty state)
    │   └── MessageItem[]
    │       ├── Reasoning (collapsible)
    │       └── ToolingHandle
    ├── ConnectionNotification
    └── ChatInput (or PromptInput)
        └── AnimatedPlaceholder
```

## Prop Patterns
- `ChatWrapper` accepts `ChatWrapperProps` (see `src/types/index.ts`): `config`, `onMessage`, `onError`, `onConnectionChange`
- Most sub-components read from Zustand store directly — **avoid passing store values as props**
- `ToolingHandle` receives tool execution data via store (`messagesSlice`)

## Styling Conventions
- All styles in `src/styles/chat-wrapper.css`
- Class prefix: `oddle-chat-*`
- CSS variables for theming: `--oddle-primary`, `--oddle-bg`, etc.
- No CSS modules — single flat stylesheet to keep consumer overrides simple

## Error Boundary Strategy
- `WebSocketErrorBoundary` wraps the entire chat — catches WS-level crashes
- `FileUploadErrorBoundary` wraps only the upload area — file errors don't kill chat
- `ChatErrorBoundary` is the outermost catch-all

## Key Patterns
- Components subscribe to Zustand slices via selector hooks — re-render only on slice changes
- `MessageItem` is pure for rendering; all side effects live in hooks
- `ToolingHandle` is the most complex component (42KB) — houses tool state machine

## Gotchas
- `ChatWrapper` mounts the WebSocket connection; don't nest multiple instances
- `AnimatedPlaceholder` uses `requestAnimationFrame` — unmount cleanly or you'll leak timers
- `MessageItem` renders user-provided HTML via `DOMPurify` — don't disable sanitization
- Fullscreen mode changes layout via CSS class toggling, not portals

## Branch Patterns → This Domain
`feature/ui-*`, `feature/component-*`, `fix/ui-*`, `fix/component-*`, `feat/chat-*`
