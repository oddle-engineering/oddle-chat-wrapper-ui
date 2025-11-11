# Oddle Chat Wrapper UI - Comprehensive Guide

> **Version:** 1.0.5  
> **Last Updated:** November 10, 2025  
> **Repository:** [oddle-engineering/oddle-chat-wrapper-ui](https://github.com/oddle-engineering/oddle-chat-wrapper-ui)

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Architecture Overview](#2-architecture-overview)
3. [Getting Started](#3-getting-started)
4. [Core Concepts](#4-core-concepts)
5. [Integration Guide](#5-integration-guide)
6. [API Reference](#6-api-reference)
7. [Advanced Features](#7-advanced-features)
8. [State Management](#8-state-management)
9. [WebSocket Communication](#9-websocket-communication)
10. [Security & Authentication](#10-security--authentication)
11. [Error Handling](#11-error-handling)
12. [Performance Optimization](#12-performance-optimization)
13. [Customization](#13-customization)
14. [Testing](#14-testing)
15. [Deployment](#15-deployment)
16. [Troubleshooting](#16-troubleshooting)
17. [FAQ](#17-faq)
18. [Contributing](#18-contributing)

---

## 1. Introduction

### 1.1 What is Oddle Chat Wrapper UI?

The Oddle Chat Wrapper UI is a production-ready, reusable React component that provides a complete AI chat interface for Oddle applications. It handles all the complexity of real-time WebSocket communication, state management, authentication, and UI rendering, allowing you to integrate AI chat capabilities into your application with just a few lines of code.

### 1.2 Why Use This Component?

**Before:**

- Each app builds its own chat UI (weeks of development)
- Inconsistent user experience across products
- Duplicated code and maintenance burden
- Complex WebSocket handling and state management

**After:**

- Plug-and-play integration (minutes, not weeks)
- Consistent chat experience across all Oddle apps
- Single codebase to maintain and improve
- Battle-tested WebSocket client with auto-reconnection

### 1.3 Key Features

✅ **Real-time Streaming** - Token-by-token AI responses via WebSocket  
✅ **Multiple Display Modes** - Sidebar, modal, fullscreen, embedded  
✅ **Client-Side Tools** - Execute functions in your app from AI prompts  
✅ **Conversation Persistence** - Load and continue previous chats  
✅ **Entity-Based Organization** - Attach conversations to brands/accounts  
✅ **Metadata Support** - Track business context (orders, tables, campaigns)  
✅ **Auto-Reconnection** - Handles connection drops gracefully  
✅ **TypeScript Support** - Full type safety and autocomplete  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Themeable** - Light/dark mode and custom styling

### 1.4 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

---

## 2. Architecture Overview

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Your Application                             │
│  (UD21, Marketing Portal, Operations Dashboard, etc.)           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ import { ChatWrapper } from '@oddle/chat-wrapper-ui'
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  @oddle/chat-wrapper-ui                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    ChatWrapper Component                  │  │
│  │  ┌────────────┬────────────┬────────────┬──────────────┐ │  │
│  │  │  UI Layer  │   State    │  WebSocket │    Tools     │ │  │
│  │  │  (React)   │  (Zustand) │   Client   │   Executor   │ │  │
│  │  └────────────┴────────────┴────────────┴──────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
          ┌──────────────┴──────────────┐
          │                             │
          ▼ WebSocket (WSS)             ▼ HTTP REST
  ┌──────────────────┐          ┌──────────────────┐
  │   Chat Server    │          │    Thread API    │
  │  (AI Backend)    │          │  (Conversation   │
  │                  │          │   Persistence)   │
  └──────────────────┘          └──────────────────┘
```

### 2.2 Component Structure

```
src/
├── components/          # React UI components
│   ├── ChatWrapper.tsx  # Main component (entry point)
│   ├── ChatInput.tsx    # Message input area
│   ├── MessagesList.tsx # Message display
│   ├── MessageItem.tsx  # Individual message
│   ├── DevSettings.tsx  # Developer tools
│   └── chat/            # Sub-components
│       ├── ChatHeader.tsx
│       ├── ChatContent.tsx
│       └── ChatBubbleButton.tsx
│
├── client/              # WebSocket client
│   ├── WebSocketChatClient.ts  # Main client class
│   ├── connection/      # Connection management
│   ├── handlers/        # Message handlers
│   ├── ticket/          # Auth ticket management
│   └── types/           # Type definitions
│
├── hooks/               # Custom React hooks
│   ├── useWebSocketConnection.ts
│   ├── useMessageHandling.ts
│   ├── useConversationLoader.ts
│   └── useUIState.ts
│
├── store/               # Zustand state management
│   ├── uiStore.ts       # UI state
│   └── slices/          # State slices
│
├── services/            # Business logic
│   ├── chatSubmissionService.ts
│   └── fileUploadService.ts
│
├── utils/               # Utility functions
│   ├── threadApi.ts     # REST API calls
│   ├── chatUtils.ts     # Helper functions
│   └── websocketTicketApi.ts
│
├── contexts/            # React contexts
│   └── ChatContext.tsx
│
├── types/               # TypeScript types
│   └── index.ts
│
└── styles/              # CSS styles
    └── chat-wrapper.css
```

### 2.3 Data Flow

```
User Action → UI Component → State Update → Service Layer → API Call
                                 ↓
                          UI Re-render ← State Change ← Response
```

---

## 3. Getting Started

### 3.1 Installation

```bash
npm install @oddle/chat-wrapper-ui
```

### 3.2 Minimum Setup (5 minutes)

```tsx
import React from "react";
import { ChatWrapper, EntityType } from "@oddle/chat-wrapper-ui";

function App() {
  return (
    <ChatWrapper
      // Required: Authentication
      userMpAuthToken="your-user-token"
      chatServerUrl="https://chat.oddle.me"
      chatServerKey="YOUR_APP_KEY"
      // Required: User context
      userId="user_123"
      // Optional: Entity context
      entityId="brand_456"
      entityType={EntityType.BRAND}
      // Required: Configuration
      config={{
        mode: "sidebar",
        headerName: "AI Assistant",
      }}
    />
  );
}
```

> **Note:** Use `https://` URLs for `chatServerUrl`. The client automatically converts them to `wss://` (WebSocket Secure) for the WebSocket connection. For local development, use `http://` which converts to `ws://`.

### 3.3 Quick Start Example

```tsx
import { useState } from "react";
import { ChatWrapper, EntityType, ChatMode } from "@oddle/chat-wrapper-ui";

function MyApp() {
  const [config] = useState({
    mode: "sidebar" as ChatMode,
    position: "right",
    headerName: "Restaurant AI",
    headerDescription: "Your intelligent assistant",
    theme: "light",
    placeholderTexts: ["Ask me anything...", "How can I help you today?"],
    features: {
      fileUpload: true,
      messageHistory: true,
    },
  });

  return (
    <div className="app">
      <ChatWrapper
        userMpAuthToken={process.env.REACT_APP_USER_TOKEN}
        chatServerUrl={process.env.REACT_APP_CHAT_SERVER_URL}
        chatServerKey="MYAPP"
        userId="user_123"
        entityId="brand_456"
        entityType={EntityType.BRAND}
        config={config}
      />
    </div>
  );
}
```

---

## 4. Core Concepts

### 4.1 Entity Model

The chat wrapper uses an **entity-based model** to organize conversations:

```typescript
// Entity = WHO owns the conversation
entityId: "brand_123"        // Brand or Account ID
entityType: "BRAND"          // BRAND | ACCOUNT | USER

// Metadata = WHAT the conversation is about
metadata: {
  orderId: "order_789",      // Dynamic business data
  tableId: "table_5",
  campaignId: "spring_sale",
  status: "pending"
}
```

**Key Distinction:**

| Aspect        | Entity (entityId/entityType)     | Metadata                             |
| ------------- | -------------------------------- | ------------------------------------ |
| **Purpose**   | Ownership & access control       | Business context                     |
| **Frequency** | Set once at initialization       | Updated frequently                   |
| **Example**   | "This chat belongs to Brand ABC" | "This chat is about Order #123"      |
| **Changes**   | Rare (ownership transfer)        | Common (order status, table changes) |

### 4.2 Authentication Flow

```
1. App provides userMpAuthToken (long-lived) + chatServerUrl (https://)
   ↓
2. WebSocket client requests ticket
   POST /api/v1/ws-tickets/generate
   Headers: { x-oddle-mp-auth-token, x-oddle-chat-server-key }
   ↓
3. Server returns short-lived ticket (valid ~5 minutes)
   { ticket: "abc123...", expiresAt: "2025-11-10T10:00:00Z" }
   ↓
4. Client auto-converts https:// to wss:// and connects WebSocket
   https://chat.oddle.me → wss://chat.oddle.me?ticket=abc123...
   ↓
5. Ticket Manager auto-renews before expiration
   (Background process, transparent to app)
```

**Benefits:**

- Short-lived tickets reduce security risk
- HTTPS URL automatically converted to WSS for WebSocket connection
- Auto-renewal keeps connection alive
- No manual token management needed

### 4.3 Message Types

```typescript
type MessageRole =
  | "user" // User's messages
  | "assistant" // AI responses
  | "system" // System notifications
  | "reasoning" // AI thinking process (optional display)
  | "tooling"; // Tool execution status

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  media?: string[];
  toolData?: {
    toolName: string;
    callId: string;
    parameters?: Record<string, any>;
    result?: any;
    status?: "processing" | "completed" | "error";
  };
}
```

### 4.4 Display Modes

```typescript
mode: "sidebar"; // Docked to side of screen
mode: "modal"; // Popup overlay
mode: "fullscreen"; // Takes over entire viewport
mode: "embedded"; // Fits within parent container
```

**Choosing the Right Mode:**

- **Sidebar**: Best for always-available assistant (default)
- **Modal**: Good for focused interactions, less intrusive
- **Fullscreen**: Ideal for mobile or primary chat apps
- **Embedded**: When chat is part of a larger layout

---

## 5. Integration Guide

### 5.1 Basic Integration

#### Step 1: Install Package

```bash
npm install @oddle/chat-wrapper-ui
```

#### Step 2: Import Component

```tsx
import { ChatWrapper, EntityType } from "@oddle/chat-wrapper-ui";
```

#### Step 3: Add to Your App

```tsx
<ChatWrapper
  userMpAuthToken={authToken}
  chatServerUrl="https://chat.oddle.me"
  chatServerKey="MYAPP"
  userId={currentUser.id}
  entityId={brand.id}
  entityType={EntityType.BRAND}
  config={{
    mode: "sidebar",
    headerName: "AI Assistant",
  }}
/>
```

### 5.2 Integration with Client-Side Tools

Tools allow the AI to execute functions in your application.

```tsx
import { ChatWrapper, Tools } from "@oddle/chat-wrapper-ui";

// Define tools your AI can use
const tools: Tools = [
  {
    name: "create_reservation",
    description: "Create a new restaurant reservation",
    parameters: [
      {
        name: "customerName",
        type: "string",
        description: "Name of the customer",
        isRequired: true,
        schema: { type: "string" },
      },
      {
        name: "date",
        type: "string",
        description: "Reservation date (YYYY-MM-DD)",
        isRequired: true,
        schema: { type: "string" },
      },
      {
        name: "partySize",
        type: "number",
        description: "Number of guests",
        isRequired: true,
        schema: { type: "number" },
      },
    ],
    // Client-side execution function
    execute: async (params) => {
      const reservation = await createReservation({
        customerName: params.customerName,
        date: params.date,
        partySize: params.partySize,
        status: "pending",
      });
      return {
        success: true,
        reservationId: reservation.id,
        confirmationCode: reservation.code,
      };
    },
  },
  {
    name: "check_table_availability",
    description: "Check if tables are available for a given time",
    parameters: [
      {
        name: "date",
        type: "string",
        description: "Date to check (YYYY-MM-DD)",
        isRequired: true,
        schema: { type: "string" },
      },
      {
        name: "time",
        type: "string",
        description: "Time to check (HH:MM)",
        isRequired: true,
        schema: { type: "string" },
      },
    ],
    execute: async (params) => {
      const available = await checkTableAvailability(params.date, params.time);
      return {
        available: available.length > 0,
        tables: available,
      };
    },
  },
];

function App() {
  return (
    <ChatWrapper
      {...otherProps}
      tools={tools}
      config={{
        mode: "sidebar",
        headerName: "Restaurant AI",
        features: {
          showToolResults: true, // Display tool execution results
        },
      }}
    />
  );
}
```

### 5.3 Integration with Metadata Updates

Update business context as your app state changes:

```tsx
import { useRef } from "react";
import {
  ChatWrapper,
  ChatWrapperRef,
  EntityType,
} from "@oddle/chat-wrapper-ui";

function OrderManagementApp() {
  const chatRef = useRef<ChatWrapperRef>(null);

  // When order is created
  const handleOrderCreated = (order) => {
    chatRef.current?.updateMetadata({
      metadata: {
        orderId: order.id,
        customerId: order.customerId,
        status: "pending",
        total: order.total,
      },
    });
  };

  // When order status changes
  const handleOrderStatusChange = (orderId, newStatus) => {
    chatRef.current?.updateMetadata({
      metadata: {
        orderId: orderId,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      },
    });
  };

  return (
    <div>
      <ChatWrapper
        ref={chatRef}
        userMpAuthToken={token}
        chatServerUrl="https://chat.oddle.me"
        chatServerKey="ORDERS"
        userId={currentUser.id}
        entityId={restaurant.id}
        entityType={EntityType.BRAND}
        config={{
          mode: "sidebar",
          headerName: "Order Assistant",
        }}
      />

      {/* Your order management UI */}
      <OrderList
        onOrderCreated={handleOrderCreated}
        onStatusChange={handleOrderStatusChange}
      />
    </div>
  );
}
```

### 5.4 Environment Configuration

```typescript
// config/chat.config.ts
export const chatConfig = {
  development: {
    chatServerUrl: "http://localhost:3000",
    apiUrl: "http://localhost:3000",
  },
  staging: {
    chatServerUrl: "https://chat-staging.oddle.me",
    apiUrl: "https://api-staging.oddle.me",
  },
  production: {
    chatServerUrl: "https://chat.oddle.me",
    apiUrl: "https://api.oddle.me",
  },
};

// Usage
const env = process.env.NODE_ENV;
const config = chatConfig[env];

<ChatWrapper
  chatServerUrl={config.chatServerUrl}
  // ... other props
/>;
```

---

## 6. API Reference

### 6.1 ChatWrapper Props

```typescript
interface ChatWrapperProps {
  // === REQUIRED AUTHENTICATION ===

  /** User's authentication token (long-lived) */
  userMpAuthToken: string;

  /** Chat server URL (https://... - automatically converted to wss:// for WebSocket) */
  chatServerUrl: string;

  /** Application identifier key */
  chatServerKey: string;

  // === REQUIRED USER CONTEXT ===

  /** Current user's ID */
  userId: string;

  // === OPTIONAL ENTITY CONTEXT ===

  /** Entity ID (brandId or accountId) */
  entityId?: string;

  /** Entity type */
  entityType?: EntityType; // 'BRAND' | 'ACCOUNT' | 'USER'

  /** Business metadata (orderId, tableId, etc.) */
  metadata?: Record<string, any>;

  // === REQUIRED CONFIGURATION ===

  /** Chat UI configuration */
  config: ChatConfig;

  // === OPTIONAL FEATURES ===

  /** Client-side tools the AI can execute */
  tools?: Tools;

  /** Enable developer settings panel */
  devMode?: boolean;

  /** Context helpers for AI */
  contextHelpers?: ContextHelpers;
}
```

### 6.2 ChatConfig Interface

```typescript
interface ChatConfig {
  // === DISPLAY MODE ===
  mode: ChatMode; // 'sidebar' | 'modal' | 'fullscreen' | 'embedded'
  position?: ChatPosition; // 'left' | 'right' (for sidebar)
  theme?: ChatTheme; // 'light' | 'dark' | 'auto'

  // === HEADER ===
  headerName: string;
  headerDescription?: string;
  headerVisible?: boolean; // Default: true

  // === INPUT AREA ===
  placeholderTexts?: string[]; // Rotating placeholder text
  chipName?: string; // Name to display near attachment button
  chipLogo?: string; // Logo URL for chip

  // === SUGGESTIONS ===
  suggestedPrompts?: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>;

  // === FEATURES ===
  features?: {
    fileUpload?: boolean; // Enable file uploads
    voiceInput?: boolean; // Enable voice input (future)
    messageHistory?: boolean; // Load previous messages
    exportChat?: boolean; // Export chat transcript
    showToolResults?: boolean; // Display tool execution
    showBubbleText?: boolean; // Show bubble text
  };

  // === CALLBACKS ===
  onMessage?: (message: Message) => void;
  onError?: (error: Error) => void;
  onToolResult?: (tool: string, result: any) => void;
  onStreamingStatusChange?: (status: string) => void;

  // === STYLING ===
  customStyles?: React.CSSProperties;
  constrainedHeight?: boolean; // Fill parent container (embedded mode)
}
```

### 6.3 ChatWrapperRef (Imperative Handle)

```typescript
interface ChatWrapperRef {
  /**
   * Update entity ownership (rare - for transferring conversations)
   */
  updateEntityId: (entityId: string, entityType?: EntityType) => void;

  /**
   * Update business context metadata (common - for business data)
   */
  updateMetadata: (updates: { tag?: string | null; metadata?: any }) => void;
}

// Usage
const chatRef = useRef<ChatWrapperRef>(null);

// Update entity ownership
chatRef.current?.updateEntityId("brand_new", EntityType.BRAND);

// Update metadata
chatRef.current?.updateMetadata({
  metadata: { orderId: "123", status: "shipped" },
});
```

### 6.4 Tools Interface

```typescript
interface Tool {
  name: string;
  description: string;
  parameters: ToolParameter[];
  execute: (params: any) => Promise<any> | any;
}

interface ToolParameter {
  name: string;
  type: string;
  description: string;
  isRequired: boolean;
  schema: {
    type: string;
    properties?: Record<string, any>;
    required?: string[];
    enum?: string[];
    items?: any;
  };
}

type Tools = Tool[];
```

### 6.5 Utility Functions

```typescript
// Thread API utilities
import {
  fetchThreadMessages,
  updateThread,
  updateThreadMetadata,
} from "@oddle/chat-wrapper-ui";

// Fetch thread messages
const result = await fetchThreadMessages(
  apiUrl,
  {
    userId: "user_123",
    entityId: "brand_456",
    entityType: "BRAND",
    metadata: { orderId: "789" },
  },
  { userMpAuthToken, chatServerKey }
);

// Update thread entity ownership
await updateThread(
  apiUrl,
  providerResId,
  {
    entityId: "brand_new",
    entityType: "BRAND",
  },
  { userMpAuthToken, chatServerKey }
);

// Update thread metadata
await updateThreadMetadata(
  apiUrl,
  providerResId,
  {
    tag: "urgent",
    metadata: { orderId: "123", status: "pending" },
  },
  { userMpAuthToken, chatServerKey }
);
```

---

## 7. Advanced Features

### 7.1 Conversation History Loading

The chat wrapper automatically loads previous conversation history when `entityId` is provided:

```tsx
// Automatic history loading
<ChatWrapper
  entityId="brand_123"  // Loads conversation for this brand
  entityType={EntityType.BRAND}
  userId="user_456"
  {...otherProps}
/>

// With metadata filtering
<ChatWrapper
  entityId="brand_123"
  entityType={EntityType.BRAND}
  metadata={{
    orderId: 'order_789'  // Load conversation for specific order
  }}
  {...otherProps}
/>
```

**How it works:**

1. Component mounts
2. `useConversationLoader` hook checks for `entityId`
3. Calls `fetchThreadMessagesV2` with entity/metadata
4. Loads matching conversation history
5. Displays messages in UI

### 7.2 File Upload

Enable file uploads to allow users to share images and documents:

```tsx
<ChatWrapper
  {...props}
  config={{
    mode: "sidebar",
    headerName: "AI Assistant",
    features: {
      fileUpload: true, // Enable file uploads
    },
  }}
/>
```

**Supported file types:**

- Images: PNG, JPG, JPEG, GIF, WEBP
- Documents: PDF
- Max size: 10MB per file

**How it works:**

1. User clicks attachment icon
2. Selects file(s)
3. Files uploaded to server
4. Returns data URLs or file IDs
5. Sent with message to AI

### 7.3 Suggested Prompts

Guide users with pre-defined prompt suggestions:

```tsx
<ChatWrapper
  {...props}
  config={{
    mode: "sidebar",
    headerName: "Restaurant AI",
    suggestedPrompts: [
      {
        title: "New Menu Launch",
        description: "Create a campaign for a new menu item",
        icon: <span>📅</span>,
      },
      {
        title: "Customer Re-engagement",
        description: "Draft an email to bring back lapsed customers",
        icon: <span>📧</span>,
      },
      {
        title: "Social Media Post",
        description: "Generate engaging social media content",
        icon: <span>📱</span>,
      },
    ],
  }}
/>
```

### 7.4 Context Helpers

Provide additional context to the AI:

```tsx
<ChatWrapper
  {...props}
  contextHelpers={{
    brandInfo: {
      id: "brand_123",
      brandName: "The Great Restaurant",
      cuisine: "Italian",
      location: "Downtown",
    },
    locale: "en-US",
    timezone: "Asia/Singapore",
    userPreferences: {
      language: "English",
      currency: "SGD",
    },
  }}
/>
```

### 7.5 Custom Callbacks

React to chat events in your application:

```tsx
<ChatWrapper
  {...props}
  config={{
    mode: "sidebar",
    headerName: "AI Assistant",

    onMessage: (message) => {
      console.log("New message:", message);
      // Track analytics
      analytics.track("chat_message_sent", {
        userId: currentUser.id,
        messageLength: message.content.length,
      });
    },

    onError: (error) => {
      console.error("Chat error:", error);
      // Send to error tracking
      Sentry.captureException(error);
    },

    onToolResult: (toolName, result) => {
      console.log("Tool executed:", toolName, result);
      // Update app state based on tool execution
      if (toolName === "create_reservation") {
        refreshReservationList();
      }
    },

    onStreamingStatusChange: (status) => {
      console.log("Streaming status:", status);
      // Show/hide loading indicators
    },
  }}
/>
```

---

## 8. State Management

### 8.1 Zustand Store Architecture

The chat wrapper uses Zustand for centralized state management:

```typescript
// UI State
interface UIState {
  // Layout
  currentMode: ChatMode;
  isModalOpen: boolean;
  isCollapsed: boolean;

  // Chat status
  chatStatus: ChatStatus;
  streamingStatus: StreamingStatus;

  // Streaming
  isStreaming: boolean;
  isThinking: boolean;
  streamingContent: string;
  isHandlingTool: boolean;

  // Conversation
  isLoadingConversation: boolean;
  conversationError: string | null;

  // Thread
  currentThreadId: string | null;
  providerResId: string | null;

  // Dev tools
  isDevSettingsOpen: boolean;
}
```

### 8.2 Accessing State in Your App

```tsx
import { useUIStore } from "@oddle/chat-wrapper-ui";

function MyComponent() {
  // Subscribe to specific state
  const isStreaming = useUIStore((state) => state.isStreaming);
  const chatStatus = useUIStore((state) => state.chatStatus);
  const providerResId = useUIStore((state) => state.providerResId);

  // Use state
  if (isStreaming) {
    return <div>AI is responding...</div>;
  }

  return <div>Ready to chat</div>;
}
```

### 8.3 State Lifecycle

```
1. Component Mount
   ↓
2. Initialize state (idle, collapsed: false)
   ↓
3. WebSocket connects
   ↓
4. Conversation loads (if entityId provided)
   ↓
5. User sends message → chatStatus: 'submitted'
   ↓
6. Response starts → streamingStatus: 'streaming'
   ↓
7. Response completes → chatStatus: 'idle'
```

---

## 9. WebSocket Communication

### 9.1 Connection Lifecycle

```
1. Initialize WebSocketChatClient
   ↓
2. Request ticket from server (HTTP POST)
   ↓
3. Connect WebSocket with ticket
   wss://chat.oddle.me?ticket=abc123
   ↓
4. Send 'hello' message
   ↓
5. Receive connection confirmation
   ↓
6. Start ticket auto-renewal (background)
   ↓
7. Connection ready for messages
```

### 9.2 Message Format

**Outbound (Client → Server):**

```json
{
  "type": "chat",
  "content": "Hello, how can you help me?",
  "conversationId": "conv_abc123",
  "media": ["data:image/png;base64,..."],
  "toolSchemas": [
    {
      "name": "create_reservation",
      "description": "...",
      "parameters": [...]
    }
  ]
}
```

**Inbound (Server → Client):**

_Streaming content:_

```json
{
  "type": "stream",
  "event": "content",
  "content": "Hello! I can help you with ",
  "done": false
}
```

_Tool call request:_

```json
{
  "type": "tool_call",
  "tool": "create_reservation",
  "callId": "call_123",
  "parameters": {
    "customerName": "John Doe",
    "date": "2025-11-15",
    "partySize": 4
  }
}
```

_System event:_

```json
{
  "type": "system",
  "event": "chat_completed",
  "data": {
    "conversationId": "conv_abc123"
  }
}
```

### 9.3 Auto-Reconnection

The client automatically handles connection drops:

```typescript
// Reconnection strategy
maxReconnectAttempts: 5
reconnectDelay: 1000ms (doubles each attempt)
maxReconnectDelay: 30000ms

// Backoff sequence
Attempt 1: 1000ms
Attempt 2: 2000ms
Attempt 3: 4000ms
Attempt 4: 8000ms
Attempt 5: 16000ms
Attempt 6+: 30000ms (max)
```

**User experience:**

- Connection lost → Shows notification "Reconnecting..."
- Reconnecting → Shows retry attempt number
- Connected → Notification disappears
- Failed after max attempts → Shows "Connection failed" with retry button

---

## 10. Security & Authentication

### 10.1 Multi-Layer Security

```
Layer 1: User MP Auth Token (Long-lived)
  ↓ Used to request ticket
Layer 2: Chat Server Key (App identifier)
  ↓ Validates app authorization
Layer 3: WebSocket Ticket (Short-lived, ~5 min)
  ↓ Actual WebSocket auth
Secure WebSocket Connection (WSS/TLS)
```

### 10.2 Token Management

**User MP Auth Token:**

- Long-lived session token
- Stored in app (memory/secure storage)
- Never sent over WebSocket
- Used only for ticket generation

**WebSocket Ticket:**

- Short-lived (~5 minutes)
- Auto-renewed before expiration
- Stored in-memory only
- Invalidated on logout

### 10.3 Best Practices

✅ **DO:**

- Use environment variables for sensitive config
- Implement proper token refresh on server
- Use HTTPS/WSS in production
- Validate user permissions on server
- Log security events

❌ **DON'T:**

- Store tokens in localStorage
- Expose tokens in client-side code
- Commit credentials to git
- Skip SSL certificate validation
- Trust client-side validation alone

### 10.4 Data Privacy

**What gets sent to server:**

- User messages and uploaded files
- Entity ID and metadata
- Tool execution results
- User ID and context helpers

**What stays client-side:**

- Auth tokens (long-lived)
- Tool execution logic
- Local state
- User preferences

**Compliance:**

- All data encrypted in transit (TLS)
- Conversation history requires explicit entityId
- No automatic data retention without user consent
- Support for data deletion (via API)

---

## 11. Error Handling

### 11.1 Error Boundaries

The component includes React Error Boundaries at multiple levels:

```tsx
<ChatErrorBoundary>
  <WebSocketErrorBoundary>
    <FileUploadErrorBoundary>{/* Chat UI */}</FileUploadErrorBoundary>
  </WebSocketErrorBoundary>
</ChatErrorBoundary>
```

**Benefits:**

- Prevents entire app crash
- Shows user-friendly error messages
- Logs errors for debugging
- Allows partial recovery

### 11.2 Error Types

**Connection Errors:**

```typescript
// WebSocket connection fails
error: {
  type: 'CONNECTION_ERROR',
  message: 'Failed to connect to chat server',
  retry: true
}

// Ticket generation fails
error: {
  type: 'AUTH_ERROR',
  message: 'Failed to generate auth ticket',
  retry: false
}
```

**Message Errors:**

```typescript
// AI response error
error: {
  type: 'CHAT_ERROR',
  message: 'AI model returned an error',
  details: 'Rate limit exceeded'
}

// Tool execution error
error: {
  type: 'TOOL_ERROR',
  toolName: 'create_reservation',
  message: 'Failed to create reservation',
  details: error.message
}
```

**File Upload Errors:**

```typescript
// File too large
error: {
  type: 'FILE_SIZE_ERROR',
  message: 'File size exceeds 10MB limit'
}

// Unsupported file type
error: {
  type: 'FILE_TYPE_ERROR',
  message: 'File type not supported',
  supported: ['png', 'jpg', 'pdf']
}
```

### 11.3 Error Handling in Your App

```tsx
<ChatWrapper
  {...props}
  config={{
    mode: "sidebar",
    headerName: "AI Assistant",

    onError: (error) => {
      // Log to error tracking service
      Sentry.captureException(error, {
        tags: {
          component: "chat-wrapper",
          errorType: error.type,
        },
      });

      // Show user notification
      toast.error(error.message);

      // Custom handling based on error type
      if (error.type === "AUTH_ERROR") {
        // Redirect to login
        router.push("/login");
      }
    },
  }}
/>
```

---

## 12. Performance Optimization

### 12.1 Built-in Optimizations

The chat wrapper includes several performance optimizations:

✅ **React.memo** - Prevents unnecessary re-renders
✅ **useMemo** - Memoizes expensive calculations
✅ **useCallback** - Stable function references
✅ **Code splitting** - Lazy-loaded components
✅ **Virtual scrolling** - For long message lists (planned)

### 12.2 Bundle Size

```
Main bundle:  288.55 KB (gzipped: 82.06 KB)
CSS:          52.21 KB (gzipped: 8.51 KB)
Total:        ~340 KB (gzipped: ~90 KB)
```

**Optimization tips:**

- Use dynamic imports for large tools
- Implement lazy loading for file uploads
- Consider bundle analyzer for your app

### 12.3 Rendering Performance

**Measured metrics:**

- Initial render: ~50ms
- Message added: ~10-20ms
- Streaming update: ~5ms
- Tool execution: ~100ms (depends on tool)

**Tips for better performance:**

```tsx
// ✅ Good: Memoize tools
const tools = useMemo(
  () => [
    {
      name: "tool1",
      execute: async () => {
        /* ... */
      },
    },
  ],
  []
); // Empty deps - tools don't change

// ❌ Bad: Create tools on every render
const tools = [
  {
    name: "tool1",
    execute: async () => {
      /* ... */
    },
  },
]; // New array every render
```

### 12.4 Network Performance

**WebSocket efficiency:**

- Single persistent connection
- Binary message format (planned)
- Message batching (planned)
- Compression support

**HTTP optimization:**

- Ticket caching (5 min TTL)
- Message pagination
- Lazy conversation loading

---

## 13. Customization

### 13.1 Custom Components

**Replace bubble button:**

```tsx
// Custom bubble component
function MyCustomBubble({ onClick }) {
  return (
    <button onClick={onClick} className="my-custom-bubble">
      <ChatIcon />
      <span>Ask AI</span>
    </button>
  );
}

// Currently requires forking (component replacement planned)
```

### 13.2 Localization

```tsx
// Future feature - localization support
<ChatWrapper
  {...props}
  locale="zh-CN"
  translations={{
    placeholder: "请输入消息...",
    send: "发送",
    thinking: "思考中...",
    // ... more translations
  }}
/>
```

---

## 14. Testing

### 14.1 Testing Your Integration

**Unit tests:**

```tsx
import { render, screen } from "@testing-library/react";
import { ChatWrapper, EntityType } from "@oddle/chat-wrapper-ui";

describe("ChatWrapper Integration", () => {
  it("renders with required props", () => {
    render(
      <ChatWrapper
        userMpAuthToken="test-token"
        chatServerUrl="https://test.oddle.me"
        chatServerKey="TEST"
        userId="user_test"
        entityId="brand_test"
        entityType={EntityType.BRAND}
        config={{
          mode: "sidebar",
          headerName: "Test Chat",
        }}
      />
    );

    expect(screen.getByText("Test Chat")).toBeInTheDocument();
  });
});
```

**Integration tests:**

```tsx
import { render, fireEvent, waitFor } from "@testing-library/react";

describe("Chat Message Flow", () => {
  it("sends message and receives response", async () => {
    const { getByPlaceholderText, getByRole } = render(
      <ChatWrapper {...testProps} />
    );

    const input = getByPlaceholderText("Type a message...");
    const sendButton = getByRole("button", { name: /send/i });

    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("Hello")).toBeInTheDocument();
    });
  });
});
```

### 14.2 Mocking WebSocket

```tsx
// Mock WebSocket for testing
jest.mock("@oddle/chat-wrapper-ui", () => ({
  ...jest.requireActual("@oddle/chat-wrapper-ui"),
  WebSocketChatClient: jest.fn().mockImplementation(() => ({
    connect: jest.fn().mockResolvedValue(true),
    sendMessage: jest.fn().mockResolvedValue({ id: "123" }),
    disconnect: jest.fn(),
  })),
}));
```

---

## 15. Deployment

### 15.1 Production Checklist

- [ ] Use production HTTPS URL (`https://chat.oddle.me` - auto-converts to WSS)
- [ ] Enable HTTPS/TLS
- [ ] Set proper CORS headers
- [ ] Configure CDN (optional)
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Enable analytics tracking
- [ ] Test with production data
- [ ] Load testing (if high traffic expected)
- [ ] Backup plan for WebSocket failure
- [ ] Documentation for ops team

### 15.2 Environment Variables

```bash
# .env.production
REACT_APP_CHAT_SERVER_URL=https://chat.oddle.me
REACT_APP_CHAT_API_URL=https://api.oddle.me
REACT_APP_CHAT_SERVER_KEY=MYAPP_PROD
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_SENTRY_DSN=https://...
```

### 15.3 CDN Configuration (Optional)

```javascript
// webpack.config.js
module.exports = {
  output: {
    publicPath: "https://cdn.oddle.me/chat-wrapper/",
  },
};
```

### 15.4 Monitoring Setup

```tsx
// App-level monitoring
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

<ChatWrapper
  {...props}
  config={{
    onError: (error) => {
      Sentry.captureException(error);
    },
  }}
/>;
```

---

## 16. Troubleshooting

### 16.1 Common Issues

**Issue: WebSocket connection fails**

```
Error: Failed to connect to chat server
```

**Solutions:**

1. Check `chatServerUrl` is correct (use `https://` - it will be auto-converted to `wss://`)
2. Verify server is running and accessible
3. Check firewall/network settings
4. Ensure auth tokens are valid
5. Check browser console for detailed error

**Issue: Messages not sending**

```
Error: Cannot send message - not connected
```

**Solutions:**

1. Wait for connection to establish (check connection indicator)
2. Verify `userId` is provided
3. Check network connectivity
4. Restart WebSocket connection (refresh page)

**Issue: Conversation history not loading**

```
Warning: No entityId provided, skipping history fetch
```

**Solutions:**

1. Ensure `entityId` prop is provided
2. Verify entity exists in database
3. Check API URL is correct
4. Verify auth tokens have permission to access entity

**Issue: Tools not executing**

```
Error: Tool 'create_reservation' failed
```

**Solutions:**

1. Check tool `execute` function implementation
2. Verify tool parameters match AI's call
3. Check for async/await issues
4. Add error handling in tool function
5. Check browser console for tool errors

**Issue: Styling issues**

```
Chat wrapper not displaying correctly
```

**Solutions:**

1. Ensure CSS is imported: `import '@oddle/chat-wrapper-ui/dist/style.css'`
2. Check for CSS conflicts with your app styles
3. Verify `mode` prop is correct for your layout
4. Check `customStyles` prop for typos

### 16.2 Debug Mode

Enable detailed logging:

```tsx
<ChatWrapper
  {...props}
  devMode={true} // Shows dev settings panel
  config={{
    onError: (error) => {
      console.error("Chat error:", error);
    },
    onMessage: (message) => {
      console.log("Message:", message);
    },
  }}
/>
```

**Dev Settings Panel includes:**

- Current connection status
- Ticket information
- Message history
- Entity/metadata editor
- Connection reset button

### 16.3 Diagnostic Checklist

When reporting issues, provide:

- [ ] Browser and version
- [ ] Operating system
- [ ] Chat wrapper version (`1.0.5`)
- [ ] Error messages (from console)
- [ ] Network tab screenshots
- [ ] Steps to reproduce
- [ ] Expected vs actual behavior
- [ ] Code snippet (minimal reproduction)

---

## 17. FAQ

### Q: Can I use this with Next.js?

**A:** Yes! The chat wrapper works with Next.js. Use dynamic import to avoid SSR issues:

```tsx
import dynamic from "next/dynamic";

const ChatWrapper = dynamic(
  () => import("@oddle/chat-wrapper-ui").then((mod) => mod.ChatWrapper),
  { ssr: false }
);
```

### Q: Does it work with React Native?

**A:** Not currently. This is a web-only component. A React Native version is planned.

### Q: Can I customize the message bubbles?

**A:** Currently limited to CSS customization. Component-level customization is planned for v2.0.

### Q: How do I handle user logout?

**A:** The component automatically cleans up on unmount. Just remove the component when user logs out:

```tsx
{
  isLoggedIn && <ChatWrapper {...props} />;
}
```

### Q: Can multiple users chat in the same conversation?

**A:** Not yet. Each conversation is currently single-user. Multi-user support is on the roadmap.

### Q: What's the message size limit?

**A:** No hard limit, but recommended max is 10,000 characters for optimal performance.

### Q: Can I save/export chat history?

**A:** Enable in config: `features: { exportChat: true }`. Users can then export via UI.

### Q: Does it support voice input?

**A:** Planned for future release. Current version is text and file only.

### Q: How much does it cost to use?

**A:** The chat wrapper itself is free (internal Oddle tool). Server-side AI API costs depend on usage.

### Q: Can I use my own AI backend?

**A:** Yes, but requires implementing the WebSocket API contract. Contact the team for specs.

---

## 18. Contributing

### 18.1 Development Setup

```bash
# Clone repository
git clone https://github.com/oddle-engineering/oddle-chat-wrapper-ui.git
cd oddle-chat-wrapper-ui

# Install dependencies
npm install

# Run showcase app (development)
cd showcase
npm install
npm run dev
# Opens on http://localhost:5173

# Build package
cd ..
npm run build
```

### 18.2 Project Structure

```
oddle-chat-wrapper-ui/
├── src/                 # Main source code
├── showcase/            # Demo application
├── dist/                # Built package (generated)
├── docs/                # Documentation
├── scripts/             # Build scripts
├── package.json         # Package config
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Build config
└── README.md           # Quick start guide
```

### 18.3 Making Changes

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes in `src/`
3. Test in showcase app: `cd showcase && npm run dev`
4. Build package: `npm run build`
5. Test build: `npm pack` and install in test project
6. Commit: `git commit -m "feat: add my feature"`
7. Push and create PR

### 18.4 Release Process

See [RELEASE_PROCESS.md](./RELEASE_PROCESS.md) for detailed release steps.

**Quick version:**

```bash
# 1. Update version
npm version patch  # or minor, or major

# 2. Build
npm run build

# 3. Publish
npm publish

# 4. Push tags
git push origin main --tags
```

### 18.5 Code Style

- TypeScript strict mode enabled
- ESLint for linting
- Prettier for formatting
- Follow React best practices
- Write meaningful commit messages (Conventional Commits)

### 18.6 Testing Guidelines

- Write unit tests for new features
- Test in showcase app before PR
- Manual testing on Chrome, Firefox, Safari
- Mobile testing (iOS Safari, Chrome Mobile)
- Check accessibility (keyboard navigation, screen readers)

---

## Appendix A: Complete Example Application

```tsx
// App.tsx - Complete working example
import { useState, useRef, useCallback, useMemo } from "react";
import {
  ChatWrapper,
  ChatWrapperRef,
  EntityType,
  Tools,
  ChatMode,
} from "@oddle/chat-wrapper-ui";

interface Todo {
  id: string;
  task: string;
  status: "pending" | "completed";
  created_at: string;
}

function CompleteExample() {
  // State
  const [todos, setTodos] = useState<Todo[]>([]);
  const chatRef = useRef<ChatWrapperRef>(null);

  // Tools definition
  const tools: Tools = useMemo(
    () => [
      {
        name: "create_todo",
        description: "Create a new todo item",
        parameters: [
          {
            name: "task",
            type: "string",
            description: "The task description",
            isRequired: true,
            schema: { type: "string" },
          },
        ],
        execute: async (params) => {
          const newTodo: Todo = {
            id: Date.now().toString(),
            task: params.task,
            status: "pending",
            created_at: new Date().toISOString(),
          };
          setTodos((prev) => [...prev, newTodo]);

          // Update chat metadata
          chatRef.current?.updateMetadata({
            metadata: {
              totalTodos: todos.length + 1,
              lastTodoCreated: newTodo.id,
            },
          });

          return {
            success: true,
            todo: newTodo,
          };
        },
      },
      {
        name: "list_todos",
        description: "Get all todo items",
        parameters: [],
        execute: async () => {
          return {
            todos: todos,
            total: todos.length,
          };
        },
      },
      {
        name: "complete_todo",
        description: "Mark a todo as completed",
        parameters: [
          {
            name: "id",
            type: "string",
            description: "The todo ID",
            isRequired: true,
            schema: { type: "string" },
          },
        ],
        execute: async (params) => {
          setTodos((prev) =>
            prev.map((todo) =>
              todo.id === params.id ? { ...todo, status: "completed" } : todo
            )
          );
          return { success: true };
        },
      },
    ],
    [todos]
  );

  // Config
  const config = useMemo(
    () => ({
      mode: "sidebar" as ChatMode,
      position: "right",
      headerName: "Todo Assistant",
      headerDescription: "Manage your tasks with AI",
      theme: "light",

      placeholderTexts: [
        "Ask me to create a todo...",
        "What tasks do you have today?",
        "Let me help you stay organized!",
      ],

      suggestedPrompts: [
        {
          title: "Create Todo",
          description: "Create a new task for me",
          icon: <span>✅</span>,
        },
        {
          title: "List Todos",
          description: "Show all my tasks",
          icon: <span>📋</span>,
        },
      ],

      features: {
        fileUpload: false,
        messageHistory: true,
        showToolResults: true,
      },

      onMessage: (message) => {
        console.log("Message sent:", message);
      },

      onError: (error) => {
        console.error("Chat error:", error);
        alert(`Error: ${error.message}`);
      },

      onToolResult: (toolName, result) => {
        console.log(`Tool ${toolName} executed:`, result);
      },
    }),
    []
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo App with AI Assistant</h1>
      </header>

      <main className="app-main">
        <div className="todos-panel">
          <h2>Your Todos ({todos.length})</h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.status === "completed"}
                  onChange={() => {
                    setTodos((prev) =>
                      prev.map((t) =>
                        t.id === todo.id
                          ? {
                              ...t,
                              status:
                                t.status === "completed"
                                  ? "pending"
                                  : "completed",
                            }
                          : t
                      )
                    );
                  }}
                />
                <span
                  className={todo.status === "completed" ? "completed" : ""}
                >
                  {todo.task}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <ChatWrapper
        ref={chatRef}
        userMpAuthToken={process.env.REACT_APP_USER_TOKEN!}
        chatServerUrl={process.env.REACT_APP_CHAT_SERVER_URL!}
        chatServerKey="TODO_APP"
        userId="user_demo"
        entityId="demo_account"
        entityType={EntityType.ACCOUNT}
        metadata={{
          appVersion: "1.0.0",
          totalTodos: todos.length,
        }}
        config={config}
        tools={tools}
        devMode={true}
        contextHelpers={{
          appInfo: {
            name: "Todo App",
            version: "1.0.0",
          },
          userPreferences: {
            language: "en",
            timezone: "UTC",
          },
        }}
      />
    </div>
  );
}

export default CompleteExample;
```

---

## Appendix B: API Endpoints Reference

### WebSocket Ticket Generation

```http
POST /api/v1/ws-tickets/generate
Headers:
  x-oddle-mp-auth-token: <userMpAuthToken>
  x-oddle-chat-server-key: <chatServerKey>
Content-Type: application/json

Body:
{
  "userId": "user_123",
  "entityId": "brand_456",
  "entityType": "BRAND"
}

Response:
{
  "ticket": "eyJhbGciOiJIUzI1NiIs...",
  "expiresAt": "2025-11-10T10:05:00.000Z",
  "expiresIn": 300
}
```

### Fetch Thread Messages (V2)

```http
GET /api/v1/threads/messages/v2?userId=user_123&entityId=brand_456&entityType=BRAND&format=client
Headers:
  x-oddle-mp-auth-token: <userMpAuthToken>
  x-oddle-chat-server-key: <chatServerKey>

Response:
{
  "messages": [...],
  "providerResId": "conv_abc123",
  "threadId": "thread_789"
}
```

### Update Thread Metadata

```http
PATCH /api/v1/threads/provider/{providerResId}
Headers:
  x-oddle-mp-auth-token: <userMpAuthToken>
  x-oddle-chat-server-key: <chatServerKey>
Content-Type: application/json

Body:
{
  "tag": "urgent",
  "metadata": {
    "orderId": "order_123",
    "status": "pending"
  }
}

Response:
{
  "success": true,
  "data": { /* updated thread */ }
}
```

---

## Appendix C: TypeScript Definitions

Full type definitions are included in the package. Key types:

```typescript
// Entity types
export enum EntityType {
  BRAND = "BRAND",
  ACCOUNT = "ACCOUNT",
  USER = "USER",
}

// Display modes
export type ChatMode = "sidebar" | "modal" | "fullscreen" | "embedded";
export type ChatPosition = "left" | "right";
export type ChatTheme = "light" | "dark" | "auto";

// Message
export interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "reasoning" | "tooling";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  media?: string[];
  toolData?: ToolData;
}

// Tool
export interface Tool {
  name: string;
  description: string;
  parameters: ToolParameter[];
  execute: (params: any) => Promise<any> | any;
}

// Full definitions in package
```

---

## Support & Contact

- **Documentation**: This guide + README.md
- **Issues**: GitHub Issues
- **Internal Support**: Oddle Engineering Team
- **Package**: [@oddle/chat-wrapper-ui](https://www.npmjs.com/package/@oddle/chat-wrapper-ui)

---

**Last Updated:** November 10, 2025  
**Version:** 1.0.5  
**Maintained by:** Oddle Engineering Team
