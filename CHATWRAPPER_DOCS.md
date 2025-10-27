# ChatWrapper Documentation

## What is ChatWrapper?

ChatWrapper is a comprehensive, production-ready React component that provides AI-powered chat functionality with advanced features like tool integration, real-time streaming, file uploads, and multiple display modes. It's designed to be easily integrated into any React application while offering extensive customization options.

## Why Use ChatWrapper?

### 🚀 **Production Ready**
- Built-in WebSocket support for real-time communication
- Robust error handling and reconnection logic
- TypeScript support with comprehensive type definitions
- Responsive design with light/dark theme support

### 🔧 **Highly Customizable**
- Multiple display modes (sidebar, modal, fullscreen, embedded)
- Extensive styling options and theme support
- Configurable features and UI elements
- Custom tool integration capabilities

### 🛠️ **Advanced Features**
- **AI Assistant Integration**: Connect to any AI backend with streaming support
- **Tool Calling**: Execute custom functions from chat interactions
- **File Upload**: Support for image attachments with validation
- **Message Management**: Copy messages, export chat history
- **Context Helpers**: Pass business context to enhance AI responses
- **Development Mode**: Built-in debugging and configuration tools

### 💼 **Business Ready**
- Multi-tenant support with app-specific configurations
- User session management
- Restaurant/business branding integration
- Suggested prompts for better user experience

## How to Integrate ChatWrapper

### Installation

```bash
npm install @oddle/chat-wrapper-ui
```

### Basic Usage

```tsx
import React from 'react';
import { ChatWrapper } from '@oddle/chat-wrapper-ui';

function App() {
  return (
    <ChatWrapper
      app="UD21"
      apiUrl="http://localhost:3000"
      userId="user_123"
      config={{
        mode: "embedded",
        appName: "My AI Assistant",
        description: "Your helpful AI companion",
        theme: "light"
      }}
    />
  );
}
```

## Props Reference

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `app` | `"UD21" \| "Host" \| "Reserve"` | Application type identifier |
| `apiUrl` | `string` | Backend API URL for WebSocket connection |
| `config` | `ChatConfig` | Configuration object for chat behavior and UI |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `userId` | `string` | `undefined` | Unique user identifier for session management |
| `tools` | `Record<string, Function>` | `{}` | Custom tool functions for AI to execute |
| `clientTools` | `ClientTools[]` | `[]` | Tool schema definitions for AI integration |
| `contextHelpers` | `ContextHelpers` | `{}` | Business context data to enhance AI responses |
| `initialMessages` | `Message[]` | `[]` | Pre-populate chat with existing messages |
| `devMode` | `boolean` | `false` | Enable development tools and debugging |

## Configuration Options (ChatConfig)

### Display & Layout

```tsx
config: {
  mode: "sidebar" | "fullscreen" | "modal" | "embedded",
  position: "left" | "right", // For sidebar mode
  theme: "light" | "dark" | "auto",
  constrainedHeight: boolean, // Fill parent container
  headerVisible: boolean, // Show app name and description
}
```

### Content & Messaging

```tsx
config: {
  appName: "Your App Name",
  description: "App description text",
  placeholder: "Type your message...",
  placeholderTexts: ["Suggestion 1", "Suggestion 2"], // Rotating placeholders
  welcomeMessage: "Welcome! How can I help?",
  bubbleText: "Chat with AI", // Bubble mode text
}
```

### Business Branding

```tsx
config: {
  restaurantName: "Restaurant Name",
  restaurantLogo: "https://example.com/logo.png",
  suggestedPrompts: [
    {
      title: "Get Menu",
      description: "Show me today's menu",
      icon: <MenuIcon />
    }
  ]
}
```

### Features Control

```tsx
config: {
  features: {
    fileUpload: true,        // Enable image uploads
    voiceInput: false,       // Voice input (future feature)
    messageHistory: true,    // Load previous conversations
    exportChat: true,        // Export chat functionality
    showToolResults: true,   // Display tool execution results
    showBubbleText: false,   // Show bubble mode text
  }
}
```

### Event Handlers

```tsx
config: {
  onMessage: (message: Message) => void,
  onError: (error: Error) => void,
  onToolResult: (tool: string, result: any) => void,
  onStreamingStatusChange: (status: string) => void,
  onBusinessDataUpdate: (data: any) => void,
}
```

## Display Modes

### 1. Embedded Mode
Perfect for integrating chat into existing pages.

```tsx
<ChatWrapper
  app="UD21"
  apiUrl="http://localhost:3000"
  config={{
    mode: "embedded",
    constrainedHeight: true, // Fill parent container
    headerVisible: false,
  }}
/>
```

### 2. Sidebar Mode
Chat appears as a collapsible sidebar.

