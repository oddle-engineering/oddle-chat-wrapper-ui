# Modal WebSocket Connection Issues - Fixed

## Issues Description

### Issue 1: Continuous Connection Creation on Modal Reopen
When opening a modal chat → sending a message → closing the modal → reopening the modal, the WebSocket would continuously create new connections, leading to a connection leak.

### Issue 2: Invalid Ticket on Reconnection
After closing the ChatWrapper, the ticket was cleared but the WebSocket reconnection logic attempted to reconnect using the expired/invalid ticket, causing server errors:
```
[09:57:25] WARN: Invalid ticket provided for connection
[09:57:26] WARN: Invalid ticket provided for connection
```

## Root Causes

### Cause 1: Unstable Callback Dependencies
The issue was in `useWebSocketConnection.ts`:

1. **Callback Dependencies in useCallback**: The `connectChatClient` function included `onSetMessage`, `onSystemEvent`, and `onReasoningUpdate` in its dependency array
2. **Handler Recreation**: These handlers, while wrapped in `useCallback` in `useMessageHandlers.ts`, had their own dependencies that could change on renders
3. **useEffect Trigger**: When these handlers changed, `connectChatClient` was recreated, triggering the `useEffect` with `[connectChatClient, disconnectChatClient]` dependencies
4. **Continuous Reconnection**: Each time the modal reopened, the component remounted, handlers were recreated with fresh closures, causing a new connection without properly cleaning up the old one

### Cause 2: Reconnection on Intentional Disconnect
The issue was in `WebSocketManager.ts`:

1. **Missing Close Code**: The `disconnect()` method called `ws.close()` without specifying a close code
2. **Default Close Behavior**: Without a code, the browser uses a default code that isn't `NORMAL (1000)` or `GOING_AWAY (1001)`
3. **Reconnection Triggered**: The `shouldReconnectAfterClose()` function saw a non-normal close code and triggered auto-reconnection
4. **Invalid Ticket**: The reconnection used the cached `currentTicket` which was already cleared by `ticketManager.clear()`

## Solutions

### Solution 1: Use Refs for Callbacks

**Use refs to store callback handlers** instead of including them in `useCallback` dependencies.

**File**: `src/hooks/useWebSocketConnection.ts`

1. **Added refs for callbacks**:
```typescript
// Use refs to store callbacks to prevent reconnections when they change
const onSetMessageRef = useRef(onSetMessage);
const onSystemEventRef = useRef(onSystemEvent);
const onReasoningUpdateRef = useRef(onReasoningUpdate);

// Keep refs up to date
useEffect(() => {
  onSetMessageRef.current = onSetMessage;
  onSystemEventRef.current = onSystemEvent;
  onReasoningUpdateRef.current = onReasoningUpdate;
}, [onSetMessage, onSystemEvent, onReasoningUpdate]);
```

2. **Updated connectChatClient to use refs**:
```typescript
await client.onInit({
  // ... other props
  onSetMessage: onSetMessageRef.current,
  onSystemEvent: onSystemEventRef.current,
  onReasoningUpdate: onReasoningUpdateRef.current,
});
```

3. **Removed callbacks from useCallback dependencies**:
```typescript
}, [
  userMpAuthToken,
  chatServerUrl,
  chatServerKey,
  providerResId,
  userId,
  entityId,
  entityType,
  toolSchemas,
  clientToolExecutors,
  contextHelpers,
  // Removed: onSetMessage, onSystemEvent, onReasoningUpdate
]);
```

### Solution 2: Prevent Reconnection on Intentional Disconnect

**Track intentional disconnects and close with proper code** to prevent auto-reconnection.

**File**: `src/client/connection/WebSocketManager.ts`

1. **Added intentional disconnect flag**:
```typescript
private intentionalDisconnect: boolean = false; // Track intentional disconnects
```

2. **Updated shouldReconnectAfterClose to check flag**:
```typescript
private shouldReconnectAfterClose(closeCode: number): boolean {
  // Don't reconnect if it was an intentional disconnect
  if (this.intentionalDisconnect) {
    return false;
  }
  
  const { NORMAL, GOING_AWAY } = WEBSOCKET_CLOSE_CODES;
  return closeCode !== NORMAL && closeCode !== GOING_AWAY;
}
```

3. **Updated disconnect to set flag and use NORMAL close code**:
```typescript
private closeConnection(): void {
  if (this.ws) {
    // Close with NORMAL code (1000) to prevent reconnection
    this.ws.close(WEBSOCKET_CLOSE_CODES.NORMAL);
  }
}

disconnect(): void {
  this.intentionalDisconnect = true; // Mark as intentional disconnect
  this.clearTimers();
  this.removeEventListeners();
  this.closeConnection();
  this.connectionState.reset();
  this.ws = null;
}
```

4. **Reset flag when connecting**:
```typescript
connect(ticket?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      this.intentionalDisconnect = false; // Reset flag when connecting
      // ... rest of connection logic
    }
  });
}
```

## How It Works

