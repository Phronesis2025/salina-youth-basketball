# Salina Youth Basketball Club Website

## Project Overview

**Purpose**: A custom-built, mobile-first website for the Salina Youth Basketball Club to showcase teams, manage registrations, and engage parents, players, and external teams in central Kansas. Features include team schedules, tournament signups, merchandise sales, a Coaches Corner with AI-generated resources, and a Parent Portal, all with a sporty, cutting-edge, minimalistic dark theme.

**Tech Stack**:

- **Frontend**: Next.js (React), Tailwind CSS
- **Backend**: Supabase (auth, PostgreSQL, storage)
- **Payments**: Stripe
- **Fulfillment**: Printful (print-on-demand for t-shirts)
- **UI Libraries**: Swiper.js (carousel), FullCalendar (schedules)
- **Hosting**: Vercel
- **Development**: Cursor (AI code editor)
- **Email**: Resend (transactional emails)

**Design**:

- Dark theme matching the club's logo
- **Primary Colors**: Navy (#1C2526), white (#FFFFFF), red (#D91E18)
- **Font**: Rubik (body), Inter (headings)
- **Layout**: Clean, minimalistic, with bold CTAs and card-based sections
- **Usability**: User-friendly for parents (register, view schedules, buy t-shirts), external teams (tournament signups), and coaches (update schedules), with a simple journey: explore club, register, manage team info.

**Cost Goal**: Minimal, leveraging free tiers (Supabase: 500 MB database, Vercel: Hobby plan, Stripe/Printful: pay-per-use, Resend: 100 emails/day) and open-source tools. Target budget: $20–$30/month.

**Documentation**: This file tracks progress, tasks, errors, and rules, shared with Grok in new conversation windows to maintain continuity across multi-session development in /salina-youth-basketball.

## Progress Summary

- **Phase 1 (Define Goal and Audience)**: Completed. Defined purpose, audience (parents, external teams), goals (streamline registrations, showcase teams), and design (dark theme, navy/white/red).
- **Phase 2 (Plan Content and Structure)**: Completed. Created sitemap, navigation, and page content (Homepage, Team Hub, Coaches Corner, etc.), with placeholder content (values, articles, t-shirt designs).
- **Phase 3 (Build Website)**: In Progress (Schedules, Shop, and Tournaments pages remaining).
- **Phase 4 (Testing and Deployment)**: Not started.
- **Phase 5 (Polish and Iteration)**: Not started.

**Key Milestones**: Defined project goals, planned website structure, set up color scheme and design guidelines, prepared placeholder content (20-team dataset, Coaches Corner articles, t-shirt designs), built Homepage Hero section with functional CTAs, added News Carousel, Team Preview, Schedule Preview, and Values sections, created the Team Hub with filtering by age group, built the Team Sub-Page for detailed team information, deployed the site to Vercel, resolved build warnings and errors, fixed styling issues on Vercel, resolved permission issues during builds, added placeholder pages for routes, fixed logo and footer display issues, implemented logo shrinking on scroll, implemented the Join page with form submission, Stripe payment integration, Supabase storage, and transitioned from PDF invoice generation to HTML invoice emails via Resend.

## Files for Review

- src/components/homepage/Hero.tsx (completed with video background, CTAs, and styling)
- src/components/common/Navbar.tsx (updated with logo, right-aligned links, scroll effect, mobile menu)
- src/components/homepage/NewsCarousel.tsx (added carousel with static data and modals)
- src/components/homepage/TeamPreview.tsx (added team previews with links)
- src/components/homepage/SchedulePreview.tsx (added schedule previews with links)
- src/components/homepage/ValuesSection.tsx (added values section)
- src/app/page.tsx (updated to include Hero, NewsCarousel, TeamPreview, SchedulePreview, and ValuesSection)
- app/teams/page.tsx (added Team Hub with team list and age group filter)
- app/teams/[id]/page.tsx (added Team Sub-Page with detailed team information)
- app/signup/page.tsx (added placeholder page)
- app/schedules/page.tsx (added placeholder page)
- app/shop/page.tsx (added placeholder page)
- app/tournaments/page.tsx (added placeholder page)
- app/join/page.tsx (completed with registration form, payment integration)
- app/join/confirm/page.tsx (completed with payment confirmation and Stripe integration)
- app/join/status/page.tsx (implemented with payment status display and email invoice confirmation, pending redirect fix)
- pages/api/create-join-request.ts (implemented for creating join requests in Supabase)
- pages/api/send-email.ts (implemented with Resend for HTML invoice emails)
- pages/api/get-join-request.ts (implemented for fetching join request data)
- pages/api/update-join-request.ts (implemented for updating join request status)

## Current State

**Date**: May 16, 2025, 07:33 AM CDT

**Progress**: Continued Phase 3: Build Website. The Join page (/join, /join/confirm, /join/status) is implemented with form submission, Stripe payment integration, Supabase storage, and transitioned from PDF invoice generation to HTML invoice emails sent via Resend’s free tier (100 emails/day). The payment flow works locally, storing join requests in Supabase (e.g., ID: 12, `stripe_payment_id`, `payment_status: completed`). However, after payment, `/join/status` displays “Invalid payment status or join request ID” due to missing `status` or `joinRequestId` URL parameters in the redirect from `/join/confirm`. The "Join Team" button in `Navbar.tsx` correctly navigates to `/join`, but the redirect error persists. Resend integration is set up (`RESEND_API_KEY`, `ADMIN_EMAIL` in `.env.local`), but email delivery hasn’t been fully tested due to the redirect issue. Previous build issues (e.g., invalid revalidate export, missing `eslint-plugin-next`, TypeScript errors, PDF timeout) were resolved by updating configurations, installing dependencies, and switching to email invoices. The project is deployed at https://wcs-three.vercel.app/, but the Join page functionality needs to be fixed and verified on Vercel.

**Blockers**:

- Persistent “Invalid payment status or join request ID” error on `/join/status` due to missing URL parameters (`status`, `joinRequestId`) in the redirect from `/join/confirm`.
- Need to test Resend email delivery (user and admin HTML invoices) after resolving the redirect issue.
- Potential Next.js version mismatch resolved by updating to 15.3.2, but needs verification.

**Environment**: Local folder (C:\Users\phron\OneDrive\Documents\HTML CSS JS Projects\World Class Sports\salina-youth-basketball); GitHub (https://github.com/Phronesis2025/salina-youth-basketball); Supabase (created); Vercel (deployed); Resend (API key set); Cursor (paid plan assumed).

**Errors**:

- [May 14, 2025]: Build failed with Invalid revalidate value error in src/app/join/status/page.tsx due to a misinterpreted revalidate export, and missing eslint-plugin-next package in eslint.config.mjs. **Resolved** by removing invalid export and installing `eslint-plugin-next`.
- [May 14, 2025]: `AbortError: signal is aborted without reason` on `/join/status` due to `/api/generate-invoice` taking ~15s, exceeding the 15s timeout in `fetchWithTimeout`. **Resolved** by transitioning to HTML invoice emails via Resend, removing PDF generation (`pdfkit`, `@types/pdfkit`, `blob-stream`), and deleting `/api/generate-invoice.ts`.
- [May 15, 2025]: “Invalid payment status or join request ID” on `/join/status` after payment, indicating missing `status` or `joinRequestId` URL parameters in the redirect from `/join/confirm`. **Ongoing**.
  - **Solutions Tried**:
    - Updated `/join/confirm/page.tsx` to include `joinRequestId` in `router.push` (`/join/status?status=success&paymentId=...&joinRequestId=...`), added logging for `formData`, `joinRequestId`, and redirect, validated `sessionStorage`, and used `encodeURIComponent` for URL parameters.
    - Updated `/api/create-join-request.ts` with logging to confirm `joinRequestId` is returned.
    - Enhanced `/join/status/page.tsx` with specific error messages (“Missing payment status”, “Missing join request ID”) and logging for `searchParams`.
    - Updated `package.json` to Next.js 15.3.2 to match running version, addressing potential navigation issues.
    - Verified `Navbar.tsx` “Join Team” button navigates to `/join` correctly.
    - Added Resend integration (`/api/send-email.ts`) for HTML invoice emails, set up `RESEND_API_KEY` and `ADMIN_EMAIL`, but email delivery untested due to redirect error.
  - **Remaining**: Debug redirect failure, confirm `joinRequestId` in `/join/confirm`, test email delivery.

## To-Do List

- [x] Build Homepage
  - [x] Create Hero section with video and CTAs
  - [x] Fix shadcn/ui Button rendering issue in Hero section
  - [x] Add News Carousel with modals
  - [x] Add team/schedule previews and other sections
- [x] Build Team Hub
- [x] Build Team Sub-Page
- [x] Build Join Page
  - [x] Create Join page with registration form
  - [x] Add payment integration with Stripe
  - [x] Implement Supabase storage for registration data
  - [x] Transition from PDF invoice generation to HTML invoice emails via Resend
  - [ ] Fix redirect error on `/join/status` to display success message and send emails
  - [ ] Test Resend email delivery for user and admin invoices
- [ ] Deploy updates to Vercel with Join page working
- [ ] Commit changes to GitHub
- [ ] Update PROGRESS.md with Phase 3 status
- [ ] Build Schedules Page
  - [ ] Create app/schedules/page.tsx with FullCalendar integration
  - [ ] Style the page to match the project's design
  - [ ] Add navigation links (e.g., "Back to Homepage")
  - [ ] Test locally to ensure functionality and styling
- [ ] Build Shop Page
  - [ ] Create app/shop/page.tsx with static product listings
  - [ ] Implement a basic checkout flow with Stripe
  - [ ] Style the page to match the project's design
  - [ ] Add navigation links (e.g., "Back to Homepage")
  - [ ] Test locally to ensure functionality and styling
- [ ] Build Tournaments Page
  - [ ] Create app/tournaments/page.tsx with static tournament listings
  - [ ] Implement a signup form for external teams with Supabase storage
  - [ ] Style the page to match the project's design
  - [ ] Add navigation links (e.g., "Back to Homepage")
  - [ ] Test locally to ensure functionality and styling

## Phase 4: Testing and Deployment

**Goal**: Test functionality and deploy the site.

- [ ] Test end-to-end flows (registration, schedule access, t-shirt purchase)
- [ ] Optimize for mobile and desktop
- [ ] Secure API routes (Supabase Auth, Stripe)
- [ ] Deploy to Vercel
- [ ] Commit changes to GitHub
- [ ] Update PROGRESS.md with Phase 4 status

## Phase 5: Polish and Iteration

**Goal**: Refine based on feedback and optimize.

- [ ] Improve UI/UX (e.g., loading states, error messages)
- [ ] Optimize performance (e.g., lazy load galleries)
- [ ] Incorporate feedback (e.g., from brother)
- [ ] Finalize documentation (README.md)
- [ ] Deploy final updates to Vercel
- [ ] Commit changes to GitHub
- [ ] Update PROGRESS.md with Phase 5 status

## Future Improvements Implemented

- Fixed TypeScript and build errors
- Resolved missing module dependencies
- Improved configuration setup
- Enhanced build process reliability
- Added proper type definitions
- Optimized CSS configuration
- Transitioned from PDF invoice generation to HTML invoice emails via Resend

## Prompts

### Start New Conversation with Grok

Hi Grok, I'm continuing work on the Salina Youth Basketball Club website in a new conversation window. Please review the attached PROGRESS.md file for the project's context, progress, and tasks. The site is a mobile-first, custom-built web app for managing youth basketball teams, using Next.js, Tailwind CSS, Supabase, Stripe, Printful, Resend, Vercel, and Cursor. The design is a dark theme (navy #1C2526, white #FFFFFF, red #D91E18; Rubik/Inter fonts), with a sporty, minimalistic layout for parents, teams, and coaches.

PROGRESS.md Contents:

[See attached PROGRESS.md]

Current Task:

Fix the “Invalid payment status or join request ID” error on `/join/status` caused by missing `status` or `joinRequestId` URL parameters in the redirect from `/join/confirm`. Test Resend email delivery for user and admin HTML invoices. Deploy updates to Vercel with the Join page fully functional.

Additional Context:

- The "Join Team" button in `Navbar.tsx` correctly navigates to `/join`.
- `/join/confirm/page.tsx` is updated to include `joinRequestId` in the redirect, with logging and `encodeURIComponent`.
- `/api/create-join-request.ts` returns `joinRequestId` with logging.
- `/join/status/page.tsx` includes debugging logs and specific error messages.
- Resend is set up (`RESEND_API_KEY`, `ADMIN_EMAIL` in `.env.local`), but email delivery is untested.
- Next.js updated to 15.3.2 to match running version.
- Refer to .cursor/rules/\*.mdc files for AI coding rules (e.g., styling-rules.mdc for Tailwind).
- Ensure code aligns with the dark, sporty design and user-friendly journey.
- Use cost-minimal approaches (e.g., free tiers for Supabase/Vercel/Resend).
- Update PROGRESS.md with task completion and status after each response.

Please provide the requested code, review, or guidance to resolve the redirect error and test email delivery. Suggest how to update PROGRESS.md to reflect this work. Provide any necessary file updates, and let me know if you need specific files (e.g., `/app/join/page.tsx`) or clarification.

## References

- FUTURE_IMPROVEMENTS.md
- README.md (to be finalized in Phase 5)
- Supabase Docs
- Stripe Docs
- Printful API Docs
- Resend Docs
- GitHub Repository (https://github.com/Phronesis2025/salina-youth-basketball)

## Notes on Updates

- **Phase 3 To-Do List**: Updated to include the remaining pages (Schedules, Shop, Tournaments) as tasks, with detailed steps and explanations for each.
- **Current State**: Kept the latest progress update about the Join page implementation and the build failure, as the deployment to Vercel with the Join page working correctly is still pending.
- **Date and Time**: Updated to May 16, 2025, 07:33 AM CDT, as provided.
- **May 16, 2025 Update**:
  - Transitioned from PDF invoice download to HTML invoice emails via Resend to resolve `AbortError` timeout issue with `/api/generate-invoice`.
  - Implemented Resend integration in `/api/send-email.ts`, updated `/join/confirm/page.tsx` to pass `joinRequestId`, and modified `/join/status/page.tsx` to show a success message with `parent_email` fetched via `/api/get-join-request.ts`.
  - Removed PDF dependencies (`pdfkit`, `@types/pdfkit`, `blob-stream`) and deleted `/api/generate-invoice.ts`.
  - Persistent “Invalid payment status or join request ID” error on `/join/status` due to missing `status` or `joinRequestId` URL parameters.
  - Solutions tried include updating redirect logic, adding logging, validating `sessionStorage`, updating Next.js to 15.3.2, and verifying `Navbar.tsx` navigation.
  - Added tasks to fix the redirect error and test Resend email delivery in the To-Do List.
  - Confirmed `Navbar.tsx` “Join Team” button navigates correctly to `/join`, preserving user updates (scroll effect, mobile menu, styling).
