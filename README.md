# Chat Wrapper UI

A reusable, lightweight chat interface component built with pure CSS and React. Features advanced streaming support, tool integration, and no external UI library dependencies.

## Features

- 🎨 **Pure CSS** - No external UI library dependencies
- 🔧 **Configurable API URL** - Pass your API endpoint as a prop
- 🎭 **Multiple Modes** - Sidebar, fullscreen, modal, or embedded
- 🌙 **Theme Support** - Light, dark, and auto themes
- 📱 **Responsive** - Mobile-friendly design
- ⚡ **Lightweight** - Minimal bundle size
- 🎯 **TypeScript** - Full TypeScript support
- 🔄 **Streaming Support** - Real-time SSE streaming with event processing
- 🛠️ **Tool Integration** - Built-in tool result processing and callbacks
- 💬 **Conversation Management** - Automatic conversation tracking and state management

## Installation

### Latest Stable Version
```bash
npm install @oddle/chat-wrapper-ui@latest
```

### Specific Version
```bash
npm install @oddle/chat-wrapper-ui@1.0.8
```

### Beta Releases
```bash
npm install @oddle/chat-wrapper-ui@beta
```

## Version Support

This package follows [Semantic Versioning](https://semver.org/). See [VERSIONING.md](./VERSIONING.md) for detailed versioning strategy.

- **Current Version**: 1.0.8
- **Stability**: Stable
- **Support**: Active development

### Update Strategy
```bash
# Recommended: Pin to specific minor version for stability
npm install @oddle/chat-wrapper-ui@^1.0.0

# Latest features (more frequent updates)
npm install @oddle/chat-wrapper-ui@latest

# For testing new features
npm install @oddle/chat-wrapper-ui@beta
```

## Quick Start

```bash
npm install @oddle/chat-wrapper-ui
```

## Basic Usage

```tsx
import { ChatWrapper, Tools } from "@oddle/chat-wrapper-ui";

function App() {
  // Define tools with unified schema and execution functions
  const tools: Tools = [
    {
      name: "create_email",
      description: "Create and send an email",
      parameters: {
        type: "object",
        properties: {
          subject: { type: "string", description: "Email subject" },
          body: { type: "string", description: "Email body content" }
        },
        required: ["subject", "body"]
      },
      execute: async (params: { subject: string; body: string }) => {
        // Handle email creation
        console.log("Creating email:", params);
        return { success: true, emailId: Date.now().toString() };
      }
    },
    {
      name: "get_weather",
      description: "Get current weather for a location",
      parameters: {
        type: "object",
        properties: {
          location: { type: "string", description: "City or location name" }
        },
        required: ["location"]
      },
      execute: async (params: { location: string }) => {
        // Handle weather request
        console.log("Getting weather for:", params.location);
        return { location: params.location, temperature: 22, condition: "sunny" };
      }
    }
  ];

  return (
    <ChatWrapper
      // Authentication props
      userMpAuthToken="your-auth-token"
      chatServerUrl="wss://your-chat-server.com"
      chatServerKey="your-server-key"
      userId="user-123"
      
      // App identification
      app="UD21" // or "Host", "Reserve"
      
      // Configuration
      config={{
        mode: "sidebar",
        position: "right",
        appName: "Customer Support",
        theme: "light",
        placeholder: "How can we help you today?",
      }}
      
      // Unified tools with schema and execution
      tools={tools}
    />
  );
}
```

## Advanced Usage with Streaming & Tools

```tsx
import { ChatWrapper, Tools } from "@oddle/chat-wrapper-ui";
import { useState } from "react";

function AdvancedChat() {
  const [todos, setTodos] = useState([]);
  const [briefs, setBriefs] = useState([]);

  // Define tools with complete schema and execution functions
  const tools: Tools = [
    {
      name: "create_todo",
      description: "Create a new todo item",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string", description: "Todo title" },
          description: { type: "string", description: "Todo description" }
        },
        required: ["title", "description"]
      },
      execute: async (params: { title: string; description: string }) => {
        console.log('Creating todo:', params);
        const newTodo = { id: Date.now().toString(), ...params, completed: false };
        setTodos(prev => [...prev, newTodo]);
        return { success: true, todoId: newTodo.id };
      }
    },
    {
      name: "create_brief",
      description: "Create a new brief document",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string", description: "Brief title" },
          content: { type: "string", description: "Brief content" }
        },
        required: ["title", "content"]
      },
      execute: async (params: { title: string; content: string }) => {
        console.log('Creating brief:', params);
        const newBrief = { id: Date.now().toString(), ...params, createdAt: new Date() };
        setBriefs(prev => [...prev, newBrief]);
        return { success: true, briefId: newBrief.id };
      }
    }
  ];

  return (
    <ChatWrapper
      // Required authentication props
      userMpAuthToken="your-auth-token"
      chatServerUrl="wss://your-chat-server.com"
      chatServerKey="your-server-key"
      userId="user-123"
      
      // App identification
      app="UD21"
      
      // Configuration
      config={{
        mode: "embedded",
        appName: "AI Assistant",
        theme: "light",
        features: {
          showToolResults: true,
          messageHistory: true,
        },
        onStreamingStatusChange: (status) => {
          console.log('Streaming status:', status);
        },
        onError: (error) => {
          console.error('Chat error:', error);
        },
      }}
      
      // Unified tools with schema and execution
      tools={tools}
    />
  );
}
```

## Configuration

The `ChatWrapper` component accepts the following props:

### Authentication Props (required)

| Property              | Type     | Description                                           |
| --------------------- | -------- | ----------------------------------------------------- |
| `userMpAuthToken`     | `string` | Authentication token for API requests and WebSocket  |
| `chatServerUrl`       | `string` | WebSocket server URL (e.g., "wss://server.com")      |
| `chatServerKey`       | `string` | Server identification key (UD21, Host, Reserve)      |
| `userId`              | `string` | User identification                                   |

### Optional Props

| Property              | Type                    | Description                                           |
| --------------------- | ----------------------- | ----------------------------------------------------- |
| `providerResId`       | `string`                | Provider resource ID (auto-generated if empty)       |
| `entityId`            | `string`                | Entity ID (brandId or accountId)                     |
| `entityType`          | `EntityType`            | Entity type (BRAND, ACCOUNT, USER)                   |
| `app`                 | `App`                   | App identification (UD21, Host, Reserve)             |
| `tools`               | `Tools`                 | Array of tool objects with schema and execution      |
| `devMode`             | `boolean`               | Enable developer mode features                        |
| `contextHelpers`      | `ContextHelper[]`       | Context helpers for enhanced functionality            |

### `config` (object, required)

Configuration object with the following properties:

| Property                   | Type                                                 | Required | Description                                       |
| -------------------------- | ---------------------------------------------------- | -------- | ------------------------------------------------- |
| `mode`                     | `'sidebar' \| 'fullscreen' \| 'modal' \| 'embedded'` | ✅       | Display mode                                      |
| `appName`                  | `string`                                             | ✅       | Application name shown in header                  |
| `position`                 | `'left' \| 'right'`                                  | ❌       | Sidebar position (only for sidebar mode)         |
| `theme`                    | `'light' \| 'dark' \| 'auto'`                        | ❌       | Color theme                                       |
| `apiKey`                   | `string`                                             | ❌       | API authentication key                            |
| `placeholder`              | `string`                                             | ❌       | Input placeholder text                            |
| `welcomeMessage`           | `string`                                             | ❌       | Initial welcome message                           |
| `endpoint`                 | `'conversation' \| 'brief-planner'`                  | ❌       | API endpoint type (default: 'conversation')      |
| `customStyles`             | `React.CSSProperties`                                | ❌       | Custom CSS styles                                 |
| `features`                 | `object`                                             | ❌       | Feature toggles (see below)                       |
| `onMessage`                | `(message: Message) => void`                         | ❌       | Message callback                                  |
| `onError`                  | `(error: Error) => void`                             | ❌       | Error callback                                    |
| `onToolResult`             | `(tool: string, result: any) => void`                | ❌       | Tool result callback                              |
| `onStreamingStatusChange`  | `(status: string) => void`                           | ❌       | Streaming status change callback                  |

### `tools` (array, optional)

An array of tool objects that combine schema definition and execution function:

```tsx
tools?: Tools // Array of Tool objects

interface Tool {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
  execute: (params: any) => Promise<any> | any;
}
```

#### Tool Benefits
- **Unified Definition**: Schema and execution in single object
- **Type Safety**: Full TypeScript support for parameters
- **Automatic Filtering**: Execution functions filtered from server communication
- **Simplified API**: No separate `clientTools` and `toolExecutors` props

#### Example Tool Definition
```tsx
const tools: Tools = [
  {
    name: "search_products",
    description: "Search for products in the database",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        category: { type: "string", description: "Product category" },
        limit: { type: "number", description: "Max results" }
      },
      required: ["query"]
    },
    execute: async (params: { query: string; category?: string; limit?: number }) => {
      // Your implementation here
      return { results: [], total: 0 };
    }
  }
];
```

### Features Object

```tsx
features?: {
  fileUpload?: boolean;
  voiceInput?: boolean;
  messageHistory?: boolean;
  exportChat?: boolean;
  showToolResults?: boolean; // Display tool results in the UI
}
```

## API Integration

### Standard Conversation API

Your API server should support the following endpoints:

#### Initialize Conversation
- **POST** `/api/conversation/init`
- **Response**: `{ conversationId: string }`

#### Send Message
- **POST** `/api/conversation/{conversationId}`
- **Body**: `{ message: string, tools?: string[] }`
- **Response**: Server-Sent Events (SSE) stream

### Brief Planner API (Advanced)

For advanced features with tool integration:

#### Brief Planner Endpoint
- **POST** `/api/brief-planner`
- **Body**: 
```json
{
  "messages": Message[],
  "promptPath": "briefPlanner",
  "conversationUuid": string | null,
  "todos": any[],
  "briefs": any[],
  "media": string[],
  "tools": string[]
}
```
- **Response**: Server-Sent Events (SSE) stream with enhanced event types

### SSE Event Types

The ChatWrapper handles various SSE event types:

```typescript
// Standard events
{ type: "text-delta", content: string }
{ type: "finished", uuid?: string, result?: any }
{ type: "error", error: string }

// Advanced events (brief-planner endpoint)
{ type: "event", event: "latitude-event", data: { type: "chain-started" | "step-started" | "provider-completed" | "chain-completed" } }
{ type: "event", event: "provider-event", data: { type: "text-delta", textDelta: string } }
{ type: "tool-result", tool: string, data: any, todos?: any[], briefs?: any[] }
```

## Examples

### Modal Chat

```tsx
import { ChatWrapper, Tools } from "@oddle/chat-wrapper-ui";

const tools: Tools = [
  {
    name: "get_weather",
    description: "Get current weather information",
    parameters: {
      type: "object",
      properties: {
        location: { type: "string", description: "Location name" }
      },
      required: ["location"]
    },
    execute: async (params: { location: string }) => ({
      location: params.location,
      temperature: 22,
      condition: "sunny"
    })
  },
  {
    name: "set_reminder",
    description: "Set a reminder for later",
    parameters: {
      type: "object",
      properties: {
        message: { type: "string", description: "Reminder message" },
        time: { type: "string", description: "Reminder time" }
      },
      required: ["message", "time"]
    },
    execute: async (params: { message: string; time: string }) => ({
      success: true,
      reminderId: Date.now()
    })
  }
];

<ChatWrapper
  userMpAuthToken="your-auth-token"
  chatServerUrl="wss://api.example.com"
  chatServerKey="your-server-key"
  userId="user-123"
  app="UD21"
  config={{
    mode: "modal",
    appName: "AI Assistant",
    theme: "dark",
    placeholder: "Ask me anything...",
  }}
  tools={tools}
/>
```

### Embedded Chat with Tool Results

```tsx
import { ChatWrapper, Tools } from "@oddle/chat-wrapper-ui";

const tools: Tools = [
  {
    name: "search_docs",
    description: "Search through documentation",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" }
      },
      required: ["query"]
    },
    execute: async (params: { query: string }) => ({
      results: [`Doc about ${params.query}`, `Guide for ${params.query}`]
    })
  },
  {
    name: "create_ticket",
    description: "Create a support ticket",
    parameters: {
      type: "object",
      properties: {
        title: { type: "string", description: "Ticket title" },
        description: { type: "string", description: "Ticket description" }
      },
      required: ["title", "description"]
    },
    execute: async (params: { title: string; description: string }) => ({
      ticketId: Date.now(),
      status: "open"
    })
  }
];

<ChatWrapper
  userMpAuthToken="your-auth-token"
  chatServerUrl="wss://chat-api.example.com"
  chatServerKey="your-server-key"
  userId="user-123"
  app="UD21"
  config={{
    mode: "embedded",
    appName: "Help Center",
    theme: "auto",
    features: {
      fileUpload: true,
      messageHistory: true,
      showToolResults: true,
    },
  }}
  tools={tools}
/>
```

### Fullscreen Chat with Streaming

```tsx
import { ChatWrapper, Tools } from "@oddle/chat-wrapper-ui";

const tools: Tools = [
  {
    name: "escalate_ticket",
    description: "Escalate a support ticket",
    parameters: {
      type: "object",
      properties: {
        ticketId: { type: "string", description: "Ticket ID to escalate" },
        reason: { type: "string", description: "Escalation reason" }
      },
      required: ["ticketId", "reason"]
    },
    execute: async (params: { ticketId: string; reason: string }) => ({
      success: true,
      escalated: true
    })
  },
  {
    name: "get_user_info",
    description: "Get user information",
    parameters: {
      type: "object",
      properties: {
        userId: { type: "string", description: "User ID to lookup" }
      },
      required: ["userId"]
    },
    execute: async (params: { userId: string }) => ({
      userId: params.userId,
      name: "John Doe",
      tier: "premium"
    })
  },
  {
    name: "schedule_callback",
    description: "Schedule a callback",
    parameters: {
      type: "object",
      properties: {
        phoneNumber: { type: "string", description: "Phone number for callback" },
        preferredTime: { type: "string", description: "Preferred callback time" }
      },
      required: ["phoneNumber", "preferredTime"]
    },
    execute: async (params: { phoneNumber: string; preferredTime: string }) => ({
      scheduled: true,
      callbackId: Date.now()
    })
  }
];

<ChatWrapper
  userMpAuthToken="your-auth-token"
  chatServerUrl="wss://support.example.com"
  chatServerKey="your-server-key"
  userId="user-123"
  app="UD21"
  config={{
    mode: "fullscreen",
    appName: "Premium Support",
    theme: "light",
    onStreamingStatusChange: (status) => {
      console.log('Stream status:', status);
    },
    customStyles: {
      fontFamily: "Inter, sans-serif",
    },
  }}
  tools={tools}
/>
```

## Styling

The component includes comprehensive CSS with support for:

- Multiple display modes (sidebar, modal, fullscreen, embedded)
- Light and dark themes
- Responsive design
- Smooth animations
- Custom scrollbars
- Thinking indicators
- Tool result displays

You can override styles using the `customStyles` prop or by targeting CSS classes with the `chat-wrapper` prefix.

### CSS Classes Reference

```css
.chat-wrapper                    /* Main container */
.chat-wrapper--sidebar           /* Sidebar mode */
.chat-wrapper--modal             /* Modal mode */
.chat-wrapper--fullscreen        /* Fullscreen mode */
.chat-wrapper--embedded          /* Embedded mode */
.chat-wrapper--light             /* Light theme */
.chat-wrapper--dark              /* Dark theme */
.chat-wrapper__header            /* Header section */
.chat-wrapper__content           /* Messages area */
.chat-wrapper__input             /* Input section */
.chat-wrapper__thinking          /* Thinking indicator */
.chat-wrapper__tool-results      /* Tool results panel */
```

## TypeScript

Full TypeScript support with exported types:

```tsx
import {
  ChatWrapper,
  ChatWrapperProps,
  Message,
  ChatConfig,
  StreamEvent,
  ToolResult,
  ChatMode,
  ChatPosition,
  ChatTheme,
  Tools,
  Tool,
  ToolSchema,
  EntityType,
  App,
} from "@oddle/chat-wrapper-ui";
```

### Type Definitions

```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  media?: string[];
}

interface ToolSchema {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
}

interface Tool extends ToolSchema {
  execute: (params: any) => Promise<any> | any;
}

type Tools = Tool[];

enum EntityType {
  BRAND = "BRAND",
  ACCOUNT = "ACCOUNT",
  USER = "USER"
}

enum App {
  UD21 = "UD21",
  Host = "Host",
  Reserve = "Reserve"
}

interface StreamEvent {
  type: string;
  event?: string;
  data?: any;
  content?: string;
  error?: string;
  done?: boolean;
  uuid?: string;
  result?: any;
  tool?: string;
  todos?: any[];
  briefs?: any[];
}

interface ToolResult {
  id: string;
  title: string;
  description?: string;
  status?: string;
  created_at: string;
  [key: string]: any;
}
```

## Development

```bash
npm run dev      # Start development server
npm run build    # Build package
npm run typecheck # Type checking
```

## Showcase & Testing

This repository includes a comprehensive showcase application for testing and demonstrating the chat wrapper component.

### Quick Start

```bash
# Automated setup
./setup-showcase.sh

# Manual setup
npm run showcase:install
npm run showcase

# Or step by step
cd showcase
npm install
npm run dev
```

### Showcase Features

- 🎨 **Live Configuration** - Adjust settings in real-time
- 🎭 **All Display Modes** - Test sidebar, modal, fullscreen, and embedded
- 🌙 **Theme Switching** - Compare light, dark, and auto themes
- 🤖 **Mock API** - Built-in realistic chat API simulation
- 📱 **Responsive Testing** - Test on different screen sizes
- ⚙️ **Custom Configurations** - Build and test your own settings
- 🔄 **Streaming Demo** - Test real-time streaming and tool integration
- 🛠️ **Brief Planner** - Advanced demo with tool results and conversation management

The showcase will be available at `http://localhost:3000` and includes:

1. **Interactive demos** for each display mode
2. **Configuration panel** for real-time customization
3. **Mock chat API** with realistic streaming responses
4. **Brief Planner demo** showcasing advanced features
5. **Usage examples** and code snippets
6. **Responsive design** testing

### Showcase Commands

```bash
npm run showcase           # Start showcase dev server
npm run showcase:install   # Install showcase dependencies
npm run showcase:build     # Build showcase for production
```

### Using Real API

The showcase can connect to your real Brief Planner API instead of using mocks:

#### Quick Setup

```bash
cd showcase
./setup-real-api.sh
# Enter your API URL (e.g., http://localhost:3000)
npm run dev
```

#### Manual Setup

```bash
cd showcase
cp .env.example .env.local
# Edit .env.local:
# VITE_USE_MOCK_API=false
# VITE_API_BASE_URL=http://localhost:3000
npm run dev
```

The showcase header will show **🌐 Real API Mode** when connected to your actual API.

For detailed configuration options, see [`REAL_API_SETUP.md`](./REAL_API_SETUP.md).

## Migration from v1.0.1

If you're upgrading from a previous version, the ChatWrapper now includes advanced streaming and tool integration features:

### New Features
- Built-in SSE streaming processing
- Tool result management
- Conversation state tracking
- Enhanced event handling
- Thinking indicators

### Breaking Changes
- **Authentication Required**: All authentication props are now required for security
- **Unified Tools**: Tools now use a single array format with schema and execution functions
- **Removed Legacy Props**: `clientTools`, `toolExecutors`, and `initialMessages` have been removed
- **Required Props**: `userMpAuthToken`, `chatServerUrl`, `chatServerKey`, and `userId` are now required
- **Simplified API**: No more `apiUrl` - use `chatServerUrl` for both WebSocket and HTTP

### Migration Example

**Before (legacy version):**
```tsx
<ChatWrapper
  apiUrl="https://api.example.com"
  config={{
    mode: "sidebar",
    appName: "Chat",
  }}
  clientTools={{
    my_tool: { name: "my_tool", description: "Tool description" }
  }}
  toolExecutors={{
    my_tool: (arg) => ({ success: true })
  }}
  initialMessages={[...messages]}
/>
```

**After (current version):**
```tsx
import { ChatWrapper, Tools } from "@oddle/chat-wrapper-ui";

const tools: Tools = [
  {
    name: "my_tool",
    description: "Tool description",
    parameters: {
      type: "object",
      properties: {
        arg: { type: "string", description: "Tool argument" }
      },
      required: ["arg"]
    },
    execute: async (params: { arg: string }) => ({ success: true })
  }
];

<ChatWrapper
  // Required authentication
  userMpAuthToken="your-auth-token"
  chatServerUrl="wss://api.example.com"
  chatServerKey="your-server-key"
  userId="user-123"
  app="UD21"
  
  config={{
    mode: "sidebar",
    appName: "Chat",
    features: { showToolResults: true },
  }}
  
  // Unified tools with schema and execution
  tools={tools}
/>
```

## License

MIT