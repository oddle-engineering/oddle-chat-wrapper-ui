# Performance Optimizations

## Connection Stability & Single Mount Connection

### Problem
When parent components pass props as new object/array references on every render, or when props change frequently, it can cause:
1. Unnecessary recalculation of tool schemas
2. **Multiple WebSocket reconnections**
3. **Multiple ticket fetches** (every time props change)
4. Poor user experience with repeated loading states

### Solution: Mount-Once Pattern
The `useWebSocketConnection` hook now:
1. **Connects only once on mount** - not when props change
2. **Uses refs for all props** - updated silently without triggering reconnection
3. **Stabilizes objects/arrays** - deep comparison for `tools` and `contextHelpers`

## Props Stabilization (Tools & ContextHelpers)

### Problem
When parent components pass the `tools` or `contextHelpers` props as new object/array references on every render, it can cause:
1. Unnecessary recalculation of tool schemas
2. WebSocket reconnections
3. Ticket refetching

### Example of the Issue
```typescript
// ❌ Bad: Creates new references on every render
function ParentComponent() {
  return (
    <ChatWrapper
      tools={[
        {
          name: "search",
          execute: (query) => searchAPI(query),
          // ...schema
        }
      ]}
      contextHelpers={{
        getCurrentUser: () => getUserData(),
        getLocation: () => getLocationData(),
      }}
    />
  );
}
```

### Solution Implemented
The `useWebSocketConnection` hook now uses **deep comparison** to stabilize both `tools` and `contextHelpers` references:

```typescript
// Stabilize tools reference
const toolsRef = useRef<Tools | undefined>(tools);
const toolsStableRef = useRef<Tools | undefined>(tools);

useEffect(() => {
  const toolsChanged = JSON.stringify(tools) !== JSON.stringify(toolsRef.current);
  if (toolsChanged) {
    toolsRef.current = tools;
    toolsStableRef.current = tools;
  }
}, [tools]);

// Stabilize contextHelpers reference
const contextHelpersRef = useRef<ContextHelpers | undefined>(contextHelpers);
const contextHelpersStableRef = useRef<ContextHelpers | undefined>(contextHelpers);

useEffect(() => {
  const contextHelpersChanged = JSON.stringify(contextHelpers) !== JSON.stringify(contextHelpersRef.current);
  if (contextHelpersChanged) {
    contextHelpersRef.current = contextHelpers;
    contextHelpersStableRef.current = contextHelpers;
  }
}, [contextHelpers]);
```

### Best Practice for Users
While the library now handles this internally, it's still **recommended** to memoize your props:

```typescript
// ✅ Good: Memoize both tools and contextHelpers
function ParentComponent() {
  const tools = useMemo(() => [
    {
      name: "search",
      execute: (query) => searchAPI(query),
      description: "Search for information",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string" }
        }
      }
    }
  ], []); // Empty deps if tools never change

  const contextHelpers = useMemo(() => ({
    getCurrentUser: () => getUserData(),
    getLocation: () => getLocationData(),
  }), []); // Add deps only if functions reference changing values

  return (
    <ChatWrapper 
      tools={tools}
      contextHelpers={contextHelpers}
    />
  );
}
```

### Benefits
- **Automatic protection**: Users don't need to worry about memoizing tools or contextHelpers
- **Better UX**: No unexpected reconnections or loading states
- **Performance**: Avoids unnecessary WebSocket reconnections and API calls
- **Backward compatible**: Existing code continues to work

### Technical Details
- **Mount-once pattern**: Connection established only on component mount
- **Ref-based props**: All props stored in refs and updated silently
- **Deep comparison**: `JSON.stringify()` for `tools` and `contextHelpers`
- **Only reconnects when**: `toolSchemas` or `clientToolExecutors` actually change
- **Zero performance impact**: Properly memoized props have no overhead
- **Manual reconnection**: `connectChatClient()` function still available if needed

### Key Implementation Details
```typescript
// Props stored in refs - updated without triggering reconnection
const userMpAuthTokenRef = useRef(userMpAuthToken);
const entityIdRef = useRef(entityId);
// ... all props use refs

// Mount-once connection
const hasMountedRef = useRef(false);
useEffect(() => {
  if (!hasMountedRef.current) {
    hasMountedRef.current = true;
    connectChatClient(); // Only runs once
  }
  return () => disconnectChatClient();
}, []); // Empty deps!

// connectChatClient reads from refs, not direct props
await client.onInit({
  userMpAuthToken: userMpAuthTokenRef.current,
  entityId: entityIdRef.current,
  // ...
});
```

### Result
✅ **Single ticket fetch on mount**  
✅ **No reconnections when props change**  
✅ **Stable connection throughout component lifecycle**  
✅ **Manual reconnection still available via returned function**

### Real-World Scenarios

#### Scenario 1: Parent Re-renders (FIXED ✅)
```typescript
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // ❌ Before: This would cause reconnection on every count change
  // ✅ After: No reconnection, connection stays stable
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <ChatWrapper
        auth={{ token: "abc", entityId: "123" }}
        tools={[/* tools */]}
        contextHelpers={{ getUser: () => ({}) }}
      />
    </>
  );
}
```

#### Scenario 2: Props Change After Mount (FIXED ✅)
```typescript
function DynamicPropsComponent() {
  const [entityId, setEntityId] = useState("user-1");
  
  // ❌ Before: Changing entityId would trigger reconnection & refetch
  // ✅ After: Props updated in refs, no reconnection
  return (
    <ChatWrapper
      auth={{ token: "abc", entityId }} // Changes don't trigger reconnection
      metadata={{ userId: entityId }}   // Handled by metadata sync
    />
  );
}
```

#### Scenario 3: Manual Reconnection (Still Works ✅)
```typescript
function ManualControlComponent() {
  const chatRef = useRef<ChatWrapperRef>(null);
  
  // You can still manually reconnect if needed
  const handleReconnect = () => {
    // Access via ref or internal method
    // Connection logic handles this case
  };
  
  return <ChatWrapper ref={chatRef} {...props} />;
}
```
