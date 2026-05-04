# Generative UI in `@oddle/chat-wrapper-ui`

> **Status:** Shipped (library + chat-server + Latitude prompt).
> **Audience:** Leadership, product, engineering.
> **Reading time:** ~5 min for the overview, ~15 min for the dev sections.

---

## TL;DR

The chat assistant can now reply with **real, interactive UI components** instead of just text. Ask *"show me order 123"* and the agent renders an `OrderSummary` card. Ask *"book a table"* and it renders a `DatePicker`. Click a button on the card → it fires a follow-up message and the conversation continues.

Three things this unlocks:

1. **Visual answers** — structured data renders as cards/tables/charts, not text walls.
2. **Action affordances** — buttons, pickers, forms reduce typing friction.
3. **Per-app components** — UD21, Marketing, and Reserve each register their own component sets without touching the shared AI agent.

The AI never sees React code. It only sees a JSON Schema and a description per component, and it picks one based on the user's intent. Components are persisted alongside the conversation and rehydrate cleanly when a thread is reloaded.

---

# Section 1 — For Product & Leadership

## What is "generative UI"?

A pattern where an LLM's response is rendered as a **real React component**, with props the model picked from registered options. Instead of:

> "Order ORD-123 is currently pending. It contains 3 items: Pad Thai (×1), Tom Yum (×1), Mango Sticky Rice (×1). The total is $42.50."

…the user sees an actual `OrderSummary` card with a status pill, an item list, a total row, and action buttons.

## Why this matters

Plain-text LLM replies have ceilings:

| Pain | With text-only | With generative UI |
|---|---|---|
| Lists of structured data | Read as paragraphs, hard to scan | Tables / lists, native scanning |
| Picking a date | User types "next Friday", risk of misinterpretation | Native date picker, unambiguous |
| Confirming an action | User types "yes, cancel order 123" | One-click button |
| Showing a metric | "Your conversion is 2.3%" | A chart with a trendline |
| Multi-step forms | Several back-and-forth turns | One submit |

## What we can build today

These are illustrative — anything that's a React component is fair game.

| Component | Triggered when |
|---|---|
| `OrderSummary` | User asks about a specific order |
| `DatePicker` | Agent needs a date (booking, reminder, delivery) |
| `RestaurantPicker` | Multiple matches; user picks one |
| `ConfirmCard` | Destructive or expensive action |
| `MenuItemList` | "Show me what's on the menu tonight" |
| `Chart` | "How are sales this week?" |
| `Form` | Capture multiple fields before continuing |
| `RatingCard` | Quick post-conversation feedback |

Each dashboard owns its component set. UD21 ships UD21-relevant cards, Marketing ships marketing cards, and so on. **No agent reconfiguration is required when a new component is added** — only a frontend deploy.

## What we explicitly did not build (yet)

- **Streaming preview of components** — we wait until the agent's full props arrive, then render once. Cleaner UX, no skeleton flashing.
- **Mixed text-and-component interleaving on history reload** — current agent behaviour is "text first, then component(s)"; works fine. The day the model starts interleaving, we'll switch to a richer wire shape.
- **Invisible / system messages from button clicks** — every button click currently sends a visible user message. We can add a "silent" variant later if a use case demands it.

## Operational impact

- **No new infrastructure.** Reuses the existing WebSocket, Latitude, and persistence pipeline.
- **No retraining or model change.** Universal `render_ui` tool was added to the prompt once.
- **Schema drift is safe.** If a saved card references a component that no longer exists, history shows a polite "this card is no longer available" placeholder instead of breaking.

---

# Section 2 — For Engineering Leadership

## Architecture

Four layers, each with a single responsibility:

```
┌─────────────────┐  generativeComponents={[...]}
│ Dashboard       │─────────────────────────────►
│ (UD21, Reserve, │
│  Marketing…)    │
└─────────────────┘
                                       ▼
                              ┌─────────────────┐
                              │ chat-ui-library │  registry, renderer, hooks
                              │ (this repo)     │
                              └────────┬────────┘
                                       │  WS configure_tools.generativeComponents
                                       │  WS ui_component (inbound)
                                       ▼
                              ┌─────────────────┐
                              │ chat-server     │  injects schemas as availableComponents,
                              │                 │  auto-resolves render_ui,
                              │                 │  emits ui_component frames
                              └────────┬────────┘
                                       │  Latitude SDK
                                       ▼
                              ┌─────────────────┐
                              │ Latitude.io     │  Reasons over user intent + component schemas,
                              │ (the agent)     │  calls render_ui with chosen component + props
                              └─────────────────┘
```

## Key architectural decisions

