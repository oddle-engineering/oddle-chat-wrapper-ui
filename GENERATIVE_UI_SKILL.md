---
name: generative-ui-component
description: Use this skill when creating, registering, modifying, or debugging generative UI components in projects that consume `@oddle/chat-wrapper-ui` — React components the AI agent can render inline in chat replies via the `render_ui` tool. Triggers when the user asks to "create a generative component", "add a render_ui component", "register a component for the agent to render", "wire up generativeComponents", "add a card the chat can show", or works on the `<ChatWrapper generativeComponents={...} />` prop, the `useChatActions` hook, or anything Zod-schema + chat-rendering related. Also use when authoring `propsSchema` with `.describe()` calls, debugging an unrendered component, or making an existing card interactive with follow-up messages.
---

# Generative UI Component (skill)

> **How to use this file**
> - As a Claude Code skill: drop into `.claude/skills/` of the consumer project. Auto-loads when relevant.
> - As a generic AI prompt: paste the body (everything below the frontmatter) into the system prompt of any agentic AI tool.
> - As a developer reference: read top-to-bottom for a 5-minute working guide.

This skill applies to **consumer projects** that use `@oddle/chat-wrapper-ui` (e.g. UD21, Marketing dashboard, Reserve). It does **not** apply to the `oddle-wrapper-chat-ui` library itself — for library-internal changes, read `GENERATIVE_UI.md` in that repo instead.

---

## Concept (read first)

Generative UI = the chat agent renders **real React components** (cards, pickers, forms) inline in its reply. Components are registered from the dashboard side via Zod schemas; the agent picks one based on user intent and supplies props.

The flow:

```
User prompt ──► agent reasons + picks component ──► WS frame ──► registry lookup ──► <YourComponent /> renders
```

Three things you (the consumer) need to provide:

1. A React component that accepts `Partial<Props>` (props arrive complete or not at all — never crash on missing fields).
2. A Zod schema describing those props with `.describe()` on every field — these descriptions become the LLM's tool docs.
3. A registration object passed via `<ChatWrapper generativeComponents={[...]} />`.

Optionally: use `useChatActions().sendMessage(...)` to make the component interactive (button clicks fire follow-up messages).

---

## Process — when the user asks to add a new generative component

Follow these steps in order. Don't skip the rules section.

### 1. Confirm the use case before coding

A generative component is appropriate when:
- The reply has **structured data** (orders, reservations, items) that reads better visually than as text.
- The user must **pick something** (date, option, item) — pickers reduce typing/ambiguity.
- The user needs to **act** (confirm, cancel, approve) — buttons are faster than typing.

It's **not** appropriate when:
- The answer is naturally a sentence ("Yes, your account is active").
- The data is too ad-hoc to fit a stable schema.
- An existing component (or `clientTools` action) already covers it.

If the request is ambiguous, ask: "Is this a card the user reads, or one they interact with?" Then build accordingly.

### 2. Draft the Zod schema first

The schema is the contract between the agent and your component. Get it right before writing the JSX.

- Mark every required field as required, every optional as optional.
- Add `.describe()` on **every** field — write it as if explaining to the LLM when/how to use the field. Examples and format hints help (e.g. `"Date in YYYY-MM-DD format"`).
- Avoid deeply nested objects. The agent is more reliable with flat schemas + natural-language summary fields. For complex rules (a weekly schedule, an availability matrix), prefer a single string `xxxSummary` field that the agent fills with a one-liner.
- Don't add fields the agent can't reasonably know.

### 3. Write the component as a `Partial<Props>`-tolerant function

- Default to `Partial<z.infer<typeof Schema>>` for the props type.
- Render skeletons / "—" placeholders for missing fields. Don't crash, don't throw.
- Keep visual width sensible (≤ ~380px maxWidth) — these render inline in a chat panel.
- Use semantic markup; avoid relying on the consuming app's CSS.
- Inline styles or scoped CSS modules are fine. Avoid global CSS.

### 4. Add interactivity (optional)

If the component has buttons / pickers / forms, import the hook:

```tsx
import { useChatActions } from "@oddle/chat-wrapper-ui";

const { sendMessage, isStreaming } = useChatActions();
```

