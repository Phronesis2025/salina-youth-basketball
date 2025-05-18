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

**Key Milestones**: Defined project goals, planned website structure, set up color scheme and design guidelines, prepared placeholder content (20-team dataset, Coaches Corner articles, t-shirt designs), built Homepage Hero section with functional CTAs, added News Carousel, Team Preview, Schedule Preview, and Values sections, created the Team Hub with filtering by age group, built the Team Sub-Page for detailed team information, deployed the site to Vercel, resolved build warnings and errors, fixed styling issues on Vercel, resolved permission issues during builds, added placeholder pages for routes, fixed logo and footer display issues, implemented logo shrinking on scroll, implemented the Join page with form submission, Stripe payment integration, Supabase storage, transitioned from PDF invoice generation to HTML invoice emails via Resend, completed the Schedules page with FullCalendar integration, updated Team Sub-Page with schedule tables and merchandise section, removed `animate-fadeIn` effect across all pages, started building the Shop page with a discussion.

## Files for Review

- src/components/homepage/Hero.tsx (completed with video background, CTAs, and styling)
- src/components/common/Navbar.tsx (updated with logo, right-aligned links, scroll effect, mobile menu)
- src/components/homepage/NewsCarousel.tsx (added carousel with static data and modals)
- src/components/homepage/TeamPreview.tsx (added team previews with links)
- src/components/homepage/SchedulePreview.tsx (added schedule previews with links, updated events, removed `animate-fadeIn`)
- src/components/homepage/ValuesSection.tsx (added values section)
- src/app/page.tsx (updated to include Hero, NewsCarousel, TeamPreview, SchedulePreview, and ValuesSection)
- src/lib/schedules/data.ts (added to store shared events and teams data)
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

**Date**: May 17, 2025, 06:41 PM CDT

**Progress**: Started building the Shop page in Phase 3: Build Website. Initiated the process with a discussion of the Shop page’s design, functionality, user journey, and integration requirements (e.g., Stripe checkout, success page, API routes). The Shop page will allow users to purchase team merchandise (t-shirts for Thunderhawks, Firebolts, Stingers, Lightning, Vipers, Raptors) with a Stripe checkout flow, styled to match the project’s design (`bg-[#002C51]` background, `bg-gray-900` cards, `bg-blue-600` buttons, uppercase headings, Rubik/Inter fonts). Resolved a build error by installing `typescript-eslint` dependencies and moving `events` and `teams` to `/src/lib/schedules/data.ts`. Remaining Phase 3 tasks include completing the Shop page and building the Tournaments page, plus fixing the `/join/status` redirect error. Next task: Discuss the Shop page design and functionality, then implement `/app/shop/page.tsx`.

**Blockers**: None.

**Errors**:

- [May 16, 2025]: No errors encountered during Schedules page implementation. Initial FullCalendar CSS import issues were resolved earlier by importing `main.css` in `/src/app/global.css`. Text overflow on mobile was fixed by hiding text in Month view and using colored blocks.
- [May 17, 2025]: Encountered `net::ERR_CONNECTION_REFUSED` error when loading merchandise images (e.g., `/public/images/team-thunderhawks-merch.jpg`) in `/app/teams/[id]/page.tsx`. Resolved by correcting the path to `/images/team-thunderhawks-merch.jpg` (removed `/public` prefix), as Next.js serves static files from the `public/` directory directly.
- [May 17, 2025]: Encountered build errors during `npm run build`: ESLint error (`Cannot find package 'typescript-eslint'`) and TypeScript type mismatch in `/app/schedules/page.ts`. Resolved the ESLint error by installing `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin`. Fixed the TypeScript error by moving `events` and `teams` exports to `/src/lib/schedules/data.ts` and updating imports in affected files.

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
  - [ ] Fix redirect error on `/join/status` to display success message and send emails
  - [ ] Test Resend email delivery for user and admin invoices
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
- [x] Resolve merchandise image loading issue (`net::ERR_CONNECTION_REFUSED`) in `/app/teams/[id]/page.tsx`
- [ ] Build Shop Page
  - [ ] Discuss design, functionality, user journey, and integration requirements
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

I’m ready to start building the Shop page (`/app/shop/page.tsx`). Before creating any code, I’d like to discuss the page’s design, functionality, user journey, and integration requirements. The Shop page should allow users to purchase team merchandise (e.g., t-shirts for Thunderhawks, Firebolts, Stingers, Lightning, Vipers, Raptors), with a Stripe checkout flow, styled to match the project’s design (dark theme, navy background, white text, red accents, Rubik/Inter fonts, minimalistic layout with bold CTAs).

Additional Context:

- The Shop page should display static product listings for team merchandise, using images like `/images/team-thunderhawks-merch.jpg` (already used in `/app/teams/[id]/page.tsx`).
- It should include a Stripe checkout flow, similar to the Join page (`/app/join/confirm/page.tsx`), but simplified for static products (no form, just a "Buy Now" button per product).
- The page must match the styling of other pages (e.g., `/app/teams/[id]/page.tsx`, `/app/schedules/page.tsx`): `bg-[#002C51]` background, `bg-gray-900` cards, blue buttons (`bg-blue-600`), uppercase text for headings, etc.
- Include navigation links (e.g., "Back to Homepage").
- Refer to `.cursor/rules/*.mdc` files for AI coding rules (e.g., `styling-rules.mdc` for Tailwind).
- Ensure the discussion aligns with the dark, sporty design and user-friendly journey.
- Use cost-minimal approaches (e.g., free tiers for Supabase/Vercel/Resend).
- Update `PROGRESS.md` with task completion and status after each response.

Please provide a detailed discussion of the Shop page’s design, functionality, user journey, and integration requirements (e.g., Stripe checkout, success page, API routes). Highlight any potential challenges or considerations before we proceed with coding. Let me know if you need specific files (e.g., `/app/join/confirm/page.tsx` for Stripe reference) or clarification.

## References

- FUTURE_IMPROVEMENTS.md
- README.md (to be finalized in Phase 5)
- Supabase Docs
- Stripe Docs
- Printful API Docs
- Resend Docs
- GitHub Repository (https://github.com/Phronesis2025/salina-youth-basketball)

## Notes on Updates

- **Phase 3 To-Do List**: Updated to reflect the start of the Shop page build, with the initial task being a discussion of its design and functionality.
- **Current State**: Updated to reflect the start of the Shop page build with a discussion, removing prior references to its completion.
- **Date and Time**: Updated to May 17, 2025, 06:41 PM CDT, as provided.
- **May 17, 2025 Update**:
  - Started building the Shop page with a discussion of its design, functionality, user journey, and integration requirements.