1. **One universal `render_ui` tool, not N typed tools.**
   Dashboards add components without ever redeploying the Latitude prompt. The cost is slightly lower LLM dispatch accuracy than typed tools — mitigated by strong `.describe()` text on each field, plus explicit prompt rules ("NEVER invent component names. NEVER invent prop fields not in the schema.").

2. **Zod on the dashboard, JSON Schema on the wire.**
   Dashboard developers stay in TypeScript / Zod land. Conversion to JSON Schema runs **once per registration** inside the chat-ui-library, not per request. The chat-server is Zod-agnostic.

3. **Server skips client-side partial-JSON parsing.**
   The server emits the *final* props in one `ui_component` frame; the client renders once. Avoids the "empty skeleton card flashes above the assistant text" UX bug.

4. **Generative components are render-only.**
   They do not return data to the agent. Interactivity is handled by the user firing follow-up messages via `useChatActions().sendMessage(...)`. This keeps the contract simple and avoids two-way binding complexity.

5. **Persistence as `uiComponents[]` on the assistant message.**
   The server stores rendered cards on the message that produced them. On rehydration, the chat-ui-library expands each entry into a separate `role: "ui-component"` row so the in-memory model is identical between live-streaming and history-load.

## Tradeoffs we accepted

| Choice | Cost | Why |
|---|---|---|
| Universal `render_ui` tool | Marginally lower agent accuracy than per-component typed tools | Saves Latitude reconfig per new component; mitigated by descriptions + rules |
| No client-side streaming preview | No live skeleton-fill effect | Reasoning bubble already gives feedback; eliminates empty-card flash |
| "Text first, cards after" on rehydration | Loses interleaving order if agent emits both | Agent doesn't currently interleave; flip to `parts[]` shape if/when it does |
| Components must accept `Partial<Props>` | One extra concept for component authors | Required because saved props may not match an evolved schema |

---

# Section 3 — Developer Guide

## Adding a component (3 steps)

### 1. Define the component + schema

```tsx
// my-dashboard/src/components/OrderSummaryCard.tsx
import { z } from "zod";
import {
  useChatActions,
  type GenerativeComponent,
} from "@oddle/chat-wrapper-ui";

export const OrderSummaryPropsSchema = z.object({
  orderId: z
    .string()
    .describe("Order ID, e.g. 'ORD-12345'"),
  status: z
    .enum(["pending", "shipped", "delivered", "cancelled"])
    .describe("Current fulfilment status"),
  totalAmount: z
    .number()
    .optional()
    .describe("Order total in the brand's default currency"),
});

type Props = z.infer<typeof OrderSummaryPropsSchema>;

export function OrderSummaryCard({ orderId, status, totalAmount }: Partial<Props>) {
  return (
    <div>
      <strong>{orderId ?? "—"}</strong>
      <span>{status ?? "—"}</span>
      {typeof totalAmount === "number" && <span>${totalAmount.toFixed(2)}</span>}
    </div>
  );
}

export const orderSummaryRegistration: GenerativeComponent<typeof OrderSummaryPropsSchema> = {
  name: "OrderSummary",
  description:
    "Show details of a customer order (id, status, total). Use whenever the user asks about a specific order.",
  propsSchema: OrderSummaryPropsSchema,
  component: OrderSummaryCard,
};
```

Three things to note:

- **`.describe()` on every field** — these descriptions become the LLM's tool-schema documentation. Treat them as prompt engineering.
- **Component accepts `Partial<Props>`** — tolerate missing fields. Either render skeletons, defaults, or omit the section.
- The exported registration is the single object you pass to `<ChatWrapper>`.

### 2. Register it on the wrapper

```tsx
import { ChatWrapper } from "@oddle/chat-wrapper-ui";
import { orderSummaryRegistration } from "./components/OrderSummaryCard";

<ChatWrapper
  /* …existing props… */
  generativeComponents={[
    orderSummaryRegistration,
    // …more registrations…
  ]}
/>
```

### 3. (Optional) Make it interactive

Use the `useChatActions` hook from any generative component:

```tsx
import { useChatActions } from "@oddle/chat-wrapper-ui";

function OrderSummaryCard({ orderId, status }: Partial<Props>) {
  const { sendMessage, isStreaming } = useChatActions();

  return (
    <div>
      <strong>{orderId}</strong>
      <button
        disabled={isStreaming}
        onClick={() => sendMessage(`Cancel order ${orderId}`)}
      >
        Cancel
      </button>
    </div>
  );
}
```

`sendMessage` is identical to the user typing in the input box: it pushes a user message and triggers a new agent turn. `isStreaming` lets you disable interactive elements while a response is in flight.

## Public API surface

