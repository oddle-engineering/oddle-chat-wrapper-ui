# WebSocket Disconnection and Message Sending Issue Analysis

**Date**: November 4, 2025  
**Issue**: When server shuts down → client loses connection → user tries to send message → message cannot be sent

---

## 🔴 Problem Description

### Current Flow

1. **Server Running** → `isConnected = true`
2. **Server Shuts Down** → WebSocket closes
3. **Connection Monitor Updates** → `isConnected = false` (after 1 second polling)
4. **User Tries to Send Message** → `canSubmit()` returns `false`
5. **Message Silently Fails** → No user feedback, no reconnection attempt

### Root Causes

#### 1. **Silent Failure - No User Feedback**
```typescript
// ChatWrapper.tsx - handleSubmit
if (!chatSubmissionService?.canSubmit(message, isStreaming, isConnected)) {
  return; // ❌ Silently fails - user doesn't know why
}
```

**Impact**: User has no idea the message wasn't sent. The input remains filled but nothing happens.

#### 2. **No Automatic Reconnection on Message Attempt**
```typescript
// ChatSubmissionService.ts - canSubmit
canSubmit(message: string, isStreaming: boolean, isConnected: boolean): boolean {
  return !!(
    message.trim() &&
    !isStreaming &&
    this.chatClient &&
    isConnected  // ❌ Just checks, doesn't trigger reconnection
  );
}
```

**Impact**: Even if user waits, they need to manually refresh the page to reconnect.

#### 3. **Reconnection Only on WebSocket Events**
```typescript
// WebSocketManager.ts - handleConnectionClosed
private handleConnectionClosed(event: CloseEvent): void {
  this.processConnectionClosure(event);
  this.onClose?.(event);

  if (this.shouldReconnectAfterClose(event.code)) {
    this.attemptReconnect(); // ✅ Automatic reconnect
  }
}
```

**Good**: Reconnects when WebSocket closes.  
**Problem**: If reconnection fails or max attempts reached, user is stuck.

#### 4. **Max Reconnection Attempts Blocks Further Tries**
```typescript
// WebSocketManager.ts - attemptReconnect
private attemptReconnect(): void {
  if (
    this.connectionState.isReconnecting ||
    this.connectionState.reconnectAttempts >= this.config.maxReconnectAttempts // ❌ Gives up
  ) {
    if (this.connectionState.reconnectAttempts >= this.config.maxReconnectAttempts) {
      this.onSystemEvent?.(
        SystemEventFactory.connectionLost("Max reconnection attempts reached")
      );
    }
    return; // ❌ No more attempts allowed
  }
  // ...
}
```

**Impact**: After max attempts (default 5), system never tries to reconnect again, even if user tries to send a message.

---

## 🎯 Recommended Solutions

### Solution 1: Show User Feedback When Disconnected ⭐ **CRITICAL**

**Priority**: HIGH  
**Effort**: Low  
**Impact**: Immediate UX improvement

```typescript
// ChatWrapper.tsx - handleSubmit
const handleSubmit = useCallback(
  async (message: string, media?: string[]) => {
    // Check connection and provide feedback
    if (!isConnected) {
      addMessage(
        "system",
        "⚠️ Connection lost. Attempting to reconnect..."
      );
      
      // Trigger manual reconnection attempt
      if (chatClient) {
        try {
          await chatClient.refreshTicketAndReconnect();
          // After reconnection, retry submission
          // (continue with submission logic)
        } catch (error) {
          addMessage(
            "system",
            "❌ Could not reconnect. Please check your internet connection and try again."
          );
          return;
        }
      } else {
        addMessage(
          "system",
          "❌ Chat client not initialized. Please refresh the page."
        );
        return;
      }
    }

    // Early validation using service
    if (!chatSubmissionService?.canSubmit(message, isStreaming, isConnected)) {
      return;
    }

    // ... rest of submission logic
  },
  [chatSubmissionService, isStreaming, isConnected, addMessage, chatClient]
);
```

**Benefits**:
- ✅ User knows why message failed
- ✅ System automatically tries to reconnect
- ✅ Clear error messages guide user action

---

### Solution 2: Auto-Reconnect on Message Attempt ⭐ **RECOMMENDED**

**Priority**: HIGH  
**Effort**: Medium  
**Impact**: Seamless user experience

