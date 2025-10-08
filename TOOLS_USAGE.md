# ChatWrapper Tools Usage

This guide explains how to properly configure and use the `tools` prop with the ChatWrapper component.

## Overview

The `tools` prop allows you to define custom functions that can be called by the AI during conversations. These tools extend the chat functionality beyond basic text responses.

## Basic Usage

```tsx
import { ChatWrapper } from '@oddle/chat-wrapper-ui';

function App() {
  return (
    <ChatWrapper
      apiUrl="https://your-api-server.com"
      config={{
        mode: "sidebar",
        appName: "Customer Support",
        theme: "light",
        placeholder: "How can we help you today?",
      }}
      tools={{
        create_email: (subject: string, body: string) => {
          console.log('Creating email:', { subject, body });
          return { success: true, emailId: Date.now().toString() };
        },
        update_email: (emailId: string, updates: any) => {
          console.log('Updating email:', emailId, updates);
          return { success: true, emailId };
        },
      }}
    />
  );
}
```

## Tool Definition

Tools are defined as functions in the `tools` object:

```typescript
tools: {
  tool_name: (param1: Type1, param2: Type2) => ReturnType,
  another_tool: (param: string) => { success: boolean; data: any },
}
```

### Tool Function Requirements

1. **Function Name**: Use descriptive names with underscores (e.g., `create_email`, `get_weather`)
2. **Parameters**: Can accept any number of typed parameters
3. **Return Value**: Should return a meaningful result object
4. **Synchronous**: Tools should be synchronous functions (no async/await needed)

## Common Tool Examples

### 1. Data Management Tools

```tsx
tools={{
  create_task: (title: string, description: string, priority: 'low' | 'medium' | 'high') => {
    const task = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      status: 'open',
      created_at: new Date().toISOString(),
    };
    
    // Save to your state management or API
    saveTask(task);
    
    return { success: true, task };
  },
  
  update_task: (taskId: string, updates: Partial<Task>) => {
    const updatedTask = updateTaskInDatabase(taskId, updates);
    return { success: true, task: updatedTask };
  },
  
  delete_task: (taskId: string) => {
    deleteTaskFromDatabase(taskId);
    return { success: true, taskId };
  },
}}
```

### 2. External API Tools

```tsx
tools={{
  get_weather: (location: string) => {
    // In a real implementation, you'd call an external API
    const mockWeatherData = {
      location,
      temperature: Math.floor(Math.random() * 30) + 10,
      condition: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)],
      humidity: Math.floor(Math.random() * 100),
    };
    
    return { success: true, weather: mockWeatherData };
  },
  
  search_web: (query: string) => {
    // Mock web search results
    return {
      success: true,
      results: [
        { title: `Result 1 for ${query}`, url: 'https://example.com/1' },
        { title: `Result 2 for ${query}`, url: 'https://example.com/2' },
      ],
    };
  },
}}
```

### 3. User Interface Tools

```tsx
tools={{
  show_notification: (message: string, type: 'info' | 'warning' | 'error' | 'success') => {
    // Trigger a notification in your UI
    showToast(message, type);
    return { success: true, notificationId: Date.now().toString() };
  },
  
  open_modal: (modalType: string, data?: any) => {
    // Open a specific modal in your application
    openModalDialog(modalType, data);
    return { success: true, modalType };
  },
  
  navigate_to: (route: string) => {
    // Navigate to a specific route
    window.location.href = route;
    return { success: true, route };
  },
}}
```

### 4. Business Logic Tools

```tsx
tools={{
  calculate_price: (productId: string, quantity: number, discountCode?: string) => {
    const basePrice = getProductPrice(productId);
    const subtotal = basePrice * quantity;
    const discount = discountCode ? calculateDiscount(discountCode, subtotal) : 0;
    const total = subtotal - discount;
    
    return {
      success: true,
      pricing: {
        basePrice,
        quantity,
        subtotal,
        discount,
        total,
      },
    };
  },
  
  check_inventory: (productId: string) => {
    const inventory = getInventoryLevel(productId);
    return {
      success: true,
      productId,
      inStock: inventory > 0,
      quantity: inventory,
      status: inventory > 10 ? 'in_stock' : inventory > 0 ? 'low_stock' : 'out_of_stock',
    };
  },
}}
```

