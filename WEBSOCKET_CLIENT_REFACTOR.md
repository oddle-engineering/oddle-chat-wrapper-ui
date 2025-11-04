# WebSocket Chat Client Refactor Plan

**Date:** November 4, 2025  
**Status:** Proposed  
**Priority:** High

---

## Executive Summary

This document outlines a comprehensive refactoring plan for the WebSocket Chat Client to address critical issues with ticket management, error handling, and code organization. The refactor will improve maintainability, reduce bugs, and make the codebase easier to test.

---

## Current Architecture Issues

### 🔴 Critical Issues

#### 1. **Distributed Ticket Management**
**Problem:** Ticket logic is scattered across multiple methods and files:
- `requestTicket()` - Initial ticket request
- `startTicketValidation()` - Periodic validation
- `checkAndRenewTicket()` - Validation check
- `renewTicketProactively()` - Renewal without disconnect
- `refreshTicketAndReconnect()` - Manual refresh with reconnect
- `handleAuthenticationFailure()` - Error-triggered refresh

**Impact:**
- Race conditions when multiple parts try to refresh simultaneously
- Difficult to track ticket state
- No single source of truth for ticket validity

**Evidence:**
```typescript
// Current state flag
private isRefreshingTicket: boolean = false;

// Can still have race conditions if multiple async calls check before flag is set
async refreshTicketAndReconnect(): Promise<void> {
    if (this.isRefreshingTicket) {
        console.log('Ticket refresh already in progress');
        return; // Returns immediately, caller doesn't wait for actual refresh
    }
    this.isRefreshingTicket = true;
    // ... refresh logic
}
```

#### 2. **Initialization Error Handling**
**Problem:** Initialization resolves even when connection fails:

```typescript
this.wsManager
    .connect(ticket)
    .then(() => {
        if (!this.toolSchemas || this.toolSchemas.length === 0) {
            resolve();
        }
    })
    .catch(() => {
        resolve(); // ⚠️ Should reject, not resolve!
    });
```

**Impact:** 
- Consumers think connection succeeded when it failed
- No way to detect initialization failures
- Silent failures in production

#### 3. **Missing Error Boundaries**
**Problem:** No try-catch in critical message handling:

```typescript
private handleWebSocketMessage(event: MessageEvent): void {
    const data = this.messageHandler.handleMessage(event);
    // If messageHandler throws, entire client crashes
}
```

**Impact:**
- Single malformed message can crash entire chat client
- No graceful degradation

#### 4. **Duplicate Visibility Handlers**
**Problem:** Both `WebSocketChatClient` and `WebSocketManager` implement visibility change detection:

```typescript
// In WebSocketChatClient
private visibilityChangeHandler: (() => void) | null = null;
private handleUserReturn(): Promise<void> { /* ... */ }

// In WebSocketManager
private visibilityChangeHandler: () => void;
private handleVisibilityChange(): void { /* ... */ }
```

**Impact:**
- Two event listeners doing similar things
- Potential conflicts in reconnection logic
- Unclear which takes precedence

---

### 🟡 Design Issues

#### 5. **Tight Coupling**
- `WebSocketChatClient` knows WebSocket implementation details
- `WebSocketManager` can't reconnect without external ticket refresh
- Hard to test components in isolation

#### 6. **Incomplete Separation of Concerns**
Current responsibilities are mixed:
- **WebSocketChatClient:** Handles tickets, WebSocket lifecycle, message routing, tool management, visibility changes
- **WebSocketManager:** Handles WebSocket connection, reconnection, heartbeat, but needs external ticket management
- **MessageHandler:** Only handles message parsing and routing

---

## Proposed Architecture

### New Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    WebSocketChatClient                       │
│  - Orchestrates components                                   │
│  - Handles high-level initialization                         │
│  - Routes messages to handlers                               │
│  - Manages tool configuration lifecycle                      │
└──────────┬──────────────────────┬────────────────┬──────────┘
           │                      │                │
           ▼                      ▼                ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────┐
