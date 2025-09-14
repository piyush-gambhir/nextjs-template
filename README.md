**Next.js Template**

Starter template for modern, self‑hosted Next.js apps with TypeScript, pnpm, Prettier, robust hooks/utilities, and a production Dockerfile (Node 22 LTS, standalone output).

**Features**
- TypeScript, App Router, SSR supported
- Prettier + import sorting + Tailwind plugin
- Useful hooks in `hooks/` with a barrel export
- Generic utilities in `utils/` (string, number, promise, mdx, zod, etc.)
- Docker multi‑stage image on Node 22 LTS, non‑root runtime, standalone output

**Structure**
- `app/` – routes, layouts, pages
- `hooks/` – reusable client hooks (exported via `hooks/index.ts`)
- `utils/` – typed helpers (browser/server)
- `fonts/` – Google + local fonts
- `docs/` – conventions and usage (`hooks.md`, `utils.md`, `docker.md`, `code-style.md`)
- `env.ts` – typed env via `@t3-oss/env-nextjs` + `zod`

**Requirements**
- Node 18+ (Node 22 LTS recommended)
- pnpm 9+ (managed via Corepack is recommended)

**Getting Started**
- Install deps: `pnpm install`
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Start: `pnpm start`

Open `http://localhost:3000` in your browser.

**Environment**
- Copy `.env.example` to `.env` and set values.
- Public base URL used by utils: `NEXT_PUBLIC_APP_URL`.
- See `env.ts` for full schema.

**Formatting & Linting**
- Format all: `pnpm format`
- Check format: `pnpm format:check`
- Lint: `pnpm lint`
- Pre-commit runs `lint-staged` to format and fix staged files.

**Docker**
- Build: `docker build -t nextjs-template:prod .`
- Run: `docker run --rm -p 3000:3000 -e NEXT_PUBLIC_APP_URL=http://localhost:3000 nextjs-template:prod`
- Uses Next.js `output: 'standalone'` – SSR/SSG/ISR/API routes supported.
  - See `docs/docker.md` for details.

**Hooks & Utils**
- Hooks reference: `docs/hooks.md`
- Utils reference: `docs/utils.md`
- Naming conventions: `docs/naming-conventions.md`

**Notes**
- Fonts configured with `next/font` (Google + local); see `fonts/`.
- Import hooks via `@/hooks`: `import { useFetch, useLocalStorage } from '@/hooks'`.
