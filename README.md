# todo-core-app

Full-stack task list: create, edit, complete, and remove items. The web client consumes a JSON API; data is stored in MongoDB.

## Requirements

- Node.js 24 or newer (use `nvm use 24` if you rely on nvm)
- A MongoDB deployment (Atlas or self-hosted) and a URI for `MONGODB_URI`

## Install

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

## Run

Run the API and the client in separate terminals.

**API**

```bash
cp server/.env.example server/.env
# Set MONGODB_URI in server/.env; adjust PORT if needed (default 5001)

npm run dev:server
```

**Client**

```bash
npm run dev:client
```

Open the local URL Vite prints (typically `http://localhost:5173`).

Further detail: [`client/README.md`](client/README.md), [`server/README.md`](server/README.md).

## Stack

| Area | Technology | Notes |
|------|------------|--------|
| Repo layout | npm workspaces | Single `npm install` at root; `client` and `server` packages |
| Frontend | React, Vite | SPA build and dev server |
| Styling | Tailwind CSS | Layout and components via utilities |
| Forms | React Hook Form, Zod | Client-side validation |
| HTTP client | Axios | Shared instance; API calls centralized under `client/src/services` |
| Backend | Express | REST API under `/api` |
| Persistence | Mongoose | Models, validation, timestamps |
| Errors | express-async-errors, middleware | Async failures return JSON `{ message }` |

## Layout

```
├── client/          # Vite + React
├── server/          # Express + Mongoose
└── package.json     # Workspace scripts: dev:client, dev:server
```