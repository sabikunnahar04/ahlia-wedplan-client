<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# WedPlan - Project Status & Development Roadmap

## 1. Project Overview

- **Project name:** WedPlan
- **Project purpose:** Wedding Planning Platform (frontend client; backend planned).
- **Assignment scope:** Role-based wedding planning platform with Customer, Vendor and Admin dashboards; service browsing/management; booking system; subscriptions (Stripe); image upload (ImgBB); backend REST API with JWT auth.

### Technologies (confirmed installed / used in source)
- Next.js 16.4.6 (App Router) — `package.json`, `src/app`
- React 19.3.0
- TypeScript 5 — `tsconfig.json`
- Tailwind CSS 4.3.3 — `src/app/globals.css`
- ShadCN UI — `components.json`, `src/components/ui/*` (style `base-nova`, `@base-ui/react`)
- Better Auth 1.7.26 — `src/lib/auth.ts`, `src/lib/auth-client.ts`, `src/app/api/auth/[...all]/route.ts`
- MongoDB driver 7.9.0 + `@better-auth/mongo-adapter` — `src/lib/auth.ts`
- lucide-react, sonner, date-fns, react-day-picker, next-themes, class-variance-authority, tw-animate-css

### Technologies (planned / required by assignment, not yet installed)
- Express.js backend (no backend folder present)
- JWT verification (backend) — not implemented
- Stripe Checkout + webhook — not present
- ImgBB image upload — not present
- Framer Motion / Motion — not present
- HeroUI — not used (ShadCN UI is used instead)

### Architecture
- **Frontend:** Next.js App Router under `src/app`; shared UI in `src/components/ui`; auth helpers in `src/lib`; types in `src/types`.
- **Backend:** Not implemented yet. Planned: separate Node.js/Express.js service with MongoDB and JWT-based auth (see Section 6).

## 2. Completed Work

### Fully completed
- Next.js project setup (App Router, TypeScript, Tailwind, ESLint, Turbopack).
- ShadCN UI setup (`components.json`, `src/components/ui/*`).
- Better Auth configuration (`src/lib/auth.ts`, `src/lib/auth-client.ts`, `src/app/api/auth/[...all]/route.ts`) using MongoDB adapter and DB `wedplan`.
- Sign Up (`src/components/auth/SignupForm.tsx`, `src/app/signup/page.tsx`) with customer/vendor role selection.
- Sign In (`src/components/auth/SigninForm.tsx`, `src/app/signin/page.tsx`).
- Sign Out (`src/components/auth/Signout.tsx`).
- Navbar + dropdown menu (`src/components/ui/shared/Navbar.tsx`, `NavbarActions.tsx`).
- Dashboard layout (`src/app/(dashboard)/layout.tsx`) — session check, redirect to `/signin` when unauthenticated.
- Dashboard Sidebar (`src/components/dashboard/shared/DashboardSidebar.tsx`).
- Role-based sidebar navigation (customer/vendor/admin link sets).
- Dashboard pages: `/dashboard` (role redirect), customer overview + bookings, vendor overview + services + add + requests + subscription, admin overview + users + services + transactions.
- Type definitions (`src/types/index.ts`: `TUserRole`, `TUser`).

### Partially completed
- Role redirect after login: `SigninForm` redirects to `/`; role-based redirect exists only at `/dashboard`. (Incomplete vs assignment.)
- Frontend route protection: dashboard layout verifies session only; does not enforce role per route.
- Better Auth role field allows only `customer`/`vendor` via signup (`src/lib/auth.ts`); `admin` must be assigned securely (manual DB update). Matches requirement.
- Home page is default Next.js template (`src/app/page.tsx`) — not wedding-themed.
- Navbar links to `/services` and `/profile`, which are not implemented.
- All dashboard pages are static placeholders (no backend data integration).

## 3. Current Project Structure

