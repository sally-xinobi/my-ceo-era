# Feature Module Convention

Each feature under `src/features/<name>/` is a self-contained domain module.

## Structure

```
features/<name>/
  components/   # Feature-scoped React components ("use client")
  hooks/        # Feature-scoped hooks (state access, form logic)
  api/          # API client functions
  store/        # Zustand store for feature state
  types/        # Feature-scoped TypeScript interfaces
  __tests__/    # Colocated unit tests (Vitest)
  index.ts      # Barrel file — the ONLY public API surface
```

## Import rules

1. **Barrel-only exports**: All external access to a feature MUST go through `index.ts`. Never import from a feature's internal paths (e.g., `@/features/auth/store/authStore` is forbidden — use `@/features/auth`).

2. **Internal relative imports**: Code within a feature uses relative paths (`../hooks/useAuth`), not path aliases.

3. **No circular references between features**: If feature A imports from feature B, then feature B must NOT import from feature A — directly or transitively.

4. **Only `app/` may import features**: Global shared folders (`components/`, `hooks/`, `lib/`, `stores/`, `providers/`, `types/`) must NEVER import from `features/`. The dependency direction is one-way:

   ```
   app/ → features/ → shared (components/, hooks/, lib/, stores/, providers/, types/)
   ```

   If you need to import a feature into a shared folder, the design is wrong. Either:
   - The code belongs inside the feature, not in shared
   - The shared concept should be extracted from the feature into the shared layer first

5. **Internal dependency flow**: Within a feature, dependencies flow downward only:

   ```
   Components → Hooks → Store → API → Types
   ```

   Components never call API directly — they go through hooks/store.

## When features need to communicate

Features must not import from each other. When two features need shared data or types:

- **Shared types**: Promote to `src/types/`
- **Shared state**: Promote to `src/stores/`
- **Shared UI**: Promote to `src/components/`
- **App-level wiring**: Compose features together in `app/` via props or context

If promoting feels wrong because the concept is domain-specific, consider merging the two features into one with internal sub-modules.
