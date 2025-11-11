# Chat Wrapper UI

A modern, type-safe React chat interface with advanced state management, streaming support, and WebSocket integration. Built with a comprehensive reducer pattern for predictable state updates and enhanced debugging capabilities.

## 🚀 Key Features

- 🏗️ **Advanced State Management** - Built-in reducer pattern with Redux DevTools support
- ⚡ **Real-time WebSocket** - Automatic connection management, URL-based ticket authentication, and reconnection
- 🔄 **Streaming Support** - Real-time message streaming with reasoning and tool execution states
- 🛠️ **Tool Integration** - Unified tool definition with schema validation and execution
- 🎨 **Pure CSS** - No external UI library dependencies, fully customizable
- 🎭 **Multiple Modes** - Sidebar, fullscreen, modal, or embedded display
- 🌙 **Theme Support** - Light, dark, and auto themes with system preference detection
- 📱 **Responsive Design** - Mobile-friendly with touch optimizations
- 🎯 **TypeScript** - Full type safety with comprehensive type definitions
- 🔧 **Developer Tools** - Built-in debugging with performance monitoring

## 📦 Installation

```bash
npm install @oddle/chat-wrapper-ui
```

## 🔥 Quick Start

```tsx
import { ChatWrapper } from "@oddle/chat-wrapper-ui";

function App() {
  const tools = [
    {
      name: "get_weather",
      description: "Get current weather for a location",
      parameters: {
        type: "object",
        properties: {
          location: { type: "string", description: "City name" }
        },
        required: ["location"]
      },
      execute: async (params: { location: string }) => {
        return { location: params.location, temperature: 22, condition: "sunny" };
      }
    }
  ];

  return (
    <ChatWrapper
      auth={{
        token: "your-auth-token",
        entityId: "brand_123",
        entityType: EntityType.BRAND,
      }}
      chatServerUrl="https://your-chat-server.com"
      chatServerKey="your-server-key"
      config={{
        mode: "sidebar",
        appName: "AI Assistant",
        theme: "auto",
        placeholder: "How can I help you today?"
      }}
      tools={tools}
    />
  );
}
```

## 🏗️ Architecture & State Management

### Reducer Pattern Integration

The ChatWrapper now includes a comprehensive state management system built on the reducer pattern:

```tsx
import { 
  ChatWrapper,
  ChatStoreProvider,
  useConnectionState,
  useAuthState,
  useMessageState,
  useUIState
} from "@oddle/chat-wrapper-ui";

// The ChatWrapper automatically includes store integration
function MyApp() {
  return (
    <ChatWrapper
      // ... your props
      enableDevTools={true}  // Enable Redux DevTools
      enableLogging={true}   // Enable action logging
    />
  );
}

// For advanced usage, access the store directly
function AdvancedComponent() {
  const connectionState = useConnectionState();
  const messageState = useMessageState();
  const uiState = useUIState();
  
  return (
    <div>
      <p>Connected: {connectionState.isConnected}</p>
      <p>Messages: {messageState.totalMessages}</p>
      <p>Theme: {uiState.theme}</p>
    </div>
  );
}
```

### State Domains

The reducer system manages four main state domains:

1. **Connection State** - WebSocket connections, reconnection, server status
2. **Authentication State** - User credentials, ticket management, auth status  
3. **Message State** - Chat messages, streaming, reasoning, tool execution
4. **UI State** - Interface state, modals, notifications, theme preferences

### Store Features

- **🔍 Predictable Updates** - All state changes through well-defined actions
- **🐛 Enhanced Debugging** - Action logs, state inspection, time-travel debugging
- **⚡ Performance Monitoring** - Automatic tracking of slow actions and state updates
- **🔄 Automatic Reconnection** - Smart WebSocket management with exponential backoff
- **💾 Optimized Storage** - Map-based message indexing for O(1) lookups

## 🛠️ Advanced Usage

### WebSocket Authentication & Reconnection

The ChatWrapper uses advanced ticket-based authentication with automatic reconnection. See [WebSocket Ticket Implementation Guide](./docs/websocket-ticket-implementation.md) for detailed technical documentation.

```tsx
```tsx
import { ChatWrapper, useConnectionState, useAuthState, EntityType } from "@oddle/chat-wrapper-ui";

