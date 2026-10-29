# Next.js Template

Production-ready starter template for modern, self-hosted Next.js apps with TypeScript, comprehensive utilities, testing, and CI/CD.

## Features

### Core Stack

- **Next.js 16** with App Router and React 19
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** for styling
- **pnpm** for fast, efficient package management
- **Node 26.13.0** Docker setup

### Developer Experience

- **Prettier** with import sorting and Tailwind class sorting
- **ESLint** with Next.js, React, and TypeScript rules
- **Husky + lint-staged** for pre-commit quality checks
- **Vitest** for fast unit testing with coverage
- **GitHub Actions** CI/CD pipeline

### Production Ready

- Error boundaries (`error.tsx`, `global-error.tsx`, `not-found.tsx`)
- Loading states with Streaming and Suspense
- Typed environment variables with validation
- Docker multi-stage build with optimized caching
- Bundle size optimization with analyzer
- SEO-friendly metadata structure

### Comprehensive Utilities

- **21+ Custom Hooks** - Storage, fetching, events, timing, DOM utilities
- **40+ Date/Time Functions** - Formatting, parsing, arithmetic, validation
- **Type-Safe Helpers** - String, number, promise, validation (Zod)
- **React.cache()** examples for server-side request deduplication
- **MDX utilities** for content parsing

### Example Implementations

- Server Actions with validation
- Route Handlers (API routes)
- Dynamic imports for code splitting
- OG image generation
- Streaming with Suspense boundaries
- Proxy (middleware) example
- UI component patterns (examples only - build your own!)

---

## Structure

```
nextjs-template/
├── app/                      # Next.js App Router
│   ├── actions.ts           # Server Actions examples
│   ├── api/                 # Route handlers
│   │   ├── example/         # REST API example
│   │   └── og/              # OG image generation
│   ├── examples/            # Example pages
│   │   └── streaming/       # Suspense/streaming demo
│   ├── error.tsx            # Error boundary
│   ├── global-error.tsx     # Root error boundary
│   ├── loading.tsx          # Loading state
│   └── not-found.tsx        # 404 page
├── components/
│   └── examples/            # Example components & patterns
│       ├── ui/              # UI component examples (reference only)
│       │   ├── Button.tsx   # Accessible button example
│       │   ├── Input.tsx    # Form input example
│       │   ├── Card.tsx     # Card component example
│       │   └── README.md    # Why these are examples only
│       ├── DynamicImportExample.tsx
│       └── HeavyComponent.tsx
├── hooks/                   # 21+ custom React hooks
├── utils/                   # 40+ utility functions
│   ├── cache.ts            # React.cache() examples
│   ├── date-time.ts        # 40+ date/time utilities
│   ├── zod/                # Validation schemas
│   └── mdx/                # MDX parsing
├── docs/                    # Documentation
│   ├── bundle-optimization.md
│   ├── parallel-routes.md
│   ├── performance-patterns.md
│   └── runtime-selection.md
├── __tests__/               # Vitest tests
├── .github/workflows/       # CI/CD pipelines
├── Dockerfile              # Optimized production build
├── vitest.config.mts       # Test configuration
└── env.ts                  # Typed environment variables
```

---

## Quick Start

### Prerequisites

- **Node.js** 26.13.0 locally and in Docker; Vercel selects Node 26 through `engines.node`
- **pnpm** 12.15.0 (install separately with `npm install --global pnpm@12.15.0`)

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Scripts

```bash
# Development
pnpm dev              # Start dev server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format all files with Prettier
pnpm format:check     # Check formatting
pnpm test             # Run tests with Vitest
pnpm test:ui          # Open Vitest UI

# Analysis
pnpm analyze          # Analyze bundle size
```

---

## Environment Variables

Create `.env` from `.env.example` and configure:

```bash
# Required: Application base URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auto-set by Next.js
NODE_ENV=development

# Optional: Skip validation during build
SKIP_ENV_VALIDATION=false
```

All environment variables are validated at build time using `@t3-oss/env-nextjs` + Zod.

---

## Hooks & Utilities

### Import Best Practices

**⚠️ Important for Bundle Size:**

For optimal tree-shaking, import directly from source files:

```typescript
// ✅ Best - Direct import (only bundles what you use)
import { useFetch } from '@/hooks/use-fetch';
import { slugify } from '@/utils/string';

// ⚠️ Works - Barrel import (may bundle more than needed)
import { useFetch } from '@/hooks';
```