```tsx
<ChatWrapper
  app="Host"
  apiUrl="http://localhost:3000"
  config={{
    mode: "sidebar",
    position: "right",
    headerVisible: true,
  }}
/>
```

### 3. Modal Mode
Chat opens in an overlay modal.

```tsx
<ChatWrapper
  app="Reserve"
  apiUrl="http://localhost:3000"
  config={{
    mode: "modal",
    bubbleText: "Need Help?",
  }}
/>
```

### 4. Fullscreen Mode
Chat takes up the entire viewport.

```tsx
<ChatWrapper
  app="UD21"
  apiUrl="http://localhost:3000"
  config={{
    mode: "fullscreen",
    welcomeMessage: "Welcome to our AI assistant!",
  }}
/>
```

## Tool Integration

ChatWrapper supports custom tool integration, allowing the AI to execute functions in your application.

### Defining Tools

```tsx
const tools = {
  createReservation: async (params: {
    customerName: string;
    date: string;
    time: string;
    partySize: number;
  }) => {
    // Your reservation creation logic
    const reservation = await createReservation(params);
    return {
      success: true,
      reservation,
      message: `Reservation created for ${params.customerName}`
    };
  },
  
  getMenu: async () => {
    // Fetch menu data
    const menu = await fetchMenu();
    return { success: true, menu };
  }
};

const clientTools = [
  {
    name: "createReservation",
    description: "Create a new restaurant reservation",
    parameters: [
      {
        name: "customerName",
        type: "string",
        description: "Customer's full name",
        isRequired: true,
        schema: { type: "string" }
      },
      {
        name: "date",
        type: "string", 
        description: "Reservation date (YYYY-MM-DD)",
        isRequired: true,
        schema: { type: "string" }
      },
      // ... more parameters
    ]
  }
];

<ChatWrapper
  tools={tools}
  clientTools={clientTools}
  // ... other props
/>
```

## Context Helpers

Provide business context to enhance AI responses:

```tsx
const contextHelpers = {
  brandInfo: {
    id: "restaurant_123",
    brandName: "Mario's Italian Restaurant",
  },
  restaurantInfo: {
    name: "Mario's Downtown",
    type: "Italian Cuisine",
    capacity: 80,
    location: "Downtown District",
  },
  currentUser: {
    role: "manager",
    permissions: ["view_reservations", "modify_menu"]
  }
};

<ChatWrapper
  contextHelpers={contextHelpers}
  // ... other props
/>
```

## Advanced Examples

### Complete Restaurant Management Setup

```tsx
import React, { useState, useMemo } from 'react';
import { ChatWrapper, ChatWrapperProps } from '@oddle/chat-wrapper-ui';

function RestaurantApp() {
  const [reservations, setReservations] = useState([]);
  
  const restaurantTools = useMemo(() => ({
    createReservation: async (params) => {
      const newReservation = {
        id: Date.now().toString(),
        ...params,
        status: "confirmed",
        createdAt: new Date().toISOString()
      };
      setReservations(prev => [...prev, newReservation]);
      return {
        success: true,
        reservation: newReservation,
        message: `Reservation confirmed for ${params.customerName}`
      };
    },
    
    listReservations: async (filters) => {
      let filtered = reservations;
      if (filters?.date) {
        filtered = filtered.filter(r => r.date === filters.date);
      }
      return {
        success: true,
        reservations: filtered,
        count: filtered.length
      };
    }
  }), [reservations]);

  const chatConfig: ChatWrapperProps = {
    app: "Host",
    userId: "manager_001",
    apiUrl: "https://your-ai-backend.com",
    tools: restaurantTools,
    clientTools: [
      // Tool schemas here
    ],
    contextHelpers: {
      brandInfo: {
        id: "mario_restaurant",
        brandName: "Mario's Italian Restaurant"
      },
      currentStats: {
        totalReservations: reservations.length,
        todayReservations: reservations.filter(r => 
          r.date === new Date().toISOString().split('T')[0]
        ).length
      }
    },
    config: {
      mode: "sidebar",
      position: "right",
      appName: "Restaurant Assistant",
      description: "Manage reservations and customer service",
      theme: "light",
      headerVisible: true,
      restaurantName: "Mario's Italian Restaurant",
      restaurantLogo: "/mario-logo.png",
      features: {
        fileUpload: true,
        messageHistory: true,
        exportChat: true,
        showToolResults: true
      },
      suggestedPrompts: [
        {
          title: "Today's Reservations",
          description: "Show me all reservations for today",
          icon: <CalendarIcon />
        },
        {
          title: "Create Reservation",
          description: "Help a customer make a reservation",
          icon: <BookIcon />
        }
      ],
      onMessage: (message) => {
        console.log('New message:', message);
      },
      onError: (error) => {
        console.error('Chat error:', error);
      },
      onToolResult: (tool, result) => {
        console.log(`Tool ${tool} executed:`, result);
      }
    }
  };

  return (
    <div className="restaurant-app">
      <main className="main-content">
        {/* Your main app content */}
      </main>
      
      <ChatWrapper {...chatConfig} />
    </div>
  );
}
```

