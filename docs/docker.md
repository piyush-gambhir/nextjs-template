# Docker

The Dockerfile builds and runs Next.js standalone output on Node 26.12.1 Alpine.

## Build

```bash
docker build -t nextjs-template:prod .
```

## Run

```bash
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  nextjs-template:prod
```

Open http://localhost:3000

## Notes

- Multi-stage build: `deps` → `build` → `runner` keeps the final image small.
- Installs pnpm 12.15.0 explicitly with npm; dependency installation uses
  `--frozen-lockfile --prod=false` so build tooling is available.
- `next.config.ts` sets `output: 'standalone'` which supports full SSR/SSG/ISR/API routes.
- Copies only `public/`, `.next/standalone/`, and `.next/static/` into the runtime image.
- Runs `node server.js` as the nonroot `nextjs` user.
- Alpine `libc6-compat` is installed for native module compatibility.

## Common env

- `NEXT_PUBLIC_APP_URL`: base URL used by `absoluteUrl()`. Public Next.js variables
  are compiled into browser bundles at build time; setting this only in
  `docker run` does not replace values already embedded in the image.
- The Docker context excludes `.env` and `.env.*`; pass runtime server variables
  explicitly. For additional environment validation, see `env.ts`.
