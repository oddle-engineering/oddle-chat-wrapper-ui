# API Quick Reference Guide

## Base URL
```
http://localhost:3000
```

---

## Quick Links
📘 [Full API Documentation](FRONTEND_API_GUIDE.md)
📝 [Message Storage Guide](MESSAGE_STORAGE_GUIDE.md)

---

## Thread Endpoints

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| `GET` | `/threads/user/:userId` | Get user's threads | `includeArchived`, `limit` |
| `GET` | `/threads/conv/:convUuid` | Get thread by conversation UUID | - |
| `GET` | `/threads/:id` | Get thread by ID | - |
| `POST` | `/threads` | Create new thread | - |
| `PATCH` | `/threads/:id` | Update thread | - |
| `POST` | `/threads/:id/archive` | Archive thread | - |
| `DELETE` | `/threads/:id` | Delete thread | - |
| `GET` | `/threads/user/:userId/stats` | Get user statistics | - |
| `GET` | `/threads/user/:userId/search` | Search threads | `q` (required), `limit` |

---

## Message Endpoints

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| `GET` | `/messages/thread/:threadId` | Get thread messages | `format=client` |
| `GET` | `/messages/conv/:convUuid` | Get messages by conversation UUID | `format=client` |
| `POST` | `/messages` | Add message to thread | - |
| `DELETE` | `/messages/:id` | Delete message | - |

---

## Essential Flows

### 1. Load User's Conversations
```javascript
// Step 1: Get threads
GET /threads/user/{userId}?limit=20

// Step 2: Get messages for selected thread
GET /messages/thread/{threadId}?format=client
```

### 2. Restore Conversation by UUID
```javascript
// Step 1: Get thread by convUuid
GET /threads/conv/{convUuid}

// Step 2: Get messages
GET /messages/conv/{convUuid}?format=client
```

### 3. Search Conversations
```javascript
GET /threads/user/{userId}/search?q={query}&limit=10
```

---

## Request Examples

### Get User Threads
```bash
curl http://localhost:3000/threads/user/user_123?limit=20
```

### Get Messages (Client Format)
```bash
curl http://localhost:3000/messages/thread/clxyz123abc?format=client
```

### Create Thread
```bash
curl -X POST http://localhost:3000/threads \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_123",
    "convUuid": "16180c28-014a-4fbb-a0c4-b32233f2c13a",
    "title": "My conversation",
    "agentType": "shop"
  }'
```

### Archive Thread
```bash
curl -X POST http://localhost:3000/threads/clxyz123abc/archive
```

### Search Threads
```bash
curl http://localhost:3000/threads/user/user_123/search?q=dinner&limit=10
```

---

## Response Formats

### Thread Object
```json
{
  "id": "clxyz123abc",
  "userId": "user_123",
  "convUuid": "16180c28-014a-4fbb-a0c4-b32233f2c13a",
  "title": "Dinner reservation",
  "agentType": "reservation",
  "isArchived": false,
  "createdAt": "2025-10-23T06:16:07.010Z",
  "updatedAt": "2025-10-23T06:16:49.087Z"
}
```

### Message Object (Client Format)
```json
{
  "id": "clmsg001",
  "role": "user",
  "content": "Hello",
  "timestamp": "2025-10-23T06:16:07.010Z",
  "media": [],
  "isStreaming": false
}
```

### Message with Media
```json
{
  "id": "clmsg002",
  "role": "user",
  "content": "Check this image",
  "timestamp": "2025-10-23T06:16:36.092Z",
  "media": ["https://s3.amazonaws.com/..."],
  "isStreaming": false
}
```

### Tooling Message
```json
{
  "id": "clmsg003",
  "role": "tooling",
  "content": "✅ Completed: create_to_do",
  "timestamp": "2025-10-23T06:16:40.970Z",
  "isStreaming": false,
  "toolData": {
    "type": "tool_call_request",
    "callId": "call_123",
    "toolName": "create_to_do",
    "parameters": { "task": "..." },
    "status": "completed"
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "userId and convUuid are required"
}
```