- Call `sendMessage("...")` on user action — same as the user typing.
- Disable interactive elements while `isStreaming` is true.
- Track a local "pending" state so the user sees their click registered.
- Lock the component once the action is sent (prevent double-fire).

### 5. Export a registration object

```tsx
export const myThingRegistration: GenerativeComponent<typeof MyThingSchema> = {
  name: "MyThing",                  // PascalCase, agent-facing
  description: "...",               // when to use it; treat as prompt engineering
  propsSchema: MyThingSchema,
  component: MyThingCard,
};
```

The `description` is what the agent sees to decide whether to call this component. Optimise it:
- Lead with **when** to use it ("Use whenever the user asks about X").
- Mention any prop-passing rules the agent should know ("Always pass `id` so action buttons work").
- Cap at ~3 sentences; longer descriptions dilute attention.

### 6. Wire into `<ChatWrapper>`

In the dashboard's chat-mounting code (typically `App.tsx` or similar):

```tsx
import { myThingRegistration } from "./components/MyThingCard";

const generativeComponents = useMemo<GenerativeComponents>(
  () => [
    /* existing registrations */,
    myThingRegistration,
  ],
  [],
);

<ChatWrapper
  /* ...existing props... */
  generativeComponents={generativeComponents}
/>
```

The array must be a stable reference (`useMemo`) — re-creating it on every render forces a WebSocket reconfigure.

### 7. Verify end-to-end

- **Library handshake**: Browser devtools → Network → WS → outbound `configure_tools` frame should include your component under `generativeComponents`.
- **Agent dispatch**: Trigger a relevant prompt. Look for an inbound `ui_component` frame with your `componentName`.
- **Render**: Component should appear in chat. If you see `UnknownComponentFallback`, the `componentName` doesn't match (case-sensitive) or `generativeComponents` is wrong.
- **No frame at all**: agent didn't pick your component. Tighten the `description`; the issue is almost always that the description is too vague about *when* to use it.

---

## Code template — complete, drop-in starting point

```tsx
import { useState } from "react";
import { z } from "zod";
import {
  useChatActions,
  type GenerativeComponent,
} from "@oddle/chat-wrapper-ui";

// ─── Schema ────────────────────────────────────────────────────────────
// Every field gets .describe(). Required fields = no .optional().

export const MyThingPropsSchema = z.object({
  id: z
    .string()
    .optional()
    .describe(
      "Internal identifier. Required for action buttons to reference the right entity."
    ),
  title: z
    .string()
    .describe("User-facing title shown at the top of the card."),
  status: z
    .enum(["pending", "active", "done"])
    .optional()
    .describe("Current state of the entity."),
  // …more fields…
});

type Props = z.infer<typeof MyThingPropsSchema>;

// ─── Component ─────────────────────────────────────────────────────────
// Note: Partial<Props>. Tolerate missing fields gracefully.

export function MyThingCard({ id, title, status }: Partial<Props>) {
  const { sendMessage, isStreaming } = useChatActions();
  const [pending, setPending] = useState<null | "confirm" | "cancel">(null);

  const handle = (action: "confirm" | "cancel") => {
    if (isStreaming || pending) return;
    setPending(action);
    const ref = id ? `id ${id}` : `"${title ?? "this item"}"`;
    sendMessage(
      action === "confirm" ? `Confirm ${ref}.` : `Cancel ${ref}.`
    );
  };

  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 12,
        padding: 16,
        background: "white",
        maxWidth: 380,
        fontSize: 14,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{title ?? <Skeleton />}</strong>
        {status && <Badge>{status}</Badge>}
      </div>

      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 8,
          opacity: isStreaming ? 0.5 : 1,
          pointerEvents: isStreaming ? "none" : "auto",
        }}
      >
        <button
          onClick={() => handle("confirm")}
          disabled={!!pending}
          style={primaryBtn}
        >
          {pending === "confirm" ? "Confirming…" : "Confirm"}
        </button>
        <button
          onClick={() => handle("cancel")}
          disabled={!!pending}
          style={neutralBtn}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Tiny helpers (inline; avoid global CSS) ───────────────────────────

const Skeleton = () => (
  <span
    style={{
      display: "inline-block",
      height: 12,
      width: 100,
      background: "rgba(0,0,0,0.08)",
      borderRadius: 4,
    }}
  />
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      fontSize: 11,
      fontWeight: 700,
      padding: "2px 8px",
      borderRadius: 999,
      background: "#f4f4f5",
      color: "#52525b",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    }}
  >
    {children}
  </span>
);

const primaryBtn: React.CSSProperties = {
  flex: 1, padding: "8px 12px", borderRadius: 8, border: "none",
  background: "#3d0099", color: "white", fontSize: 12, fontWeight: 600,
  cursor: "pointer",
};
const neutralBtn: React.CSSProperties = {
  flex: 1, padding: "8px 12px", borderRadius: 8,
  border: "1px solid rgba(0,0,0,0.12)", background: "#f4f4f5", color: "#111",
  fontSize: 12, fontWeight: 600, cursor: "pointer",
};

// ─── Registration ──────────────────────────────────────────────────────

export const myThingRegistration: GenerativeComponent<typeof MyThingPropsSchema> = {
  name: "MyThing",
  description:
    "Show a MyThing card. Use whenever the user asks about a specific MyThing or after creating one. " +
    "Always pass `id` so the action buttons can reference the right item.",
  propsSchema: MyThingPropsSchema,
  component: MyThingCard,
};
```