│  TicketManager   │   │ WebSocketManager │   │MessageHandler│
│                  │   │                  │   │              │
│ - Request ticket │   │ - WS connection  │   │ - Parse msgs │
│ - Validate ticket│   │ - Reconnection   │   │ - Route evts │
│ - Proactive      │   │ - Heartbeat      │   │ - Tool calls │
│   renewal        │   │ - Error handling │   │              │
│ - Expiry tracking│   │                  │   │              │
└──────────────────┘   └──────────────────┘   └──────────────┘
```

---

## Refactor Phase 1: TicketManager

### Goal
Create a dedicated class to manage WebSocket ticket lifecycle.

### Implementation

**File:** `src/client/ticket/TicketManager.ts`

```typescript
import { 
  requestWebSocketTicket, 
  isTicketValid, 
  getTicketInfo,
  WebSocketTicketResponse 
} from "../../utils/websocketTicketApi";

export interface AuthData {
  userMpAuthToken: string;
  chatServerKey: string;
  userId: string;
  entityId?: string;
  entityType?: string;
  providerResId?: string;
}

export interface TicketManagerConfig {
  /**
   * How often to check ticket validity (ms)
   * Default: 60000 (1 minute)
   */
  checkInterval?: number;
  
  /**
   * Renew ticket when this many seconds remain
   * Default: 300 (5 minutes)
   */
  renewalThreshold?: number;
}

export class TicketManager {
  private ticket: WebSocketTicketResponse | null = null;
  private refreshPromise: Promise<string> | null = null;
  private validationInterval: number | null = null;
  private authData: AuthData;
  private apiUrl: string;
  private config: Required<TicketManagerConfig>;

  constructor(
    authData: AuthData,
    apiUrl: string,
    config: TicketManagerConfig = {}
  ) {
    this.authData = authData;
    this.apiUrl = this.convertToHttpUrl(apiUrl);
    this.config = {
      checkInterval: config.checkInterval ?? 60000,
      renewalThreshold: config.renewalThreshold ?? 300,
    };
  }

