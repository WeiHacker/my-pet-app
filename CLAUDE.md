# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
"My Pet App" is a full-stack pet management system designed to help pet owners track and manage their pets' daily lives, health, and reminders.

## Project Structure
- `backend/`: Node.js Express API with TypeScript. Follows a Controller-Service-Model architecture.
- `frontend/`: Vue 3 application with TypeScript, Vite, Pinia, and Element Plus.
- `database/`: Contains `init.sql` for MySQL 8.0 schema initialization.
- `shared/`: (Placeholder) For shared TypeScript types and utility functions across frontend and backend.

## Common Commands

### Backend (`/backend`)
- **Install**: `npm install`
- **Development**: `npm run dev` (uses `ts-node-dev`)
- **Build**: `npm run build` (compiles to `/dist`)
- **Start**: `npm run start` (runs compiled code)
- **Test**: `npm run test` (runs Jest tests)
- **Lint**: `npm run lint` (runs ESLint)

### Frontend (`/frontend`)
- **Install**: `npm install`
- **Development**: `npm run dev` (starts Vite dev server)
- **Build**: `npm run build` (compiles with `vue-tsc` and Vite)
- **Preview**: `npm run preview` (previews production build locally)
- **Lint**: `npm run lint` (runs ESLint with auto-fix)

### Database
- **Initialize**: `mysql -u root -p < database/init.sql`

## Code Architecture & Conventions

### Backend
- **Architecture**: Controller -> Service -> Model.
  - `controllers/`: Handles HTTP requests and input validation (using Zod).
  - `services/`: Contains core business logic.
  - `models/`: Interacts with MySQL database via `mysql2`.
  - `routes/`: Defines API endpoints (versioned under `/api/v1`).
- **Validation**: Uses `zod` for request body and parameter validation.
- **Authentication**: JWT-based. Middleware in `middlewares/auth.ts`.
- **Error Handling**: Centralized error handling middleware.

### Frontend
- **State Management**: Uses Pinia (`stores/`).
- **API Interaction**: Centralized Axios instance in `api/`.
- **UI Framework**: Element Plus for components and layout.
- **Type Safety**: Strong TypeScript usage throughout components and API definitions.

## Environment Setup
- **Backend**: Requires `.env` file (copied from `.env.example`). Needs `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, and `JWT_SECRET`.
- **Frontend**: Default Vite configuration connects to backend on `http://localhost:3000`.
