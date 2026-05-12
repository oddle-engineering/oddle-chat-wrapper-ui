# Generative UI — Product Overview

A non-technical walkthrough of how `@oddle/chat-wrapper-ui` (the chat front-end SDK) plugs into chat-server and the Latitude agent, so any new product team can integrate AI chat — and get clarifying-question UX like `AskUserInputV0` for free.

---

## TL;DR

- `@oddle/chat-wrapper-ui` is the **front-end SDK** any product drops in to get AI chat. One React component, one CSS import, and you're wired up.
- It talks to **chat-server** over a WebSocket. chat-server runs the conversation and talks to the **Latitude agent** (the LLM + agent prompt).
- The agent can render interactive cards (forms, summaries, date pickers, …) inside the chat instead of asking everything in plain prose. We call this **generative UI**.
- **`AskUserInputV0` is built into this library.** Its component code, schema, styles, and registration all live inside `@oddle/chat-wrapper-ui` itself — installing the library installs the card. Consuming products don't write or register it. Other built-ins can be added the same way.
- Custom cards specific to a product (an order summary, a campaign date picker) are registered by the consuming product. The SDK merges them with the built-ins.

---

## The three layers

```
┌──────────────────────────────────────┐
│  Consuming product                   │   in the user's browser
│  (UD21, Email, Reservations, …)      │
│                                      │
│   <ChatWrapper /> ──── @oddle/chat-wrapper-ui (this library)
└──────────────┬───────────────────────┘
               │  WebSocket
               ▼
┌──────────────────────────────────────┐
│  chat-server                         │   Oddle backend service
│  (owns the session, auth, history)   │
└──────────────┬───────────────────────┘
               │  Agent runtime
               ▼
┌──────────────────────────────────────┐
│  Latitude agent                      │   the agent prompt + LLM
│  (decides what to say + render)      │
└──────────────────────────────────────┘
```

Each layer has a clear job:

| Layer | Owns |
|---|---|
| **Consuming product** | The web app the user is in. Provides auth, can register its own custom cards and local tools, decides where the chat widget appears on screen. |
| **`@oddle/chat-wrapper-ui` (this lib)** | The chat UI, the WebSocket client, the rendering of every generative card (built-in + custom), rehydration when a user reopens an old chat. |
| **chat-server** | Auth, session management, conversation history (including the cards the agent rendered), and the bridge to the Latitude agent. |
| **Latitude agent** | The agent prompt and tool catalogue. Decides *when* to render a card (vs. plain prose) and *what* to put in it. Iterated by the AI/product team in Latitude itself, no UI deploy needed. |

---

## Built-in cards live inside this library

`AskUserInputV0` is **part of `@oddle/chat-wrapper-ui` itself**. Its React component, its Zod schema, its CSS, and its registration entry all live in this repo (`src/components/builtin/AskUserInputV0.tsx` + `src/services/builtinComponents.ts`) and ship inside the published npm package.

What that means in practice:

- **No separate install.** Bumping `@oddle/chat-wrapper-ui` to a version that includes a built-in pulls the card into the consuming product's bundle automatically. No second npm dependency, no peer-dependency dance.
- **No registration code in the consuming product.** When `<ChatWrapper>` mounts, the library auto-merges its built-ins into whatever the product passed via `generativeComponents`. A team can't forget to register a built-in card — it's not their job.
- **One canonical visual across products.** Because every product renders the same component code, the clarifying-question UX looks identical wherever Oddle AI runs. Per-product branding is an opt-in override (see "How a product team customises a card" below), not the default.
- **Adding a future built-in is a library change, not a per-product change.** When we ship the next built-in (say, a date picker or a confirm-action card), every product inherits it on the next library upgrade.

The same `<ChatWrapper>` instance also accepts the consuming product's *own* generative cards through the `generativeComponents` prop. Built-ins and product-specific cards co-exist in one registry; the library handles the merge.

---

## How a product team integrates

A product team adopts the library and renders the widget once. Roughly:

```tsx
import { ChatWrapper } from "@oddle/chat-wrapper-ui";
import "@oddle/chat-wrapper-ui/style.css";

<ChatWrapper
  auth={{ token, entityId: brandId, entityType: "BRAND" }}
  chatServerUrl="wss://ai-chat.oddleapp.com"
  chatServerKey="ud21-chat-server-key"
  config={{ mode: "sidebar", headerName: "Oddle AI" /* …branding… */ }}
  tools={localTools}                       // app-specific actions
  generativeComponents={[orderSummary,     // app-specific cards
                          campaignPicker]}
/>
```

That's it. The team:

- supplies an **auth token** so the user is recognised,
- can supply **local tools** (e.g. *this app can fetch menu items*) — the agent learns about them and may call them,
- can supply **custom cards** (e.g. *Order Summary*) — the agent can render them inline in the chat,
- does **not** need to register `AskUserInputV0` or any other built-in. The card is shipped as part of `@oddle/chat-wrapper-ui` itself; the library auto-merges its built-ins into the registry on mount.

