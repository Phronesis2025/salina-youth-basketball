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
- **Phase 3 (Build Website)**: In Progress (Tournaments page remaining).
- **Phase 4 (Testing and Deployment)**: In Progress (deployed to Vercel, testing in progress).
- **Phase 5 (Polish and Iteration)**: Not started.

**Key Milestones**: Defined project goals, planned website structure, set up color scheme and design guidelines, prepared placeholder content (20-team dataset, Coaches Corner articles, t-shirt designs), built Homepage Hero section with functional CTAs, added News Carousel, Team Preview, Schedule Preview, Values, and Coaches Corner sections, created the Team Hub with filtering by age group, built the Team Sub-Page for detailed team information, deployed the site to Vercel, resolved build warnings and errors, fixed styling issues on Vercel, resolved permission issues during builds, added placeholder pages for routes, fixed logo and footer display issues, implemented logo shrinking on scroll, implemented the Join page with form submission, Stripe payment integration, Supabase storage, transitioned from PDF invoice generation to HTML invoice emails via Resend, completed the Schedules page with FullCalendar integration, updated Team Sub-Page with schedule tables and merchandise section, removed `animate-fadeIn` effect across all pages, built the Shop page with product listings and Stripe checkout, resolved build errors (ESLint, TypeScript, `localStorage`, `useSearchParams`), successfully deployed to Vercel, integrated Printful API for order fulfillment, tested order submission in test and live modes, resolved Printful API errors (incorrect endpoint, test mode logic), updated the Values section with a simplified carousel, text alignment, shaded box, modal outside click, and single-line mobile title, completed the Coaches Corner section with dynamic drill fetching, image handling, and accordion styling improvements, built the About page with logo, mission statement, and fictitious history, updated Navbar to include About link, deployed a working version to Vercel.

## Files for Review

- src/components/homepage/Hero.tsx (completed with video background, CTAs, and styling)
- src/components/common/Navbar.tsx (updated with logo, right-aligned links, scroll effect, mobile menu, added About link)
- src/components/common/Footer.tsx (includes logo, navigation, newsletter signup)
- src/components/homepage/NewsCarousel.tsx (added carousel with static data and modals)
- src/components/homepage/TeamPreview.tsx (added team previews with links)
- src/components/homepage/SchedulePreview.tsx (added schedule previews with links, updated events, removed `animate-fadeIn`)
- src/components/homepage/ValuesSection.tsx (completed with simplified carousel, text alignment, shaded box, modal outside click, single-line mobile title)
- src/components/homepage/CoachesCorner.tsx (completed with dynamic drill fetch, updated accordion styling, moved subtitle above accordion)
- src/app/page.tsx (updated to include Hero, ValuesSection, CoachesCorner, NewsCarousel, TeamPreview, SchedulePreview)
- src/app/about/page.tsx (completed with logo, mission statement, history, and navigation)
- src/lib/schedules/data.ts (added to store shared events and teams data)
- app/teams/page.tsx (added Team Hub with team list and age group filter)
- app/teams/[id]/page.tsx (added Team Sub-Page with detailed team information, updated schedule tables, added merchandise section, removed `animate-fadeIn`)
- app/signup/page.tsx (added placeholder page)
- app/schedules/page.tsx (completed with FullCalendar, filters, "Today's Events" card, removed `animate-fadeIn`)
- app/shop/page.tsx (completed with product listings, Stripe checkout, styled with dark theme, navigation links)
- app/shop/[category]/page.tsx (completed with category filtering, product listings)
- app/shop/product/[id]/page.tsx (completed with product details, cart functionality)
- app/shop/cart/page.tsx (completed with cart management, resolved `localStorage` SSR error)
- app/shop/checkout/page.tsx (completed with Stripe checkout flow, Printful order submission, resolved `useSearchParams` errors)
- app/shop/checkout/CheckoutPage.tsx (added to handle client-side checkout logic, resolved `useSearchParams` prerendering issue)
- app/shop/confirmation/page.tsx (completed with order summary, resolved `useSearchParams` error)
- app/tournaments/page.tsx (in progress with static tournament listings, signup form, Supabase storage, TourneyMachine link)
- app/join/page.tsx (completed with registration form, payment integration, removed `animate-fadeIn`)
- app/join/confirm/page.tsx (completed with payment confirmation and Stripe integration, removed `animate-fadeIn`)
- app/join/status/page.tsx (implemented with payment status display and email invoice confirmation, pending redirect fix)
- app/coaches/page.tsx (completed with cards linking to Coaches Corner sections, updated AI-Generated Drills link to `/coaches/drills/current`)
- app/coaches/highlight/page.tsx (completed with static Coach Highlight content)
- app/coaches/drills/[id]/page.tsx (completed with dynamic drill fetching based on week_number, added image_name column support)
- app/coaches/rules/page.tsx (completed with static rules content)
- app/coaches/videos/page.tsx (completed with YouTube video links and thumbnails)
- app/coaches/resources/page.tsx (completed with static resource list, fixed mobile title overflow, updated titles to Rubik font)
- pages/api/create-join-request.ts (implemented for creating join requests in Supabase)
- pages/api/send-email.ts (implemented with Resend for HTML invoice emails)
- pages/api/stripe-payment.ts (implemented for Stripe payment intents)
- pages/api/get-join-request.ts (implemented for fetching join request data)
- pages/api/update-join-request.ts (implemented for updating join request status)
- pages/api/create-printful-order.ts (implemented for submitting orders to Printful, resolved API endpoint errors)
- src/app/layout.tsx (updated with `metadataBase`, client-side cart logic via `ClientLayout`)
- src/app/ClientLayout.tsx (added for client-side `cartItemCount` and layout rendering)
- eslint.config.mjs (updated to remove `eslint-plugin-styled-jsx`, fixed ESLint errors)

