# Domain: HTTP API Integration

## Overview
Thin HTTP client utilities for three backend services: ticket issuance, thread management, and agent configuration. No shared HTTP client — each utility is a standalone `fetch` wrapper.

## Key Files
| File | Purpose |
|------|---------|
| `src/utils/websocketTicketApi.ts` | Fetch/renew a short-lived WebSocket auth ticket |
| `src/utils/threadApi.ts` | Load thread messages; update thread metadata |
| `src/utils/agentConfigApi.ts` | Fetch agent configuration (name, avatar, prompts) |
| `src/utils/errorClassification.ts` | Maps HTTP errors to typed `ChatError` objects |
| `src/utils/chatUtils.ts` | Shared helpers: URL building, header construction |
| `src/utils/security.ts` | Sanitizes any user-supplied URLs/headers before requests |

## API Surface

### Ticket API (`websocketTicketApi.ts`)
```ts
fetchWebSocketTicket(config: AuthConfig): Promise<{ ticket: string; expiresAt: number }>
renewWebSocketTicket(config: AuthConfig, oldTicket: string): Promise<{ ticket: string; expiresAt: number }>
```
- Called by `TicketManager` — not called directly by components
- `AuthConfig` contains `apiBase`, `entityId`, `entityType`, `authToken`

### Thread API (`threadApi.ts`)
```ts
fetchThreadMessages(threadId: string, config: ChatConfig): Promise<Message[]>
updateThread(threadId: string, data: Partial<Thread>, config: ChatConfig): Promise<void>
updateThreadMetadata(threadId: string, metadata: Record<string, unknown>, config: ChatConfig): Promise<void>
```
- `fetchThreadMessages` is called by `useConversationLoader` hook on mount
- `updateThreadMetadata` is called by `useMetadataSync` hook after each message

### Agent Config API (`agentConfigApi.ts`)
```ts
fetchAgentConfig(config: ChatConfig): Promise<AgentConfig>
```
- Called once on widget mount to load agent name, welcome message, suggested prompts

## Auth Pattern
- All requests include `Authorization: Bearer <authToken>` header
- `entityId` + `entityType` identify the resource (e.g., merchant, order)
- API base URL comes from `ChatConfig.apiBase`

## Error Handling
- `errorClassification.ts` maps HTTP status codes to `ChatError` types:
  - `401` → `AUTH_ERROR`
  - `404` → `NOT_FOUND`
  - `429` → `RATE_LIMIT`
  - `5xx` → `SERVER_ERROR`
  - Network failure → `NETWORK_ERROR`
- Errors bubble to `conversationSlice.error` in the store

## Gotchas
- No request deduplication — calling `fetchThreadMessages` twice concurrently creates a race; guard with loading state
- `updateThreadMetadata` is fire-and-forget (no await in the hook) — failures are logged but don't surface to UI
- No retry logic in HTTP utils — retries are the caller's responsibility
- Security: `security.ts` strips unknown headers and validates URL scheme before any request

## Branch Patterns → This Domain
`feature/api-*`, `fix/api-*`, `feature/thread-*`, `fix/thread-*`, `fix/ticket-*`
