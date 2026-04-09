# react-flow-2

This workspace now includes the same core backend stack pattern as better-t-stack:

- Next.js app in apps/web
- Express API server in apps/server
- Better Auth in packages/auth
- Prisma client and schema in packages/database
- tRPC router/context in packages/api
- Shared env validation in packages/env

## Setup

Install dependencies:

```bash
pnpm install
```

Start the local PostgreSQL service:

```bash
docker compose up -d db
```

Create local env files from the examples:

```bash
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env
```

The included Compose file starts PostgreSQL on `localhost:55432` to avoid common local port conflicts.

Update apps/server/.env with your real auth secret if needed.

Generate the Prisma client and push the schema:

```bash
pnpm db:generate
pnpm db:push
```

Start the workspace apps:

```bash
pnpm dev
```

The Express server runs on http://localhost:3000, the web app on http://localhost:3001, and the admin app on http://localhost:3002.

Stop the local database when you are done:

```bash
docker compose down
```

## Useful scripts

```bash
pnpm dev
pnpm dev:server
pnpm dev:web
pnpm typecheck
pnpm db:generate
pnpm db:push
pnpm db:migrate
pnpm db:studio
```

## Shared UI components

Add new shadcn-style primitives from the web app root:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Import shared UI components from the workspace package:

```tsx
import { Button } from "@workspace/ui/components/button";
```