## Current State

**Date**: May 24, 2025, 10:05 AM CDT

**Progress**: Advanced Phase 3: Build Website. Completed the About page (`/app/about/page.tsx`) with the main logo (`/images/WCS Logo-transparentBG.png`), mission statement, and a fictitious history, styled with a dark theme (`bg-[#002C51]`, `bg-gray-900` cards, `border-red-500/50`, Rubik/Inter fonts). Updated the Navbar (`/src/components/common/Navbar.tsx`) to include an About link in desktop and mobile menus. Deployed the updated site to Vercel at `https://wcs-three.vercel.app`. In progress with the Tournaments page (`/app/tournaments/page.tsx`), which includes static tournament listings, a signup form with Supabase storage, and a TourneyMachine link, with styling adjustments ongoing. Phase 4 (Testing and Deployment) is in progress, with deployment complete and initial testing of the Shop page, Values section, Coaches Corner section, and About page successful. Next tasks: Refine the Navbar, complete the Tournaments page, fix redirect error on `/join/status`, test Resend email delivery, and continue end-to-end testing of all flows (registration, schedules, purchases).

**Blockers**: None.

**Errors**:

- [May 16, 2025]: No errors during Schedules page implementation. Fixed earlier FullCalendar CSS import issues by importing `main.css` in `/src/app/global.css`. Resolved mobile text overflow by hiding text in Month view and using colored blocks.
- [May 17, 2025]: Fixed `net::ERR_CONNECTION_REFUSED` for merchandise images in `/app/teams/[id]/page.tsx` by correcting paths (e.g., `/images/team-thunderhawks-merch.jpg`).
- [May 17, 2025]: Resolved build errors: ESLint (`Cannot find package 'typescript-eslint'`) by installing `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin`; TypeScript error in `/app/schedules/page.ts` by moving `events` and `teams` to `/src/lib/schedules/data.ts`.
- [May 18, 2025]: Fixed ESLint error (`Cannot find package 'eslint-plugin-styled-jsx'`) by removing the plugin from `eslint.config.mjs`, as Tailwind CSS is used instead of Styled JSX.
- [May 18, 2025]: Resolved build errors: `localStorage is not defined` in `/app/shop/cart/page.tsx` by moving `localStorage` access to `useEffect`; `useSearchParams` suspense error in `/app/shop/confirmation/page.tsx` by adding `dynamic = 'force-dynamic'`; `metadataBase` warning by adding it to `/src/app/layout.tsx`.
- [May 19, 2025]: Resolved Printful API integration errors: `Property 'source' is required` by adding `source: "api"` to the payload and updating the endpoint to `/orders` (removing `/v2`); `There can only be one file for each placement` by sending a single file in the `files` array; missing API keys by setting `PRINTFUL_TEST_API_KEY` and `PRINTFUL_API_KEY` in Vercel; incorrect test mode logic by updating `isTestMode` to rely solely on `searchParams` in `/app/shop/checkout/CheckoutPage.tsx`.
- [May 20, 2025]: Fixed Printful order confirmation error: 404 on `/v2/orders/@confirm` by updating to the correct endpoint `/orders/{id}/confirm` in `/pages/api/create-printful-order.ts`. Resolved client-side error ("contact support") by ensuring the server handles confirmation failures gracefully and the client receives the correct response.
- [May 22, 2025]: No errors during Values section updates. Successfully implemented simplified carousel, responsive text alignment, shaded box, modal outside click, and single-line mobile section title.
- [May 23, 2025]: Fixed CSV import issue for `drills` table by correcting array format for `skills` and `equipment` columns, successfully loaded 26 drills into Supabase. No errors during Coaches Corner section updates (dynamic drill fetching, image handling, accordion styling).
- [May 24, 2025]: No errors during About page implementation. Successfully created `/app/about/page.tsx` with logo, mission statement, and history, and updated `/src/components/common/Navbar.tsx` to include About link.

