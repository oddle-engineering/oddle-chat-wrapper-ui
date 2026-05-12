# PRD — AskUserInputV0 (Built-in Clarifying-Question Form)

## 🎯 Objective

Give the chat agent a built-in way to ask the user well-defined clarifying questions through interactive controls (radios, checkboxes, free-text input) instead of plain prose. Today every consumer of `@oddle/chat-wrapper-ui` that wants this UX has to design and register their own `GenerativeComponent`; bundling a versioned `AskUserInputV0` into the library means clarifying-question UX ships out of the box, looks consistent across products, and the agent can rely on it being present without per-app negotiation. Reduces ambiguity in early conversation turns and gets the agent to a confident next action faster.

## 📊 Success metrics

| Goal | Metric |
|---|---|
| Reduce clarification round-trips before the agent commits to a task | Median number of user/agent message pairs before the first task-execution tool call drops |
| Increase user completion of agent-initiated questions | % of rendered `AskUserInputV0` cards that reach Submit (vs. abandoned by typing or closing) |
| Lower friction for picking from constrained sets | Median time from card render to Submit falls vs. equivalent free-form ask |
| Drive agent adoption of the built-in primitive | % of clarifying-question agent turns that use `render_ui("AskUserInputV0", …)` rather than plain text |
| Preserve readable history on rehydrate | 0 user-reported confusion tickets about "I can't tell what I picked / why this card is locked" |

## 🤔 Assumptions

- The agent can recognise when a question maps to a small set of well-defined options (vs. genuinely open-ended dialogue).
- Users prefer tap/click over typing when 2–6 predefined options would correctly cover their answer.
- Most clarifying flows fit ≤ 3 questions in one render call; longer surveys belong elsewhere.
- The chat-server already supports `render_ui` end-to-end (component schemas advertised at handshake; persisted on the assistant turn).
- The chat container provides a scrollable parent; `Element.scrollIntoView` will resolve to it.
- Consumers don't need to override `AskUserInputV0` in production v1 — the built-in is sufficient. (Override path exists as an escape hatch.)
- Brand colour `#410099` is acceptable for primary actions across themes; consumers don't need to retheme this card in v1.
- Persisting the user's submitted answer across rehydration is a chat-server concern, not a chat-ui concern.

## 🗒️ Requirements

| Requirement | User Story | Importance | Issue | Notes |
|---|---|---|---|---|
| Built-in component registration auto-merged into `generativeComponents` | As an app integrator, I don't want to remember to register a clarifying-question card — it should just work after upgrading the library | High | — | `mergeWithBuiltinComponents` puts user entries first so consumer-registered names override built-ins (registry is first-write-wins) |
| Multi-question form with `single_choice` (radio) and `multi_choice` (checkbox) | As an agent author, I want to ask a small batch of related clarifying questions in one render call without composing my own UI | High | — | Schema: `questions[]` with `title`, `type`, `options[]`, `helperText` |
| Progressive reveal of questions | As a user, I want to focus on one question at a time so a 3-question form doesn't feel overwhelming | High | — | Only Q1 visible initially; each pick on the latest-revealed question reveals the next; one-way (no auto-collapse on reveal) |
| Per-question summary + "Change answer" button (in-progress only) | As a user mid-form, I want to see what I've already picked and revise it without starting over | High | — | Applies to `single_choice` with a radio pick. `multi_choice` and free-text-only stay in their normal edit view. Disabled after Submit. |
| Free-text input via `allowFreeText: true` | As an agent author, I want the user to be able to type a custom answer when none of my options fit | Medium | — | Renders an actual `<input>` field below the options. For `single_choice`, mutually exclusive with radio picks; for `multi_choice`, combines with checkbox picks on submit |
| Single Submit at the end | As a user, I want to submit all my answers at once so the agent doesn't ping me after every pick | High | — | Visible only when all questions revealed. Disabled until single_choice questions are answered AND `!isStreaming` |
| Submit locks the form | As a user, after I submit I shouldn't be able to keep editing | High | — | `submitted=true` → options disabled, picks remain highlighted, Change answer button removed |
| `isLatest` lock semantics for older / superseded cards | As a user, I shouldn't be able to click into a card the conversation has already moved past | High | — | `useGenerativeRender().isLatest` exposed via `GenerativeRenderContext`. Computed in `MessagesList` from messages + last user reply |
| Auto-scroll on question reveal | As a user, when a new question appears below the current viewport I want the chat to follow so I can see it | Medium | — | `containerRef.scrollIntoView({ behavior: "smooth", block: "end" })` only on forward advance of `revealedCount` |
| Width contract: prompt full-width, cards capped at 400 px | As a user on a wide chat, the form should look like a constrained input panel, not span the whole chat | Medium | — | Container is plain flex column; `max-width: 400px` lives on the question cards + Submit row; prompt fills the container |
| Bold question title with inline helper | As a user, the question text should look like the primary call-to-action with the constraint inline ("Pick one") | Medium | — | `<strong>Title</strong> Pick one` rendering, helper auto-derived from `type` if not set |
| Backwards-compat with legacy `{ prompt, options }` shape | As a chat-ui maintainer, rehydrated history written with the older single-question schema must still render | Medium | — | `normalizeQuestions` migrates the legacy shape into `[{ type: "single_choice", options }]` at render time |
| Brand colour `#410099` for primary actions | Consistent with Oddle product visual identity | Medium | — | Submit button background, Change-answer outline + label, picked radio dot, picked checkbox fill, focus outlines |
| Render nothing instead of an empty placeholder | As a user, I shouldn't see "No questions available" during a streaming frame or on a malformed render | Low | — | `renderableQuestions.length === 0` → return null; questions with no options AND no `allowFreeText` are filtered out |
| Public hook `useGenerativeRender` for consumer cards | As a third-party generative component author, I want the same render context the built-in uses (callId, status, source, isLatest) | Low | — | Exported from `src/index.ts` |

