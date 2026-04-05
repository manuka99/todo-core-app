# Server

Express API for the TODO app.

## Prerequisites

- Node.js 24+ (use `nvm use 24`)
- MongoDB (Atlas or local) — required when using the database layer

## Setup

From the repository root:

```bash
npm install
```

Copy environment variables:

```bash
cp .env.example .env
```

Edit `.env` and set `MONGODB_URI` when using the database layer.

## Run

Development (nodemon):

```bash
npm run dev --workspace=server
```

Or from `server/`:

```bash
npm run dev
```

Production:

```bash
npm start --workspace=server
```

## Environment variables

| Variable       | Description                    | Example                          |
|----------------|--------------------------------|----------------------------------|
| `PORT`         | HTTP port                      | `5000`                           |
| `MONGODB_URI`  | MongoDB connection string      | `mongodb://localhost:27017/todos` or Atlas URI |

## MongoDB

- **Atlas:** Create a cluster, add a database user, allow your IP (or `0.0.0.0/0` for dev), copy the connection string into `MONGODB_URI`.
- **Local:** Run `mongod` and use e.g. `mongodb://127.0.0.1:27017/todos`.

## Notes

- `/api` is mounted; REST routes for todos are not there yet.
- CORS is open for development; tighten for production as needed.