function ChatWithStatus() {
  return (
    <ChatStoreProvider enableDevTools={true}>
      <ChatWrapper
        auth={{
          token: "your-token",
          entityId: "brand_456",
          entityType: EntityType.BRAND,
        }}
        chatServerUrl="https://api.example.com"
        chatServerKey="your-key"
        config={{
          mode: "fullscreen",
          appName: "Support Chat"
        }}
      />
      <ConnectionStatus />
    </ChatStoreProvider>
  );
}
```

function ConnectionStatus() {
  const connection = useConnectionState();
  const auth = useAuthState();
  
  return (
    <div>
      <p>Status: {connection.isConnected ? 'Connected' : 'Disconnected'}</p>
      <p>Auth: {auth.isAuthenticated ? 'Authenticated' : 'Pending'}</p>
      {connection.shouldReconnect && <p>Reconnecting...</p>}
    </div>
  );
}
```

### Tool Integration with State Management

```tsx
import { ChatWrapper, useMessageActions, EntityType } from "@oddle/chat-wrapper-ui";

function ChatWithTools() {
  const messageActions = useMessageActions();
  
  const tools = [
    {
      name: "create_task",
      description: "Create a new task",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string", description: "Task title" },
          priority: { type: "string", enum: ["low", "medium", "high"] }
        },
        required: ["title"]
      },
      execute: async (params: { title: string; priority?: string }) => {
        // Tool execution automatically tracked in message state
        const task = { id: Date.now(), ...params, completed: false };
        
        // Optional: dispatch custom message events
        messageActions.addMessage({
          id: Math.random().toString(36),
          role: "system",
          content: `Task "${params.title}" created successfully`,
          timestamp: new Date()
        });
        
        return { success: true, task };
      }
    }
  ];

  return (
    <ChatWrapper
      auth={{
        token: "your-mp-auth-token",
        entityId: "brand_123",
        entityType: EntityType.BRAND
      }}
      chatServerUrl="https://api.example.com"
      chatServerKey="your-key"
      config={{
        mode: "embedded",
        appName: "Task Manager",
        features: {
          showToolResults: true,
          messageHistory: true
        }
      }}
      tools={tools}
    />
  );
}
```

## 📋 Complete Props Reference

### Required Props

