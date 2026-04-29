# Generative UI for Chat: Architecture & Implementation Guide

> A complete design for adding generative UI (renderable React components in chat messages) to a dashboard → chat-ui-library → chat-server → Latitude.io stack.

---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Background: What is Generative UI?](#2-background-what-is-generative-ui)
3. [Inspiration: Tambo's Component Registration Pattern](#3-inspiration-tambos-component-registration-pattern)
4. [Architecture Overview](#4-architecture-overview)
5. [The Three Contracts](#5-the-three-contracts)
6. [Approach: Universal `render_ui` Tool](#6-approach-universal-render_ui-tool)
7. [Implementation: Latitude Prompt Template](#7-implementation-latitude-prompt-template)
8. [Implementation: Chat-Server Transformation](#8-implementation-chat-server-transformation)
9. [Implementation: Streaming Partial JSON](#9-implementation-streaming-partial-json)
10. [Client-Side Rendering](#10-client-side-rendering)
11. [End-to-End Data Flow](#11-end-to-end-data-flow)
12. [Implementation Checklist](#12-implementation-checklist)
13. [Design Considerations & Tradeoffs](#13-design-considerations--tradeoffs)

---

## 1. Problem Statement

### Current architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  Dashboard App                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  chat-ui-library (props: client-tools, etc.)             │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────────┘
                         │ user message
                         ▼
                   chat-server
                         │
                         ▼ (latitude SDK)
                   latitude.io agent
```

### Goal

Allow dashboard developers to define React components that the AI agent can render inline inside chat messages — without reconfiguring the Latitude agent every time a new component is added.

---

## 2. Background: What is Generative UI?

Generative UI is the pattern where an AI agent's response isn't just text — it's a **React component rendered inline in the message stream**, with props the model decided on. Instead of returning plain text, the LLM outputs structured UI components — forms, tables, charts, layouts — rendered directly via a React SDK.

### Three architectural approaches in the ecosystem

| Approach | Description | Examples |
|---|---|---|
| **Tool-call rendering** | Each component = a typed tool. Model picks one and supplies props. | Vercel AI SDK, assistant-ui, Tambo |
| **Server component streaming** | Server streams React components directly. | Vercel AI SDK RSC (paused) |
| **Declarative UI protocols** | Model emits JSON UI description; client maps to native widgets. | Google A2UI |

### Notable libraries

- **assistant-ui** — Composable primitives (Radix-style), production-grade chat UX
- **Tambo** — Purpose-built for generative UI; Zod-schema-driven registration
- **CopilotKit** — Broader agent-focused framework, AG-UI Protocol
- **LangGraph useStream** — For LangGraph backends, supports colocated components
- **Thesys C1** — Hosted/managed Generative UI API

---

## 3. Inspiration: Tambo's Component Registration Pattern

Tambo's elegant insight: **a component registration is also a tool definition the model can see**. The same object that tells the UI "render `<WeatherCard>`" also tells the LLM "you have a tool called WeatherCard, here's its schema."

### Anatomy of a Tambo registration

```ts
{
  component: WeatherCard,           // the React component
  name: "WeatherCard",              // tool name + render-dispatch key
  description: "...",               // when the agent should use it
  propsSchema: WeatherCardPropsSchema, // both LLM input schema AND prop validation
}
```

### Three patterns worth stealing

1. **`z.describe()` is prompt engineering disguised as schema.** Field descriptions become LLM tool schema documentation.
2. **The "streaming undefined" contract.** During streaming, all props start as `undefined` and populate as data arrives. Components must handle this.
3. **Static vs dynamic registration.** Static (via Provider) for build-time components; dynamic (via hook) for runtime context-dependent ones.

---

## 4. Architecture Overview

The flow connects four layers, each with distinct responsibilities:

| Layer | Owns |
|---|---|
| **Dashboard** | Domain components and when they should appear |
| **chat-ui-library** | The message stream and rendering registry |
| **chat-server** | Protocol translation + Latitude SDK integration |
| **Latitude.io agent** | Reasoning about which component to render |

---

## 5. The Three Contracts

```
┌─────────────────────┐     Contract A: Component Registration
│ Dashboard           │ ──► chat-ui-library
│                     │     "Here are components you can render"
└─────────────────────┘
         │
         │ (via chat-ui-library → chat-server)
         ▼              Contract B: Tool Schema Advertisement
┌─────────────────────┐ chat-server ──► latitude.io
│ chat-server         │ "Here are UI tools the agent can call"
│                     │
└─────────────────────┘
         ▲
         │              Contract C: Render Instruction
         │              latitude.io ──► chat-ui-library
         │              "Render component X with these props"
```

### Contract A: Dashboard → chat-ui-library

```ts
export type GenerativeComponent<TProps = any> = {
  name: string;
  description: string;
  propsSchema: z.ZodType<TProps>;
  component: React.ComponentType<Partial<TProps>>;
};

// Dashboard usage
<ChatUI
  clientTools={[...]}
  generativeComponents={[
    {
      name: "OrderSummary",
      description: "Show details of a customer order. Use when the user asks about a specific order.",
      propsSchema: z.object({
        orderId: z.string().describe("Order ID, e.g., 'ORD-12345'"),
        status: z.enum(["pending", "shipped", "delivered"]),
        items: z.array(z.object({ name: z.string(), qty: z.number() })),
      }),
      component: OrderSummaryCard,
    },
  ]}
/>
```

### Contract B: chat-ui-library → chat-server → Latitude

Send registrations with every request (stateless, simple):

```ts
POST /chat
{
  userMessage: "Show me order ORD-123",
  conversationId: "conv-abc",
  availableComponents: [
    {
      name: "OrderSummary",
      description: "...",
      propsSchemaJson: { /* JSON Schema converted from Zod */ }
    },
    ...
  ]
}
```

### Contract C: Latitude → chat-ui-library

Streamed message parts:

```ts
type StreamPart =
  | { type: "text-delta"; text: string }
  | {
      type: "ui-component";
      toolCallId: string;
      componentName: string;
      props: Record<string, any>;
      status: "streaming" | "complete" | "error";
    }
  | { type: "done" };
```

---

## 6. Approach: Universal `render_ui` Tool

### The decision

Instead of registering N separate tools per component, define **one universal tool** in the Latitude agent (`render_ui`), and the agent picks which component via a parameter.

### Why this approach for this stack

- **Zero Latitude reconfiguration** when dashboard adds a new component
- **Simpler chat-server** — no per-component schema management
- **Dashboard owns everything** — registry lives client-side
- **Schemas still reach the LLM** via runtime context injection (hybrid pattern)

### Tradeoffs

| Pros | Cons |
|---|---|
| Single tool to maintain | LLM accuracy slightly lower than typed tools |
| Dashboard-driven iteration | Streaming partial JSON is trickier |
| No agent prompt edits per component | Component descriptions live in injected context, not native tool schemas |

---

## 7. Implementation: Latitude Prompt Template

Latitude uses **PromptL** with `{{ variable }}` syntax, YAML front-matter for config and tools, and supports `{{#each}}` for loops.

### Full prompt file

````yaml
---
provider: openai
model: gpt-4o
type: agent
temperature: 0.3
tools:
  - render_ui:
      description: |
        Renders a UI component to the user inline in the chat. Use this whenever the
        user's request can be answered visually (a card, chart, form, table, picker,
        etc.) instead of describing data in text. Pick the best matching component
        from the available list below and provide props that exactly match its schema.
      parameters:
        type: object
        properties:
          componentName:
            type: string
            description: |
              The name of the component to render. MUST be one of the names listed
              in "Available UI Components" below. Do not invent component names.
          props:
            type: object
            description: |
              The props to pass to the component. MUST match the propsSchema of the
              chosen component exactly. Field names are case-sensitive.
            additionalProperties: true
        required: [componentName, props]
        additionalProperties: false
---

<system>
You are an assistant embedded inside a dashboard. You have a tool called
`render_ui` that lets you render React components inline in your reply.

# Available UI Components

The user's dashboard has registered the following components. When the user's
request matches one, prefer calling `render_ui` over plain text.

{{#each availableComponents as component}}
## {{ component.name }}
{{ component.description }}

Props schema:
```json
{{ component.propsSchemaJson }}
```

{{/each}}

# Rules

1. If a component matches the user's intent, call `render_ui` with that
   component's name and props that strictly conform to its propsSchema.
2. If no component fits, reply with plain text.
3. You MAY combine: emit a short text message AND a render_ui call in the
   same response (e.g., "Here's the order:" + the OrderSummary component).
4. NEVER invent component names. NEVER invent prop fields not in the schema.
5. Required props must always be present. Optional props can be omitted.
</system>

<user>
{{ userMessage }}
</user>
````

### Notes on the template

- `availableComponents` is a runtime parameter your chat-server injects per request
- `{{#each ... as ...}}` is PromptL's loop syntax
- `propsSchemaJson` should be pre-stringified JSON Schema
- Rules 4 and 5 are critical for accuracy — they prevent hallucinated component names

### Note on nested code fences in PromptL

In the `.promptl` file itself, the triple backticks are literal markdown content that goes into the system message — no escaping needed because there's no outer code fence. If you ever need to embed this in documentation that uses code fences, use **4-backtick outer fences** to avoid conflict with the inner 3-backtick fence.

---

## 8. Implementation: Chat-Server Transformation

### Shared types

```ts
type ComponentRegistration = {
  name: string;
  description: string;
  propsSchemaJson: object; // JSON Schema (converted from Zod by chat-ui-library)
};

type ChatRequest = {
  userMessage: string;
  conversationId: string;
  availableComponents: ComponentRegistration[];
};

type StreamPart =
  | { type: 'text-delta'; text: string }
  | {
      type: 'ui-component';
      toolCallId: string;
      componentName: string;
      props: Record<string, any>;
      status: 'streaming' | 'complete' | 'error';
    }
  | { type: 'done' };
```

### Main handler

```ts
import { Latitude } from '@latitude-data/sdk';

const latitude = new Latitude(process.env.LATITUDE_API_KEY!, {
  projectId: Number(process.env.LATITUDE_PROJECT_ID),
  versionUuid: 'live',
});

export async function handleChat(
  req: ChatRequest,
  send: (part: StreamPart) => void,
) {
  // 1. Format components for the prompt template (PromptL #each loop)
  const availableComponents = req.availableComponents.map((c) => ({
    name: c.name,
    description: c.description,
    propsSchemaJson: JSON.stringify(c.propsSchemaJson, null, 2),
  }));

  // 2. Run the Latitude agent with streaming
  await latitude.prompts.run('chat-ui-agent', {
    parameters: {
      userMessage: req.userMessage,
      availableComponents,
    },
    stream: true,

    // render_ui is "render-only" — auto-resolve so the agent doesn't hang
    tools: {
      render_ui: async (args: { componentName: string; props: any }) => {
        return {
          rendered: true,
          componentName: args.componentName,
        };
      },
    },

    onEvent: ({ event, data }) => {
      handleLatitudeEvent(event, data, send);
    },

    onFinished: () => send({ type: 'done' }),
    onError: (err) => {
      console.error('Latitude error:', err);
      send({ type: 'done' });
    },
  });
}
```

### Event transformation

```ts
function handleLatitudeEvent(
  event: string,
  data: any,
  send: (part: StreamPart) => void,
) {
  // Plain text deltas — pass through
  if (event === 'provider-event' && data.type === 'text-delta') {
    send({ type: 'text-delta', text: data.textDelta });
    return;
  }

  // Tool call argument streaming (incremental JSON)
  if (event === 'provider-event' && data.type === 'tool-call-delta') {
    handleToolCallDelta(data, send);
    return;
  }

  // Tool call complete (full args parsed)
  if (event === 'provider-event' && data.type === 'tool-call') {
    if (data.toolName === 'render_ui') {
      send({
        type: 'ui-component',
        toolCallId: data.toolCallId,
        componentName: data.args.componentName,
        props: data.args.props,
        status: 'complete',
      });
    }
    return;
  }
}
```

### Key design points

- **Zod → JSON Schema conversion happens client-side** in chat-ui-library using `zod-to-json-schema`
- **`render_ui` tool handler returns immediately** with `{ rendered: true }` — synthetic resolution so the agent doesn't wait
- **Latitude-specific events are translated** to a clean `StreamPart` protocol the chat-ui-library understands

---

## 9. Implementation: Streaming Partial JSON

The LLM streams tool call arguments character-by-character:

```
{"componentName":"Or
{"componentName":"OrderSummary","props":{"order
{"componentName":"OrderSummary","props":{"orderId":"ORD-123","status":"shi
{"componentName":"OrderSummary","props":{"orderId":"ORD-123","status":"shipped"}}
```

To render progressively, use a **partial JSON parser** like `partial-json`.

### The streaming accumulator

```ts
import { parse as parsePartial, ALL } from 'partial-json';

type StreamingToolCallState = {
  toolCallId: string;
  argsBuffer: string;
  lastEmittedComponentName?: string;
};

const activeToolCalls = new Map<string, StreamingToolCallState>();

function handleToolCallDelta(
  data: {
    toolCallId: string;
    toolName: string;
    argsTextDelta: string;
  },
  send: (part: StreamPart) => void,
) {
  if (data.toolName !== 'render_ui') return;

  // Get or create accumulator for this tool call
  let state = activeToolCalls.get(data.toolCallId);
  if (!state) {
    state = { toolCallId: data.toolCallId, argsBuffer: '' };
    activeToolCalls.set(data.toolCallId, state);
  }

  // Accumulate the JSON delta
  state.argsBuffer += data.argsTextDelta;

  // Try to parse what we have so far
  let parsed: { componentName?: string; props?: Record<string, any> };
  try {
    parsed = parsePartial(state.argsBuffer, ALL);
  } catch {
    return; // Not yet parseable
  }

  // Need at least componentName before rendering
  if (!parsed.componentName) return;

  // Emit partial state — chat-ui-library re-renders with each update
  send({
    type: 'ui-component',
    toolCallId: state.toolCallId,
    componentName: parsed.componentName,
    props: parsed.props ?? {},
    status: 'streaming',
  });

  state.lastEmittedComponentName = parsed.componentName;
}

function cleanupToolCall(toolCallId: string) {
  activeToolCalls.delete(toolCallId);
}
```

### How `partial-json` handles incomplete input

Given:
```json
{"componentName":"OrderSummary","props":{"orderId":"ORD-123","stat
```

`parsePartial()` returns:
```js
{ componentName: "OrderSummary", props: { orderId: "ORD-123" } }
```

It silently truncates the incomplete `"stat` field. Each delta produces a more-populated object.

---

## 10. Client-Side Rendering

### The dispatcher

```tsx
function MessageRenderer({ messageId }: { messageId: string }) {
  const parts = useMessageParts(messageId);
  const registry = useGenerativeComponents();

  return (
    <>
      {parts.map((part, i) => {
        if (part.type === 'text') {
          return <Markdown key={i}>{part.text}</Markdown>;
        }

        if (part.type === 'ui-component') {
          const entry = registry.get(part.componentName);
          if (!entry) {
            return (
              <UnknownComponentFallback
                key={part.toolCallId}
                name={part.componentName}
              />
            );
          }

          const Component = entry.component;
          return (
            <div
              key={part.toolCallId}
              data-streaming={part.status === 'streaming'}
            >
              <Component {...part.props} />
            </div>
          );
        }
      })}
    </>
  );
}
```

### The streaming-safe component contract

Components must handle `Partial<Props>` gracefully — props arrive incrementally during streaming.

#### Pattern A: Optional types + skeleton fallback

```tsx
function OrderSummary({ orderId, status, items }: Partial<OrderSummaryProps>) {
  if (!orderId) return <Skeleton />;
  return (
    <Card>
      <h3>Order {orderId}</h3>
      {status ? <StatusBadge status={status} /> : <Skeleton />}
      {items ? <ItemList items={items} /> : <Skeleton />}
    </Card>
  );
}
```

#### Pattern B: Defaults

```tsx
function OrderSummary({
  orderId = '—',
  status = 'pending',
  items = [],
}: Partial<OrderSummaryProps>) {
  // ...
}
```

---

## 11. End-to-End Data Flow

### Setup (once per session)

```
Dashboard ──registers──► chat-ui-library
                            │
                            └─► converts Zod → JSON Schema, holds in registry
```

### Per message

```
1. User types "Show order ORD-123"
   │
   ▼
2. chat-ui-library ──POST──► chat-server
      {
        userMessage: "Show order ORD-123",
        availableComponents: [
          { name: "OrderSummary", description: "...", propsSchemaJson: {...} },
          ...
        ]
      }
                              │
                              ▼
3. chat-server formats availableComponents and runs Latitude agent
                              │
                              ▼
4. Latitude agent reasons:
   "OrderSummary matches. I'll call render_ui with componentName='OrderSummary'"
                              │
                              ▼ (streaming events)
5. chat-server transforms tool-call-delta events → StreamPart
                              │
                              ▼ (SSE)
6. chat-ui-library receives stream:
   { type: "ui-component", componentName: "OrderSummary", props: {orderId: "ORD-123"}, status: "streaming" }
   { type: "ui-component", componentName: "OrderSummary", props: {orderId: "ORD-123", status: "shipped"}, status: "streaming" }
   { type: "ui-component", componentName: "OrderSummary", props: {full props}, status: "complete" }
   { type: "done" }
                              │
                              ▼
7. Component renders progressively — skeleton fades into full UI
```

---

## 12. Implementation Checklist

### Latitude side
- [ ] Define `render_ui` tool in agent prompt YAML front-matter
- [ ] Use PromptL `{{#each availableComponents}}` to inject component list
- [ ] Add explicit rules against hallucinated component/prop names
- [ ] Test with multiple component scenarios in Latitude Playground

### chat-server side
- [ ] Accept `availableComponents` array in request body
- [ ] Format component list for PromptL template injection
- [ ] Implement `handleLatitudeEvent` for event → StreamPart translation
- [ ] Add `partial-json` dependency for streaming JSON parsing
- [ ] Maintain per-toolCallId state map for streaming accumulation
- [ ] Auto-resolve `render_ui` tool handler with `{ rendered: true }`
- [ ] Add SSE/streaming response endpoint to client

### chat-ui-library side
- [ ] Add `generativeComponents` prop separate from `clientTools`
- [ ] Build internal `ComponentRegistry` class
- [ ] Convert Zod schemas to JSON Schema with `zod-to-json-schema`
- [ ] Implement `MessageRenderer` dispatcher for `ui-component` parts
- [ ] Add `UnknownComponentFallback` for unregistered components
- [ ] Document streaming-undefined contract for dashboard developers
- [ ] Optional: validate received props against Zod schema before render

### Dashboard side
- [ ] Define components with Zod schemas using `.describe()` for prop hints
- [ ] Write components to handle `Partial<Props>` gracefully
- [ ] Provide skeleton or default states for streaming

---

## 13. Design Considerations & Tradeoffs

### Why send `availableComponents` with every request?

Stateless, simple, debuggable. The payload is small. Lets the dashboard dynamically change available components per session (e.g., admin sees more tools than regular users).

### Why a universal `render_ui` tool instead of typed tools?

- **Pro:** No Latitude reconfig per new component
- **Pro:** Dashboard-driven iteration speed
- **Con:** LLM accuracy slightly lower than typed tools — mitigate with strong descriptions and rules
- **Con:** Streaming partial JSON requires extra handling (covered)

### Where should Zod → JSON Schema conversion happen?

**Client-side, in chat-ui-library.** This way:
- chat-server doesn't need to know about Zod
- Schema conversion happens once per session, not per request on the server
- Dashboard developers stay in TypeScript/Zod land

### How to handle bad LLM output?

Decide a validation policy:
- **Strict:** Validate against `propsSchema.parse()` — render error card on failure
- **Lenient:** Render with whatever props came through (current default)
- **Coercive:** Use Zod's `.safeParse()` and fill missing required fields with defaults

### Differences between `clientTools` and `generativeComponents`

Keep these as separate props on `<ChatUI>`:

| Concept | Purpose | Has side effects? | Returns to agent? |
|---|---|---|---|
| `clientTools` | Actions the agent performs | Yes | Yes (result) |
| `generativeComponents` | UI to display | No | Synthetic ack only |

### Versioning the contract

Add a `protocolVersion` field to messages between chat-ui-library and chat-server. The contract will evolve; planning for it is cheap now.

---

## Appendix: Key Library References

| Library | Purpose | Notes |
|---|---|---|
| `@latitude-data/sdk` | Run Latitude prompts | Streaming, tool handlers |
| `zod` | Schema definition | Use `.describe()` for LLM hints |
| `zod-to-json-schema` | Schema conversion | Run client-side |
| `partial-json` | Incremental JSON parsing | For streaming tool calls |

## Appendix: Inspiration & Further Reading

- **Tambo docs** — https://docs.tambo.co/guides/enable-generative-ui/register-components
- **Vercel AI SDK Generative UI** — https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces
- **assistant-ui** — https://www.assistant-ui.com/
- **Latitude PromptL syntax** — https://docs.latitude.so/promptl/usage/quick-start
- **Latitude tools** — https://docs.latitude.so/guides/prompt-manager/tools
- **Google A2UI** — https://developers.googleblog.com/introducing-a2ui-an-open-project-for-agent-driven-interfaces/

---

*Document version: 1.0*
*Architecture: Dashboard → chat-ui-library → chat-server → Latitude.io*