**To-Do List**

- [x] Build Homepage
  - [x] Create Hero section with video and CTAs
  - [x] Fix shadcn/ui Button rendering issue in Hero section
  - [x] Add News Carousel with modals
  - [x] Add team/schedule previews and other sections
  - [x] Remove `animate-fadeIn` from homepage sections
  - [x] Update Values section with simplified carousel, text alignment, shaded box, modal outside click, single-line mobile title
  - [x] Add Coaches Corner section with dynamic drill fetch, image handling, and updated accordion styling
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
- [x] Build Shop Page
  - [x] Discuss design, functionality, user journey, and integration requirements
  - [x] Create app/shop/page.tsx with static product listings
  - [x] Implement a basic checkout flow with Stripe
  - [x] Style the page to match the project's design
  - [x] Add navigation links (e.g., "Back to Homepage")
  - [x] Test locally to ensure functionality and styling
  - [x] Resolve build errors (ESLint, TypeScript, `localStorage`, `useSearchParams`)
  - [x] Deploy to Vercel with Shop page working
- [x] Integrate Printful API
  - [x] Discuss Printful API integration for order fulfillment
  - [x] Implement API routes to submit orders to Printful (`/pages/api/create-printful-order.ts`)
  - [x] Test order placement from website to Printful (test and live modes)
  - [x] Update Shop page checkout flow to include Printful order submission
  - [x] Resolve Printful API errors (endpoint, test mode, client-server mismatch)
- [x] Build Coaches Corner Section
  - [x] Create placeholder cards for Coaches Corner sections
  - [x] Implement dynamic drill fetching in `/app/coaches/drills/[id]/page.tsx` using Supabase
  - [x] Add `image_name` column to `drills` table and update page to use dynamic images
  - [x] Fix CSV import issue for `drills` table (array format for `skills` and `equipment`)
  - [x] Update `/app/coaches/page.tsx` to link AI-Generated Drills to `/coaches/drills/current`
  - [x] Fix mobile title overflow in `/app/coaches/resources/page.tsx` with `line-clamp-2` and update titles to Rubik font
  - [x] Enhance accordion styling in `CoachesCorner.tsx` (remove white bottom border, add red border, hover scale, active state background, adjust padding)
  - [x] Move subtitle above accordion in `CoachesCorner.tsx`
- [ ] Build Tournaments Page
  - [x] Create app/tournaments/page.tsx with static tournament listings
  - [x] Implement a signup form for external teams with Supabase storage
  - [x] Style the page to match the project's design
  - [x] Add navigation links (e.g., "Back to Homepage")
  - [ ] Test locally to ensure functionality and styling
