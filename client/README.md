# Client

React + Vite frontend for the TODO app.

## Prerequisites

- Node.js 24+ (`nvm use 24`)

## Setup

From the repository root:

```bash
npm install
```

## Run

```bash
npm run dev --workspace=client
```

Or from `client/`:

```bash
npm run dev
```

Vite serves the app (default port **5173**). Open the URL shown in the terminal.

## API proxy

`vite.config.js` proxies `/api` to `http://localhost:5001` (the server default). Start the server (`npm run dev --workspace=server`) so API calls from the browser work during development. If you change `PORT` in `server/.env`, update the proxy target in `vite.config.js` to match.

## Notes

- Header and layout only for now; list and forms are still to build.
