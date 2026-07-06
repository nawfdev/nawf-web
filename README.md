# Portfolio

Personal portfolio site with a dashboard for managing blog posts, projects, about content, and contact info — all editable without touching code.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Drizzle ORM · MySQL · Auth.js (credentials login)

## Getting started

1. Start MySQL:
   ```bash
   docker compose up -d
   ```
2. Copy env vars and fill in the admin credentials:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies and push the schema:
   ```bash
   npm install
   npm run db:push
   npm run db:seed
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```
5. Sign in at [http://localhost:3000/login](http://localhost:3000/login) with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`, then manage content at `/dashboard`.

## Structure

- `src/app/(public)` — public site: home, projects, blog, contact
- `src/app/dashboard` — admin dashboard (protected by `src/proxy.ts`)
- `src/app/api` — REST endpoints backing the dashboard
- `src/db/schema.ts` — Drizzle schema (posts, projects, about, contact)
- `scripts/seed.ts` — creates the admin user and default content
