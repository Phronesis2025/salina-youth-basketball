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
- **Phase 3 (Build Website)**: In Progress (Shop and Tournaments pages remaining).
- **Phase 4 (Testing and Deployment)**: Not started.
- **Phase 5 (Polish and Iteration)**: Not started.

**Key Milestones**: Defined project goals, planned website structure, set up color scheme and design guidelines, prepared placeholder content (20-team dataset, Coaches Corner articles, t-shirt designs), built Homepage Hero section with functional CTAs, added News Carousel, Team Preview, Schedule Preview, and Values sections, created the Team Hub with filtering by age group, built the Team Sub-Page for detailed team information, deployed the site to Vercel, resolved build warnings and errors, fixed styling issues on Vercel, resolved permission issues during builds, added placeholder pages for routes, fixed logo and footer display issues, implemented logo shrinking on scroll, implemented the Join page with form submission, Stripe payment integration, Supabase storage, transitioned from PDF invoice generation to HTML invoice emails via Resend, completed the Schedules page with FullCalendar integration, updated Team Sub-Page with schedule tables and merchandise section, removed `animate-fadeIn` effect across all pages.

## Files for Review

- src/components/homepage/Hero.tsx (completed with video background, CTAs, and styling)
- src/components/common/Navbar.tsx (updated with logo, right-aligned links, scroll effect, mobile menu)
- src/components/homepage/NewsCarousel.tsx (added carousel with static data and modals)
- src/components/homepage/TeamPreview.tsx (added team previews with links)
- src/components/homepage/SchedulePreview.tsx (added schedule previews with links, updated events, removed `animate-fadeIn`)
- src/components/homepage/ValuesSection.tsx (added values section)
- src/app/page.tsx (updated to include Hero, NewsCarousel, TeamPreview, SchedulePreview, and ValuesSection)
- app/teams/page.tsx (added Team Hub with team list and age group filter)
- app/teams/[id]/page.tsx (added Team Sub-Page with detailed team information, updated schedule tables, added merchandise section, removed `animate-fadeIn`)
- app/signup/page.tsx (added placeholder page)
- app/schedules/page.tsx (completed with FullCalendar, filters, "Today's Events" card, removed `animate-fadeIn`)
- app/shop/page.tsx (added placeholder page)
- app/tournaments/page.tsx (added placeholder page)
- app/join/page.tsx (completed with registration form, payment integration, removed `animate-fadeIn`)
- app/join/confirm/page.tsx (completed with payment confirmation and Stripe integration, removed `animate-fadeIn`)
- app/join/status/page.tsx (implemented with payment status display and email invoice confirmation, pending redirect fix)
- pages/api/create-join-request.ts (implemented for creating join requests in Supabase)
- pages/api/send-email.ts (implemented with Resend for HTML invoice emails)
- pages/api/get-join-request.ts (implemented for fetching join request data)
- pages/api/update-join-request.ts (implemented for updating join request status)

## Current State

**Date**: May 17, 2025, 05:44 PM CDT

**Progress**: Completed the loose ends for the Schedules section in Phase 3: Build Website. Synced events in `SchedulePreview.tsx` and team sub-pages using the `events` array from `/app/schedules/page.tsx`, mapping team logos (Thunderhawks, Firebolts, Stingers, Lightning, Vipers, Raptors) and using Warriors as the opponent. Styled Join page fields to match Schedules page dropdowns (`bg-blue-600`, `rounded-md`, normal case), removed hover effects across both pages, and split credit card fields in `/join/confirm/page.tsx` into a grid layout on mobile. Updated `/app/teams/[id]/page.tsx` by removing the roster section, splitting the schedule into two tables (practices and games) with the next 7 events each, replacing "Opponent" with "Start Time" in the practices table, and adding a Team Apparel section with merchandise images linking to `/shop`. Removed the `animate-fadeIn` effect and associated `style` attributes from all pages (`/app/teams/[id]/page.tsx`, `/app/schedules/page.tsx`, `SchedulePreview.tsx`, `/app/join/page.tsx`, `/app/join/confirm/page.tsx`) to improve page load performance. Encountered a `net::ERR_CONNECTION_REFUSED` error when loading merchandise images in `/app/teams/[id]/page.tsx`, resolved by correcting the image path (removed `/public` prefix). Remaining Phase 3 tasks include building the Shop and Tournaments pages. Next task: Build the Shop page with static product listings and Stripe checkout.

