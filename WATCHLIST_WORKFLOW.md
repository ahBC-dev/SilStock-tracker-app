# Watchlist System Workflow

This document explains how the watchlist feature works end-to-end in the Next.js app, including UI triggers, server actions, API routes, authentication, and database persistence.

## Overview
- Users can add/remove stock symbols to their personal watchlist.
- Watchlist data is stored in MongoDB via Mongoose.
- Interactions happen through server actions and API routes under the App Router.
- Authentication gates access; operations are associated with the authenticated user (by email → userId).

## Key Components
- UI: `components/WatchlistButton.tsx` (toggle add/remove), pages under `app/(root)/watchlist/[symbol]/` and `app/(root)/stocks/[symbol]/` consume watchlist state.
- Server Actions: `lib/actions/watchlist.actions.ts` implements data reads and mutations.
- API Routes: `app/api/watchlist/route.ts` (REST interface for watchlist), `app/api/auth/[...all]/route.ts` (auth-related), `app/api/test-db/route.ts` (connectivity test).
- DB Model: `database/models/watchlist.model.ts` defines the Watchlist schema.
- DB Connection: `database/mongoose.ts` centralizes MongoDB connection.
- Auth: `lib/better-auth/auth.ts` provides user session and identity.
- Middleware: `middleware/index.ts` enforces auth/guards at the edge where needed.

## Data Model
`database/models/watchlist.model.ts`
- Fields:
  - `userId`: string — links to the authenticated user.
  - `symbol`: string — uppercase stock ticker (e.g., "AAPL").
  - `company`: string — the company name for display.
  - `addedAt`: Date — timestamp for sorting/analytics.
- Indexes: typically `userId + symbol` unique for idempotent upserts.

## Server Actions
`lib/actions/watchlist.actions.ts`
- `getWatchlistSymbolsByEmail(email: string): Promise<string[]>`
  - Connects to the DB, resolves `userId` from the `user` collection by `email`.
  - Queries `Watchlist` by `userId` and returns an array of `symbol` values (upper‑cased).
  - Safe defaults: returns `[]` on missing inputs or errors.
- `mutateWatchlist(action: 'add' | 'remove', email: string, symbol: string, company?: string)`
  - Resolves `userId` from the `user` collection via `email`.
  - `add`: requires `company`; performs an upsert with `$setOnInsert` to keep operation idempotent.
  - `remove`: deletes one record by `userId + symbol`.
  - Returns `{ ok: boolean, status?: 'added'|'removed', error?: string }`.

## API Routes
`app/api/watchlist/route.ts`
- Typical operations (exact handlers may vary):
  - `GET`: returns the current user's watchlist items.
  - `POST`: add a symbol (`symbol`, `company`).
  - `DELETE`: remove a symbol (`symbol`).
- Uses auth to bind requests to the current user; may internally call the server actions.

`app/api/auth/[...all]/route.ts`
- Handles authentication flows and session validation.

`app/api/test-db/route.ts`
- Verifies DB connectivity and health.

## Authentication & Identity
- The app uses Better Auth (`lib/better-auth/auth.ts`) to obtain the current user session.
- Watchlist operations rely on `email` → lookup in `user` collection → `user.id` or `_id` → stringified `userId`.
- Middleware (`middleware/index.ts`) may protect routes/pages and redirect unauthenticated users.

## UI Flows
- Watchlist Toggle (`components/WatchlistButton.tsx`):
  - Reads current watchlist to determine if `symbol` is saved.
  - On click:
    - If not saved: calls `mutateWatchlist('add', email, symbol, company)`.
    - If saved: calls `mutateWatchlist('remove', email, symbol)`.
  - Shows toasts/feedback and updates local/route state.

- Watchlist Page (`app/(root)/watchlist/[symbol]/page.tsx`):
  - Displays detail for a specific `symbol`; often checks presence in user watchlist.
  - May enable quick remove or navigation back to list view.

- Stocks Page (`app/(root)/stocks/[symbol]/page.tsx`):
  - Displays stock detail alongside an add/remove control.

## Sequence Diagrams

Add symbol to watchlist
```
User           UI (WatchlistButton)         Server Action              DB
 | click add  |--------------------------->| mutateWatchlist(add)     |
 |            |                            | resolve userId           |
 |            |                            | upsert (userId,symbol)   |--> write
 |            |<---------------------------| { ok: true, 'added' }    |
 | toast/refresh
```

Remove symbol from watchlist
```
User           UI (WatchlistButton)         Server Action              DB
 | click rm   |--------------------------->| mutateWatchlist(remove)  |
 |            |                            | resolve userId           |
 |            |                            | deleteOne(userId,symbol) |--> delete
 |            |<---------------------------| { ok: true, 'removed' }  |
 | toast/refresh
```

Load watchlist symbols (e.g., on page load)
```
Page/Server    getWatchlistSymbolsByEmail     DB
 |------------|------------------------------>| find user by email
 |            |                               | fetch Watchlist by userId
 |            |<------------------------------| symbols[] (UPPERCASE)
 | render
```

## Error Handling & Edge Cases
- Missing inputs: actions return safe errors (`Missing fields`, `Company required`).
- DB connection issues: actions fall back to `{ ok: false, error: 'DB error' }` or `[]`.
- User not found: actions return `[]` (read) or `{ ok: false, error: 'User not found' }` (mutations).
- Idempotency: `add` uses `upsert` + `$setOnInsert` to avoid duplicates.
- Normalization: `symbol` persisted in `UPPERCASE`.

## Performance & Consistency Notes
- Prefer reading via server actions to avoid extra client hops.
- Ensure an index on `{ userId, symbol }` for fast lookups and uniqueness.
- Batch reads for watchlist list view to avoid N requests.
- Cache-friendly: `getWatchlistSymbolsByEmail` returns lean documents, minimizing overhead.

## Security Considerations
- Always bind operations to the authenticated user; never accept a `userId` from the client.
- Validate inputs; restrict `symbol` format (A–Z, numbers, dots) to mitigate injection risks.
- Avoid exposing raw Mongo errors to clients; surface generic messages.

## Extensibility Ideas
- Add list-level features: custom lists, notes, sort orders.
- Add activity log (addedAt history, removedAt).
- Sync with external services (e.g., broker or portfolio API).
- Pagination or limits for very large watchlists.
- Server-side caching (per-user) and optimistic UI updates.
