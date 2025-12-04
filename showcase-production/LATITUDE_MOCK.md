# Latitude SDK Mock API

This document describes the mock implementation of your Latitude SDK-powered API endpoint, designed to simulate the exact behavior of your Next.js API route.

## Overview

The mock API simulates:
- 🤖 **Latitude SDK streaming responses** with realistic event structure
- 🛠️ **Tool usage** (create_to_do, read_to_dos, create_brief, read_briefs)
- 🏢 **Middle Child Bar brand data** integration
- 📡 **Server-Sent Events (SSE)** streaming
- ⚡ **Real-time todo and brief management**

## Files Structure

```
showcase/src/api/
├── mockApi.ts           # Main mock API with endpoint routing
└── mockLatitudeApi.ts   # Latitude SDK simulation
```

## Mock API Features

### 1. Streaming Response Simulation

The mock API perfectly simulates your Latitude SDK streaming events:

```typescript
// Events sent during streaming:
- "chain-started"     // Planning chain initiated
- "step-started"      // Processing step begins  
- "text-delta"        // Streaming text chunks
- "tool-result"       // Tool execution results
- "provider-completed" // AI response finished
- "chain-completed"   // Full chain finished
```

### 2. Tool Implementation

All tools from your original API are implemented:

#### `create_to_do`
- Creates new todos with title and description
- Updates frontend state in real-time
- Returns todo object with ID and timestamp

#### `read_to_dos` 
- Retrieves current todo list
- Provides count and status breakdown
- Sends updated state to frontend

#### `create_brief`
- Generates marketing briefs with markdown content
- Calculates word and character counts
- Stores briefs for future reference

#### `read_briefs`
- Lists all created briefs
- Provides summary statistics
- Updates frontend brief panel

### 3. Brand Data Integration

The mock includes complete Middle Child Bar data:

```typescript
{
  name: "Middle Child Bar",
  locale: "en_SG", 
  website: "https://www.middlechild.party/",
  meta_data: {
    slogans: ["Often overlooked but never unloved", ...],
    signature_dishes: ["Grilled Chicken Thigh", ...],
    brand_history: "Opened in 2024 in Bugis...",
    // ... complete brand information
  }
}
```

### 4. Intelligent Response Generation

The mock generates contextual responses based on user input:

- **Brief/Planning queries** → Comprehensive brief planning responses
- **Todo/Task requests** → Task management focused replies  
- **Middle Child mentions** → Brand-specific responses
- **General queries** → Standard AI assistant responses

## Usage Examples

### Test Brief Planning
```
"Create a marketing brief for Middle Child Bar's summer campaign"
```
**Result**: Generates detailed brief + creates relevant todos

### Test Todo Management  
```
"Help me organize tasks for the restaurant launch"
```
**Result**: Creates multiple todos + provides organization tips

### Test Brand Knowledge
```
"Tell me about Middle Child Bar's signature dishes"
```
**Result**: Uses brand data to provide specific dish information

## Integration with Showcase

The mock API is automatically used when the showcase detects `/api/brief-planner` requests:

```typescript
// Automatically intercepted by mock
fetch('/api/brief-planner', {
  method: 'POST',
  body: JSON.stringify({
    messages,
    promptPath: 'briefPlanner', 
    conversationUuid,
    todos,
    briefs,
    media
  })
})
```

## Event Structure

### Tool Result Events
```json
{
  "type": "tool-result",
  "tool": "create_to_do",
  "data": {
    "id": "abc123",
    "title": "Plan Campaign",
    "description": "Create summer marketing campaign",
    "status": "pending",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  "todos": [...] // Updated todos array
}
```

### Text Streaming Events
```json
{
  "type": "event",
  "event": "provider-event", 
  "data": {
    "type": "text-delta",
    "textDelta": " marketing"
  }
}
```

### Completion Events
```json
{
  "type": "finished",
  "uuid": "conversation-uuid-123",
  "result": {
    "response": { "text": "Complete response text" },
    "uuid": "conversation-uuid-123"
  }
}
```

## Real API Comparison

| Feature | Mock API | Real Latitude API |
|---------|----------|-------------------|
| Streaming | ✅ SSE simulation | ✅ Real SSE |
| Tools | ✅ All 4 tools | ✅ Same tools |
| Brand Data | ✅ Complete dataset | ✅ Same data |
| Event Structure | ✅ Identical format | ✅ Original format |
| UUID Management | ✅ Conversation tracking | ✅ Real tracking |

## Testing Scenarios

### 1. Basic Chat Flow
1. Send initial message
2. Observe streaming response
3. Check conversation UUID is set
4. Send follow-up message
5. Verify continued conversation

### 2. Todo Management
1. Ask to create todos
2. Watch real-time sidebar updates
3. Verify todo data structure
4. Test reading existing todos

### 3. Brief Generation
1. Request marketing brief
2. Observe streaming brief creation
3. Check brief panel updates
4. Verify markdown content

### 4. Error Handling
1. Test malformed requests
2. Verify error events are sent
3. Check graceful recovery

## Configuration

No configuration needed - the mock API is automatically enabled when you start the showcase:

```bash
npm run showcase
```

The mock intercepts all `/api/brief-planner` requests and provides realistic simulation of your Latitude SDK endpoint.

## Development Notes

- **Realistic Delays**: Mock includes realistic network delays
- **Dynamic Responses**: Responses adapt to user input content
- **State Management**: Todos and briefs persist during session
- **Error Simulation**: Can be modified to test error scenarios
- **Brand Awareness**: Uses actual Middle Child Bar data for authenticity

Perfect for testing your chat wrapper integration before connecting to the real Latitude API!