| Symbol | Kind | Purpose |
|---|---|---|
| `<ChatWrapper generativeComponents={...} />` | Prop | Register components |
| `GenerativeComponent<TSchema>` | Type | Registration shape |
| `GenerativeComponents` | Type | Array alias |
| `useChatActions()` | Hook | `{ sendMessage, stopGeneration, isStreaming, chatStatus }` |
| `ComponentRegistry` | Class (advanced) | Registry instance |
| `GenerativeComponentRenderer` | Component (advanced) | Manual dispatch |
| `UnknownComponentFallback` | Component (advanced) | Override the fallback UI |

## End-to-end lifecycle

```
1.  Mount ─────────────────────────────────────────────────►
    <ChatWrapper> builds a ComponentRegistry (Zod → JSON Schema, once).

2.  Connect ───────────────────────────────────────────────►
    On session_established, library sends configure_tools
    including generativeComponents (JSON Schemas).

3.  User prompt ───────────────────────────────────────────►
    User types something. chat-server runs Latitude with
    `availableComponents` injected into the prompt.

4.  Agent reasons & decides ───────────────────────────────►
    Picks a component, calls render_ui(componentName, props).

5.  Server auto-resolves render_ui ────────────────────────►
    Returns { rendered: true } immediately so the agent
    doesn't hang. Emits a ui_component WS frame to the client.

6.  Client renders ────────────────────────────────────────►
    MessageHandler routes ui_component → onUIComponent →
    ChatWrapper.handleUIComponent → adds a message →
    MessageItem → GenerativeComponentRenderer →
    registry.get(componentName) → React component mounts.

7.  User interacts ────────────────────────────────────────►
    Button click calls useChatActions().sendMessage(...).
    Loop returns to step 3.

8.  Persistence ───────────────────────────────────────────►
    Server saves the assistant turn with uiComponents: [...].

9.  Rehydration ───────────────────────────────────────────►
    On thread load, useConversationLoader expands each
    persisted uiComponents[] entry into a separate
    role: "ui-component" row, keyed by toolCallId.
```

---

# Section 4 — Wire Contracts (Reference)

## Outbound: `chat-ui-library → chat-server`

The library extends the existing `configure_tools` handshake with `generativeComponents`:

```json
{
  "type": "configure_tools",
  "toolSchemas": [ ... ],
  "generativeComponents": [
    {
      "name": "OrderSummary",
      "description": "Show details of a customer order...",
      "propsSchemaJson": {
        "type": "object",
        "properties": {
          "orderId": { "type": "string", "description": "Order ID, e.g. 'ORD-12345'" },
          "status": { "type": "string", "enum": ["pending", "shipped", "delivered", "cancelled"] },
          "totalAmount": { "type": "number" }
        },
        "required": ["orderId", "status"]
      }
    }
  ],
  "contextHelpers": { ... }
}
```

The chat-server forwards `generativeComponents` to the Latitude prompt as the `availableComponents` parameter. The PromptL template iterates with `<for each={{availableComponents}} as="component">`.

## Inbound: `chat-server → chat-ui-library` (live)

When the agent decides to render, the chat-server auto-resolves `render_ui` and emits:

```json
{
  "type": "ui_component",
  "toolCallId": "call_JwvyBWcpVCt9l4HX4A6LImsl",
  "componentName": "OrderSummary",
  "props": { "orderId": "ORD-123", "status": "pending" },
  "status": "complete"
}
```

The client only acts on `status: "complete"` (or `"error"`). `"streaming"` frames are ignored to avoid empty-skeleton flashing.

## Inbound: `chat-server → chat-ui-library` (rehydrated)

When a thread is loaded via `GET /v1/messages`:

```json
{
  "id": "msg_…",
  "role": "assistant",
  "content": "Here's the order:",
  "timestamp": "2026-04-28T…",
  "isStreaming": false,
  "uiComponents": [
    {
      "toolCallId": "call_JwvyBWcpVCt9l4HX4A6LImsl",
      "componentName": "OrderSummary",
      "props": { "orderId": "ORD-123", "status": "pending" }
    }
  ]
}
```

The conversation loader expands each `uiComponents[]` entry into a separate `role: "ui-component"` message, placed right after the assistant message and keyed by `toolCallId`. This keeps the in-memory model identical between live-streaming and history-load.

If `content` is empty (the whole reply was render-only), the empty assistant bubble is suppressed in the renderer.

---

# Section 5 — FAQ

**Q: How is this different from `clientTools`?**
- `clientTools` are *actions* the agent performs — they execute code, return data, agent uses the result.
- `generativeComponents` are *UI* the agent shows — they render, user sees it, optionally interacts.
- The two are independent props on `<ChatWrapper>`. You can use both.

**Q: Can I add a component without redeploying Latitude?**
Yes. The Latitude prompt is configured once with the universal `render_ui` tool and a `<for>` loop over `availableComponents`. New components only require a dashboard frontend deploy.

