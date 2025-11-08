# Thread Attachment Workflow Guide

> **Use Case**: Attach draft conversations to entities after Latitude responds

## Overview

This guide covers the workflow for converting draft threads (created during initial chat) into entity-attached threads after receiving a response from Latitude.

**Implementation Options**:
1. **Dev Settings UI** (Built-in) - Use the developer settings panel in devMode
2. **Programmatic API** - Use the `updateThread()` function in your code
3. **Direct HTTP API** - Call the PATCH endpoint directly

## Workflow Sequence

```
1. User sends first message
   ↓
2. Draft thread created (no entityId/entityType yet)
   ↓
3. Latitude processes and responds with providerResId
   ↓
4. Thread is created/updated with providerResId
   ↓
5. Client decides to attach thread to an entity
   ↓
6. PATCH /v1/threads/:id with entityId, entityType, tag, metadata
   ↓
7. Authorization validates user has access to entity
   ↓
8. Thread updated and attached to entity
```

## API Endpoint

### Update Thread (Attach to Entity)

**Endpoint**: `PATCH /v1/threads/:id`

**Authentication**: Required (`requireAuthWithValidation`)

**Authorization**: 
- User must own the thread (`thread.userId === user.userId`)
- User must have access to the entity (if attaching to entity)

**Request Headers**:
```http
x-oddle-chat-server-key: your-api-key
x-oddle-mp-auth-token: your-mp-token
Content-Type: application/json
```

**Request Body**:
```typescript
{
  title?: string;           // Optional: Update thread title
  tag?: string | null;      // Optional: Add/update tag for filtering
  metadata?: any;           // Optional: Custom metadata object
  entityId?: string | null; // Optional: Attach to entity (BRAND/ACCOUNT)
  entityType?: "BRAND" | "ACCOUNT" | null; // Required if entityId provided
}
```

**Response** (Success - 200):
```json
{
  "success": true,
  "data": {
    "id": "thread-uuid",
    "userId": "user-123",
    "entityId": "brand-001",
    "entityType": "BRAND",
    "tag": "support",
    "app": "UD21",
    "metadata": {
      "category": "billing",
      "priority": "high"
    },
    "providerResId": "conv_1699234567_abc123",
    "title": "Billing Question",
    "createdAt": "2025-11-08T10:30:00Z",
    "updatedAt": "2025-11-08T10:35:00Z",
    "messages": []
  }
}
```

**Error Responses**:

**401 Unauthorized** - Missing or invalid authentication:
```json
{
  "success": false,
  "error": "Authentication required"
}
```

**403 Forbidden** - User doesn't own thread:
```json
{
  "success": false,
  "error": "Access denied: You can only update your own threads"
}
```

**403 Forbidden** - User doesn't have access to entity:
```json
{
  "success": false,
  "error": "Forbidden: Access denied to brand"
}
```

**404 Not Found** - Thread doesn't exist:
```json
{
  "success": false,
  "error": "Thread not found"
}
```

## Usage Examples

### Option 1: Using Dev Settings UI (Recommended for Testing)

The ChatWrapper component includes a built-in Developer Settings panel when `devMode={true}` is enabled.

**Setup**:
```tsx
import { ChatWrapper } from '@oddle/chat-wrapper-ui';

function App() {
  return (
    <ChatWrapper
      userMpAuthToken="your-token"
      chatServerUrl="https://your-server.com"
      chatServerKey="your-key"
      userId="user-123"
      entityId="brand-456"
      entityType={EntityType.BRAND}
      devMode={true}  // Enable developer settings
      config={{
        mode: "sidebar",
        headerName: "AI Assistant",
        // ... other config
      }}
    />
  );
}
```

**Using the UI**:
1. Click the ⚙️ settings icon in the chat header (when devMode is enabled)
2. Switch to the "Thread Attachment" tab
3. Fill in the fields:
   - **Entity ID**: The brand or account ID (e.g., `brand_123`)
   - **Entity Type**: Select `BRAND` or `ACCOUNT`
   - **Tag**: Optional category tag (e.g., `customer-inquiry`)
   - **Metadata**: Optional JSON object (e.g., `{"priority": "high"}`)
4. Click "Update Thread"
5. Success message will appear when the thread is attached

**Features**:
- Real-time display of current thread ID
- Form validation (requires active thread)
- JSON validation for metadata field
- Success/error messaging
- Disabled state when no active thread

---

### Option 2: Using the Programmatic API

Import and use the `updateThread` function directly in your code.

```typescript
import { updateThread } from '@oddle/chat-wrapper-ui';

// Attach thread to brand
async function attachToBrand(providerResId: string, brandId: string) {
  try {
    const updatedThread = await updateThread(
      'https://your-api.com',
      providerResId,
      {
        entityId: brandId,
        entityType: 'BRAND',
        tag: 'customer-support',
        metadata: {
          source: 'chat-widget',
          priority: 'high'
        }
      },
      {
        userMpAuthToken: 'your-token',
        chatServerKey: 'your-key',
      }
    );
    
    console.log('Thread attached:', updatedThread);
  } catch (error) {
    console.error('Failed to attach thread:', error);
  }
}
```