## 🎨 User interaction and design

**Initial render** — Optional intro prompt as plain text above the form, then a single white card containing the first question:

```
A couple of quick picks to shape your next email…

┌─ Q1 card (max-width 400 px) ──────────────┐
│ Which campaign idea? Pick one.            │
│ ○ Mother's Day Treat                      │
│ ○ Weekday Lunch Saver                     │
│ ○ Comfort Bowls                           │
│ ○ Signature Beef Bowl                     │
└──────────────────────────────────────────┘
```

**Pick on Q1** → auto-collapse to summary, smooth-scroll, Q2 reveals as a separate card below:

```
┌─ Q1 card (summary) ──────────────────────┐
│ Which campaign idea? Pick one.           │
│ You selected: Mother's Day Treat         │
│ [        Change answer        ]          │
└──────────────────────────────────────────┘

┌─ Q2 card (active) ───────────────────────┐
│ What's the primary action? Pick one or…  │
│ ☐ Order delivery / takeaway online       │
│ ☐ Claim an in-store redeemable           │
│ ☐ Just announce / build awareness        │
│ [ Type your answer here…              ]  │ ← if allowFreeText
└──────────────────────────────────────────┘
```

**Change answer click** → that card returns to its options view; later questions stay revealed; previous pick stays highlighted. Picking again auto-collapses back to summary.

**All revealed + answered** → Submit button (full-width primary, `#410099`) appears as its own row below the last card.

**Submit** → form locks. Options disabled, picks still visually highlighted, Change-answer buttons removed. Message containing every Q/A pair flows to the agent as a single user turn.

**Rehydrated card** → If this card is the last unanswered message in history, treated as live (`isLatest === true`) — user can complete it. Otherwise locked.

**States that lock the form**: `submitted` (after Submit click); `!isLatest` (a newer message exists in the thread).

## ⚠️ Out of Scope

- **Ranking question type** (drag-to-reorder). Needs a drag-and-drop dependency the library doesn't currently take. Defer to a future iteration if demand emerges.
- **Persisting the user's submitted answer across rehydration.** The chat-server persists the rendered card props but not the user's reply, so the summary view + Change answer can't survive a page reload mid-form. Server-side schema change required to fix.
- **Auto-focus the chat input when the user types in free-text** (or when `"I'll type to describe"`-style escape hatches are picked). Skipped to keep the data-flow simple — the typed text submits like any other answer.
- **Multi-choice / free-text auto-collapse to summary.** Only `single_choice` with a radio pick collapses; multi/free-text stay in their normal edit view because there's no clean "done" signal for them. Could be revisited with an explicit per-question Done button.
- **Per-question accessibility focus management** when Change answer is clicked. Today the click reopens options but doesn't move focus to the first option. Acceptable for v1, revisit with screen-reader testing.
- **Theming / per-consumer brand colour overrides.** The built-in hard-codes `#410099`. If consumers need their own brand, they can override the registration with their own component using the same `name`.
- **Retry / partial submission.** Submit is one-shot; if the WebSocket send fails, the user sees the locked summary but no recovery affordance inside the card. Falls back to the chat's existing connection-error handling.
- **Validation beyond "single_choice answered".** No min/max picks for multi-choice, no regex/pattern validation for free-text. The agent should restate constraints in `helperText` or in its prose preamble.