```typescript
// ChatSubmissionService.ts
export class ChatSubmissionService {
  private config: ChatSubmissionConfig;
  private chatClient: WebSocketChatClient;
  private onReconnectAttempt?: () => void;
  private onReconnectSuccess?: () => void;
  private onReconnectFailure?: (error: Error) => void;

  constructor(
    chatClient: WebSocketChatClient,
    config: ChatSubmissionConfig & {
      onReconnectAttempt?: () => void;
      onReconnectSuccess?: () => void;
      onReconnectFailure?: (error: Error) => void;
    } = {}
  ) {
    this.chatClient = chatClient;
    this.config = config;
    this.onReconnectAttempt = config.onReconnectAttempt;
    this.onReconnectSuccess = config.onReconnectSuccess;
    this.onReconnectFailure = config.onReconnectFailure;
  }

  /**
   * Validates if a message can be submitted
   * If disconnected, attempts to reconnect
   */
  async canSubmitWithReconnect(
    message: string,
    isStreaming: boolean,
    isConnected: boolean
  ): Promise<{ canSubmit: boolean; reconnected?: boolean; error?: Error }> {
    // Basic validation
    if (!message.trim() || isStreaming || !this.chatClient) {
      return { canSubmit: false };
    }

    // If connected, allow submission
    if (isConnected) {
      return { canSubmit: true };
    }

    // If disconnected, attempt to reconnect
    this.onReconnectAttempt?.();

    try {
      await this.chatClient.refreshTicketAndReconnect();
      this.onReconnectSuccess?.();
      return { canSubmit: true, reconnected: true };
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Reconnection failed");
      this.onReconnectFailure?.(err);
      return { canSubmit: false, error: err };
    }
  }
}
```

**Usage in ChatWrapper**:
```typescript
const handleSubmit = useCallback(
  async (message: string, media?: string[]) => {
    // Check if can submit (with auto-reconnect)
    const { canSubmit, reconnected, error } = 
      await chatSubmissionService.canSubmitWithReconnect(
        message,
        isStreaming,
        isConnected
      );

    if (!canSubmit) {
      if (error) {
        addMessage(
          "system",
          `❌ Could not send message: ${error.message}. Please try again.`
        );
      }
      return;
    }

    if (reconnected) {
      addMessage("system", "✅ Reconnected successfully. Sending your message...");
    }

    // Continue with submission...
  },
  [chatSubmissionService, isStreaming, isConnected, addMessage]
);
```

**Benefits**:
- ✅ Seamless reconnection on message attempt
- ✅ Clear user feedback
- ✅ Works even after max reconnect attempts reached
- ✅ Handles offline → online transitions

---

### Solution 3: Reset Reconnection Attempts on User Action

**Priority**: MEDIUM  
**Effort**: Low  
**Impact**: Allows retry after max attempts reached

```typescript
// WebSocketManager.ts
/**
 * Reset reconnection attempts (for manual retry)
 */
resetReconnectionAttempts(): void {
  this.connectionState.resetReconnectAttempts();
  this.connectionState.updateReconnectDelay(this.config.reconnectDelay);
}

/**
 * Manually trigger reconnection (resets attempts counter)
 */
async manualReconnect(): Promise<void> {
  this.resetReconnectionAttempts();
  return this.reconnect();
}
```

**Usage**:
```typescript
// When user tries to send message after max attempts reached
if (reconnectAttempts >= maxReconnectAttempts) {
  wsManager.resetReconnectionAttempts();
  await wsManager.manualReconnect();
}
```

---

### Solution 4: Show Connection Status Indicator in UI

**Priority**: MEDIUM  
**Effort**: Medium  
**Impact**: Better user awareness

```tsx
// New component: ConnectionStatusIndicator.tsx
export function ConnectionStatusIndicator({ 
  isConnected, 
  isReconnecting,
  reconnectAttempts,
  maxAttempts 
}: Props) {
  if (isConnected) {
    return <div className="status-connected">🟢 Connected</div>;
  }

  if (isReconnecting) {
    return (
      <div className="status-reconnecting">
        🟡 Reconnecting... (Attempt {reconnectAttempts}/{maxAttempts})
      </div>
    );
  }

  return (
    <div className="status-disconnected">
      🔴 Disconnected - <button onClick={handleReconnect}>Retry</button>
    </div>
  );
}
```

**Benefits**:
- ✅ User always knows connection status
- ✅ Can manually retry connection
- ✅ Shows progress during reconnection

---

### Solution 5: Queue Messages When Disconnected

**Priority**: LOW (Nice to have)  
**Effort**: HIGH  
**Impact**: Never lose user messages