---

## Rules — hard constraints, do not violate

### MUST

1. **`Partial<Props>` on the component signature.** Props can arrive missing fields (saved props from older schemas, unusual agent paths). Render gracefully.
2. **`.describe()` on every Zod field.** No exceptions. The descriptions ARE the agent's tool documentation.
3. **PascalCase component names** (`OrderSummary`, not `order_summary`). The agent matches case-sensitively.
4. **Stable `generativeComponents` array.** Always wrap in `useMemo` — re-creating the array forces a WS reconfigure.
5. **Disable interactive elements while `isStreaming` is true.** Otherwise users double-fire actions.
6. **Use `useChatActions` only inside generative components** (or anywhere inside `<ChatWrapper>`). Throws outside the provider.
7. **Sanitise any HTML props** before rendering. The agent may inject HTML in `description` / `terms` style fields; either strip with a regex (simple cases) or use DOMPurify (production).

### MUST NOT

1. **Don't pass deeply nested objects** (e.g. weekly schedules, availability matrices) when a `xxxSummary` string field would do. The agent is more reliable with flat schemas.
2. **Don't rely on the consuming app's CSS** (`.btn-primary`, etc.). Use inline styles or scoped CSS modules — components must work in any host.
3. **Don't make components return data to the agent.** Generative components are render-only. Use `useChatActions().sendMessage()` for follow-ups.
4. **Don't render anything during `status: "streaming"`.** The library already filters those out; don't bypass it.
5. **Don't import internals** (`@oddle/chat-wrapper-ui/dist/...`, the store, the contexts directly). Stick to the public API: `ChatWrapper`, `useChatActions`, `GenerativeComponent`, `GenerativeComponents`.
6. **Don't `console.log` user data in production components.** Components run in customer browsers.
7. **Don't add new dependencies for trivial needs.** No date libraries for one date format; no UI kits for one button.

---

## Public API — quick reference

```ts
// Types
import type {
  GenerativeComponent,    // <TSchema extends ZodTypeAny>
  GenerativeComponents,   // GenerativeComponent<any>[]
  ChatActions,            // return type of useChatActions
} from "@oddle/chat-wrapper-ui";

// Hook
import { useChatActions } from "@oddle/chat-wrapper-ui";
const { sendMessage, stopGeneration, isStreaming, chatStatus } = useChatActions();

// Component prop
<ChatWrapper generativeComponents={[registration1, registration2]} />
```

That's the whole surface a consumer needs. Anything else is internal and may change.

---

## Wire shape (debugging reference, not for direct use)

### Outbound — registration handshake

```json
{
  "type": "configure_tools",
  "toolSchemas": [...],
  "generativeComponents": [
    {
      "name": "MyThing",
      "description": "...",
      "propsSchemaJson": { /* JSON Schema converted from Zod */ }
    }
  ]
}
```

### Inbound — live render

```json
{
  "type": "ui_component",
  "toolCallId": "call_xyz",
  "componentName": "MyThing",
  "props": { "id": "abc", "title": "...", "status": "active" },
  "status": "complete"
}
```

