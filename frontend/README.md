# Mini Dashboard with API Connection

## Overview
Mini internal dashboard that lists leads and allows filtering by status, adding leads, and updating leads. Frontend uses React + TypeScript + Tailwind + Redux Toolkit + RTK Query. Backend is a simple Express server storing data in `db.json` via lowdb.

## Decisions / Rationale
- **RTK Query** used for caching, simple hooks and invalidation.
- **lowdb (JSON)** chosen as a quick, persistent mock DB to meet the assignment requirement; easy to replace with SQLite or Strapi.
- **Tailwind** for quick styling and responsive UI.

## Run locally
1. Backend:
   ```bash
   cd backend
   npm install
   npm run dev
   # server: http://localhost:4000