The chat widget then takes care of all the connection, message streaming, history loading, and card rendering. The product team isn't involved in the second-by-second protocol.

---

## What happens at connection time

When `<ChatWrapper>` mounts, it opens a WebSocket to chat-server. As part of the handshake it tells chat-server two things:

1. **The tools this app provides** — JSON descriptions of what the consuming product can do (fetch menu items, create a reservation, etc.).
2. **The cards this app can render** — JSON descriptions of every interactive card the agent is allowed to render in chat. This list is the **library built-ins** (currently `AskUserInputV0`) **plus** whatever custom cards the consuming product registered.

chat-server hands both lists to the Latitude agent. From the agent's point of view, the conversation now starts with: *"In this session you may call these tools, and you may render any of these cards."* The agent prompt — written by the AI team in Latitude — chooses *when* to actually use them.

---

## What happens when the agent renders a card

End-to-end flow when the user asks something that needs a clarifying question:

```
User: "Create an email campaign."
    │
    ▼
Latitude agent reasons → "I need to know which campaign idea."
    │
    ▼
Agent calls render_ui("AskUserInputV0", { prompt, questions: [...] })
    │
    ▼
chat-server streams the render event over the WebSocket
    │
    ▼
The library receives it, looks up "AskUserInputV0" in its
registered-cards list, and mounts the form with the agent's data
    │
    ▼
User sees the card, taps a few options, clicks Submit
    │
    ▼
The library packages every answer as one user message and sends
it back over the WebSocket — exactly as if the user had typed it
    │
    ▼
chat-server forwards to the agent → agent continues with the answers
```

Two things worth knowing:

- **The user's reply is just a normal chat message.** The agent reads the answers as text and decides the next step. The agent prompt doesn't need any special casing for our cards. Simple and robust.
- **The card is saved alongside the assistant's turn.** chat-server persists what the agent rendered, so reopening the conversation later restores the same card in the same place.

---

## Reloading (and the user clicking back into chat tomorrow)

When the user reopens an old conversation, chat-server replays the saved messages. Each saved card gets re-rendered. The library is smart about state:

- **Card was the last message and the user never replied** → still interactive. The user can answer it now.
- **Card was already answered (a user message comes after it)** → locked. The user sees the choices they made, read-only.
- **Card type no longer registered** (e.g. the dashboard removed a feature) → polite "this card isn't available anymore" placeholder.

Persistence and lock semantics live in the library — chat-server and the agent don't have to know.

---

## How new built-ins get added in the future

`AskUserInputV0` is the first built-in. The architecture is built so we can add more (a date picker, a confirm-action card, a multi-step wizard, …) the same way:

1. We build the card inside the library.
2. We add it to the built-in registry.
3. We bump the library version.

Every product that bumps the library version automatically gets the new card. No extra work in chat-server, no extra work per consuming product. The only place "is this a new card?" matters is the agent prompt — the AI team enables it on whichever flows are appropriate.

This is the lever: **adding a generative card is a library + agent-prompt change, not a per-product change.**

---

## How a product team customises a card

If a product team really wants their own visual treatment of one of the built-ins (e.g. a brand-specific look for `AskUserInputV0`), they register their own card with the same name. The library puts consumer-registered cards first, so theirs wins. This is intended as an escape hatch — most teams will use the canonical built-in.

---

## Why this design holds up

- **Lowest possible adoption cost for products** — drop in `<ChatWrapper>`, get the canonical chat experience including every current and future built-in card.
- **One protocol everywhere** — built-in cards, app-specific cards, and any future cards all use the same JSON-Schema advertisement → `render_ui` event → submit-as-message round-trip.
- **The agent prompt is the only knob** that decides when to ask via a card vs. via prose. Product can iterate the prompt in Latitude without touching any UI code.
- **Server stays generic** — chat-server doesn't know what `AskUserInputV0` *is*. It only knows how to relay `render_ui` events and persist them. Adding a new built-in doesn't require a chat-server change.
- **Consistent UX across products** — the same clarifying-question form appears wherever Oddle AI runs, no team has to design or build their own.

---

## Glossary

| Term | What it is |
|---|---|
| **Chat-wrapper-ui** | The npm package this repo publishes. The front-end SDK. |
| **`<ChatWrapper>`** | The single React component a product mounts to get the chat widget. |
| **Generative UI / generative card** | An interactive UI block the agent can render inside the chat (forms, summaries, pickers). |
| **`AskUserInputV0`** | The first built-in generative card — a clarifying-question form with radios, checkboxes, and free-text input. |
| **Custom card** | A generative card a consuming product registered for its own use (e.g. *Order Summary* in UD21). |
| **chat-server** | The Oddle backend service that runs chat sessions, persists history, and bridges the agent. |
| **Latitude agent** | The AI agent — its prompt, tool catalogue, and LLM — hosted/managed in Latitude. |
| **`render_ui`** | The agent tool used to render a card. The agent calls `render_ui("CardName", { props })`. |
| **Tool** | A function the agent can call to take action (fetch data, create something). Distinct from cards, which are UI. |
