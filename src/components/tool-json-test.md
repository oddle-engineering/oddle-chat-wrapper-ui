# Tool Call Detection - Updated Flow

## How it works

The ChatWrapper now detects tool calls using the "###" signature pattern with provider-completed event handling:

1. **Start Detection**: When `textDelta === "###"` is received
2. **Message Update Block**: `shouldUpdateMessage` flag is set to `false` to prevent any message updates during tool processing
3. **Wait Phase**: Tool handling mode is activated, ignoring subsequent text deltas
4. **Completion Detection**: Wait for `provider-completed` event
5. **Tool Extraction**: Parse tool call from `event.data.response.text`
6. **Tool Execution**: Execute the extracted tool
7. **Message Update Resume**: `shouldUpdateMessage` flag is reset to `true` to allow normal message updates

## Visual Flow

```
Stream sequence:
1. textDelta: "###" → Start tool mode
2. textDelta: ": {" → Ignored (tool mode active)
3. textDelta: '"signature"' → Ignored (tool mode active)
4. textDelta: ': "CLIENT_TOOL_CALL"' → Ignored (tool mode active)
5. textDelta: ',' → Ignored (tool mode active)
6. textDelta: '"toolName"' → Ignored (tool mode active)
7. textDelta: ': "add_random_item_to_shop"' → Ignored (tool mode active)
8. textDelta: '}' → Ignored (tool mode active)
9. provider-completed: { response: { text: "###: {...}" } } → Parse and execute tool
```

## UI States

- **Normal streaming**: Regular text appears in message
- **Tool detection**: Shows reasoning panel with "🔧 Waiting for tool call completion..."
- **Tool processing**: Shows "🔧 Tool call in progress..."
- **Tool execution**: Shows "🔧 Executing tool: {toolName}..."
- **Tool complete**: Adds execution confirmation to message

## Expected Tool JSON Format in provider-completed

Based on your test2.json, the expected format is:

```json
{
  "signature": "CLIENT_TOOL_CALL",
  "toolName": "add_random_item_to_shop"
}
```

The system extracts this from the `response.text` field which contains:

```
###: {
  "signature": "CLIENT_TOOL_CALL",
  "toolName": "add_random_item_to_shop"
}
```

## Error Handling

- If tool JSON extraction fails, shows "❌ Invalid tool call format"
- If tool is not registered, shows "❌ Tool {name} not available"
- If parsing fails, shows "❌ Error processing tool call"
- Tool handling state is reset on errors, stream completion, or manual stop

## Console Logging

- `🔧 Tool call detection: Starting tool call request...`
- `🔧 Tool call completed, processing: {responseText}`
- `🔧 Extracted tool JSON: {json}`
- `🔧 Parsed tool call: {parsed}`
- `✅ Tool {name} executed: {result}`
