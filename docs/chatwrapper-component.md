# ChatWrapper Component Documentation

## Overview

The `ChatWrapper` is the main component of the Oddle Chat UI library. It provides a complete chat interface with WebSocket-based real-time messaging, tool integration, and multiple display modes. This component handles all aspects of chat functionality including message streaming, tool execution, connection management, and UI interactions.

## Table of Contents

1. [Installation & Basic Usage](#installation--basic-usage)
2. [Props Reference](#props-reference)
3. [Configuration Options](#configuration-options)
4. [Display Modes](#display-modes)
5. [Tool Integration](#tool-integration)
6. [Event Handling](#event-handling)
7. [Advanced Features](#advanced-features)
8. [Examples](#examples)
9. [Troubleshooting](#troubleshooting)

## Installation & Basic Usage

### Installation

```bash
npm install @oddle/chat-wrapper-ui
```

### Basic Setup

```typescript
import React from 'react';
import { ChatWrapper } from '@oddle/chat-wrapper-ui';
import '@oddle/chat-wrapper-ui/dist/style.css';

function App() {
  return (
    <ChatWrapper
      apiUrl="wss://your-api.com"
      app="Host"
      config={{
        mode: "embedded",
        appName: "Your App",
        description: "Chat with our AI assistant"
      }}
    />
  );
}
```

## Props Reference

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `apiUrl` | `string` | WebSocket URL for the chat API (e.g., "wss://api.example.com") |
| `app` | `"UD21" \| "Host" \| "Reserve"` | Application context identifier |
| `config` | `ChatConfig` | Configuration object for chat behavior and appearance |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tools` | `Record<string, Function>` | `undefined` | Client-side tools available for execution |
| `clientTools` | `ClientTools` | `undefined` | Tool schemas for client-side validation |
| `initialMessages` | `Message[]` | `[]` | Pre-populate chat with existing messages |
| `userId` | `string` | `undefined` | Unique identifier for the current user |
| `devMode` | `boolean` | `false` | Enable developer mode with additional debugging features |
| `contextHelpers` | `ContextHelpers` | `undefined` | Additional context data for the chat session |

## Configuration Options

The `config` prop accepts a `ChatConfig` object with the following properties:

### Core Configuration

```typescript
interface ChatConfig {
  mode: ChatMode;                    // Display mode
  position?: ChatPosition;           // Position for floating modes
  appName: string;                   // Application name displayed in header
  apiEndpoint: string;               // API endpoint (inherited from apiUrl)
  theme?: ChatTheme;                 // Visual theme
  description?: string;              // App description shown in header
}
```

### UI Customization

```typescript
interface ChatConfig {
  // Input customization
  placeholder?: string;              // Default input placeholder
  placeholderTexts?: string[];       // Rotating placeholder texts
  welcomeMessage?: string;           // Initial welcome message
  
  // Branding
  restaurantName?: string;           // Restaurant name chip
  restaurantLogo?: string;           // Logo URL for restaurant chip
  bubbleText?: string;               // Text shown on floating bubble
  
  // Layout
  constrainedHeight?: boolean;       // Fill parent container completely
  headerVisible?: boolean;           // Show/hide header section
  customStyles?: React.CSSProperties; // Custom CSS styles
}
```

### Feature Toggles

```typescript
interface ChatConfig {
  features?: {
    fileUpload?: boolean;            // Enable file upload
    voiceInput?: boolean;            // Enable voice input (future)
    messageHistory?: boolean;        // Enable message history
    exportChat?: boolean;            // Enable chat export
    showToolResults?: boolean;       // Show tool execution results
    showBubbleText?: boolean;        // Show text on floating bubble
  };
}
```

### Event Handlers

```typescript
interface ChatConfig {
  onMessage?: (message: Message) => void;              // Message received
  onError?: (error: Error) => void;                   // Error occurred
  onToolResult?: (tool: string, result: any) => void; // Tool executed
  onStreamingStatusChange?: (status: string) => void; // Streaming status
}
```

### Advanced Options

```typescript
interface ChatConfig {
  promptPath?: string;               // Custom prompt path for AI
  endpoint?: "brief-planner" | "conversation"; // API endpoint type
  suggestedPrompts?: Array<{         // Pre-defined prompt suggestions
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>;
}
```

## Display Modes

The ChatWrapper supports four different display modes:

### 1. Embedded Mode
```typescript
config={{
  mode: "embedded",
  constrainedHeight: true  // Optional: fill parent container
}}
```
- Integrates directly into your existing UI
- Respects parent container dimensions
- No overlay or floating behavior

### 2. Modal Mode  
```typescript
config={{
  mode: "modal"
}}
```
- Opens as a centered overlay modal
- Includes backdrop and close button
- Ideal for on-demand chat access

### 3. Sidebar Mode
```typescript
config={{
  mode: "sidebar", 
  position: "right"  // or "left"
}}
```
- Fixed sidebar panel
- Can be positioned left or right
- Collapsible with floating bubble when minimized

### 4. Fullscreen Mode
```typescript
config={{
  mode: "fullscreen"
}}
```
- Takes over the entire viewport
- Full immersive chat experience
- Includes minimize/close controls

## Tool Integration

### Client-Side Tools

Define tools that execute in the browser:

```typescript
const tools = {
  getCurrentTime: () => {
    return new Date().toISOString();
  },
  
  showNotification: (message: string) => {
    alert(message);
    return { success: true, message };
  }
};

const clientTools = [
  {
    name: "getCurrentTime",
    description: "Get the current timestamp",
    parameters: []
  },
  {
    name: "showNotification", 
    description: "Display a notification to the user",
    parameters: [
      {
        name: "message",
        type: "string", 
        description: "Message to display",
        isRequired: true,
        schema: { type: "string" }
      }
    ]
  }
];

<ChatWrapper
  tools={tools}
  clientTools={clientTools}
  // ... other props
/>
```

### Tool Execution Flow

1. AI determines a tool should be called
2. Tool request is sent to ChatWrapper
3. If client-side tool exists, it executes locally
4. Results are sent back to the AI
5. AI continues with the response

## Event Handling

### Message Events

```typescript
config={{
  onMessage: (message) => {
    console.log('New message:', message);
    // Handle incoming messages
  },
  
  onError: (error) => {
    console.error('Chat error:', error);
    // Handle errors
  },
  
  onToolResult: (toolName, result) => {
    console.log(`Tool ${toolName} result:`, result);
    // Handle tool execution results
  },
  
  onStreamingStatusChange: (status) => {
    console.log('Streaming status:', status);
    // Handle streaming state changes
  }
}}
```

### System Events

The ChatWrapper internally handles various system events:
- Connection establishment/loss
- Reconnection attempts
- Chat completion
- Tool execution status
- Error states

## Advanced Features

### Developer Mode

Enable additional debugging and development features:

```typescript
<ChatWrapper
  devMode={true}
  // ... other props
/>
```

Developer mode provides:
- Connection status indicators
- WebSocket state information
- Advanced debugging tools
- Development settings panel

### Message History

Load existing conversation:

```typescript
const existingMessages = [
  {
    id: "1",
    role: "user",
    content: "Hello!",
    timestamp: new Date()
  },
  {
    id: "2", 
    role: "assistant",
    content: "Hi there! How can I help you?",
    timestamp: new Date()
  }
];

<ChatWrapper
  initialMessages={existingMessages}
  // ... other props
/>
```

### Context Helpers

Provide additional context to the AI:

```typescript
const contextHelpers = {
  userPreferences: {
    language: "en",
    timezone: "UTC"
  },
  sessionData: {
    authenticated: true,
    role: "admin"
  }
};

<ChatWrapper
  contextHelpers={contextHelpers}
  // ... other props
/>
```

### Custom Styling

Override default styles:

```typescript
config={{
  customStyles: {
    '--chat-primary-color': '#007bff',
    '--chat-background-color': '#ffffff', 
    '--chat-text-color': '#333333'
  }
}}
```

## Examples

### Complete Restaurant Chat

```typescript
import React from 'react';
import { ChatWrapper } from '@oddle/chat-wrapper-ui';

function RestaurantChat() {
  const tools = {
    makeReservation: async (params) => {
      // Handle reservation logic
      return { success: true, confirmationId: "R123" };
    },
    
    checkAvailability: async (date, time, guests) => {
      // Check table availability
      return { available: true, tables: ["Table 5", "Table 8"] };
    }
  };

  const clientTools = [
    {
      name: "makeReservation",
      description: "Make a restaurant reservation",
      parameters: [
        {
          name: "params",
          type: "object",
          description: "Reservation parameters",
          isRequired: true,
          schema: {
            type: "object",
            properties: {
              date: { type: "string" },
              time: { type: "string" },
              guests: { type: "number" },
              name: { type: "string" },
              phone: { type: "string" }
            },
            required: ["date", "time", "guests", "name", "phone"]
          }
        }
      ]
    }
  ];

  return (
    <ChatWrapper
      apiUrl="wss://api.restaurant.com"
      app="Reserve"
      userId="user123"
      tools={tools}
      clientTools={clientTools}
      config={{
        mode: "modal",
        appName: "Restaurant Reservations",
        description: "Book your table with our AI assistant",
        restaurantName: "Bella Vista",
        restaurantLogo: "/logo.png",
        bubbleText: "Book a Table",
        theme: "light",
        features: {
          fileUpload: false,
          showToolResults: true,
          messageHistory: true
        },
        suggestedPrompts: [
          {
            title: "Make a Reservation",
            description: "Book a table for tonight"
          },
          {
            title: "Check Availability", 
            description: "See available time slots"
          },
          {
            title: "Special Requests",
            description: "Dietary restrictions or special occasions"
          }
        ],
        onMessage: (message) => {
          console.log('New message received:', message);
        },
        onToolResult: (tool, result) => {
          if (tool === 'makeReservation' && result.success) {
            // Handle successful reservation
            alert(`Reservation confirmed! ID: ${result.confirmationId}`);
          }
        }
      }}
    />
  );
}
```

### Embedded Support Chat

```typescript
function SupportChat() {
  return (
    <div style={{ height: '500px', border: '1px solid #ccc' }}>
      <ChatWrapper
        apiUrl="wss://support-api.com"
        app="Host"
        userId="customer456"
        config={{
          mode: "embedded",
          appName: "Customer Support",
          description: "Get help from our support team",
          constrainedHeight: true,
          headerVisible: true,
          placeholder: "Describe your issue...",
          features: {
            fileUpload: true,
            exportChat: true,
            messageHistory: true
          }
        }}
      />
    </div>
  );
}
```

### Floating Sidebar Chat

```typescript
function FloatingSidebar() {
  return (
    <ChatWrapper
      apiUrl="wss://chat-api.com"
      app="UD21"
      config={{
        mode: "sidebar",
        position: "right",
        appName: "AI Assistant", 
        bubbleText: "Chat",
        theme: "auto",
        features: {
          showBubbleText: true
        }
      }}
    />
  );
}
```

## Troubleshooting

### Common Issues

**WebSocket Connection Failed**
```typescript
config={{
  onError: (error) => {
    if (error.message.includes('WebSocket')) {
      console.log('Check your apiUrl and network connection');
    }
  }
}}
```

**Tools Not Executing**
- Ensure tool names match between `tools` and `clientTools`
- Verify tool parameter schemas are correct
- Check browser console for execution errors

**Styling Issues**
- Import the CSS file: `import '@oddle/chat-wrapper-ui/dist/style.css'`
- Check for CSS conflicts with existing styles
- Use `customStyles` prop for theme overrides

**Performance Issues**
- Limit `initialMessages` array size
- Implement proper error boundaries
- Monitor WebSocket connection health

### Debug Mode

Enable debug logging:

```typescript
<ChatWrapper
  devMode={true}
  config={{
    onStreamingStatusChange: (status) => {
      console.log('Debug - Streaming:', status);
    },
    onError: (error) => {
      console.error('Debug - Error:', error);
    }
  }}
/>
```

### Browser Compatibility

- **Modern Browsers**: Full support (Chrome 80+, Firefox 75+, Safari 13+)
- **WebSocket Support**: Required
- **ES6+ Features**: Used throughout the component
- **Mobile**: Responsive design included

## API Reference

For detailed type definitions and additional interfaces, refer to:
- [Type Definitions](../src/types/index.ts)
- [Client WebSocket Workflow](./client-websocket-workflow.md)
- [GitHub Repository](https://github.com/oddle/chat-wrapper-ui)