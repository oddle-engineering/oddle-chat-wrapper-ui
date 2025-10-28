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
import { ChatWrapper } from "@oddle/chat-wrapper-ui";

function App() {
  return (
    <ChatWrapper
      apiUrl="https://your-api-server.com"
      config={{
        mode: "sidebar",
        position: "right",
        appName: "Customer Support",
        theme: "light",
        placeholder: "How can we help you today?",
      }}
      tools={{
        create_email: (subject: string, body: string) => {
          // Handle email creation
          return { success: true, emailId: Date.now().toString() };
        },
        get_weather: (location: string) => {
          // Handle weather request
          return { location, temperature: 22, condition: "sunny" };
        },
      }}
    />
  );
}
```

## Advanced Usage with Streaming & Tools

```tsx
import { ChatWrapper } from "@oddle/chat-wrapper-ui";

function AdvancedChat() {
  const [todos, setTodos] = useState([]);
  const [briefs, setBriefs] = useState([]);

  return (
    <ChatWrapper
      apiUrl="https://your-api-server.com"
      config={{
        mode: "embedded",
        appName: "AI Assistant",
        theme: "light",
        endpoint: "brief-planner", // Use brief-planner endpoint for advanced features
        features: {
          showToolResults: true,
          messageHistory: true,
        },
        onToolResult: (tool, result) => {
          console.log(`Tool ${tool} returned:`, result);
          if (tool === 'todos') setTodos(result);
          if (tool === 'briefs') setBriefs(result);
        },
        onStreamingStatusChange: (status) => {
          console.log('Streaming status:', status);
        },
        onError: (error) => {
          console.error('Chat error:', error);
        },
      }}
      initialMessages={[{
        id: '1',
        role: 'assistant',
        content: 'Hello! How can I help you today?',
        timestamp: new Date(),
      }]}
      tools={{
        create_todo: (title: string, description: string) => {
          console.log('Creating todo:', { title, description });
          return { success: true, todoId: Date.now().toString() };
        },
        create_brief: (title: string, content: string) => {
          console.log('Creating brief:', { title, content });
          return { success: true, briefId: Date.now().toString() };
        },
      }}
    />
  );
}
```

## Configuration

The `ChatWrapper` component accepts the following props:

### `apiUrl` (string, required)

The URL of your chat API server.

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

### `tools` (object, optional)

A record of tool functions that can be called during conversations:

```tsx
tools?: Record<string, (...args: any[]) => any>
```

### `initialMessages` (array, optional)

Pre-populate the chat with initial messages:

```tsx
initialMessages?: Message[]
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
<ChatWrapper
  apiUrl="https://api.example.com"
  config={{
    mode: "modal",
    appName: "AI Assistant",
    theme: "dark",
    placeholder: "Ask me anything...",
  }}
  tools={{
    get_weather: (location: string) => ({ location, temp: 22, condition: 'sunny' }),
    set_reminder: (message: string, time: string) => ({ success: true, reminderId: Date.now() }),
  }}
/>
```

### Embedded Chat with Tool Results

```tsx
<ChatWrapper
  apiUrl="https://chat-api.example.com"
  config={{
    mode: "embedded",
    appName: "Help Center",
    theme: "auto",
    features: {
      fileUpload: true,
      messageHistory: true,
      showToolResults: true,
    },
    onToolResult: (tool, result) => {
      console.log(`${tool} completed:`, result);
    },
  }}
  tools={{
    search_docs: (query: string) => ({ results: [`Doc about ${query}`, `Guide for ${query}`] }),
    create_ticket: (title: string, description: string) => ({ ticketId: Date.now(), status: 'open' }),
  }}
/>
```

### Fullscreen Chat with Streaming

```tsx
<ChatWrapper
  apiUrl="https://support.example.com/api"
  config={{
    mode: "fullscreen",
    appName: "Premium Support",
    theme: "light",
    apiKey: "your-api-key-here",
    endpoint: "brief-planner",
    onStreamingStatusChange: (status) => {
      console.log('Stream status:', status);
    },
    customStyles: {
      fontFamily: "Inter, sans-serif",
    },
  }}
  tools={{
    escalate_ticket: (ticketId: string, reason: string) => ({ success: true, escalated: true }),
    get_user_info: (userId: string) => ({ userId, name: 'John Doe', tier: 'premium' }),
    schedule_callback: (phoneNumber: string, preferredTime: string) => ({ scheduled: true, callbackId: Date.now() }),
  }}
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
- The `tools` prop is now optional but recommended for advanced features
- New `endpoint` config option for API endpoint selection
- Enhanced callback system with `onToolResult` and `onStreamingStatusChange`

### Migration Example

**Before (v1.0.1):**
```tsx
<ChatWrapper
  apiUrl="https://api.example.com"
  config={{
    mode: "sidebar",
    appName: "Chat",
  }}
/>
```

**After (v1.0.2+):**
```tsx
<ChatWrapper
  apiUrl="https://api.example.com"
  config={{
    mode: "sidebar",
    appName: "Chat",
    // Optional: specify endpoint for advanced features
    endpoint: "conversation", // or "brief-planner"
    // Optional: enable tool results display
    features: { showToolResults: true },
    // Optional: handle tool results
    onToolResult: (tool, result) => console.log(tool, result),
  }}
  // Optional: provide tools for enhanced functionality
  tools={{
    my_tool: (arg) => ({ success: true }),
  }}
/>
```

## License

MIT