# Migration Guide: Service Layer Refactoring

This guide shows how to migrate from the current API utilities to the new service layer.

## Overview

The new service layer provides:
- ✅ **Centralized API configuration** 
- ✅ **Consistent error handling**
- ✅ **Automatic retries with exponential backoff**
- ✅ **Standardized authentication**
- ✅ **Request/response logging**
- ✅ **TypeScript type safety**
- ✅ **Caching capabilities**
- ✅ **Testability & mocking**

## Setup

### 1. Initialize in your app entry point:

```typescript
// In your main App.tsx or index.tsx
import { ApiServiceFactory } from './services/api';

// Initialize with your API base URL
ApiServiceFactory.initialize({
  baseUrl: 'https://your-api.com', // Converted from WebSocket URL
  timeout: 10000,
  retries: 3
});
```

### 2. Use in components:

```typescript
import { useApiServices } from './services/api';

function MyComponent() {
  const { auth, agent, thread } = useApiServices();
  
  // Now use the services...
}
```

## Migration Examples

### Before (websocketTicketApi.ts):

```typescript
// OLD WAY - Duplicated headers and error handling
const headers: HeadersInit = {
  'Content-Type': 'application/json',
};

if (ticketRequest.userMpAuthToken) {
  headers['Authorization'] = `Bearer ${ticketRequest.userMpAuthToken}`;
}
if (ticketRequest.chatServerKey) {
  headers['X-Chat-Server-Key'] = ticketRequest.chatServerKey;
}

const response = await fetch(`${apiUrl}/api/websocket/ticket`, {
  method: 'POST',
  headers,
  body: JSON.stringify({...})
});

if (!response.ok) {
  const errorData = await response.json().catch(() => ({}));
  throw new Error(errorData.error || `Failed: ${response.statusText}`);
}
```

### After (Service Layer):

```typescript
// NEW WAY - Clean and consistent
const authService = getAuthService();

const ticket = await authService.requestWebSocketTicket(
  { userId, entityId, entityType },
  { userMpAuthToken, chatServerKey }
);
```

### WebSocketChatClient Migration:

```typescript
// BEFORE
import { requestWebSocketTicket, isTicketValid, getTicketInfo } from "../utils/websocketTicketApi";

// AFTER  
import { getAuthService } from "../services/api";

class WebSocketChatClient {
  private async requestTicket(): Promise<void> {
    const authService = getAuthService();
    
    this.wsTicket = await authService.requestWebSocketTicket({
      userId: this.authData.userId,
      entityId: this.authData.entityId,
      entityType: this.authData.entityType,
      providerResId: this.authData.providerResId,
    }, {
      userMpAuthToken: this.authData.userMpAuthToken,
      chatServerKey: this.authData.chatServerKey,
    });
  }
  
  isTicketValid(): boolean {
    return this.wsTicket ? getAuthService().isTicketValid(this.wsTicket) : false;
  }
}
```

### DevSettings Component Migration:

```typescript
// BEFORE
import { getAgentConfiguration, updateAgentConfiguration } from '../utils/agentConfigApi';

// AFTER
import { useApiServices } from '../services/api';

export const DevSettings = ({ app, apiUrl, userMpAuthToken, chatServerKey }) => {
  const { agent } = useApiServices();
  
  const fetchConfiguration = async () => {
    const config = await agent.getConfiguration(app, {
      userMpAuthToken,
      chatServerKey,
    });
    setConfig(config);
  };
  
  const handleSave = async () => {
    const updatedConfig = await agent.updateConfiguration({
      app: config.app,
      promptPath: tempPromptPath,
      versionUuid: tempVersionUuid,
      isDefault: config.isDefault,
    }, {
      userMpAuthToken,
      chatServerKey,
    });
    setConfig(updatedConfig);
  };
};
```

### Thread Loading Hook Migration:

```typescript
// BEFORE
import { fetchUserThreads, fetchThreadMessages } from '../utils/threadApi';

// AFTER
import { useApiServices } from '../services/api';

export const useConversationLoader = () => {
  const { thread } = useApiServices();
  
  const loadThreads = async (userId: string) => {
    return thread.fetchUserThreads(userId, {
      includeArchived: false,
      limit: 50
    }, authOptions);
  };
  
  const loadMessages = async (threadId: string) => {
    return thread.fetchThreadMessages(threadId, authOptions);
  };
};
```

## Benefits Gained

### 1. **Error Handling**
```typescript
try {
  const config = await agent.getConfiguration(app, authOptions);
} catch (error) {
  if (error instanceof ApiError) {
    if (error.isAuthError()) {
      // Handle authentication errors
    } else if (error.isServerError()) {
      // Handle server errors  
    }
  }
}
```

### 2. **Automatic Retries**
- Network failures automatically retry with exponential backoff
- Authentication errors don't retry (fail fast)
- Configurable retry counts and timeouts

### 3. **Caching**
```typescript
// Agent configurations are cached for 5 minutes
const config = await agent.getConfigurationCached(app, authOptions);
```

### 4. **Better Testing**
```typescript
// Easy to mock for tests
const mockAgentService = {
  getConfiguration: jest.fn().mockResolvedValue(mockConfig),
  updateConfiguration: jest.fn().mockResolvedValue(mockConfig),
};
```

### 5. **Centralized Configuration**
```typescript
// Switch environments easily
ApiServiceFactory.getInstance().updateConfig({
  baseUrl: 'https://staging-api.com'
});
```

## Breaking Changes

1. **Import paths change** - Update all imports to use `./services/api`
2. **Function signatures** - Auth options now passed as second parameter
3. **Error types** - Errors are now `ApiError` instances with additional properties
4. **Initialization required** - Must call `ApiServiceFactory.initialize()` before use

## Rollout Strategy

1. **Phase 1**: Add service layer alongside existing utilities
2. **Phase 2**: Migrate components one by one  
3. **Phase 3**: Remove old API utility files
4. **Phase 4**: Update tests to use service layer

This provides a clean, maintainable, and consistent API layer for the entire application!