### Multi-tenant Setup

```tsx
function MultiTenantApp() {
  const [currentApp, setCurrentApp] = useState<"UD21" | "Host" | "Reserve">("UD21");
  
  const getAppConfig = (app: string) => {
    const baseConfig = {
      apiUrl: "https://api.example.com",
      userId: "user_123"
    };
    
    switch (app) {
      case "UD21":
        return {
          ...baseConfig,
          app: "UD21" as const,
          contextHelpers: {
            brandInfo: { id: "ud21", brandName: "UD21 Restaurant" },
            features: ["ordering", "menu_management"]
          },
          config: {
            mode: "embedded" as const,
            appName: "UD21 Assistant",
            theme: "light" as const
          }
        };
        
      case "Host":
        return {
          ...baseConfig,
          app: "Host" as const,
          contextHelpers: {
            brandInfo: { id: "host", brandName: "Host Management" },
            features: ["reservations", "table_management"]
          },
          config: {
            mode: "modal" as const,
            appName: "Host Assistant",
            theme: "dark" as const
          }
        };
        
      case "Reserve":
        return {
          ...baseConfig,
          app: "Reserve" as const,
          contextHelpers: {
            brandInfo: { id: "reserve", brandName: "Reservation System" },
            features: ["booking", "availability"]
          },
          config: {
            mode: "sidebar" as const,
            appName: "Reservation Assistant",
            theme: "auto" as const
          }
        };
    }
  };
  
  return (
    <div>
      <select value={currentApp} onChange={(e) => setCurrentApp(e.target.value as any)}>
        <option value="UD21">UD21</option>
        <option value="Host">Host</option>
        <option value="Reserve">Reserve</option>
      </select>
      
      <ChatWrapper {...getAppConfig(currentApp)} />
    </div>
  );
}
```

## Styling and Theming

ChatWrapper comes with built-in CSS that you need to import:

```tsx
import '@oddle/chat-wrapper-ui/dist/style.css';
```

### Custom Styling

```tsx
<ChatWrapper
  config={{
    customStyles: {
      '--chat-primary-color': '#your-brand-color',
      '--chat-background': '#your-background',
      '--chat-border-radius': '12px'
    }
  }}
/>
```

## Message Features

### Copy Functionality
- Hover over assistant messages to reveal copy button
- Click to copy message content to clipboard
- Visual "Copied!" confirmation appears

### File Upload
- Drag and drop or click to upload images
- Automatic file validation and size checking
- Preview uploaded images before sending

### Message History
- Automatic conversation persistence
- Load previous conversations by thread ID
- Export chat history functionality

## Development Mode

Enable development tools for easier debugging:

```tsx
<ChatWrapper
  devMode={true}
  config={{
    // ... other config
  }}
/>
```

Development mode provides:
- Configuration panel for testing different settings
- WebSocket connection status indicators
- Debug information in console
- Tool execution logs

## Best Practices

### 1. Error Handling
Always provide error handlers to gracefully handle connection issues:

```tsx
config: {
  onError: (error) => {
    console.error('Chat error:', error);
    // Show user-friendly error message
    showNotification('Connection issue. Please try again.');
  }
}
```

### 2. Performance Optimization
- Use `useMemo` for tool definitions to prevent unnecessary re-renders
- Implement proper cleanup in useEffect hooks
- Consider lazy loading for large tool sets

### 3. User Experience
- Provide meaningful suggested prompts
- Use contextHelpers to give AI relevant business information
- Implement proper loading states and error boundaries

### 4. Security
- Validate all tool parameters before execution
- Sanitize user inputs
- Implement proper authentication for API endpoints

## Troubleshooting

### Common Issues

**WebSocket Connection Failed**
- Verify apiUrl is correct and accessible
- Check CORS configuration on your backend
- Ensure WebSocket endpoint is properly configured

**Tools Not Working**
- Verify tool schemas match function signatures
- Check that tool functions return proper response format
- Enable devMode to see tool execution logs

**Styling Issues**
- Ensure CSS import is included
- Check for conflicting CSS rules
- Verify theme configuration

## TypeScript Support

ChatWrapper is fully typed. Import types as needed:

```tsx
import { 
  ChatWrapperProps, 
  Message, 
  ToolResult, 
  ContextHelpers,
  ChatMode,
  ChatTheme 
} from '@oddle/chat-wrapper-ui';
```

## Browser Support

- Chrome 80+
- Firefox 74+
- Safari 13+
- Edge 80+

## License

[Your License Information]