### Inbound — rehydration (assistant message has saved cards)

```json
{
  "id": "msg_…",
  "role": "assistant",
  "content": "Here's what I created:",
  "uiComponents": [
    { "toolCallId": "call_xyz", "componentName": "MyThing", "props": {...} }
  ]
}
```

If your component renders during a fresh chat but breaks on thread reload, the issue is almost always a prop being missing in the saved version. Trace via `Partial<Props>`.

---

## Common mistakes

1. **Component name mismatch.** Registration says `name: "OrderSummary"` but the agent emits `componentName: "Order_Summary"`. Result: `UnknownComponentFallback`. Fix: match exactly, PascalCase.
2. **Required prop on a streaming-tolerant component.** Component crashes when prop is undefined. Fix: `Partial<Props>` + skeleton fallback.
3. **Vague `description` field.** Agent never picks the component. Fix: lead with "Use whenever…" and concrete triggers.
4. **Inline-creating the registrations array each render.** WS reconfigures on every re-render. Fix: `useMemo([], [])`.
5. **HTML props rendered with `dangerouslySetInnerHTML` directly.** XSS risk. Fix: strip / sanitise first.
6. **Component sends a `sendMessage` literal that mentions no id.** Agent can't tie the follow-up back to a specific entity. Fix: include the id (e.g. `Cancel order ${id}`, not just `Cancel order`).
7. **Forgetting to disable buttons while streaming.** Double-clicks fire two messages. Fix: use `isStreaming` from the hook.
8. **Deeply nested object props** the agent malforms. Fix: flatten or replace with a one-line summary string.

---

## Example use cases worth building (idea bank)

| Component | Schema sketch | Trigger | Action(s) |
|---|---|---|---|
| `OrderSummary` | id, status, items, total | "show me order X" | Mark shipped / Cancel / See details |
| `DatePicker` | prompt, purpose, suggestions[] | "when do you want to book" | Pick date → submit follow-up |
| `Redeemable` | title, status, limits, expiry | after `create_redeemable_campaign` | Activate / Pause / Edit |
| `RestaurantPicker` | options[] | multiple matches found | Pick one → "I want X" |
| `ConfirmCard` | message, danger | destructive action ahead | Yes / No |
| `ReservationCard` | date, time, party, table | after booking | Confirm / Reschedule / Cancel |
| `MenuItemList` | items[] (name, price, image) | "show me the menu" | Add to order / View details |
| `RatingCard` | prompt | end of conversation | 1–5 stars → "Rated N/5" |
| `MetricChart` | label, series[] | "how are sales this week" | (read-only) |
| `Form` | fields[] (label, type, required) | multi-field capture | Submit → structured message |

---

## Test prompts (for QA)

After registering a component, validate with prompts that should and shouldn't trigger it:

**Should trigger** (ensures the description matches user intent):
- For `OrderSummary`: "show me order ORD-123", "what's the status of my last order"
- For `DatePicker`: "I want to book a table for this weekend"
- For `Redeemable`: "create a 10% off voucher for first-time customers"

**Should NOT trigger** (ensures the description is precise):
- For `OrderSummary`: "what are my recent orders?" (multiple → list, not a single card)
- For `DatePicker`: "what time is it?" (asking time, not picking date)

If a prompt that should trigger doesn't, the description is too narrow. If a prompt that shouldn't trigger does, the description is too broad.

---

## When NOT to add a generative component

Reach for one of these instead:

| Use case | Better fit |
|---|---|
| Action that returns data to the agent | `clientTools` (with execute function) |
| One-off complex UI flow | A regular page in the dashboard, link from chat |
| Long-form content | Plain markdown reply (already supported) |
| Truly silent system events | Wait for the silent-message feature (not yet built) |

---

## Related references

- `GENERATIVE_UI.md` (in `oddle-wrapper-chat-ui` repo) — full architecture, contracts, decisions.
- `generative-ui-chat-solution.md` — original design proposal.
- `showcase/src/components/OrderSummaryCard.tsx`, `DatePickerCard.tsx`, `RedeemableCard.tsx` — three working implementations to copy patterns from.

---

*Skill version: 1.0*