---

### Option 3: Direct HTTP API

### Example 1: Attach Draft Thread to Brand

**Scenario**: User starts chat anonymously, then wants to save it to their brand.

```bash
# Step 1: User sends first message (creates draft thread)
# Thread created with no entityId/entityType

# Step 2: After conversation starts, attach to brand
curl -X PATCH http://localhost:3000/v1/threads/thread-uuid-123 \
  -H "Content-Type: application/json" \
  -H "x-oddle-chat-server-key: your-api-key" \
  -H "x-oddle-mp-auth-token: your-mp-token" \
  -d '{
    "entityType": "BRAND",
    "entityId": "brand-001",
    "tag": "customer-inquiry",
    "metadata": {
      "source": "widget",
      "category": "general"
    }
  }'
```

### Example 2: Update Metadata Only

**Scenario**: Add custom tracking metadata to existing thread.

```bash
curl -X PATCH http://localhost:3000/v1/threads/thread-uuid-123 \
  -H "Content-Type: application/json" \
  -H "x-oddle-chat-server-key: your-api-key" \
  -H "x-oddle-mp-auth-token: your-mp-token" \
  -d '{
    "metadata": {
      "priority": "high",
      "assignedTo": "agent-456",
      "tags": ["urgent", "billing"]
    }
  }'
```

### Example 3: Update Multiple Fields

**Scenario**: Attach to entity and update title/tag together.

```bash
curl -X PATCH http://localhost:3000/v1/threads/thread-uuid-123 \
  -H "Content-Type: application/json" \
  -H "x-oddle-chat-server-key: your-api-key" \
  -H "x-oddle-mp-auth-token: your-mp-token" \
  -d '{
    "title": "Support Ticket - Refund Request",
    "entityType": "BRAND",
    "entityId": "brand-001",
    "tag": "refund",
    "metadata": {
      "ticketId": "T-12345",
      "status": "open"
    }
  }'
```

### Example 4: Detach from Entity

**Scenario**: Remove entity association (convert back to personal thread).

```bash
curl -X PATCH http://localhost:3000/v1/threads/thread-uuid-123 \
  -H "Content-Type: application/json" \
  -H "x-oddle-chat-server-key: your-api-key" \
  -H "x-oddle-mp-auth-token: your-mp-token" \
  -d '{
    "entityId": null,
    "entityType": null
  }'
```

## Authorization Rules

### Thread Ownership
```typescript
// User must own the thread
if (thread.userId !== user.userId) {
  return 403; // Forbidden
}
```

### Entity Access Validation
```typescript
// If attaching to BRAND
if (entityType === "BRAND") {
  // User must have brand in their brands array
  if (!user.brands.includes(entityId)) {
    return 403; // Forbidden: Access denied to brand
  }
}

// If attaching to ACCOUNT
if (entityType === "ACCOUNT") {
  // User must own the account
  if (user.accountId !== entityId) {
    return 403; // Forbidden: Access denied to account
  }
}
```

## Client Implementation Pattern

### React/TypeScript Example

```typescript
interface UpdateThreadRequest {
  title?: string;
  tag?: string | null;
  metadata?: any;
  entityId?: string | null;
  entityType?: 'BRAND' | 'ACCOUNT' | null;
}

async function attachThreadToEntity(
  providerResId: string,
  brandId: string,
  metadata?: any
): Promise<Thread> {
  const response = await fetch(`/v1/threads/provider/${providerResId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-oddle-chat-server-key': apiKey,
      'x-oddle-mp-auth-token': mpToken,
    },
    body: JSON.stringify({
      entityType: 'BRAND',
      entityId: brandId,
      metadata,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to attach thread');
  }

  const result = await response.json();
  return result.data;
}