**Q: What if the LLM hallucinates a component name?**
The renderer falls back to `UnknownComponentFallback` (no crash). Two prompt rules drastically reduce this: *"NEVER invent component names. NEVER invent prop fields not in the schema."*

**Q: Can the user see streaming partial renders?**
No, by design. We only render `status: "complete"`. The reasoning bubble ("Thought for 3 seconds") gives feedback that work is in progress.

**Q: What if a saved card's component was removed from the dashboard?**
`UnknownComponentFallback` shows user-facing copy: *"This card is no longer available."* The rest of the conversation history stays readable.

**Q: How do I debug a component that doesn't render?**
1. Browser devtools → Network → WS → confirm the outbound `configure_tools` includes your component under `generativeComponents`.
2. Send a triggering prompt; look for an inbound `ui_component` frame.
3. Frame arrives but no render → `componentName` doesn't match any registered name (case-sensitive). Look for `UnknownComponentFallback` on screen.
4. No frame arrives → the agent didn't pick your component. Tighten the `description` in your registration; describe *when* to use it, not just *what* it is.

**Q: Does the user message that triggered a button click show in chat?**
Yes — clicking a button fires a normal user message via `sendMessage`. If you want silent / system-style messages instead, that needs server protocol support and is not implemented.

**Q: Can a component access conversation state (messages list, thread id, etc.)?**
The supported public API is `useChatActions()`. Anything more (e.g., `useUIStore` for advanced state) is internal and may change. Open a request if you need it.

---

# Section 6 — Limitations & Roadmap

**Limitations today:**

- **No interleaved text+components on rehydration.** If the agent emits *text → component → more text → component* in one turn, the rehydrated rendering is *all text first, then all components*. Acceptable today; will need the `parts[]` shape upgrade if/when this surfaces.
- **Components must tolerate `Partial<Props>`.** Saved props may not match the latest schema after a refactor.
- **No silent button-click messages.** All actions surface as visible user messages.
- **No Zod-side runtime validation of incoming props on the client.** If the agent sends malformed props, it's the component's job to handle it gracefully.

**Roadmap (when the need arises):**

1. Switch to `parts: Array<{type: "text" | "ui_component", ...}>` on the assistant message metadata to preserve interleaving order.
2. Optional client-side `propsSchema.safeParse(props)` with a configurable strict / lenient / coercive policy.
3. "Silent" message type that triggers a new agent turn without rendering as a user bubble.
4. Per-component analytics / telemetry hook (which components are rendered most, click-through rates).

---

# Section 7 — Appendix

## File map

| Concern | File |
|---|---|
| Public types | `src/types/index.ts` |
| Component registry (Zod → JSON Schema) | `src/services/componentRegistry.ts` |
| Renderer + fallback | `src/components/GenerativeComponentRenderer.tsx` |
| Wire-up in ChatWrapper | `src/components/ChatWrapper.tsx` |
| WS plumbing | `src/hooks/useWebSocketConnection.ts` |
| `ui_component` inbound handling | `src/client/handlers/MessageHandler.ts` |
| Outbound `configure_tools` | `src/client/utils/messageFactory.ts` |
| Outbound message types | `src/client/types/outboundMessages.ts` |
| Inbound message types | `src/client/types/inboundMessages.ts` |
| `useChatActions` hook | `src/hooks/useChatActions.ts` |
| Rehydration / thread load | `src/hooks/useConversationLoader.ts` |
| MessageItem dispatch | `src/components/MessageItem.tsx` |
| Sample components | `showcase/src/components/OrderSummaryCard.tsx`, `showcase/src/components/DatePickerCard.tsx` |

## Related documents

- `generative-ui-chat-solution.md` — original architecture proposal (kept for context).
- `latitude-prompt-modified` — the Latitude prompt that injects `availableComponents` into the system message.

## Glossary

| Term | Meaning |
|---|---|
| **Generative UI** | A React component rendered as part of an LLM reply, with props the model picked. |
| **Registration** | The `{ name, description, propsSchema, component }` object a dashboard hands to `<ChatWrapper>`. |
| **Universal render tool** | `render_ui` — a single Latitude tool the agent calls with `componentName` + `props`. |
| **Streaming-undefined contract** | Components must accept `Partial<Props>` because props can be missing or partial. |
| **Schema drift** | When a saved card's component has been renamed/removed since the conversation was saved. |
| **Rehydration** | Loading a saved thread and re-rendering its components from the persisted `uiComponents[]` array. |
| **Live render** | A render driven by a `ui_component` WS frame during the current session. |

---

*Document version: 1.0 · Last updated: 2026-04-28*
