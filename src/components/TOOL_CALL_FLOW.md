# Tool Call Flow Documentation

## Overview
This document describes how the ChatWrapper component handles tool calls from the AI response stream and triggers follow-up requests with tool results.

## Flow Diagram

```
User Message → API Request → Stream Response → Detect ### → Extract Tool JSON →
Execute Tool → onToolResult Callback → Parent Triggers New Request with Results
```

## Detailed Flow

### 1. Detection Phase (lines 265-273)
**Trigger:** System detects `###` marker in `text-delta` stream event

**Actions:**
- Sets `isHandlingTool = true`
- Blocks message updates: `shouldUpdateMessageRef = false`
- Shows reasoning indicator: "🔧 Waiting for tool call completion..."
- Prevents tool call from appearing in chat UI

**Code Location:** `ChatWrapper.tsx:265-273`

```typescript
if (event.data.textDelta === "###") {
  setIsHandlingTool(true);
  shouldUpdateMessageRef.current = false;
  setIsThinking(true);
  setReasoningContent("🔧 Waiting for tool call completion...");
  return; // Don't add to message content
}
```

### 2. Extraction Phase (lines 114-134)
**Trigger:** `provider-completed` event fires while `isHandlingTool === true` && `event.data.response?.text` exists

**Actions:**
- Extracts JSON from response text using regex: `/###:\s*(\{[\s\S]*?\})/`
- Parses JSON to get tool call structure:
  ```json
  {
    "toolName": "string",
    "parameters": { /* tool parameters */ }
  }
  ```
- Updates reasoning: `🔧 Executing tool: ${toolName}...`

**Code Location:** `ChatWrapper.tsx:114-134`

```typescript
const toolCallMatch = responseText.match(/###:\s*(\{[\s\S]*?\})/);
if (toolCallMatch && toolCallMatch[1]) {
  const toolCallJson = toolCallMatch[1].trim();
  const toolCall = JSON.parse(toolCallJson);
  // ...
}
```

### 3. Execution Phase (lines 142-180)
**Trigger:** Tool call successfully parsed

**Actions:**
- Looks up tool function in `tools` registry: `tools[toolCall.toolName]`
- Executes tool: `toolFunction(toolCall.parameters || {})`
- Calls `config.onToolResult(toolName, result)` callback
- Updates assistant message with execution confirmation:
  ```
  *🔧 Executed {toolName}: {result.message}*
  ```
- If tool not found, shows error: `*❌ Tool {toolName} not available*`

**Code Location:** `ChatWrapper.tsx:142-180`

```typescript
if (toolCall.toolName && tools && tools[toolCall.toolName]) {
  const toolFunction = tools[toolCall.toolName];
  const result = toolFunction(toolCall.parameters || {});

  // Callback to parent component
  if (config.onToolResult) {
    config.onToolResult(toolCall.toolName, result);
  }

  // Update UI
  updateAssistantMessage((msg) => ({
    ...msg,
    content: msg.content + `\n\n*🔧 Executed ${toolCall.toolName}${
      result?.message ? ": " + result.message : ""
    }*`,
    isStreaming: false,
  }));
}
```

### 4. Follow-up Request Phase
**Trigger:** `config.onToolResult` callback fires with tool execution results

**Actions (Parent Component Responsibility):**
- Receive tool results in `onToolResult(toolName, result)` callback
- Construct new message with tool results
- Trigger new API request with tool results included

**Example Implementation:**
```typescript
<ChatWrapper
  config={{
    onToolResult: (toolName, result) => {
      // Parent component handles follow-up request
      // Option 1: Automatically send result back to AI
      // Option 2: Let user review and confirm
      // Option 3: Update UI state and wait for next user action
    }
  }}
  tools={{
    myTool: (params) => {
      // Execute tool logic
      return { success: true, data: "..." };
    }
  }}
  toolClients={[
    {
      name: "myTool",
      description: "Tool description",
      parameters: [/* ... */]
    }
  ]}
/>
```

### 5. Cleanup Phase (lines 202-206)
**Trigger:** After tool execution completes (success or error)

**Actions:**
- Resets `isHandlingTool = false`
- Clears `toolJsonBuffer = ""`
- Re-enables message updates: `shouldUpdateMessageRef.current = true`
- Clears thinking indicators: `setIsThinking(false)`, `setReasoningContent("")`

**Code Location:** `ChatWrapper.tsx:202-206`

## API Request Structure

### Initial Request (lines 497-505)
```typescript
const requestBody = {
  messages: [...messages, userMessage],
  promptPath: config.promptPath || "briefPlanner",
  conversationUuid,
  todos,
  briefs,
  media: media || [],
  toolClients: toolClients || [], // Tool schema definitions
};
```

### Tool Clients Schema
The `toolClients` parameter sends tool definitions to the API:

```typescript
type ToolParameter = {
  name: string;
  type: string;
  description: string;
  isRequired: boolean;
  schema: {
    type: string;
    properties?: Record<string, any>;
    required?: string[];
    additionalProperties?: boolean;
    $schema?: string;
    enum?: string[];
    items?: any;
  };
};

type ClientTool = {
  name: string;
  description: string;
  parameters: ToolParameter[];
};

type ClientTools = ClientTool[];
```

## Stream Event Types

### Relevant Events for Tool Handling

1. **text-delta** (provider-event)
   - Contains `event.data.textDelta`
   - Used to detect `###` marker

2. **provider-completed** (latitude-event)
   - Contains `event.data.response?.text`
   - Used to extract and execute tool call

3. **chain-completed** (latitude-event)
   - Marks end of entire chain
   - Contains conversation UUID

## Error Handling

### Extraction Errors
- Invalid JSON format → Shows `*❌ Invalid tool call format*`
- Parse error → Shows `*❌ Error processing tool call*`

### Execution Errors
- Tool not found → Shows `*❌ Tool {toolName} not available*`
- Logs warning to console with available tools

### Stream Errors
- Stream error → Calls `resetToolHandling()` to cleanup state
- API error → Calls `resetToolHandling()` and shows error message

## Best Practices

1. **Tool Registration:** Register all tools in the `tools` prop
2. **Tool Schema:** Provide complete `toolClients` schema for AI to understand available tools
3. **Callback Handling:** Implement `onToolResult` callback to handle tool execution results
4. **Error Feedback:** Tools should return structured results with success/error indicators
5. **Follow-up Requests:** Parent component should decide when/how to send tool results back to AI

## Example End-to-End Flow

1. User sends: "Check the weather in San Francisco"
2. AI responds with tool call marker: `###:{"toolName":"getWeather","parameters":{"city":"San Francisco"}}`
3. ChatWrapper detects `###`, sets `isHandlingTool=true`
4. On `provider-completed`, extracts and executes `getWeather({city: "San Francisco"})`
5. Tool returns: `{success: true, temperature: 65, condition: "Sunny"}`
6. `onToolResult("getWeather", {success: true, ...})` callback fires
7. Parent component constructs new message with weather data
8. New request sent to API with tool results
9. AI generates response incorporating weather data: "The weather in San Francisco is 65°F and sunny"
