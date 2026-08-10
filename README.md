# Prerana

**Prerana** is an AI-powered learning platform that delivers personalized, interactive study experiences for students, teachers, parents, and admins.

## Overview

Prerana reimagines how learners engage with their studies. It combines AI-driven assistance, structured subject and chapter content, smart assessments, and detailed progress tracking in one cohesive product.

Designed for **students** who learn, **teachers** who author and guide, **parents** who stay informed, and **admins** who govern the platform, Prerana turns every study session into a guided, measurable, and adaptive journey.

## Features

Major planned features (implementation is ongoing):

- **AI Studio** — conversational AI tutor that helps learners understand any topic.
- **Smart Assessments** — auto-scored quizzes and exams with detailed result reports.
- **Subjects** — an organized catalog of subjects with rich descriptions.
- **Chapters** — structured lessons with objectives, activities, and reading progress.
- **Progress Tracking** — streaks, mastery levels, and per-subject analytics.
- **AI Library** — a searchable resource library with AI-assisted discovery.
- **Flow Diagram Generator** — generate visual concept/flow diagrams from study content.
- **Adaptive Learning** — content and practice that adapt to each learner's performance.

## Tech Stack

### Frontend

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **shadcn/ui** (design system)
- **Framer Motion**
- **TanStack Query**

### Backend

- **Node.js**
- **Express**
- **Prisma**
- **PostgreSQL**

## Project Structure

```
Prerana/
├── Frontend/          # React + Vite + TypeScript application
│   ├── src/           # application source
│   └── docs/          # Phase 2 architecture & planning documentation
├── Backend/           # Node.js + Express + Prisma API
└── .gitignore         # root ignore rules
```

## Getting Started

### Prerequisites

- Node.js (18+)
- npm
- PostgreSQL (for the backend)

### Installation

```bash
# Install frontend dependencies
cd Frontend
npm install

# Install backend dependencies
cd ../Backend
npm install
```

### Running Frontend

```bash
cd Frontend
npm run dev
```

The Vite dev server runs at `http://localhost:5173` and proxies API calls to the backend base URL configured in `Frontend/.env` (`VITE_API_BASE_URL`, defaults to `http://localhost:5000/api`).

### Running Backend

```bash
cd Backend
cp .env.example .env   # configure DATABASE_URL and other variables
npm run prisma:migrate # apply database migrations
npm run dev
```

The API runs at `http://localhost:5000`.

### Production Build

```bash
cd Frontend
npm run build          # type-check + production bundle (outputs to dist/)
npm run preview        # preview the production build locally
```

## Architecture

The product architecture is documented in the Phase 2 planning documents under [`Frontend/docs/`](Frontend/docs/):

- **Route Architecture** — full URL hierarchy, route zones, guards, and role visibility.
- **Navigation Architecture** — desktop, tablet, and mobile navigation model.
- **Feature Architecture** — the feature modules, ownership, and dependency rules.
- **Folder Architecture** — scalable folder layout and placement guide.
- **API Boundaries** — the future frontend service layer contract.
- **User Roles, Learning Journey, User Flows** — information architecture.

See the [documentation index](Frontend/docs/README.md) for a complete reading order.

## Development Principles

- **Feature-first architecture** — the app is organized into self-contained feature modules that own their UI, hooks, and services.
- **Reusable Design System** — a shared shadcn/ui-based design system keeps every screen visually consistent; components are never recreated.
- **Type Safety** — strict TypeScript end-to-end, with Zod schemas for form and API validation.
- **Accessibility** — keyboard-operable, focus-managed, and semantics-first UI.
- **Scalability** — lazy-loaded routes, colocated modules, and explicit dependency boundaries keep the codebase growing cleanly.

## Current Progress

```
✅ Phase 0 — Project Setup
✅ Phase 1 — Design System
✅ Phase 2 — Product Architecture & Information Architecture
⬜ Landing Page
⬜ Authentication
⬜ Dashboard
⬜ Subjects
⬜ Chapters & Lessons
⬜ AI Studio
⬜ Assessments
⬜ Progress Tracking
⬜ Library
⬜ Profile & Settings
⬜ Teacher Workspace
⬜ Admin Console
```