- `src/app/layout.tsx` — root layout, renders Navbar, Toaster.
- `src/app/page.tsx` — home page (default template).
- `src/app/globals.css` — Tailwind/ShadCN theme.
- `src/app/signin/page.tsx`, `src/app/signup/page.tsx` — auth pages.
- `src/app/api/auth/[...all]/route.ts` — Better Auth route handler.
- `src/app/(dashboard)/layout.tsx` — protected dashboard layout.
- `src/app/(dashboard)/dashboard/page.tsx` — redirects by role.
- `src/app/(dashboard)/dashboard/customer/*` — customer pages.
- `src/app/(dashboard)/dashboard/vendor/*` — vendor pages.
- `src/app/(dashboard)/dashboard/admin/*` — admin pages.
- `src/components/auth/*` — SigninForm, SignupForm, Signout.
- `src/components/ui/shared/Navbar.tsx`, `NavbarActions.tsx` — navbar + dropdown.
- `src/components/dashboard/shared/DashboardSidebar.tsx` — role-based sidebar.
- `src/components/ui/*` — ShadCN UI components.
- `src/lib/auth.ts`, `src/lib/auth-client.ts`, `src/lib/utils.ts`.
- `src/types/index.ts`.
- `src/hooks/use-mobile.ts`.
- `public/*` — default Next.js assets.
- `components.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.env`.

## 4. Incomplete Work

Not implemented (verified against source):
- Backend setup (no Express project).
- MongoDB integration for backend data (only used by Better Auth).
- Backend authentication / JWT verification.
- Role-based authorization (backend).
- Services management (CRUD, approval, filtering, search).
- Booking system (create, list, status changes, cancel).
- Booking status management (Pending/Accepted/Rejected/Cancelled).
- Admin management (users, services, bookings, transactions).
- Stripe subscription (Free/Premium) and webhook verification.
- Image upload (ImgBB).
- Dashboard data integration (all pages static).
- Frontend service browsing/search/filter/details pages.
- Frontend role-based route protection.
- Role-based redirect after login.
- Testing and deployment.

## 5. Role-Based Dashboard Requirements

### Customer Dashboard
- Customer Overview.
- My Bookings (list, details, status tracking).
- Booking statuses: Pending, Accepted, Rejected, Cancelled.
- Cancel only Pending bookings.
- Access only own bookings.
- Browse/search wedding services; filter by category and location; view details.
- Book approved & active services; cannot book own service.
- No Vendor/Admin management access.

### Vendor Dashboard
- Vendor Overview.
- My Services; Add Service; Edit own services; Delete own services.
- Manage Booking Requests (accept/reject).
- Manage Free/Premium subscriptions.
- Free plan: max 3 active services. Premium: unlimited active services + Premium badge.
- Manage only own services; no other vendor's services; no Admin features.

### Admin Dashboard
- Admin Overview.
- Manage Users (customers/vendors).
- Manage Services (approve, reject, delete).
- Manage Bookings (view all).
- View Transactions.
- Access all customers, services, bookings.
- Admin cannot register via public Sign Up; assigned securely.

### Required Dashboard Pages
- `/dashboard` (role redirect), `/dashboard/customer`, `/dashboard/customer/bookings`.
- `/dashboard/vendor`, `/dashboard/vendor/services`, `/dashboard/vendor/services/add`, `/dashboard/vendor/requests`, `/dashboard/vendor/subscription`.
- `/dashboard/admin`, `/dashboard/admin/users`, `/dashboard/admin/services`, `/dashboard/admin/transactions`.

## 6. Backend Architecture and Setup Roadmap

Planned stack: Node.js, Express.js, MongoDB, JWT. (Do not create files yet; plan only.)

Planned steps:
1. Initialize backend project (separate folder/repo): `npm init`, install express, mongoose, dotenv, cors, jsonwebtoken (and cookie-parser if needed).
2. Configure environment variables (PORT, MONGO_URI, JWT_SECRET, etc.).
3. Connect MongoDB via Mongoose.
4. Create Express server with middleware (json, cors, error handler).
5. Organize routes, controllers, middleware, models per class pattern.
6. Connect frontend to backend (base URL, fetch/axios).
7. Implement APIs per assignment.