**Blockers**: None.

**Errors**:

- [May 16, 2025]: No errors encountered during Schedules page implementation. Initial FullCalendar CSS import issues were resolved earlier by importing `main.css` in `/src/app/global.css`. Text overflow on mobile was fixed by hiding text in Month view and using colored blocks.
- [May 17, 2025]: Encountered `net::ERR_CONNECTION_REFUSED` error when loading merchandise images (e.g., `/public/images/team-thunderhawks-merch.jpg`) in `/app/teams/[id]/page.tsx`. Resolved by correcting the path to `/images/team-thunderhawks-merch.jpg` (removed `/public` prefix), as Next.js serves static files from the `public/` directory directly.

**To-Do List**

- [x] Build Homepage
  - [x] Create Hero section with video and CTAs
  - [x] Fix shadcn/ui Button rendering issue in Hero section
  - [x] Add News Carousel with modals
  - [x] Add team/schedule previews and other sections
  - [x] Remove `animate-fadeIn` from homepage sections
- [x] Build Team Hub
- [x] Build Team Sub-Page
- [x] Build Join Page
  - [x] Create Join page with registration form
  - [x] Add payment integration with Stripe
  - [x] Implement Supabase storage for registration data
  - [x] Transition from PDF invoice generation to HTML invoice emails via Resend
  - [x] Fix redirect error on `/join/status` to display success message and send emails
  - [x] Test Resend email delivery for user and admin invoices
- [x] Build Schedules Page
  - [x] Create app/schedules/page.tsx with FullCalendar integration
  - [x] Style the page to match the project's design
  - [x] Add navigation links (e.g., "Back to Homepage")
  - [x] Test locally to ensure functionality and styling
  - [x] Add dropdown filters (Boys/Girls, Team Name, Practice/Game/Tournament)
  - [x] Use background colors for event types (Games: red, Practices: blue, Tournaments: purple)
  - [x] Hide text in Month view on mobile, show only colors
  - [x] Add "Today's Events" card with dynamic current date
  - [x] Tie up loose ends: sync events in SchedulePreview and team pages, style Join page fields, split credit card fields on mobile, remove hover effects
- [x] Deploy updates to Vercel with Join page working
- [x] Commit changes to GitHub
- [x] Update PROGRESS.md with Phase 3 status
- [x] Remove `animate-fadeIn` effect from all pages
- [ ] Resolve merchandise image loading issue (`net::ERR_CONNECTION_REFUSED`) in `/app/teams/[id]/page.tsx`
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
- **Date and Time**: Updated to May 17, 2025, 05:44 PM CDT, as provided.
- **May 17, 2025 Update**:
  - Completed loose ends for the Schedules section: synced events in `SchedulePreview.tsx` and team sub-pages, styled Join page fields, split credit card fields on mobile, removed hover effects.
  - Updated `/app/teams/[id]/page.tsx`: removed roster section, split schedule into two tables (practices and games), replaced "Opponent" with "Start Time" in practices table, added Team Apparel section with merchandise images.
  - Removed `animate-fadeIn` effect and associated `style` attributes from all pages (`/app/teams/[id]/page.tsx`, `/app/schedules/page.tsx`, `SchedulePreview.tsx`, `/app/join/page.tsx`, `/app/join/confirm/page.tsx`) to improve page load performance.
  - Resolved `net::ERR_CONNECTION_REFUSED` error for merchandise images by correcting the path (removed `/public` prefix).
  - Added task to resolve any remaining merchandise image loading issues.
