# Tools Demo Guide

This guide shows you how to test the tools functionality in each ChatWrapper demo mode.

## 🎯 How to Test Tools

1. **Launch any demo** from the showcase
2. **Type natural language requests** to trigger tools
3. **Check the browser console** to see tool execution logs
4. **View tool results** in the chat interface

## 📋 Demo Scenarios by Mode

### 🏢 Sidebar Mode - Customer Support Tools

**Scenario: Customer needs help with login issues**

Try these prompts:
```
"I can't log into my account, can you help me?"
"Create a ticket for my login problem with high priority"
"Search the knowledge base for password reset instructions"
"Can you look up my user information? My ID is user123"
"I need to speak to a human agent about billing"
```

**Expected Tools:**
- `create_ticket` - Creates support tickets
- `search_knowledge_base` - Finds help articles
- `get_user_info` - Retrieves user data
- `escalate_to_human` - Transfers to human agent

---

### 💬 Modal Mode - AI Assistant Tools

**Scenario: Personal AI assistant for daily tasks**

Try these prompts:
```
"What's the weather like in New York?"
"Set a reminder to call mom at 3pm tomorrow"
"Calculate 15% tip on a $45 bill"
"Search the web for React tutorials"
"What's 125 * 8 + 200?"
```

**Expected Tools:**
- `get_weather` - Weather information
- `set_reminder` - Schedule reminders
- `calculate` - Math calculations
- `search_web` - Web search results

---

### 🖥️ Fullscreen Mode - Premium Support Tools

**Scenario: System administrator managing infrastructure**

Try these prompts:
```
"Diagnose the database performance issues"
"Deploy fix FIX-123 to the production environment"
"Generate a performance report for the last 30 days"
"Schedule maintenance for tomorrow at 2am for 4 hours"
"Check the API server status"
```

**Expected Tools:**
- `diagnose_system` - System diagnostics
- `deploy_fix` - Deploy fixes
- `generate_report` - Create reports
- `schedule_maintenance` - Plan maintenance

---

### 📱 Embedded Mode - Help Center Tools

**Scenario: User seeking documentation help**

Try these prompts:
```
"Search docs for API authentication examples"
"I need help with integration, create a support ticket"
"What's the status of the payment service?"
"Find documentation about webhooks"
```

**Expected Tools:**
- `search_docs` - Documentation search
- `create_ticket` - Help tickets
- `get_status` - Service status

---

### ⚙️ Custom Demo - Advanced Business Tools

**Scenario: Project manager using business tools**

Try these prompts:
```
"Create a task to review code, assign it to John, due tomorrow"
"Send a warning notification about the system update"
"Search the database for customer orders in the users table"
"Export sales data as Excel with last month's filters"
"Analyze CPU usage metrics for the last 7 days"
```

**Expected Tools:**
- `create_task` - Task management
- `send_notification` - Notifications
- `search_database` - Database queries
- `export_data` - Data export
- `analyze_metrics` - Performance analysis

---

## 🔧 Debugging Tools

### Browser Console Logs
Open Developer Tools (F12) → Console tab to see:
```javascript
Available tools: ["create_ticket", "search_knowledge_base", ...]
Sending request to: http://localhost:3000/api/brief-planner
Request payload: { messages: [...], tools: [...] }
Creating support ticket: { title: "Login Issues", ... }
Tool result received: { success: true, ticketId: "TICK-123" }
```

### Tool Results in Chat
- Look for structured responses from tools
- Check for IDs, timestamps, and formatted data
- Verify tool success/error states

### Network Tab
Check the Network tab in DevTools to see:
- API requests to `/api/brief-planner` or `/api/conversation`
- Request payloads with tool names
- SSE streaming responses

## 💡 Tips for Testing

1. **Be Natural**: Use conversational language, not function calls
2. **Be Specific**: Include details like "high priority" or "due tomorrow"
3. **Try Variations**: Same task, different wording
4. **Check Console**: Always check browser console for tool execution
5. **Test Errors**: Try invalid inputs to see error handling

## 🎨 Custom Tool Examples

Want to add your own tools? Here's the pattern:

```typescript
tools: {
  your_tool: (param1: string, param2?: number) => {
    console.log('Tool executed:', { param1, param2 });
    return {
      success: true,
      data: 'Your tool result',
      timestamp: new Date().toISOString()
    };
  }
}
```

The AI will automatically understand how to use your tools based on their names and parameters!