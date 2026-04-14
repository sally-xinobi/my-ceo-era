# Project: Next.js React Template

<!-- Project Summary -->

## Architecture

Feature-based architecture with domain separation under `src/`:

```
src/
  app/            # Next.js App Router — routing shells only, no business logic
  features/       # Domain modules — self-contained feature units
  components/     # Shared UI components
  components/ui   # Design primitive
  providers/      # React context providers (theme, query, toast)
  lib/            # Utilities
  stores/         # App-level Zustand stores
  types/          # Shared type definitions
  hooks/          # Shared hooks
  messages/       # i18n JSON files (one directory per locale)
```

## Feature Modules (`docs/feature-convention.md`)

- Each feature is a self-contained module: `components/`, `hooks/`, `api/`, `store/`, `types/`, `__tests__/`, `index.ts`
- Import features only through barrel (`@/features/<name>`), internal code uses relative paths
- No circular references between features
- Only `app/` may import from `features/` — shared folders must never import features
- Dependency flow: `app/ → features/ → shared` | within feature: `Components → Hooks → Store → API → Types`
- Cross-feature sharing: promote to shared layer (`src/types/`, `src/stores/`, `src/components/`)

## Code Quality

Run validation after making changes:

- `npm run validate` — all-in-one: type-check + lint + test
- `npm run type-check` — TypeScript (`tsc --noEmit`)
- `npm run lint` — Biome check (lint + format, check-only)
- `npm run format` — Biome check with auto-fix (`--write`)
- `npm run test` — Vitest unit tests
- `npm run test:e2e` — Playwright e2e tests

After editing code, always run `npm run validate` before reporting the task as complete.
If lint/format issues remain, fix them with `npm run format`.

<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->
