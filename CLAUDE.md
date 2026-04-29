# oddle-wrapper-chat-ui

React component library (`@oddle/chat-wrapper-ui`) for embedding a real-time AI chat widget. Publishes to npm as CJS + ESM + TypeScript declarations.

## Project at a Glance
- **Version:** see `package.json` (currently ~1.0.41)
- **Stack:** React 18/19, TypeScript, Zustand, Vite, i18next, react-markdown
- **Entry point:** `src/index.ts` → `dist/index.{cjs,mjs}` + `dist/index.d.ts`
- **CSS:** `dist/style.css` — consumers must import it explicitly

## Top-Level Structure
```
src/
  components/   — React UI components (ChatWrapper is root)
  client/       — WebSocket chat client + message handlers
  store/         — Zustand state slices
  hooks/         — React hooks (connection, conversation, scroll, etc.)
  utils/         — HTTP API utilities (ticket, thread, agentConfig)
  types/         — Public TypeScript types
  i18n/          — i18next setup and translation resources
  styles/        — chat-wrapper.css (all styles, prefix: oddle-chat-*)
showcase/         — Local dev app for manual testing
scripts/          — Build, release, and changelog automation
context/          — Domain context files (loaded dynamically below)
```

## Key Invariants
- **Never** nest multiple `<ChatWrapper>` instances — each mounts a WebSocket connection
- **Never** export `src/client/types/` in the public API — they're internal
- Peer deps (`react`, `react-dom`) must stay in `peerDependencies`, not `dependencies`
- All user-supplied HTML is sanitized via DOMPurify before rendering
- Use `npm run release:*` scripts for version bumps — never edit `package.json` version manually
- CSS class prefix is `oddle-chat-*` — don't change existing class names (breaking change)

## Development Workflow
```bash
npm install
npm run dev          # Showcase dev server with HMR
npm run build        # Full library build (typecheck + vite)
npm run typecheck    # tsc --noEmit only
npm run showcase     # Run showcase app manually
```

## Release Workflow
```bash
npm run release:patch   # bug fix release
npm run release:minor   # new feature release
npm run release:major   # breaking change release
```

## Context Strategy
Domain-specific context files live in `context/`. The script `scripts/context-switcher.sh`
fires on every prompt (via `UserPromptSubmit` hook) and injects the relevant `@import`
lines below based on the current git branch and your query keywords.

Available context files:
- `context/websocket.md`    — WebSocket client, connection, ticket auth
- `context/components.md`   — React components, UI structure, styling
- `context/state.md`        — Zustand store, slices, selector hooks
- `context/api.md`          — HTTP API utilities (ticket, thread, agentConfig)
- `context/types.md`        — TypeScript types, enums, contracts
- `context/i18n.md`         — Internationalization, translation keys, Tolgee
- `context/build-release.md` — Vite build, versioning, release scripts

---

# --- dynamic context (auto-managed) ---

<!-- dynamic-context:start -->
<!-- no specific context loaded | branch: feature/generative-ui -->
<!-- dynamic-context:end -->