Planned structure (not yet created): `server/src/{config,models,routes,controllers,middleware,utils}`.

## 7. Authentication and Role-Based Access Control

### verifyToken Middleware (planned)
- Read JWT from Authorization header (Bearer).
- Verify signature/validity; reject missing/invalid/expired.
- Attach verified user to request; never trust frontend user info.
- Use existing Better Auth/JWT config appropriately after inspecting current auth.

### requireRole Middleware (planned)
- Reusable middleware accepting allowed role(s).
- Check verified user role; reject unauthorized.

### Authorization Rules
- Protect customer-only booking ops; vendor-only service/booking-request ops; admin-only user/service-approval ops.
- Admin accesses all; customers only own bookings; vendors only own services.
- Verify resource ownership on backend.
- Never trust role from frontend; never rely only on frontend route protection.

## 8. Frontend and Backend Integration (planned)

- Preserve Better Auth and role dashboards.
- Redirect after login by role: Customer→/dashboard/customer, Vendor→/dashboard/vendor, Admin→/dashboard/admin.
- Protect role-specific frontend routes.
- Connect dashboard pages to backend APIs.
- Keep frontend role checks and backend authorization consistent.
- Do not break Navbar, Sidebar, auth flows.

## 9. Services Management (planned)

- Browse approved & active services; search by name; filter by category/location; view details.
- Vendor add/edit/delete own services.
- Admin approve/reject/delete services.
- Only approved & active services bookable.
- Enforce Free plan limit of 3 active services; Premium unlimited.

## 10. Booking Management (planned)

- Customers book services (event date, event location, message).
- Secure assignment of customer/vendor info; prevent booking own service; prevent duplicate active bookings for same service+date.
- Statuses: Pending, Accepted, Rejected, Cancelled.
- Vendors accept/reject; customers cancel only Pending; customers access only own bookings; admin accesses all.

## 11. Subscription and Payment (planned)

- Stripe test Checkout; Free/Premium plans.
- Premium payment; verify via Stripe webhook.
- Only verified successful payments activate Premium.
- Save transactions in MongoDB.
- Never trust payment success from frontend only.

## 12. Image Upload (planned)

- ImgBB integration for service images (and profile images where required).
- Store image URLs in MongoDB; handle upload errors.

## 13. UI and Design Requirements

- Responsive mobile/tablet/desktop.
- Clean, simple wedding-themed UI.
- Reuse existing components/patterns; ShadCN where appropriate.
- Framer Motion/Motion where required; avoid unnecessary animations.

## 14. Testing and Deployment (pending)

- Test auth; Customer/Vendor/Admin access; backend JWT; role auth; ownership; services/bookings; Stripe checkout/webhook; responsive layouts.
- Deploy frontend & backend; configure production env vars.
- Prepare separate README for client and server repos.
- Never expose secrets/env vars.

## 15. Development Rules

### Keep Implementation Simple
- No over-engineering; beginner-friendly; simple readable code; no unnecessary libs; clean simple UI; reuse existing components/patterns; follow class style; no features beyond requirements.

### Preserve Existing Functionality
- Do not break auth or role dashboards; don't rewrite working code; preserve structure/config; inspect before changes.

### Development Workflow
- Don't implement all at once; follow roadmap step-by-step; complete/verify one task before next; wait for instruction before next task; don't modify unrelated files; explain changes in beginner-friendly language.

## 16. Immediate Next Task

- Backend setup with Express.js + MongoDB (not yet started).
- First implementation step (not executed): initialize the backend project (separate folder/repository), create `package.json`, install core dependencies (express, mongoose, dotenv, cors, jsonwebtoken), and configure the MongoDB connection + basic Express server. Wait for explicit instruction before proceeding.