## Tool Integration with Chat

When you define tools, the AI can call them during conversations:

**User**: "Create a task to review the quarterly reports"

**AI**: "I'll create that task for you."

*[AI calls `create_task('Review quarterly reports', 'Review and analyze Q3 financial reports', 'high')`]*

**AI**: "I've created a high-priority task 'Review quarterly reports' for you. The task ID is 1234567890."

## Error Handling

Tools should handle errors gracefully:

```tsx
tools={{
  send_email: (to: string, subject: string, body: string) => {
    try {
      // Validate email
      if (!isValidEmail(to)) {
        return { success: false, error: 'Invalid email address' };
      }
      
      // Send email
      const emailId = sendEmailViaAPI(to, subject, body);
      
      return { success: true, emailId };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send email' 
      };
    }
  },
}}
```

## TypeScript Support

For better type safety, define tool interfaces:

```typescript
interface EmailTool {
  create_email: (subject: string, body: string) => { success: boolean; emailId?: string; error?: string };
  send_email: (emailId: string, to: string) => { success: boolean; error?: string };
}

interface WeatherTool {
  get_weather: (location: string) => { 
    success: boolean; 
    weather?: { location: string; temperature: number; condition: string }; 
    error?: string; 
  };
}

type MyTools = EmailTool & WeatherTool;

const tools: MyTools = {
  create_email: (subject, body) => ({ success: true, emailId: Date.now().toString() }),
  send_email: (emailId, to) => ({ success: true }),
  get_weather: (location) => ({ success: true, weather: { location, temperature: 22, condition: 'sunny' } }),
};
```

## Best Practices

### 1. Naming Convention
- Use descriptive, action-oriented names
- Use underscores for separation: `create_task`, not `createTask`
- Be consistent across all tools

### 2. Return Values
- Always include a `success` boolean
- Provide meaningful data in the response
- Include error messages when `success: false`

### 3. Parameter Validation
- Validate all input parameters
- Provide clear error messages for invalid inputs
- Use TypeScript types for parameter validation

### 4. Side Effects
- Keep tools focused on single responsibilities
- Log tool usage for debugging
- Handle asynchronous operations properly

### 5. Testing
- Test each tool function independently
- Mock external dependencies
- Verify error handling scenarios

## Real-World Example

Here's a complete example for a customer support chat:

```tsx
import { ChatWrapper } from '@oddle/chat-wrapper-ui';
import { createTicket, updateTicket, searchKnowledgeBase } from './api';

function CustomerSupportChat() {
  return (
    <ChatWrapper
      apiUrl="https://api.mycompany.com"
      config={{
        mode: "modal",
        appName: "Customer Support",
        theme: "light",
        placeholder: "How can we help you today?",
      }}
      tools={{
        create_ticket: (subject: string, description: string, priority: string) => {
          try {
            const ticket = createTicket({ subject, description, priority });
            return { 
              success: true, 
              ticket: {
                id: ticket.id,
                subject: ticket.subject,
                status: ticket.status,
                created_at: ticket.created_at,
              }
            };
          } catch (error) {
            return { success: false, error: 'Failed to create ticket' };
          }
        },
        
        search_kb: (query: string) => {
          try {
            const results = searchKnowledgeBase(query);
            return { 
              success: true, 
              articles: results.map(r => ({ title: r.title, summary: r.summary, url: r.url }))
            };
          } catch (error) {
            return { success: false, error: 'Search failed' };
          }
        },
        
        escalate_to_human: (ticketId: string, reason: string) => {
          try {
            updateTicket(ticketId, { status: 'escalated', escalation_reason: reason });
            return { success: true, message: 'Ticket escalated to human agent' };
          } catch (error) {
            return { success: false, error: 'Escalation failed' };
          }
        },
      }}
    />
  );
}
```

This creates a powerful customer support chat that can create tickets, search knowledge bases, and escalate issues - all through natural conversation!

## Debugging Tools

To debug tool usage, check the browser console. The ChatWrapper logs available tools when they're provided:

```
Available tools: ["create_email", "update_email", "get_weather"]
```

You can also add logging within your tool functions to track their usage and parameters.