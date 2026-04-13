# Domain: Build, Release & Versioning

## Overview
Vite-based library build outputting CJS, ESM, and TypeScript declarations. Semantic versioning with automated changelog generation and npm publishing via GitHub Actions.

## Key Files
| File | Purpose |
|------|---------|
| `vite.config.ts` | Library build config — entry: `src/index.ts`, outputs: CJS + ESM |
| `tsconfig.json` | TypeScript config — strict mode, paths, declaration emit |
| `package.json` | Package metadata, scripts, peer deps |
| `scripts/check-git-status.js` | Pre-version guard — fails if uncommitted changes exist |
| `scripts/generate-changelog.js` | Auto-generates `CHANGELOG.md` from git log |
| `scripts/release-helper.js` | Orchestrates build → version bump → tag → push |
| `VERSIONING.md` | Semantic versioning strategy and pre-release conventions |
| `CHANGELOG.md` | Release history |
| `.github/` | GitHub Actions workflows for CI and npm publish |

## Build Outputs (`dist/`)
```
dist/
├── index.cjs          # CommonJS bundle
├── index.mjs          # ESM bundle
├── index.d.ts         # TypeScript declarations
└── style.css          # Bundled CSS (consumers must import this)
```

## Build Commands
```bash
npm run build           # TypeScript check + Vite build
npm run typecheck       # tsc --noEmit only
npm run dev             # Showcase dev server (HMR)
npm run showcase        # Run showcase app for manual testing
```

## Release Commands
```bash
npm run version:patch   # Bump patch version (1.0.x)
npm run version:minor   # Bump minor version (1.x.0)
npm run version:major   # Bump major version (x.0.0)
npm run release:patch   # build + version:patch + generate-changelog + git tag + push
npm run release:minor   # Same for minor
npm run release:major   # Same for major
```

## Versioning Conventions (from VERSIONING.md)
- `patch` — bug fixes, doc updates, non-breaking tweaks
- `minor` — new features, backwards-compatible API additions
- `major` — breaking changes (prop removals, type incompatibilities, API renames)
- Pre-releases: `1.1.0-alpha.1`, `1.1.0-beta.1`, `1.1.0-rc.1`
- Use `npm run release:*` scripts — **never** manually edit `package.json` version

## Peer Dependencies
- `react: ^18.0.0 || ^19.0.0`
- `react-dom: ^18.0.0 || ^19.0.0`
- These must NOT be in `dependencies` — they would duplicate React in consumers

## Showcase App (`showcase/`)
- Standalone React app that imports the library locally
- Use for manual testing before release
- `showcase/src/App.tsx` has usage examples with all major props

## CSS Export
- Consumers must explicitly import `@oddle/chat-wrapper-ui/dist/style.css`
- CSS is not auto-injected — keeps consumer control over load order
- Vite config extracts CSS to `dist/style.css` during build

## Gotchas
- `check-git-status.js` will abort the release if there are uncommitted changes — commit first
- The `dist/` directory is checked into git (for CDN/direct use) — always rebuild before release
- `generate-changelog.js` reads conventional commit messages — use `feat:`, `fix:`, `chore:` prefixes
- Peer deps must be in `peerDependencies` AND `devDependencies` in package.json

## Branch Patterns → This Domain
`release/*`, `chore/release-*`, `chore/build-*`, `fix/build-*`
