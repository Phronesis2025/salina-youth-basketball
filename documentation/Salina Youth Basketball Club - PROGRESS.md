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

**Design**:

- Dark theme matching the club's logo
- **Primary Colors**: Navy (#1C2526), white (#FFFFFF), red (#D91E18)
- **Font**: Rubik (body), Inter (headings)
- **Layout**: Clean, minimalistic, with bold CTAs and card-based sections
- **Usability**: User-friendly for parents (register, view schedules, buy t-shirts), external teams (tournament signups), and coaches (update schedules), with a simple journey: explore club, register, manage team info.

**Cost Goal**: Minimal, leveraging free tiers (Supabase: 500 MB database, Vercel: Hobby plan, Stripe/Printful: pay-per-use) and open-source tools. Target budget: $20–$30/month.

**Documentation**: This file tracks progress, tasks, errors, and rules, shared with Grok in new conversation windows to maintain continuity across multi-session development in /salina-youth-basketball.

## Progress Summary

- **Phase 1 (Define Goal and Audience)**: Completed. Defined purpose, audience (parents, external teams), goals (streamline registrations, showcase teams), and design (dark theme, navy/white/red).
- **Phase 2 (Plan Content and Structure)**: Completed. Created sitemap, navigation, and page content (Homepage, Team Hub, Coaches Corner, etc.), with placeholder content (values, articles, t-shirt designs).
- **Phase 3 (Build Website)**: In Progress (Schedules, Shop, and Tournaments pages remaining).
- **Phase 4 (Testing and Deployment)**: Not started.
- **Phase 5 (Polish and Iteration)**: Not started.

**Key Milestones**: Defined project goals, planned website structure, set up color scheme and design guidelines, prepared placeholder content (20-team dataset, Coaches Corner articles, t-shirt designs), built Homepage Hero section with functional CTAs, added News Carousel, Team Preview, Schedule Preview, and Values sections, created the Team Hub with filtering by age group, built the Team Sub-Page for detailed team information, deployed the site to Vercel, resolved build warnings and errors, fixed styling issues on Vercel, resolved permission issues during builds, added placeholder pages for routes, fixed logo and footer display issues, implemented logo shrinking on scroll, implemented the Join page with form submission, Stripe payment integration, Supabase storage, and PDF invoice generation.

## Files for Review

- src/components/homepage/Hero.tsx (completed with video background, CTAs, and styling)
- src/components/common/Navbar.tsx (updated with logo, right-aligned links, and styling)
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
- app/join/page.tsx (completed with registration form, payment integration, and invoice generation)
- app/join/confirm/page.tsx (completed with payment confirmation and Stripe integration)
- app/join/status/page.tsx (completed with payment status display and invoice download)

## Current State

**Date**: May 14, 2025, 05:29 PM CDT

**Progress**: Continued Phase 3: Build Website. The Join page (/join, /join/confirm, /join/status) is fully implemented with form submission, Stripe payment integration, Supabase storage, and PDF invoice generation. However, the latest build failed due to an invalid revalidate export in src/app/join/status/page.tsx and a missing eslint-plugin-next package, preventing a successful deployment to Vercel. Previous errors (e.g., TypeScript issues, ESLint react/react-in-jsx-scope, Styled JSX properties) have been resolved by installing packages (typescript-eslint, eslint-plugin-styled-jsx), disabling unnecessary rules, and adding null checks. The project is deployed at https://wcs-three.vercel.app/, but the Join page functionality needs to be fully tested and verified on Vercel.

**Blockers**: Build failure due to invalid revalidate export and missing eslint-plugin-next package.

**Environment**: Local folder (C:\Users\phron\OneDrive\Documents\HTML CSS JS Projects\World Class Sports\salina-youth-basketball); GitHub (https://github.com/your-username/salina-youth-basketball); Supabase (created); Vercel (deployed); Cursor (paid plan assumed).

**Errors**:

- [May 14, 2025]: Build failed with Invalid revalidate value error in src/app/join/status/page.tsx due to a misinterpreted revalidate export, and missing eslint-plugin-next package in eslint.config.mjs.

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
- [x] Add PDF invoice generation and download
- [ ] Deploy updates to Vercel with Join page working
- [ ] Commit changes to GitHub
- [ ] Update PROGRESS.md with Phase 3 status

## Phase 3: Build Website

**Goal**: Develop the website starting with Homepage, Team Hub, Team Sub-Page, Join page, and the remaining pages (Schedules, Shop, Tournaments).

- [x] Set up GitHub repository
- [x] Create public repository salina-youth-basketball
- [x] Add .gitignore (Node template)
- [x] Clone to local
- [x] Add initial documentation (PROGRESS.md, FUTURE_IMPROVEMENTS.md)
- [x] Initialize Next.js project with Cursor
- [x] Create project structure
- [x] Install dependencies (Tailwind CSS, Supabase, Stripe)
- [x] Test locally
- [x] Create .cursor/rules directory
- [x] Add general-rules.mdc, styling-rules.mdc, supabase-rules.mdc
- [x] Build Homepage Layout
- [x] Create Navbar.tsx with logo and navigation links
- [x] Create Footer.tsx with logo, Newsletter Signup, and links
- [x] Update layout.tsx to include Navbar and Footer
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
- [x] Add PDF invoice generation and download
- [ ] Build Schedules Page

**Explanation**: This page will display a full schedule of games for all teams, using the FullCalendar library for an interactive calendar view. The schedule will pull static data initially (e.g., from the 20-team dataset) and later integrate with Supabase for dynamic updates by coaches. The page should include filters for teams and age groups, styled consistently with the project's dark theme (navy background #002C51, dark cards #01182B, white text #FFFFFF, Rubik for headings, Inter for body text). A "Back to Homepage" link will ensure navigation consistency.

- [ ] Create app/schedules/page.tsx with FullCalendar integration

**Explanation**: Implement the FullCalendar library to render an interactive calendar showing game schedules. Use static data from the 20-team dataset (e.g., games from TeamPreview.tsx) to populate events, including date, teams, and location. Add filters (e.g., dropdowns for team and age group) to allow users to view specific schedules.

- [ ] Style the page to match the project's design

**Explanation**: Apply the project's dark theme and typography (navy background, white text, Rubik/Inter fonts). Use Tailwind CSS classes for layout (e.g., grid, flex) and styling (e.g., bg-[#002C51], text-[#FFFFFF], font-rubik). Ensure the calendar and filters are responsive across mobile and desktop.

- [ ] Add navigation links (e.g., "Back to Homepage")

**Explanation**: Include a navigation link to return to the homepage (/) using Next.js Link component, styled as a button or text link to maintain consistency with other pages (e.g., text-[#FFFFFF] hover:text-[#E6ECEF]).

- [ ] Test locally to ensure functionality and styling

**Explanation**: Run npm run dev to test the page locally, verifying that the calendar renders correctly, filters work, and the layout is responsive. Check for any console errors or styling issues.

- [ ] Build Shop Page

**Explanation**: This page will serve as an e-commerce section for selling merchandise (e.g., t-shirts) using Printful for print-on-demand fulfillment and Stripe for payments. Initially, it will display static product listings (e.g., t-shirt designs from placeholder content) with a "Buy Now" button linking to a checkout flow. The page will be styled to match the project's design, with product cards and a cart summary. Future iterations will integrate Printful's API for dynamic products and order fulfillment.

- [ ] Create app/shop/page.tsx with static product listings

**Explanation**: Build a grid of product cards displaying static t-shirt designs (e.g., from placeholder content). Each card should show the product image, name, price, and a "Buy Now" button. Use static data initially, with plans to integrate Printful API later.

- [ ] Implement a basic checkout flow with Stripe

**Explanation**: Add a simple checkout flow using Stripe Elements (similar to the Join page) to handle payments for t-shirt purchases. Include a cart summary and a form for billing/shipping details, redirecting to a success page upon payment completion.

- [ ] Style the page to match the project's design

**Explanation**: Apply the project's dark theme and typography (navy background, white text, Rubik/Inter fonts). Use Tailwind CSS classes for product cards (e.g., bg-[#01182B], rounded-[1rem], shadow) and the checkout form (e.g., bg-[#FFFFFF], text-[#0A0F15] for inputs). Ensure responsiveness across devices.

- [ ] Add navigation links (e.g., "Back to Homepage")

**Explanation**: Include a navigation link to return to the homepage (/) using Next.js Link component, styled consistently with other pages (e.g., text-[#FFFFFF] hover:text-[#E6ECEF]).

- [ ] Test locally to ensure functionality and styling

**Explanation**: Run npm run dev to test the page locally, verifying that product listings display correctly, the checkout flow works with Stripe test cards (e.g., 4242 4242 4242 4242), and the layout is responsive. Check for any console errors or styling issues.

- [ ] Build Tournaments Page

**Explanation**: This page will allow external teams to sign up for tournaments hosted by the club, integrating with TourneyMachine for tournament management. Initially, it will include a static list of upcoming tournaments and a signup form for external teams, storing submissions in Supabase. The page will be styled to match the project's design, with tournament cards and a form section. Future iterations will fully integrate TourneyMachine API for real-time tournament data.

- [ ] Create app/tournaments/page.tsx with static tournament listings

**Explanation**: Build a list of upcoming tournaments using static data (e.g., tournament names, dates, locations). Display each tournament as a card with a "Sign Up" button linking to a signup form on the same page. Use static data initially, with plans to integrate TourneyMachine API later.

- [ ] Implement a signup form for external teams with Supabase storage

**Explanation**: Add a form for external teams to sign up, collecting details like team name, age group, coach name, and contact info. Store submissions in a Supabase table (tournament_signups) using the Supabase client (similar to the Join page). Include form validation and error handling.

- [ ] Style the page to match the project's design

**Explanation**: Apply the project's dark theme and typography (navy background, white text, Rubik/Inter fonts). Use Tailwind CSS classes for tournament cards (e.g., bg-[#01182B], rounded-[1rem], shadow) and the signup form (e.g., bg-[#FFFFFF], text-[#0A0F15] for inputs). Ensure responsiveness across devices.

- [ ] Add navigation links (e.g., "Back to Homepage")

**Explanation**: Include a navigation link to return to the homepage (/) using Next.js Link component, styled consistently with other pages (e.g., text-[#FFFFFF] hover:text-[#E6ECEF]).

- [ ] Test locally to ensure functionality and styling

**Explanation**: Run npm run dev to test the page locally, verifying that tournament listings display correctly, the signup form submits data to Supabase, and the layout is responsive. Check for any console errors or styling issues.

- [ ] Deploy updates to Vercel
- [ ] Commit changes to GitHub
- [ ] Update PROGRESS.md with Phase 3 status

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

## Prompts

### Start New Conversation with Grok

Hi Grok, I'm continuing work on the Salina Youth Basketball Club website in a new conversation window. Please review the attached PROGRESS.md file for the project's context, progress, and tasks. The site is a mobile-first, custom-built web app for managing youth basketball teams, using Next.js, Tailwind CSS, Supabase, Stripe, Printful, Vercel, and Cursor. The design is a dark theme (navy #1C2526, white #FFFFFF, red #D91E18; Rubik/Inter fonts), with a sporty, minimalistic layout for parents, teams, and coaches.

PROGRESS.md Contents:

[See attached PROGRESS.md]

Current Task:

[Specify task, e.g., "Set up Next.js project with Tailwind CSS", "Build Homepage Hero section"]

Additional Context:

- Refer to .cursor/rules/\*.mdc files for AI coding rules (e.g., styling-rules.mdc for Tailwind).
- Ensure code aligns with the dark, sporty design and user-friendly journey.
- Use cost-minimal approaches (e.g., free tiers for Supabase/Vercel).
- Update PROGRESS.md with task completion and status after each response.

Please provide the requested code, review, or guidance, and suggest how to update PROGRESS.md to reflect this work. Let me know if you need specific files or clarification.

## References

- FUTURE_IMPROVEMENTS.md
- README.md (to be finalized in Phase 5)
- Supabase Docs
- Stripe Docs
- Printful API Docs
- GitHub Repository (to be created)

## Notes on Updates

- **Phase 3 To-Do List**: Updated to include the remaining pages (Schedules, Shop, Tournaments) as tasks, with detailed steps and explanations for each.
- **Steps for Each Page**:
  - **Schedules Page**: Added steps to integrate FullCalendar, style the page, add navigation, and test locally, with explanations for each step.
  - **Shop Page**: Added steps to create product listings, implement a checkout flow with Stripe, style the page, add navigation, and test locally, with explanations.
  - **Tournaments Page**: Added steps to create tournament listings, implement a signup form with Supabase, style the page, add navigation, and test locally, with explanations.
- **Current State**: Kept the latest progress update about the Join page implementation and the build failure, as the deployment to Vercel with the Join page working correctly is still pending.
- **Date and Time**: Updated to May 14, 2025, 05:29 PM CDT, as provided.