```typescript
// MessageQueueService.ts
export class MessageQueueService {
  private queue: QueuedMessage[] = [];
  
  async queueMessage(message: Message): Promise<void> {
    this.queue.push({
      message,
      timestamp: Date.now(),
      retries: 0,
    });
    
    // Save to localStorage for persistence
    localStorage.setItem('messageQueue', JSON.stringify(this.queue));
  }
  
  async processQueue(submitFn: (msg: Message) => Promise<void>): Promise<void> {
    while (this.queue.length > 0) {
      const item = this.queue[0];
      try {
        await submitFn(item.message);
        this.queue.shift(); // Remove from queue
      } catch (error) {
        item.retries++;
        if (item.retries >= 3) {
          this.queue.shift(); // Give up after 3 retries
        }
        break; // Stop processing on error
      }
    }
    
    localStorage.setItem('messageQueue', JSON.stringify(this.queue));
  }
}
```

**Benefits**:
- ✅ Messages never lost
- ✅ Automatically sent when connection restored
- ✅ Survives page refresh

---

## 📊 Implementation Priority

| Solution | Priority | Effort | User Impact | Implementation Order |
|----------|----------|--------|-------------|---------------------|
| **#1: User Feedback** | 🔴 HIGH | Low | High | 1st |
| **#2: Auto-Reconnect** | 🔴 HIGH | Medium | Very High | 2nd |
| **#3: Reset Attempts** | 🟡 MEDIUM | Low | Medium | 3rd |
| **#4: Status Indicator** | 🟡 MEDIUM | Medium | Medium | 4th |
| **#5: Message Queue** | 🟢 LOW | High | Low | 5th (optional) |

---

## 🚀 Recommended Implementation Plan

### Phase 1: Quick Fixes (Week 1)
1. ✅ Add user feedback messages when disconnected
2. ✅ Show connection status in UI
3. ✅ Reset reconnection attempts on manual retry

### Phase 2: Auto-Reconnection (Week 2)
4. ✅ Implement `canSubmitWithReconnect()` method
5. ✅ Update ChatWrapper to use auto-reconnect
6. ✅ Add retry button in UI

### Phase 3: Advanced Features (Optional)
7. ⚪ Implement message queue
8. ⚪ Add offline detection
9. ⚪ Persist pending messages

---

## 🧪 Testing Scenarios

### Test Case 1: Server Shutdown During Active Session
1. Start server and connect
2. Send a few messages (should work)
3. Stop server
4. Wait 2 seconds
5. Try to send message
6. **Expected**: Error message shown, reconnection attempted
7. Restart server
8. **Expected**: Reconnection succeeds, message sent

### Test Case 2: Max Reconnect Attempts Reached
1. Stop server
2. Try to connect (should fail and retry 5 times)
3. Wait for max attempts message
4. Restart server
5. Try to send message
6. **Expected**: Manual reconnection triggered, message sent

### Test Case 3: Network Flicker
1. Send message
2. Disconnect network mid-stream
3. **Expected**: Error shown, queued for retry
4. Reconnect network
5. **Expected**: Message automatically sent from queue

---

## 📝 Code Changes Summary

### Files to Modify

1. **`src/services/chatSubmissionService.ts`**
   - Add `canSubmitWithReconnect()` method
   - Add reconnection callbacks

2. **`src/components/ChatWrapper.tsx`**
   - Update `handleSubmit` with reconnection logic
   - Add user feedback messages

3. **`src/client/connection/WebSocketManager.ts`**
   - Add `resetReconnectionAttempts()` method
   - Add `manualReconnect()` method

4. **`src/components/ConnectionStatusIndicator.tsx`** (new)
   - Create connection status UI component

5. **`src/hooks/useWebSocketConnection.ts`**
   - Expose reconnection methods
   - Expose connection status details

---

## ✅ Expected Outcomes

After implementing these solutions:

✅ **User Experience**
- Clear feedback when disconnected
- Automatic reconnection on message attempt
- No silent failures
- Visual connection status

✅ **Reliability**
- Messages sent even after network interruption
- Graceful handling of server restarts
- Recovery from max reconnect attempts

✅ **Developer Experience**
- Clear separation of concerns
- Testable reconnection logic
- Easy to debug connection issues

---

## 🎯 Conclusion

The current issue stems from **lack of user feedback** and **no reconnection on user action**. The recommended solution is to implement **auto-reconnection on message submission** combined with **clear user feedback**.

This provides the best user experience with moderate implementation effort.