- [x] Build About Page
  - [x] Create app/about/page.tsx with logo, mission statement, and history
  - [x] Style the page to match the project's design
  - [x] Add navigation links (e.g., "Back to Homepage")
  - [x] Update Navbar to include About link

## Phase 4: Testing and Deployment

**Goal**: Test functionality and deploy the site.

- [ ] Test end-to-end flows (registration, schedule access, t-shirt purchase)
- [ ] Optimize for mobile and desktop
- [ ] Secure API routes (Supabase Auth, Stripe)
- [x] Deploy to Vercel
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
- Deployed Shop page with Stripe checkout and Vercel hosting
- Integrated Printful API for order fulfillment with test and live mode support
- Updated Values section with simplified carousel, responsive text alignment, shaded box, modal outside click, and single-line mobile title
- Completed Coaches Corner section with dynamic drill fetching, image handling, and accordion styling improvements
- Completed About page with logo, mission statement, history, and Navbar integration

## Prompts

### Start New Conversation with Grok

Hi Grok, I'm continuing work on the Salina Youth Basketball Club website in a new conversation window. Please review the attached PROGRESS.md file for the project's context, progress, and tasks. The site is a mobile-first, custom-built web app for managing youth basketball teams, using Next.js, Tailwind CSS, Supabase, Stripe, Printful, Resend, Vercel, and Cursor. The design is a dark theme (navy #1C2526, white #FFFFFF, red #D91E18; Rubik/Inter fonts), with a sporty, minimalistic layout for parents, teams, and coaches.

PROGRESS.md Contents:

[See attached PROGRESS.md]

Current Task:

[Insert current task here, e.g., refining the Navbar or completing the Tournaments page.]

Additional Context:

- The Shop page uses Stripe for payments (`/pages/api/stripe-payment.ts`) and Resend for emails (`/pages/api/send-email.ts`).
- Orders are confirmed in `/app/shop/confirmation/page.tsx` with data like `items` (productId, variantId, size, color, quantity), `subtotal`, `shippingCost`, `totalPrice`, and `shippingAddress` (fullName, street, city, state, zip, country).
- Printful handles t-shirt fulfillment (e.g., `/images/team-thunderhawks-merch.jpg` products).
- Refer to Printful API Docs (https://www.printful.com/api) for endpoints and authentication.
- Use cost-minimal approaches (e.g., Printful’s pay-per-use model).
- Style any new UI (e.g., error messages) to match the dark theme (`bg-[#002C51]`, `bg-gray-900` cards, `bg-blue-600` buttons).
- Update `PROGRESS.md` with task completion and status after each response.
- Ensure compliance with `.cursor/rules/*.mdc` (e.g., `styling-rules.mdc` for Tailwind).

Please provide a detailed plan for the current task, then proceed with implementing necessary code. Let me know if you need specific files or clarification.

## References

- FUTURE_IMPROVEMENTS.md
- README.md (to be finalized in Phase 5)
- Supabase Docs
- Stripe Docs
- Printful API Docs
- Resend Docs
- GitHub Repository (https://github.com/Phronesis2025/salina-youth-basketball)

## Notes on Updates

- **Phase 3 To-Do List**: Updated to mark About page tasks as completed (logo, mission statement, history, Navbar integration). Noted Tournaments page as in progress with static listings, signup form, and styling adjustments.
- **Phase 4 To-Do List**: Noted initial testing of About page as successful, with remaining testing tasks pending.
- **Current State**: Updated to reflect About page and Navbar update completion, Tournaments page progress, successful deployment, and testing status on May 24, 2025, 10:05 AM CDT.
- **Errors**: Added entry for May 24, 2025, noting no errors during About page and Navbar updates.
- **May 24, 2025 Update**:
  - Completed About page with `/app/about/page.tsx`:
    - Added main logo (`/images/WCS Logo-transparentBG.png`), mission statement, and fictitious history.
    - Styled with dark theme (`bg-[#002C51]`, `bg-gray-900` cards, `border-red-500/50`, Rubik/Inter fonts).
    - Included navigation link ("Back to Homepage").
  - Updated Navbar with `/src/components/common/Navbar.tsx`:
    - Added About link to desktop and mobile menus.
  - Deployed a fully working version to Vercel at `https://wcs-three.vercel.app`.
