# ceo-era

Production-ready Next.js template with TypeScript, Tailwind CSS, i18n, and container support.

## Features

- **Next.js 16** — App Router with React 19 and TypeScript 6 (strict mode)
- **Tailwind CSS v4** — utility-first styling
- **Biome** — fast linting and formatting
- **next-intl** — internationalization (en, ko, ja)
- **next-themes** — dark/light/system theme support
- **Zustand** — lightweight state management (app, persisted, ephemeral stores)
- **TanStack Query** — server state management
- **react-hook-form + zod** — type-safe form validation
- **Vitest + Playwright** — unit and E2E testing
- **pre-commit** — git hooks (biome, codespell, yamlfmt)
- **Docker** — multi-stage build for production deployment
- **Inter / Pretendard / Noto Sans JP** — multilingual font stack

## Quick Start

### Prerequisites

- Node.js 24+

### Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Docker

```bash
# Build and run
docker buildx build -t app:dev .
docker run -p 3000:3000 -it app:dev

# Docker Compose
docker compose up --build
```

## Testing

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e:install   # Install browsers (first time)
npm run test:e2e           # Run E2E tests
```

## Project Structure

```
src/
├── app/                      # Next.js App Router (routes, layouts, API)
├── components/               # React components (common/, ui/)
├── __tests__/                # Test files (mirrors src/ structure)
├── lib/                      # Utility functions (API client, logger, env)
├── messages/                 # i18n translation files (en/, ko/, ja/)
├── stores/                   # Zustand state management
├── types/                    # TypeScript type definitions
├── i18n.ts                   # Internationalization config
├── routing.ts                # next-intl routing config
└── proxy.ts                  # Next.js proxy (request interception)
k8s/                          # Kubernetes manifests
├── base/                     # Base resources (deployment, service, ingress, hpa, pdb)
└── overlays/                 # Environment-specific patches (dev/, prod/)
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_APP_URL` | No | `http://localhost:3000` | Application base URL |
| `LOG_LEVEL` | No | `info` | Log level: `debug`, `info`, `warn`, `error` |
| `SENTRY_DSN` | No | — | Sentry DSN (server-side) |
| `NEXT_PUBLIC_SENTRY_DSN` | No | — | Sentry DSN (client-side) |
| `SENTRY_ENVIRONMENT` | No | `local` | Sentry environment |
| `SENTRY_TRACES_SAMPLE_RATE` | No | `0.1` | Sentry trace sampling rate |

## Development

### Pre-commit Hooks

```bash
brew install pre-commit
pre-commit install
```

Hooks run on every commit:
- `biome` — lint and format
- `codespell` — spell check
- `yamlfmt` — YAML formatting
