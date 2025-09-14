# Utilities Library

Typed, framework-agnostic helpers for common tasks. Import from `@/utils/...`.

## Strings

- `string.ts`
  - `slugify(input: string): string` – lowercases, removes diacritics, converts spaces/symbols to `-`.
  - `capitalize(input: string): string` – capitalizes first letter.
  - `titleCase(input: string): string` – capitalizes each whitespace-separated word.

## Numbers

- `number.ts`
  - `clamp(value, min, max): number` – restricts a value to a range.
  - `roundTo(value, decimals): number` – rounds to N decimals.
  - `between(value, min, max): boolean` – range check inclusive.
- `number-to-words.ts`
  - `numberToWords(num: number): string` – converts integer to English words.

## Random / IDs / Timestamps

- `random-int.ts`
  - `randomInt(min, max): number` – inclusive integer.
- `random-string.ts`
  - `generateRandomString(length): string` – alphanumeric.
- `generate-uuid.ts`
  - `generateUUIDv1() | v3(name, namespace) | v4() | v5(name, namespace)` – uuid via `uuid`.
- `timestamp.ts`
  - `generateTimestamp(): string` – ISO string for current time.

## Objects / Arrays

- `unique.ts`
  - `unique<T>(array: T[]): T[]` – deduplicates via Set.
- `is-empty-object.ts`
  - `isEmptyObject(value: unknown): value is Record<string, never>` – narrow to empty plain object.

## Dates

- `date-time.ts`
  - `convertUnixTimestamp(timestamp, locale?, dateOptions?, timeOptions?)` → `{ date, time }` – robust formatting with sensible defaults.

## URL

- `url.ts`
  - `absoluteUrl(path: string): string` – builds an absolute URL from `NEXT_PUBLIC_APP_URL`.

## Files / MDX

- `files.ts`
  - `getFilesByExtension(dir, ext='.mdx')` – list files.
  - `readFileContent(filePath, encoding='utf-8')` – safe read.
  - `getSlugFromFile(filePath)` – filename without extension.
  - `ensureDirectoryExists(dir)` – recursive mkdir.
- `mdx/mdx-parser.ts`
  - `mdxParser(fileContent)` → `{ metadata, content }` – simple front‑matter parser.
- `mdx/get-mdx-data.ts`
  - `getMDXData(filePath)` – `{ slug, metadata, content }` per file.
  - `getMDXPages(directory)` – array of page data; `getMDXPage(slug, dir)`; `getMDXPagePaths(dir)`.

## Promises / Control Flow

- `promise.ts`
  - `sleep(ms)` – delay helper.
  - `withTimeout(promise, ms, message?)` – reject if promise doesn’t resolve in time.
  - `retry(fn, { retries=3, delayMs=250, factor=2 })` – exponential backoff retry.
  - `invariant(condition, message)` – runtime assertion with TS `asserts`.

## Storage helpers (simple functions)

- `local-storage.ts`
  - `getLocalStorageData(key)` – parse JSON or `null`.
  - `setLocalStorageData(key, data)` – stringify JSON.
- `session-storage.ts`
  - `getSessionStorageData(key)` / `setSessionStorageData(key, data)` – sessionStorage variants.

## Zod utilities

- `zod/file-types.ts` – common allowed mime types (images/videos/audio/docs).
- `zod/validation.ts` – email/url/string/number/date/password checks, and file validators using Zod v4; helpers return `{ valid, message }`.

## Import examples

```ts
import { clamp, roundTo } from '@/utils/number';
import { retry, withTimeout } from '@/utils/promise';
import { slugify } from '@/utils/string';
import { unique } from '@/utils/unique';
import { absoluteUrl } from '@/utils/url';
```

Notes

- Utilities are pure and typed; prefer passing options over global state.
- File/MDX helpers assume Node environment (server-side usage).
