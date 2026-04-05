# Server

Express service exposing JSON REST endpoints for tasks. Mongoose persists documents. `express-async-errors` is loaded before route registration so rejected promises from async handlers flow to the error middleware.

## Requirements

- Node.js 24+ (`nvm use 24`)
- MongoDB instance and a valid `MONGODB_URI`

## Install

From the repository root:

```bash
npm install
```

## Configuration

From `server/`:

```bash
cp .env.example .env
```

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Listen port | `5001` |
| `MONGODB_URI` | Database connection string | `mongodb://127.0.0.1:27017/todos` or Atlas SRV URI |
| `NODE_ENV` | When set to `production`, generic text is returned for 500 responses instead of internal details | omit or `development` |

Do not commit `.env` (it is ignored by git).

## Commands

Development (file watching via nodemon):

```bash
npm run dev --workspace=server
```

From `server/`:

```bash
npm run dev
```

Production:

```bash
npm start --workspace=server
```

The app connects to MongoDB before accepting traffic and exits if the connection cannot be established.

## MongoDB

- **Atlas:** Create a cluster and database user, allow your client IP (or `0.0.0.0/0` only for non-production experimentation), then paste the connection string into `MONGODB_URI`.
- **Local:** Run `mongod` and point `MONGODB_URI` at something like `mongodb://127.0.0.1:27017/todos`.

## HTTP API

Base path: `/api`. Request bodies are JSON unless noted. Responses are JSON except `DELETE`, which returns `204` with an empty body.

| Method | Path | Body | Success |
|--------|------|------|---------|
| GET | `/api/todos` | — | `200` — array, newest first |
| POST | `/api/todos` | `{ "title": string, "description"?: string }` | `201` — created document |
| PUT | `/api/todos/:id` | `{ "title"?: string, "description"?: string }` | `200` — updated document |
| PATCH | `/api/todos/:id/done` | — | `200` — document with toggled `done` |
| DELETE | `/api/todos/:id` | — | `204` |

Errors: `{ "message": string }` with status `400`, `404`, or `500` as appropriate (e.g. missing title, unknown id, database failure).

Document fields: `_id`, `title`, `description` (optional), `done`, `createdAt`, `updatedAt` (Mongoose timestamps).

## Deployment notes

- CORS is open; narrow `origin` in production.
- There is no authentication or multi-tenant isolation.
- Validation combines route-level checks and Mongoose schema rules.