| Property | Type | Description |
|----------|------|-------------|
| `auth` | `AuthConfig` | **Authentication and entity context** - Object containing token, tokenType, entityId, and entityType |
| `auth.token` | `string` | **Authentication token** - MP Auth Token or OddlePass token. userId is extracted from this token on the server. |
| `auth.tokenType` | `AuthTokenType` | **Token type** - `MP_AUTH` (default) or `ODDLE_PASS` (future support) |
| `auth.entityId` | `string` | **Entity ID** - brandId or accountId for entity-scoped conversations (optional) |
| `auth.entityType` | `EntityType` | **Entity type** - `BRAND`, `ACCOUNT`, or `USER` (optional) |
| `chatServerUrl` | `string` | **Server URL** - Base URL for HTTP and WebSocket connections (e.g., `"https://api.example.com"` - automatically converted to wss://) |
| `chatServerKey` | `string` | **Server identification key** - Server can detect which app is using the chat server (UD21, Host, Reserve, etc.) |
| `config` | `ChatConfig` | **Configuration object** - Chat interface settings and behavior |

### Optional Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tools` | `Tools` | `[]` | **Tool definitions** - Array of tools with schema and execution functions |
| `providerResId` | `string` | `undefined` | **Provider resource ID** - If empty, generates conversation based on EntityType and entityId |
| `devMode` | `boolean` | `false` | **Developer mode** - Enable developer settings and debug features |
| `contextHelpers` | `ContextHelpers` | `{}` | **Context helpers** - Additional context data for enhanced functionality |
| `enableDevTools` | `boolean` | `true` (dev) | **Redux DevTools** - Enable Redux DevTools integration |
| `enableLogging` | `boolean` | `true` (dev) | **Action logging** - Enable action logging in development |

### ChatConfig Object

```typescript
interface ChatConfig {
  // Display Configuration
  mode: 'sidebar' | 'fullscreen' | 'modal' | 'embedded';
  appName: string;
  position?: 'left' | 'right';                    // Sidebar position (sidebar mode only)
  theme?: 'light' | 'dark' | 'auto';              // Color theme
  
  // Content Configuration  
  description?: string;                           // App description text
  placeholder?: string;                           // Input placeholder text
  placeholderTexts?: string[];                    // Animated placeholder texts
  welcomeMessage?: string;                        // Initial welcome message
  promptPath?: string;                            // Agent prompt path
  bubbleText?: string;                            // Chat bubble text
  
  // Layout Configuration
  constrainedHeight?: boolean;                    // Fill parent container (embedded mode)
  headerVisible?: boolean;                        // Show header with appName and description
  
  // Restaurant/Brand Configuration
  restaurantName?: string;                        // Restaurant name near attachment button
  restaurantLogo?: string;                        // Restaurant logo URL
  
  // Suggested Prompts
  suggestedPrompts?: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;                       // Optional icon component
  }>;
  
  // Feature Toggles
  features?: {
    fileUpload?: boolean;                         // Enable file upload functionality
    voiceInput?: boolean;                         // Enable voice input (future)
    messageHistory?: boolean;                     // Enable message history
    exportChat?: boolean;                         // Enable chat export (future)
    showToolResults?: boolean;                    // Display tool results in UI
    showBubbleText?: boolean;                     // Show bubble text in chat bubble
  };
  
  // Event Callbacks
  onMessage?: (message: Message) => void;         // Message received callback
  onError?: (error: Error) => void;               // Error callback
  onToolResult?: (tool: string, result: any) => void; // Tool result callback
  onStreamingStatusChange?: (status: string) => void; // Streaming status callback
  
  // Styling
  customStyles?: React.CSSProperties;            // Custom CSS styles
  
  // API Configuration
  endpoint?: 'brief-planner' | 'conversation';   // API endpoint type
}
```

### EntityType Enum

```typescript
enum EntityType {
  BRAND = "BRAND",     // Brand-level entity
  ACCOUNT = "ACCOUNT", // Account-level entity  
  USER = "USER"        // User-level entity
}
```

### AuthConfig Interface

```typescript
interface AuthConfig {
  token: string;                    // MP Auth Token or OddlePass token
  tokenType?: AuthTokenType;        // Token type (default: MP_AUTH)
  entityId?: string;                // Entity ID for scoped conversations
  entityType?: EntityType;          // Entity type (BRAND, ACCOUNT, USER)
}

enum AuthTokenType {
  MP_AUTH = "MP_AUTH",              // Marketplace Auth Token (default)
  ODDLE_PASS = "ODDLE_PASS"         // OddlePass Token (future support)
}
```

### Tools Array

```typescript
type Tools = Tool[];

interface Tool {
  name: string;                                   // Tool identifier
  description: string;                            // Tool description for AI
  parameters: ToolParameter[];                    // Parameter definitions
  execute: (params: any) => Promise<any> | any;  // Execution function
}

interface ToolParameter {
  name: string;                                   // Parameter name
  type: string;                                   // Parameter type
  description: string;                            // Parameter description
  isRequired: boolean;                            // Whether required
  schema: {                                       // JSON schema
    type: string;
    properties?: Record<string, any>;
    required?: string[];
    additionalProperties?: boolean;
    enum?: string[];
    items?: any;
  };
}
```

### Message Interface

```typescript
interface Message {
  id: string;                                     // Unique message ID
  role: 'user' | 'assistant' | 'system' | 'reasoning' | 'tooling';
  content: string;                                // Message content
  timestamp: Date;                                // Message timestamp
  isStreaming?: boolean;                          // Currently streaming
  media?: string[];                               // Attached media URLs
  toolData?: {                                    // Tool execution data
    toolName: string;
    callId: string;
    parameters?: Record<string, any>;
    result?: any;
    status?: 'processing' | 'completed' | 'error';
  };
}
```

### ContextHelpers Interface

```typescript
interface ContextHelpers {
  [key: string]: any;                             // Dynamic context data
}
```

## 🔧 Tool Definition Examples

### Simple Tool Example

```typescript
const weatherTool: Tool = {
  name: "get_weather",
  description: "Get current weather for a location",
  parameters: [
    {
      name: "location",
      type: "string", 
      description: "City or location name",
      isRequired: true,
      schema: {
        type: "string"
      }
    }
  ],
  execute: async (params: { location: string }) => {
    // Your weather API implementation
    return { 
      location: params.location, 
      temperature: 22, 
      condition: "sunny" 
    };
  }
};
```

### Advanced Tool with Complex Parameters

```typescript
const createTaskTool: Tool = {
  name: "create_task",
  description: "Create a new task with priority and deadline",
  parameters: [
    {
      name: "title",
      type: "string",
      description: "Task title",
      isRequired: true,
      schema: { type: "string" }
    },
    {
      name: "priority", 
      type: "string",
      description: "Task priority level",
      isRequired: false,
      schema: {
        type: "string",
        enum: ["low", "medium", "high"]
      }
    },
    {
      name: "deadline",
      type: "string", 
      description: "Task deadline in ISO format",
      isRequired: false,
      schema: { type: "string" }
    },
    {
      name: "tags",
      type: "array",
      description: "Task tags",
      isRequired: false,
      schema: {
        type: "array",
        items: { type: "string" }
      }
    }
  ],
  execute: async (params: { 
    title: string; 
    priority?: string; 
    deadline?: string;
    tags?: string[];
  }) => {
    // Task creation logic with full type safety
    const task = {
      id: Date.now().toString(),
      title: params.title,
      priority: params.priority || 'medium',
      deadline: params.deadline,
      tags: params.tags || [],
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Save task to your system
    await saveTask(task);
    
    return { 
      success: true, 
      task,
      message: `Task "${params.title}" created successfully`
    };
  }
};
```

## 🎨 Styling & Themes

### CSS Classes

The component provides comprehensive CSS classes for customization:

```css
.chat-wrapper                  /* Root container */
.chat-wrapper--sidebar         /* Sidebar mode */
.chat-wrapper--modal           /* Modal mode */
.chat-wrapper--fullscreen      /* Fullscreen mode */
.chat-wrapper--embedded        /* Embedded mode */
.chat-wrapper--light           /* Light theme */
.chat-wrapper--dark            /* Dark theme */
.chat-wrapper__header          /* Header section */
.chat-wrapper__content         /* Message area */
.chat-wrapper__input           /* Input section */
```

### Custom Styling

```tsx
<ChatWrapper
  config={{
    mode: "sidebar",
    appName: "Custom Chat",
    customStyles: {
      fontFamily: "Inter, sans-serif",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
    }
  }}
  // ... other props
/>
```

## 📤 Exports

### Components
```typescript
import { 
  ChatWrapper,           // Main chat component with store integration
  ChatWrapperOriginal,   // Original component without store (backwards compatibility)
  ChatStoreProvider      // Store provider for advanced usage
} from "@oddle/chat-wrapper-ui";
```

### Store Hooks
```typescript
import {
  useConnectionState,    // WebSocket connection state
  useAuthState,         // Authentication state  
  useMessageState,      // Messages and streaming state
  useUIState,           // Interface state
  useAppStatus,         // Overall app status
  useCanSendMessage,    // Message sending capability
  useCriticalErrors,    // Critical error monitoring
  useConnectionActions, // Connection action dispatchers
  useMessageActions,    // Message action dispatchers
  useUIActions,         // UI action dispatchers
  useStoreDebug         // Development debugging tools
} from "@oddle/chat-wrapper-ui";
```

### Types
```typescript
import {
  ChatWrapperProps,
  Message,
  ChatConfig,
  Tools,
  Tool,
  EntityType,
  AuthConfig,
  AuthTokenType,
  // State types
  RootState,
  ConnectionState,
  AuthenticationState,
  MessageState,
  UIState,
  // Action types  
  RootAction,
  ConnectionAction,
  AuthAction,
  MessageAction,
  UIAction
} from "@oddle/chat-wrapper-ui";
```


## 🛠️ Development

```bash
npm run dev        # Start development server
npm run build      # Build package  
npm run showcase   # Run showcase application
```

## 🎯 What's New in v1.1.0

- 🏗️ **Comprehensive State Management** - Reducer pattern with Redux DevTools
- ⚡ **Enhanced Performance** - Optimized message handling and rendering
- 🔄 **Smart Reconnection** - Automatic WebSocket management with ticket renewal
- 🐛 **Better Debugging** - Action logging, performance monitoring, state inspection
- 🔧 **Developer Experience** - Enhanced TypeScript support and debugging tools
- 🎨 **Improved Architecture** - Cleaner separation of concerns and maintainable code

---

## 📄 License

MIT © Oddle Engineering