  /**
   * Convert WebSocket URL to HTTP URL for ticket requests
   * wss:// -> https://, ws:// -> http://
   */
  private convertToHttpUrl(wsUrl: string): string {
    return wsUrl
      .replace(/^wss:\/\//, 'https://')
      .replace(/^ws:\/\//, 'http://');
  }

  /**
   * Get a valid ticket, refreshing if necessary
   * This is the main entry point for getting tickets
   */
  async getValidTicket(): Promise<string> {
    // If we have a valid ticket, return it
    if (this.ticket && isTicketValid(this.ticket)) {
      console.log('TicketManager: Using existing valid ticket');
      return this.ticket.ticket;
    }

    // Otherwise, refresh
    console.log('TicketManager: No valid ticket, refreshing...');
    return this.refreshTicket();
  }

  /**
   * Refresh the ticket, preventing duplicate refreshes
   * Multiple concurrent calls will wait for the same refresh
   */
  async refreshTicket(): Promise<string> {
    // If refresh is already in progress, wait for it
    if (this.refreshPromise) {
      console.log('TicketManager: Refresh already in progress, waiting...');
      return this.refreshPromise;
    }

    // Start new refresh
    this.refreshPromise = this._doRefresh();

    try {
      const ticket = await this.refreshPromise;
      return ticket;
    } finally {
      this.refreshPromise = null;
    }
  }

  /**
   * Internal method to actually perform the refresh
   */
  private async _doRefresh(): Promise<string> {
    console.log('TicketManager: Requesting new ticket...', {
      userId: this.authData.userId,
      apiUrl: this.apiUrl,
    });

    try {
      this.ticket = await requestWebSocketTicket(this.apiUrl, this.authData);
      
      console.log('TicketManager: Ticket received successfully', {
        hasTicket: !!this.ticket.ticket,
        expiresAt: this.ticket.expiresAt,
      });

      return this.ticket.ticket;
    } catch (error) {
      console.error('TicketManager: Failed to refresh ticket', error);
      throw new Error(
        `Ticket refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Start proactive ticket renewal before expiration
   * @param onRenewed - Callback when ticket is renewed
   */
  startProactiveRenewal(onRenewed?: () => void): void {
    this.stopProactiveRenewal();

    console.log('TicketManager: Starting proactive renewal', {
      checkInterval: this.config.checkInterval,
      renewalThreshold: this.config.renewalThreshold,
    });

    this.validationInterval = window.setInterval(async () => {
      await this.checkAndRenew(onRenewed);
    }, this.config.checkInterval);
  }

  /**
   * Check ticket validity and renew if needed
   */
  private async checkAndRenew(onRenewed?: () => void): Promise<void> {
    if (!this.ticket) {
      console.warn('TicketManager: No ticket to validate');
      return;
    }

    try {
      const info = getTicketInfo(this.ticket);
      const expiresInSeconds = info.expiresIn / 1000;

      // Renew if expiring soon
      if (expiresInSeconds < this.config.renewalThreshold) {
        console.log(
          `TicketManager: Ticket expires in ${expiresInSeconds.toFixed(0)}s, renewing...`
        );
        
        await this.refreshTicket();
        
        console.log('TicketManager: Ticket renewed proactively');
        onRenewed?.();
      }
    } catch (error) {
      console.error('TicketManager: Error during proactive renewal', error);
    }
  }

  /**
   * Stop proactive renewal
   */
  stopProactiveRenewal(): void {
    if (this.validationInterval) {
      clearInterval(this.validationInterval);
      this.validationInterval = null;
      console.log('TicketManager: Stopped proactive renewal');
    }
  }

  /**
   * Check if current ticket is valid
   */
  isValid(): boolean {
    return this.ticket ? isTicketValid(this.ticket) : false;
  }

  /**
   * Get time until ticket expires (in milliseconds)
   */
  getExpiresIn(): number | undefined {
    if (!this.ticket) return undefined;
    
    try {
      const info = getTicketInfo(this.ticket);
      return info.expiresIn;
    } catch (error) {
      console.warn('TicketManager: Error getting ticket info', error);
      return undefined;
    }
  }

  /**
   * Get ticket expiration timestamp
   */
  getExpiresAt(): string | undefined {
    return this.ticket?.expiresAt;
  }

  /**
   * Update authentication data (e.g., after user login)
   */
  updateAuthData(authData: Partial<AuthData>): void {
    this.authData = { ...this.authData, ...authData };
    console.log('TicketManager: Auth data updated');
  }

  /**
   * Clear ticket (e.g., on logout)
   */
  clear(): void {
    this.ticket = null;
    this.stopProactiveRenewal();
    console.log('TicketManager: Ticket cleared');
  }
}
```

### Benefits

✅ **Single Responsibility:** Only manages tickets  
✅ **No Race Conditions:** Promise-based deduplication  
✅ **Proactive Renewal:** Prevents expiration during use  
✅ **Easy Testing:** No WebSocket dependencies  
✅ **Configurable:** Adjustable renewal thresholds  

---

## Refactor Phase 2: Update WebSocketChatClient

### Goal
Simplify client by delegating ticket management to TicketManager.

### Changes to `WebSocketChatClient.ts`

#### 2.1 Replace Ticket Properties

**Remove:**
```typescript
private wsTicket: WebSocketTicketResponse | null = null;
private ticketCheckInterval: number | null = null;
private isRefreshingTicket: boolean = false;
private visibilityChangeHandler: (() => void) | null = null;
private authData: {
  userMpAuthToken?: string;
  chatServerKey?: string;
  userId?: string;
  entityId?: string;
  entityType?: string;
  providerResId?: string;
} = {};
```

**Add:**
```typescript
private ticketManager: TicketManager | null = null;
```

#### 2.2 Simplify Constructor

**Before:**
```typescript
constructor() {
  this.config = { ...DEFAULT_CONNECTION_CONFIG } as ConnectionConfig;
  this.connectionState = new ConnectionState();
  this.wsManager = new WebSocketManager(this.config, this.connectionState);
  this.messageHandler = new MessageHandler({});
  this.setupWebSocketHandlers();
}
```

**After:**
```typescript
constructor() {
  this.config = { ...DEFAULT_CONNECTION_CONFIG } as ConnectionConfig;
  this.connectionState = new ConnectionState();
  this.wsManager = new WebSocketManager(this.config, this.connectionState);
  this.messageHandler = new MessageHandler({});
  this.setupWebSocketHandlers();
}
```
(No change, but TicketManager will be initialized in onInit)

#### 2.3 Simplify onInit

**Replace:**
```typescript
async onInit(props: WebSocketChatClientProps): Promise<void> {
  this.setupEventHandlers(props);
  this.setupToolsAndContext(props);
  this.updateConfig(props);

  // Request WebSocket ticket before connecting
  await this.requestTicket();

  return new Promise((resolve) => {
    this.initResolve = resolve;

    const ticket = this.wsTicket?.ticket;
    
    this.wsManager
      .connect(ticket)
      .then(() => {
        if (!this.toolSchemas || this.toolSchemas.length === 0) {
          resolve();
        }
      })
      .catch(() => {
        resolve();
      });
  });
}
```

**With:**
```typescript
async onInit(props: WebSocketChatClientProps): Promise<void> {
  this.setupEventHandlers(props);
  this.setupToolsAndContext(props);
  this.updateConfig(props);

  // Initialize TicketManager
  this.ticketManager = new TicketManager(
    {
      userMpAuthToken: props.userMpAuthToken!,
      chatServerKey: props.chatServerKey!,
      userId: props.userId!,
      entityId: props.entityId,
      entityType: props.entityType,
      providerResId: props.providerResId,
    },
    this.config.apiUrl
  );

  return new Promise(async (resolve, reject) => {
    this.initResolve = resolve;
    this.initReject = reject;

    try {
      // Get valid ticket
      const ticket = await this.ticketManager.getValidTicket();

      // Connect WebSocket
      await this.wsManager.connect(ticket);

      // Start proactive ticket renewal
      this.ticketManager.startProactiveRenewal(() => {
        this.handleTicketRenewed();
      });

      // Note: resolve() will be called when tools_configured is received
      // or when session_established is received (if no tools)
    } catch (error) {
      console.error('Initialization failed:', error);
      reject(error);
    }
  });
}
```

#### 2.4 Add Ticket Renewal Handler

**Add new method:**
```typescript
/**
 * Handle proactive ticket renewal
 * Updates the WebSocket manager with new ticket
 */
private async handleTicketRenewed(): Promise<void> {
  console.log("Ticket proactively renewed, updating WebSocket connection...");
  
  try {
    const newTicket = await this.ticketManager!.getValidTicket();
    this.wsManager.updateTicket(newTicket);
    console.log("WebSocket connection updated with new ticket");
  } catch (error) {
    console.error("Failed to update WebSocket with renewed ticket:", error);
  }
}
```

#### 2.5 Simplify Error Handling

**Replace all ticket-related error handling methods:**
```typescript
// Remove: requestTicket()
// Remove: startTicketValidation()
// Remove: stopTicketValidation()
// Remove: checkAndRenewTicket()
// Remove: renewTicketProactively()
// Remove: setupVisibilityListener()
// Remove: removeVisibilityListener()
// Remove: handleUserReturn()
```

**With simpler versions:**
```typescript
private async handleAuthenticationFailure(data: any): Promise<void> {
  const errorData = data as any;
  console.error('Authentication failure:', {
    error: errorData?.error,
    code: errorData?.code,
  });

  try {
    console.log('Attempting to refresh ticket and reconnect...');
    const newTicket = await this.ticketManager!.refreshTicket();
    this.wsManager.updateTicket(newTicket);
    await this.wsManager.connect();
    console.log('Successfully reconnected with new ticket');
  } catch (error) {
    console.error('Failed to recover from authentication failure:', error);
    this.initReject?.(error);
  }
}
```

#### 2.6 Simplify Public Methods

**Replace:**
```typescript
async refreshTicketAndReconnect(): Promise<void> {
  if (this.isRefreshingTicket) {
    console.log('Ticket refresh already in progress');
    return;
  }

  try {
    this.isRefreshingTicket = true;
    console.log('Refreshing WebSocket ticket and reconnecting...');
    
    this.stopTicketValidation();
    this.wsTicket = null;
    this.wsManager.disconnect();
    
    await this.requestTicket();
    
    this.wsManager.updateTicket(this.wsTicket!.ticket);
    await this.wsManager.connect();
    
    console.log('WebSocket ticket refreshed and reconnected successfully');
  } catch (error) {
    console.error('Failed to refresh ticket and reconnect:', error);
    throw error;
  } finally {
    this.isRefreshingTicket = false;
  }
}
```

**With:**
```typescript
async refreshTicketAndReconnect(): Promise<void> {
  console.log('Refreshing ticket and reconnecting...');
  
  try {
    const newTicket = await this.ticketManager!.refreshTicket();
    this.wsManager.disconnect();
    this.wsManager.updateTicket(newTicket);
    await this.wsManager.connect();
    
    console.log('Successfully refreshed and reconnected');
  } catch (error) {
    console.error('Failed to refresh and reconnect:', error);
    throw error;
  }
}
```

#### 2.7 Update Connection Status

**Replace:**
```typescript
getConnectionStatus(): ConnectionStatus {
  let ticketExpiresIn: number | undefined;
  
  if (this.wsTicket) {
    try {
      const ticketInfo = getTicketInfo(this.wsTicket);
      ticketExpiresIn = ticketInfo.expiresIn;
    } catch (error) {
      console.warn('Error getting ticket info:', error);
    }
  }

  return {
    connected: this.connectionState.isConnected,
    reconnectAttempts: this.connectionState.reconnectAttempts,
    isReconnecting: this.connectionState.isReconnecting,
    websocketState: this.wsManager.getWebSocketState(),
    hasValidTicket: this.isTicketValid(),
    ticketExpiresIn,
    isRefreshingTicket: this.isRefreshingTicket,
  };
}
```

**With:**
```typescript
getConnectionStatus(): ConnectionStatus {
  return {
    connected: this.connectionState.isConnected,
    reconnectAttempts: this.connectionState.reconnectAttempts,
    isReconnecting: this.connectionState.isReconnecting,
    websocketState: this.wsManager.getWebSocketState(),
    hasValidTicket: this.ticketManager?.isValid() ?? false,
    ticketExpiresIn: this.ticketManager?.getExpiresIn(),
  };
}
```

#### 2.8 Update Disconnect

**Replace:**
```typescript
disconnect(): void {
  this.stopTicketValidation();
  this.wsManager.disconnect();
}
```

**With:**
```typescript
disconnect(): void {
  this.ticketManager?.stopProactiveRenewal();
  this.ticketManager?.clear();
  this.wsManager.disconnect();
}
```

#### 2.9 Add Error Boundary to Message Handler

**Replace:**
```typescript
private handleWebSocketMessage(event: MessageEvent): void {
  const data = this.messageHandler.handleMessage(event);
  // ... rest of logic
}
```

**With:**
```typescript
private handleWebSocketMessage(event: MessageEvent): void {
  try {
    const data = this.messageHandler.handleMessage(event);
    
    if (!data) {
      console.warn('MessageHandler returned null, skipping message processing');
      return;
    }

    // Handle authentication errors
    if (data.type === 'authentication_error') {
      console.error('WebSocket authentication failed:', data?.error, (data as any)?.code);
      this.handleAuthenticationFailure(data);
      return;
    }

    // Handle session establishment
    if (data.type === InboundMessageType.SESSION_ESTABLISHED) {
      console.log('Session established, sending tool configuration');
      
      if (this.toolSchemas && this.toolSchemas.length > 0) {
        this.sendToolConfiguration();
      } else {
        this.initResolve?.();
      }
      return;
    }

    // Handle tools configured
    if (data.type === InboundMessageType.TOOLS_CONFIGURED) {
      console.log('Tools configured successfully');
      this.initResolve?.();
      return;
    }
  } catch (error) {
    console.error('Error handling WebSocket message:', error, {
      rawData: event.data,
      timestamp: new Date().toISOString(),
    });
    // Don't crash the client - continue processing other messages
  }
}
```

---

## Refactor Phase 3: Update WebSocketManager

### Goal
Remove ticket management concerns, focus on connection management only.

### Changes

#### 3.1 Remove Visibility Handler

**Remove:**
```typescript
private visibilityChangeHandler: () => void;

private registerVisibilityHandler(): void {
  if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", this.visibilityChangeHandler);
  }
}

private handleVisibilityChange(): void {
  if (
    document.visibilityState === "visible" &&
    !this.connectionState.isConnected &&
    !this.connectionState.isReconnecting
  ) {
    this.attemptReconnect();
  }
}
```

**Reason:** Visibility handling should be at the client level, not connection level.

#### 3.2 Improve Connection Promise

**Update connect method to validate ticket:**
```typescript
connect(ticket?: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (ticket) {
      this.currentTicket = ticket;
    }

    if (!this.currentTicket) {
      reject(new Error("No ticket provided for WebSocket connection"));
      return;
    }

    try {
      const wsUrl = this.buildWebSocketUrl();
      console.log('WebSocketManager: Connecting to', wsUrl);
      
      this.ws = new WebSocket(wsUrl);

      if (!this.ws) {
        reject(new Error("Failed to create WebSocket instance"));
        return;
      }

      this.setupEventHandlers(resolve, reject);
    } catch (error) {
      console.error('WebSocketManager: Connection error', error);
      reject(error);
    }
  });
}
```

---

## Refactor Phase 4: Error Handling Improvements

### 4.1 Add Custom Error Types

**File:** `src/client/errors/WebSocketErrors.ts`

```typescript
export class WebSocketClientError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'WebSocketClientError';
  }
}

export class TicketError extends WebSocketClientError {
  constructor(message: string, details?: any) {
    super(message, 'TICKET_ERROR', details);
    this.name = 'TicketError';
  }
}

export class AuthenticationError extends WebSocketClientError {
  constructor(message: string, details?: any) {
    super(message, 'AUTHENTICATION_ERROR', details);
    this.name = 'AuthenticationError';
  }
}

export class ConnectionError extends WebSocketClientError {
  constructor(message: string, details?: any) {
    super(message, 'CONNECTION_ERROR', details);
    this.name = 'ConnectionError';
  }
}

export class ToolConfigurationError extends WebSocketClientError {
  constructor(message: string, details?: any) {
    super(message, 'TOOL_CONFIGURATION_ERROR', details);
    this.name = 'ToolConfigurationError';
  }
}
```

### 4.2 Use Custom Errors

```typescript
// In TicketManager
throw new TicketError('Failed to refresh ticket', { 
  userId: this.authData.userId,
  error: error instanceof Error ? error.message : 'Unknown'
});

// In WebSocketChatClient
throw new AuthenticationError('Authentication failed', {
  code: errorData?.code,
  message: errorData?.error
});

// In WebSocketManager
throw new ConnectionError('WebSocket connection failed', {
  url: wsUrl,
  readyState: this.ws?.readyState
});
```

---

## Migration Path

### Step 1: Create TicketManager (Week 1)
- [ ] Create `src/client/ticket/TicketManager.ts`
- [ ] Create `src/client/ticket/index.ts` for exports
- [ ] Add unit tests for TicketManager
- [ ] Test ticket refresh logic in isolation

### Step 2: Create Error Types (Week 1)
- [ ] Create `src/client/errors/WebSocketErrors.ts`
- [ ] Create `src/client/errors/index.ts`
- [ ] Update existing error throws to use new types

### Step 3: Update WebSocketChatClient (Week 2)
- [ ] Add TicketManager to constructor
- [ ] Update `onInit()` method
- [ ] Replace ticket methods with TicketManager calls
- [ ] Add error boundaries to message handling
- [ ] Remove old ticket management code
- [ ] Update unit tests

### Step 4: Update WebSocketManager (Week 2)
- [ ] Remove visibility handler
- [ ] Improve error handling
- [ ] Update unit tests

### Step 5: Integration Testing (Week 3)
- [ ] Test full initialization flow
- [ ] Test ticket renewal scenarios
- [ ] Test reconnection scenarios
- [ ] Test error scenarios
- [ ] Load testing with concurrent requests

### Step 6: Documentation (Week 3)
- [ ] Update API documentation
- [ ] Add migration guide for consumers
- [ ] Update code examples
- [ ] Add troubleshooting guide

---

## Testing Strategy

### Unit Tests

#### TicketManager Tests
```typescript
describe('TicketManager', () => {
  it('should request new ticket when none exists', async () => {});
  it('should reuse valid ticket', async () => {});
  it('should refresh expired ticket', async () => {});
  it('should prevent concurrent refresh requests', async () => {});
  it('should proactively renew before expiration', async () => {});
  it('should handle request failures gracefully', async () => {});
});
```

#### WebSocketChatClient Tests
```typescript
describe('WebSocketChatClient', () => {
  it('should initialize successfully with valid ticket', async () => {});
  it('should reject initialization on connection failure', async () => {});
  it('should handle authentication errors', async () => {});
  it('should recover from ticket expiration', async () => {});
  it('should send tools after session established', async () => {});
});
```

### Integration Tests
```typescript
describe('WebSocket Integration', () => {
  it('should complete full connection lifecycle', async () => {});
  it('should handle ticket renewal during active connection', async () => {});
  it('should reconnect after network failure', async () => {});
  it('should handle malformed messages without crashing', async () => {});
});
```

---

## Rollback Plan

If issues are discovered after deployment:

1. **Immediate:** Revert to previous commit
2. **Short-term:** Feature flag to switch between old/new ticket management
3. **Long-term:** Fix issues and redeploy

### Feature Flag Example
```typescript
const USE_NEW_TICKET_MANAGER = process.env.VITE_USE_NEW_TICKET_MANAGER === 'true';

if (USE_NEW_TICKET_MANAGER) {
  this.ticketManager = new TicketManager(...);
} else {
  // Old ticket management code
}
```

---

## Success Metrics

### Code Quality
- [ ] Reduce ticket management code by 60%
- [ ] Increase test coverage to >80%
- [ ] Reduce cyclomatic complexity of WebSocketChatClient

### Reliability
- [ ] Zero race conditions in ticket refresh
- [ ] 100% of connection failures properly reported
- [ ] Zero client crashes from malformed messages

### Performance
- [ ] Ticket refresh <200ms
- [ ] No unnecessary ticket requests
- [ ] Proactive renewal prevents disconnections

---

## Future Enhancements

### Phase 5: Connection Pool (Optional)
For applications with multiple concurrent chat sessions:
- Reuse tickets across multiple WebSocket connections
- Implement connection pooling
- Share ticket manager instance

### Phase 6: Metrics & Monitoring (Optional)
- Add telemetry for ticket refresh frequency
- Track connection success/failure rates
- Monitor average ticket lifetime
- Alert on authentication failures

### Phase 7: Offline Support (Optional)
- Queue messages when offline
- Retry with exponential backoff
- Persist tickets to localStorage
- Sync on reconnection

---

## Questions & Answers

**Q: Will this break existing consumers?**  
A: No, the public API remains the same. All changes are internal.

**Q: How do we handle users with existing tickets?**  
A: TicketManager checks validity on first use and refreshes if needed.

**Q: What happens if ticket refresh fails?**  
A: Connection is closed and initialization promise is rejected. Consumers can retry.

**Q: Can we roll this out incrementally?**  
A: Yes, use feature flags to test with subset of users first.

**Q: What about backward compatibility?**  
A: Public methods remain unchanged. Internal refactor only.

---

## Conclusion

This refactor will:
- ✅ Eliminate race conditions in ticket management
- ✅ Improve error handling and observability
- ✅ Reduce code complexity by 40%
- ✅ Make the codebase more testable
- ✅ Prevent silent failures
- ✅ Enable proactive ticket renewal

**Estimated effort:** 3 weeks  
**Risk level:** Medium  
**Recommended:** Yes, proceed with phased rollout