### Before (Problematic Flow - Issue 1)
```
Modal Opens
  → ChatWrapper mounts
  → Handlers created with useCallback (fresh closures)
  → connectChatClient recreated (handlers in deps)
  → useEffect runs → WebSocket connects

Modal Closes
  → ChatWrapper unmounts
  → Cleanup runs → disconnect

Modal Reopens
  → NEW ChatWrapper instance
  → NEW handlers (different references)
  → NEW connectChatClient (deps changed)
  → useEffect runs AGAIN
  → Creates ANOTHER connection (old one leaked)
```

### Before (Problematic Flow - Issue 2)
```
Modal Closes
  → disconnect() called
  → ticketManager.clear() → ticket = null
  → ws.close() → (no close code specified)
  → Browser uses default close code (not 1000/1001)
  → onclose handler fires
  → shouldReconnectAfterClose(code) → returns true (code !== NORMAL)
  → attemptReconnect() triggered
  → reconnect() uses cached currentTicket (expired)
  → Server rejects with "Invalid ticket"
```

### After (Fixed Flow)
```
Modal Opens
  → ChatWrapper mounts
  → Handlers created
  → Refs updated with current handlers
  → connectChatClient stable (no handler deps)
  → intentionalDisconnect = false
  → useEffect runs → WebSocket connects with valid ticket

Modal Closes
  → ChatWrapper unmounts
  → Cleanup runs → disconnectChatClient()
  → intentionalDisconnect = true
  → ticketManager.clear()
  → ws.close(WEBSOCKET_CLOSE_CODES.NORMAL) → code 1000
  → onclose handler fires
  → shouldReconnectAfterClose(1000) → returns false (intentional disconnect)
  → No reconnection attempted

Modal Reopens
  → NEW ChatWrapper instance
  → NEW handlers
  → Refs updated with NEW handlers
  → connectChatClient SAME (stable reference)
  → intentionalDisconnect = false
  → useEffect runs → NEW client created
  → ticketManager.getValidTicket() → requests FRESH ticket
  → Single new connection with valid ticket
  → Old connection properly cleaned up, no reconnection
```

## Benefits

1. **Stable Connection Lifecycle**: `connectChatClient` only recreates when authentication or configuration changes, not when handlers change
2. **Proper Cleanup**: Modal unmounting properly disconnects without leaving orphaned connections
3. **Fresh Handlers**: The refs pattern ensures the latest handler functions are always used while maintaining stable callback references
4. **Performance**: Prevents unnecessary reconnections that waste resources
5. **No Invalid Tickets**: Intentional disconnects prevent reconnection attempts with expired tickets
6. **Clean Server Logs**: Eliminates "Invalid ticket provided for connection" warnings

## Testing

### Manual Test Steps

1. **Open Modal Chat**: Click "Open Modal Chat" button
2. **Send Message**: Type and send a message
3. **Close Modal**: Close the modal
4. **Check Server Logs**: Should NOT see "Invalid ticket" warnings
5. **Reopen Modal**: Open the modal again
6. **Check DevTools Network**: Should only see ONE new WebSocket connection, not continuous connections
7. **Send Another Message**: Verify it works with the new valid ticket

### Expected Behavior

**Before Fixes**:
- ❌ Continuous WebSocket connections created (visible in Network tab)
- ❌ Server logs showing "Invalid ticket provided for connection" errors
- ❌ Potential reconnection loops using expired tickets

**After Fixes**:
- ✅ Single WebSocket connection per modal open
- ✅ Proper cleanup on modal close (no reconnection)
- ✅ Fresh ticket requested on modal reopen
- ✅ No server warnings about invalid tickets
- ✅ Clean connection lifecycle

## Related Files

- `src/hooks/useWebSocketConnection.ts` - Connection lifecycle management (MODIFIED - callback refs)
- `src/client/connection/WebSocketManager.ts` - WebSocket connection (MODIFIED - intentional disconnect)
- `src/client/ticket/TicketManager.ts` - Ticket lifecycle management
- `src/hooks/messages/useMessageHandlers.ts` - Handler creation
- `src/components/ChatWrapper.tsx` - Main component using connection hook
- `showcase/src/App.tsx` - Demo modal implementation

## Technical Patterns

### Pattern 1: Callback Refs for Stable Dependencies
**Use refs to store callbacks that should not trigger effects:**
- When callbacks are passed to `useEffect` or `useCallback` dependencies
- But you don't want those effects to re-run when callbacks change
- Store callbacks in refs and update them separately
- Reference `callbackRef.current` in the stable function

### Pattern 2: Intentional Disconnect Flag
**Track intentional disconnects to prevent unwanted reconnections:**
- Add a boolean flag to track intentional vs. accidental disconnects
- Set flag to `true` before calling `disconnect()`
- Check flag in reconnection logic to prevent reconnection
- Reset flag to `false` when connecting
- Use proper WebSocket close codes (1000 for normal closure)

## Version

Fixed in: (Pending release)
Issue Type: Bug Fix
Impact: High - Prevents resource leaks in modal implementations