### 404 Not Found
```json
{
  "error": "Thread not found"
}
```

### 500 Server Error
```json
{
  "error": "Failed to fetch threads",
  "message": "Database connection error"
}
```

---

## Important Query Parameters

### `?format=client`
Use this on message endpoints to get messages formatted for UI rendering:
- Converts `createdAt` to `timestamp`
- Adds `isStreaming: false`
- Includes `toolData` for tooling messages
- Formats media arrays properly

**Example:**
```javascript
// Without format=client (raw database format)
GET /messages/thread/123
{
  "messages": [{
    "id": "...",
    "threadId": "...",
    "role": "user",
    "content": "...",
    "createdAt": "...",
    "metadata": null
  }]
}

// With format=client (UI-ready format)
GET /messages/thread/123?format=client
{
  "messages": [{
    "id": "...",
    "role": "user",
    "content": "...",
    "timestamp": "...",
    "isStreaming": false
  }]
}
```

### `?includeArchived=true`
Include archived threads in results (default: false)

### `?limit=20`
Limit number of results (useful for pagination)

---

## Common Patterns

### TypeScript Fetch Helper
```typescript
async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`http://localhost:3000${endpoint}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }
  return response.json();
}

// Usage
const { threads } = await apiGet<{ threads: Thread[] }>(
  '/threads/user/user_123'
);
```

### React Hook Example
```typescript
function useThreadMessages(threadId: string | null) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!threadId) return;

    setLoading(true);
    fetch(`/messages/thread/${threadId}?format=client`)
      .then(res => res.json())
      .then(data => setMessages(data.messages))
      .finally(() => setLoading(false));
  }, [threadId]);

  return { messages, loading };
}
```

---

## Testing

### Using curl
```bash
# Get threads
curl http://localhost:3000/threads/user/user_123

# Get messages
curl http://localhost:3000/messages/thread/clxyz123abc?format=client

# Create thread
curl -X POST http://localhost:3000/threads \
  -H "Content-Type: application/json" \
  -d '{"userId":"user_123","convUuid":"uuid-here","title":"Test"}'

# Search
curl "http://localhost:3000/threads/user/user_123/search?q=test"
```

### Using JavaScript/Fetch
```javascript
// Get threads
const threads = await fetch('/threads/user/user_123')
  .then(r => r.json());

// Get messages
const messages = await fetch('/messages/thread/clxyz123?format=client')
  .then(r => r.json());

// Create thread
const newThread = await fetch('/threads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user_123',
    convUuid: 'uuid-here',
    title: 'New conversation'
  })
}).then(r => r.json());
```

---

## Status Codes

| Code | Meaning | When It Happens |
|------|---------|-----------------|
| 200 | Success | Request completed successfully |
| 400 | Bad Request | Missing required fields or invalid parameters |
| 404 | Not Found | Thread or message doesn't exist |
| 500 | Server Error | Database error or internal server issue |

---

## Tips & Best Practices

✅ **DO:**
- Always use `?format=client` when fetching messages for UI
- Use `limit` parameter to prevent loading too much data
- Cache thread lists locally to reduce API calls
- Handle errors gracefully with try-catch
- Use TypeScript interfaces for type safety

❌ **DON'T:**
- Don't fetch messages for all threads at once
- Don't forget to handle 404 errors
- Don't hardcode the base URL
- Don't load archived threads unless needed
- Don't fetch the same data repeatedly

---

## Need More Info?

📘 **Full Documentation:** [FRONTEND_API_GUIDE.md](FRONTEND_API_GUIDE.md)
📝 **Message Storage Details:** [MESSAGE_STORAGE_GUIDE.md](MESSAGE_STORAGE_GUIDE.md)
🐛 **Report Issues:** Contact the backend team

**Last Updated:** October 23, 2025
