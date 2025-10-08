# Chat Wrapper UI

A reusable, lightweight chat interface component built with pure CSS and React. No external UI library dependencies.

## Features

- 🎨 **Pure CSS** - No external UI library dependencies
- 🔧 **Configurable API URL** - Pass your API endpoint as a prop
- 🎭 **Multiple Modes** - Sidebar, fullscreen, modal, or embedded
- 🌙 **Theme Support** - Light, dark, and auto themes
- 📱 **Responsive** - Mobile-friendly design
- ⚡ **Lightweight** - Minimal bundle size
- 🎯 **TypeScript** - Full TypeScript support

## Installation

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
        create_email: () => {},
        update_email: () => {},
      }}
    />
  );
}
```

## Configuration

The `ChatWrapper` component accepts two props:

### `apiUrl` (string, required)

The URL of your chat API server.

### `config` (object, required)

Configuration object with the following properties:

| Property         | Type                                                 | Required | Description                              |
| ---------------- | ---------------------------------------------------- | -------- | ---------------------------------------- |
| `mode`           | `'sidebar' \| 'fullscreen' \| 'modal' \| 'embedded'` | ✅       | Display mode                             |
| `appName`        | `string`                                             | ✅       | Application name shown in header         |
| `position`       | `'left' \| 'right'`                                  | ❌       | Sidebar position (only for sidebar mode) |
| `theme`          | `'light' \| 'dark' \| 'auto'`                        | ❌       | Color theme                              |
| `apiKey`         | `string`                                             | ❌       | API authentication key                   |
| `placeholder`    | `string`                                             | ❌       | Input placeholder text                   |
| `welcomeMessage` | `string`                                             | ❌       | Initial welcome message                  |
| `customStyles`   | `React.CSSProperties`                                | ❌       | Custom CSS styles                        |
| `features`       | `object`                                             | ❌       | Feature toggles (see below)              |
| `onMessage`      | `(message: Message) => void`                         | ❌       | Message callback                         |
| `onError`        | `(error: Error) => void`                             | ❌       | Error callback                           |

### Features Object

```tsx
features?: {
  fileUpload?: boolean;
  voiceInput?: boolean;
  messageHistory?: boolean;
  exportChat?: boolean;
}
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
/>
```

### Embedded Chat

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
    },
  }}
/>
```

### Fullscreen Chat

```tsx
<ChatWrapper
  apiUrl="https://support.example.com/api"
  config={{
    mode: "fullscreen",
    appName: "Premium Support",
    theme: "light",
    apiKey: "your-api-key-here",
    customStyles: {
      fontFamily: "Inter, sans-serif",
    },
  }}
/>
```

## API Integration

Your API server should support the following endpoints:

### Initialize Conversation

- **POST** `/api/conversation/init`
- **Response**: `{ conversationId: string }`

### Send Message

- **POST** `/api/conversation/{conversationId}`
- **Body**: `{ message: string }`
- **Response**: Server-Sent Events (SSE) stream

## Styling

The component includes comprehensive CSS with support for:

- Multiple display modes (sidebar, modal, fullscreen, embedded)
- Light and dark themes
- Responsive design
- Smooth animations
- Custom scrollbars

You can override styles using the `customStyles` prop or by targeting CSS classes with the `chat-wrapper` prefix.

## TypeScript

Full TypeScript support with exported types:

```tsx
import {
  ChatWrapper,
  ChatWrapperProps,
  Message,
  ChatConfig,
} from "@oddle/chat-wrapper-ui";
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

The showcase will be available at `http://localhost:3000` and includes:

1. **Interactive demos** for each display mode
2. **Configuration panel** for real-time customization
3. **Mock chat API** with realistic streaming responses
4. **Usage examples** and code snippets
5. **Responsive design** testing

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

## License

MIT