See `docs/bundle-optimization.md` for details.

### Available Hooks (21+)

**Storage:** `useLocalStorage`, `useSessionStorage`
**Fetching:** `useFetch` (with AbortController)
**DOM:** `useClickOutside`, `useHover`, `useOnScreen`, `useMediaQuery`, `useWindowSize`
**Timing:** `useDebounce`, `useThrottle`, `useInterval`, `useTimeout`
**State:** `useBoolean`, `usePrevious`, `useCopyToClipboard`
**Events:** `useEventListener`, `useEventCallback`
**Routing:** `useQueryParams`

See `docs/hooks.md` for full documentation.

### Available Utilities (40+)

**String:** `slugify`, `capitalize`, `titleCase`
**Number:** `clamp`, `roundTo`, `between`
**Date/Time:** 40+ functions including `formatDate`, `addDays`, `differenceInDays`, `getRelativeTime`
**Promise:** `sleep`, `withTimeout`, `retry`
**Validation:** Email, URL, password, file types (Zod schemas)
**MDX:** Parse frontmatter and content
**Cache:** React.cache() for request deduplication

See `docs/utils.md` for full documentation.

---

## Testing

Tests are configured with Vitest + React Testing Library:

```bash
# Run tests
pnpm test

# Watch mode
pnpm test --watch

# Coverage
pnpm test --coverage

# UI mode
pnpm test:ui
```

Example test structure:

```
__tests__/
├── utils/
│   ├── string.test.ts
│   └── number.test.ts
└── components/
    └── Button.test.tsx
```

---

## Docker

### Build & Run

```bash
# Build production image
docker build -t nextjs-template:prod .

# Run container
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  nextjs-template:prod
```

### Features

- Multi-stage build for minimal image size
- Optimized layer caching with pnpm
- Next.js standalone output
- Non-root user for security
- Node 26.13.0 Alpine base

See `docs/docker.md` for advanced configuration.

---

## CI/CD

GitHub Actions workflow included (`.github/workflows/ci.yml`):

- ✅ **Lint** - ESLint checks
- ✅ **Format** - Prettier validation
- ✅ **Test** - Vitest with coverage
- ✅ **Type Check** - TypeScript validation
- ✅ **Build** - Production build test

Runs on push to `main`/`develop` and all pull requests.

---

## Documentation

Comprehensive guides in `docs/`:

- **`bundle-optimization.md`** - Reduce bundle size, tree-shaking
- **`parallel-routes.md`** - Modal patterns, intercepting routes
- **`performance-patterns.md`** - `after()`, `startTransition`, React.cache()
- **`runtime-selection.md`** - Node.js vs Edge runtime
- **`hooks.md`** - Hook usage examples
- **`utils.md`** - Utility function reference
- **`docker.md`** - Docker deployment guide

---

## Examples

### Server Actions

```typescript
// app/actions.ts
'use server';
export async function submitForm(formData: FormData) {
  const name = formData.get('name');
  await saveToDatabase({ name });
  revalidatePath('/');
  return { success: true };
}
```

### Route Handlers

```typescript
// app/api/users/route.ts
export async function GET(request: Request) {
  const users = await db.user.findMany();
  return Response.json(users);
}
```

### Dynamic Imports

```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
```

### Streaming with Suspense

```typescript
<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>
```

See `app/examples/` for full working examples.

### UI Components (Examples Only)

⚠️ **Important:** The components in `components/examples/ui/` are **reference examples**, not production components.

They demonstrate:

- Accessibility patterns (ARIA, keyboard navigation)
- TypeScript best practices
- Tailwind CSS styling
- Component testing

**For your app, you should:**

1. Build your own components from scratch
2. Use a UI library (shadcn/ui, Radix UI, Headless UI)
3. Copy and heavily customize these examples

See `components/examples/ui/README.md` for details.

---

## Performance Optimizations

- ✅ Bundle size optimization enabled in `next.config.ts`
- ✅ Automatic tree-shaking with direct imports
- ✅ Dynamic imports for code splitting
- ✅ Image optimization with `next/image`
- ✅ Font optimization with `next/font`
- ✅ React.cache() for request deduplication
- ✅ Docker multi-stage builds with layer caching

Run `pnpm analyze` to visualize bundle composition.

---

## License

MIT

---

## Credits

Built with best practices from:

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel React Best Practices](https://vercel.com/blog/how-react-18-improves-application-performance)
- [Web Interface Guidelines](https://interface-guidelines.vercel.app/)