// Usage in conversation flow
async function handleConversationStart() {
  // 1. User sends message, draft thread created
  const thread = await createDraftThread();
  
  // 2. User selects brand to attach conversation
  const selectedBrand = await showBrandSelector();
  
  // 3. Attach thread to brand
  const updatedThread = await attachThreadToEntity(
    thread.id,
    selectedBrand.id,
    {
      source: 'chat-widget',
      userIntent: 'support',
    }
  );
  
  console.log('Thread attached to brand:', updatedThread.entityId);
}
```

### JavaScript Example

```javascript
// Attach draft thread to brand after user selection
async function attachDraftToBrand(providerResId, brandId) {
  try {
    const response = await fetch(`/v1/threads/provider/${providerResId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-oddle-chat-server-key': 'your-api-key',
        'x-oddle-mp-auth-token': 'your-mp-token',
      },
      body: JSON.stringify({
        entityType: 'BRAND',
        entityId: brandId,
        tag: 'customer-chat',
      }),
    });

    const result = await response.json();
    
    if (!result.success) {
      console.error('Failed to attach thread:', result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Error attaching thread:', error);
    throw error;
  }
}
```

## Mock Authentication Testing

When using mock authentication (`ENABLE_MOCK_AUTH=true`), you can test without real headers:

```bash
# No auth headers needed with mock auth enabled
curl -X PATCH http://localhost:3000/v1/threads/thread-uuid-123 \
  -H "Content-Type: application/json" \
  -d '{
    "entityType": "BRAND",
    "entityId": "brand-001",
    "tag": "test-thread"
  }'
```

The mock user (configured in `.env`) will be used:
```env
MOCK_USER_ID=test-user-123
MOCK_ACCOUNT_ID=test-account-456
MOCK_BRAND_IDS=brand-001,brand-002,brand-003
```

## Best Practices

### 1. **Validate Before Attaching**
```typescript
// Client-side: Check user has access to entity before attempting
if (!userBrands.includes(selectedBrandId)) {
  showError('You do not have access to this brand');
  return;
}

// Proceed with attachment
await attachThreadToEntity(providerResId, selectedBrandId);
```

### 2. **Handle Errors Gracefully**
```typescript
try {
  await attachThreadToEntity(providerResId, brandId);
  showSuccess('Thread attached successfully');
} catch (error) {
  if (error.message.includes('Forbidden')) {
    showError('You do not have access to this brand');
  } else if (error.message.includes('Not found')) {
    showError('Thread no longer exists');
  } else {
    showError('Failed to attach thread. Please try again.');
  }
}
```

### 3. **Optimistic UI Updates**
```typescript
// Update UI immediately, rollback on error
const optimisticThread = { ...thread, entityId: brandId };
setThread(optimisticThread);

try {
  const updatedThread = await attachThreadToEntity(providerResId, brandId);
  setThread(updatedThread);
} catch (error) {
  setThread(thread); // Rollback
  showError(error.message);
}
```

### 4. **Track Attachment State**
```typescript
// Use metadata to track when/how thread was attached
await updateThread(providerResId, {
  entityType: 'BRAND',
  entityId: brandId,
  metadata: {
    attachedAt: new Date().toISOString(),
    attachedBy: userId,
    attachmentSource: 'chat-widget',
  },
});
```

### 5. **Partial Updates**
```typescript
// Only send fields you want to update
// Other fields remain unchanged

// Update only tag
await updateThread(providerResId, { tag: 'urgent' });

// Update only metadata
await updateThread(providerResId, { 
  metadata: { priority: 'high' } 
});

// Update entity attachment only
await updateThread(providerResId, { 
  entityType: 'BRAND',
  entityId: 'brand-001'
});
```

## Security Considerations

### ✅ **Implemented Security**
- User ownership validation
- Entity access validation
- Authentication required
- Structured error logging

### 🔒 **Additional Recommendations**
1. **Rate limiting** - Prevent abuse of update endpoint
2. **Audit logging** - Track who attached threads to what entities
3. **Validation** - Ensure entityType matches entityId
4. **Immutability** - Consider preventing certain changes after attachment

### Example: Prevent Re-attachment
```typescript
// In your route handler (optional)
if (existingThread.entityId && entityId !== existingThread.entityId) {
  return res.status(400).json({
    success: false,
    error: 'Cannot re-attach thread to different entity',
  });
}
```

## Logging & Monitoring

The endpoint logs important events:

**Info logs** (successful updates):
```json
{
  "level": "info",
  "userId": "user-123",
  "providerResId": "conv_1699234567_abc123",
  "updates": ["entityId", "entityType", "tag"],
  "entityAttached": true,
  "msg": "Thread updated successfully"
}
```

**Warning logs** (failed validation):
```json
{
  "level": "warn",
  "userId": "user-123",
  "providerResId": "conv_1699234567_abc123",
  "entityType": "BRAND",
  "entityId": "brand-001",
  "error": "Forbidden: Access denied to brand",
  "msg": "Entity access validation failed during thread update"
}
```

**Error logs** (system failures):
```json
{
  "level": "error",
  "userId": "user-123",
  "providerResId": "conv_1699234567_abc123",
  "operation": "update_thread",
  "error": "Database connection failed",
  "stack": "Error: ...",
  "msg": "Error updating thread"
}
```

## Related Documentation

- [Multi-Tenant Chat Guide](./MULTI_TENANT_CHAT_GUIDE.md) - Entity-based architecture
- [Authentication Guide](./AUTHENTICATION_GUIDE.md) - Auth setup
- [API Quick Reference](./API_QUICK_REFERENCE.md) - All endpoints
- [Mock Auth Guide](./MOCK_AUTH_GUIDE.md) - Local testing

---

**Last Updated**: November 8, 2025  
**Author**: Development Team
