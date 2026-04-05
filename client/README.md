# Client

React (Vite) single-page app: task list, inline editing, optimistic updates with rollback on failure, toast notifications for errors, and an empty state when there are no items.

## Requirements

- Node.js 24+ (`nvm use 24`)

## Install

From the repository root:

```bash
npm install
```

## Local development

```bash
npm run dev --workspace=client
```

From `client/`:

```bash
npm run dev
```

Dev server: `http://localhost:5173` by default.

## Build

```bash
npm run build --workspace=client
```

Artifacts: `client/dist/`. Point your static host at `dist/` and either reverse-proxy `/api` to the Express service or configure the client to call a public API origin if you change the base URL.

## Proxy

With `npm run dev`, requests to `/api` are forwarded to the backend origin. Default target is `http://localhost:5001` (see `vite.config.js`). Run the server alongside the client.

Optional: copy `.env.example` to `.env` in `client/` and set `VITE_DEV_API_ORIGIN` if your API listens on another host or port (keep it aligned with `PORT` in `server/.env`).

The HTTP client uses `baseURL: '/api'`, so the browser calls same-origin `/api/...` in development.

## Scope

- Expects the API contract documented in `server/README.md`.
- Mutations are optimistic; failed requests revert local state and surface the server message in a toast when present.
- No authentication layer; anyone who can reach the API can use it.
- No client `.env` is required for the default dev setup unless you change the API origin from `http://localhost:5001`.
