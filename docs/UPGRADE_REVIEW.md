# Node and compiler upgrade review

Reviewed locally on 2026-10-26 against `origin/main` at `f1b63ca`.
The newer security change is retained, including Next.js agent security
configuration, pinned CI actions, disabled checkout credential persistence,
explicit environment validation and release-age exceptions.

## Runtime and tooling

- Local `.nvmrc` and Docker build/runtime use Node 26.12.1. Package engines also
  retain Node 24.22.1 compatibility for the documented Vercel hosting path.
  [Vercel currently lists Node 24 and 22](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
- pnpm is 12.15.0; the existing manager and lockfile format are preserved.
- `pnpm typecheck` explicitly invokes TypeScript 7.0.2 through the `typescript7`
  alias. TypeScript 6.0.3 supplies the compiler API used by typescript-eslint and
  the existing formatter ecosystem. Next.js also performs its resolved build
  typecheck. No error checking is disabled and no script relies on `.bin/tsc`.
- ESLint 9 is retained for current React plugin compatibility. The formatter's
  OXC plugin stays at 0.1.4 because sort-imports 4.7.1 declares support for
  0.0.x/0.1.x, not the newer 0.2.x line. Peer checks pass.
- Docker excludes local `.env` files from the build context. No credentials
  were inspected or supplied to the image.

## Verification

- Node 26.12.1: frozen install, lint, TypeScript 7 check, 29 tests, formatting
  check and standalone production build pass.
- Node 24.22.1: lint, TypeScript 7 check, 29 tests and production build pass.
- Lint reports two existing warnings in the fetch-hook example and image test
  mock. Existing warning rules are unchanged; no suppressions were added.
- Full and production dependency audits report zero advisories. Outdated
  entries are limited to the explicit ESLint, TypeScript API and OXC holds.
- The Node 26 Docker image builds and runs successfully. Its runtime reports
  26.12.1. The standalone server and disposable container both pass real browser
  checks with external requests blocked: homepage hydration, four Suspense
  example cards, example API GET/POST/PUT/DELETE/OPTIONS responses, missing-name
  validation, and dynamic OG image PNG output. Browser page errors: zero.
  Example mutations use disposable in-memory responses, not an external store.

## Release boundary and gains

CI retains its upstream pull-request, main-push and manual triggers. Existing
jobs now cover both runtimes; uploaded build artifact names include the runtime
to avoid matrix collisions. The Vercel deployment workflow remains manual and
uses Node 24.22.1. No workflow dispatch, push, tag, provider call, or deployment
was performed. GitHub reports no deployment history and no local Vercel project
link is present; an external Git integration has not been confirmed.

The existing Edge-runtime OG example emits a Next.js deprecation warning but
builds and produces a valid PNG locally and in the container. It was not
rewritten as part of this tooling change. Hosted Vercel and GitHub Actions execution
remain separate release checks.

The demonstrated gains are current Node development/container support, explicit
TypeScript 7 checking and coverage for the existing Node 24 hosting path.
The upstream zero-vulnerability dependency state is preserved. No comparative
benchmark was run, so no application speedup is claimed.
