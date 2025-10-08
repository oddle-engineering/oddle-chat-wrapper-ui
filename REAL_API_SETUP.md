# Using Real API with Chat Wrapper Showcase

This guide explains how to configure the showcase to use your real Brief Planner API instead of the mock implementation.

## Quick Setup

### Option 1: Environment Variables (Recommended)

1. **Copy environment template:**
   ```bash
   cd showcase
   cp .env.example .env.local
   ```

2. **Edit `.env.local` to use real API:**
   ```bash
   # Disable mock API
   VITE_USE_MOCK_API=false
   
   # Set your real API base URL
   VITE_API_BASE_URL=http://localhost:3000
   
   # Confirm endpoint paths (usually these are correct)
   VITE_BRIEF_PLANNER_ENDPOINT=/api/brief-planner
   VITE_CONVERSATION_ENDPOINT=/api/conversation
   ```

3. **Start the showcase:**
   ```bash
   npm run dev
   ```

### Option 2: Direct Configuration

Edit `showcase/src/config/apiConfig.ts`:

```typescript
const defaultConfig: ApiConfig = {
  useMockApi: false,  // ← Change this to false
  briefPlannerEndpoint: '/api/brief-planner',
  conversationEndpoint: '/api/conversation', 
  baseUrl: 'http://localhost:3000', // ← Your API URL
};
```

## Configuration Examples

### Local Next.js Development
```bash
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=http://localhost:3000
VITE_BRIEF_PLANNER_ENDPOINT=/api/brief-planner
```

### Production Deployment
```bash
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=https://your-domain.com
VITE_BRIEF_PLANNER_ENDPOINT=/api/brief-planner
```

### Different API Structure
```bash
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=https://api.your-domain.com
VITE_BRIEF_PLANNER_ENDPOINT=/v1/brief-planner
```

### Localhost with Different Port
```bash
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=http://localhost:3001
VITE_BRIEF_PLANNER_ENDPOINT=/api/brief-planner
```

## API Requirements

Your real API must support the following endpoints:

### 1. Brief Planner Endpoint
- **URL**: `POST /api/brief-planner`
- **Content-Type**: `application/json`
- **Response**: Server-Sent Events (SSE)

**Request Body:**
```json
{
  "messages": [
    {
      "id": "msg-123", 
      "role": "user",
      "content": "Create a marketing brief",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ],
  "promptPath": "briefPlanner",
  "conversationUuid": "uuid-123" | null,
  "todos": [...],
  "briefs": [...], 
  "media": [...]
}
```

**Response (SSE):**
```
data: {"type": "event", "event": "latitude-event", "data": {"type": "chain-started"}}

data: {"type": "event", "event": "provider-event", "data": {"type": "text-delta", "textDelta": "Hello"}}

data: {"type": "tool-result", "tool": "create_to_do", "data": {...}, "todos": [...]}

data: {"type": "finished", "uuid": "conversation-uuid", "result": {...}}
```

### 2. Conversation Endpoints (Standard Chat)
- **Init**: `POST /api/conversation/init`
- **Chat**: `POST /api/conversation/{id}`

## CORS Configuration

If your API is on a different domain, ensure CORS is configured:

```javascript
// Next.js API route example
export async function POST(request) {
  // ... your logic

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache", 
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": "*", // ← Add for development
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
```

## Troubleshooting

### 1. Connection Issues

**Problem**: `fetch failed` or network errors

**Solutions:**
- Verify your API server is running
- Check the base URL in configuration
- Ensure CORS is properly configured
- Check browser console for detailed errors

### 2. API Not Found (404)

**Problem**: `404 Not Found` errors

**Solutions:**
- Verify endpoint paths in `.env.local`
- Check your API route structure
- Ensure your Next.js API routes are deployed

### 3. Streaming Issues

**Problem**: No streaming text or incomplete responses

**Solutions:**
- Verify SSE response format matches expected structure
- Check your Latitude SDK integration
- Ensure proper response headers for SSE

### 4. Tool Issues

**Problem**: Todos/briefs not updating

**Solutions:**
- Verify tool implementations in your API
- Check tool result event format
- Ensure tool state is properly sent to frontend

## Testing Real API

### 1. Verify API Status
The showcase header will show:
- 🌐 **Real API Mode** - when using real API
- 🔧 **Mock API Mode** - when using mock

### 2. Test Basic Chat
1. Open Brief Planner demo
2. Send: `"Hello, can you help me?"`
3. Verify streaming response appears
4. Check for conversation UUID in header

### 3. Test Tool Usage
1. Send: `"Create a todo for planning"`
2. Watch sidebar for new todo
3. Send: `"Create a marketing brief"`
4. Check brief panel for new brief

### 4. Test Conversation Continuity
1. Send initial message
2. Note conversation UUID
3. Send follow-up message
4. Verify context is maintained

## Debug Mode

Enable detailed logging by opening browser console. You'll see:

```
Mock API disabled - using real API endpoints
API Mode: Real API
Fetching: https://your-domain.com/api/brief-planner
```

## Environment Files Priority

1. `.env.local` (highest priority, git-ignored)
2. `.env.example` (template only)
3. Default config in `apiConfig.ts`

## Production Deployment

For production showcase deployment:

1. **Set production environment:**
   ```bash
   VITE_USE_MOCK_API=false
   VITE_API_BASE_URL=https://your-production-domain.com
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   npm run preview  # Test production build
   ```

3. **Deploy static files:**
   Deploy the `dist/` folder to your static hosting service.

## API Compatibility

Your API should match the format from your original code:

```typescript
// Your Next.js API route structure
export async function POST(request: NextRequest) {
  const { messages, promptPath, conversationUuid, todos, briefs, media } = 
    await request.json();
    
  // Latitude SDK integration
  const result = await latitude.prompts.run("briefPlanner", {
    // ... your configuration
  });
  
  // SSE streaming response
  return new NextResponse(stream, { /* headers */ });
}
```

The showcase will work seamlessly with your existing API implementation!

## Support

If you encounter issues:

1. Check browser console for errors
2. Verify API server logs
3. Test API endpoints directly with curl/Postman
4. Ensure environment variables are loaded correctly

The showcase includes visual indicators to help debug API connectivity and mode selection.