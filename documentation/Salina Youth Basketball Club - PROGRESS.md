# Project Progress: Salina Youth Basketball Club Website

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

**Design**: Dark theme matching the club’s logo:

- **Primary Colors**: Navy (`#1C2526`), white (`#FFFFFF`), red (`#D91E18`)
- **Font**: Montserrat (body), Bebas Neue (headings)
- **Layout**: Clean, minimalistic, with bold CTAs and card-based sections

**Usability**: User-friendly for parents (register, view schedules, buy t-shirts), external teams (tournament signups), and coaches (update schedules), with a simple journey: explore club, register, manage team info.

**Cost Goal**: Minimal, leveraging free tiers (Supabase: 500 MB database, Vercel: Hobby plan, Stripe/Printful: pay-per-use) and open-source tools. Target budget: $20–$30/month.

**Documentation**: This file tracks progress, tasks, errors, and rules, shared with Grok in new conversation windows to maintain continuity across multi-session development in `/salina-youth-basketball`.

## Progress Summary

- **Phase 1 (Define Goal and Audience)**: Completed. Defined purpose, audience (parents, external teams), goals (streamline registrations, showcase teams), and design (dark theme, navy/white/red).
- **Phase 2 (Plan Content and Structure)**: Completed. Created sitemap, navigation, and page content (Homepage, Team Hub, Coaches Corner, etc.), with placeholder content (values, articles, t-shirt designs).
- **Phase 3 (Build Website)**: In progress.
- **Phase 4 (Testing and Deployment)**: Not started.
- **Phase 5 (Polish and Iteration)**: Not started.

**Key Milestones**: Defined project goals, planned website structure, set up color scheme and design guidelines, prepared placeholder content (20-team dataset, Coaches Corner articles, t-shirt designs), built Homepage Hero section with functional CTAs, added News Carousel, Team Preview, Schedule Preview, and Values sections, created the Team Hub with filtering by age group.

## Files for Review

- `src/components/homepage/Hero.tsx` (completed with video background, CTAs, and styling)
- `src/components/common/Navbar.tsx` (updated with logo, right-aligned links, and styling)
- `src/components/homepage/NewsCarousel.tsx` (added carousel with static data and modals)
- `src/components/homepage/TeamPreview.tsx` (added team previews with links)
- `src/components/homepage/SchedulePreview.tsx` (added schedule previews with links)
- `src/components/homepage/ValuesSection.tsx` (added values section)
- `src/app/page.tsx` (updated to include Hero, NewsCarousel, TeamPreview, SchedulePreview, and ValuesSection)
- `app/teams/page.tsx` (added Team Hub with team list and age group filter)

## Current State

- **Date**: May 13, 2025
- **Progress**: Continued Phase 3: Build Website. Confirmed layout structure (Navbar, Footer) renders correctly. Decided to use inline Tailwind color codes (`bg-[#D91E18]`, `text-[#FFFFFF]`) instead of custom color classes (`bg-accent`, `text-text`) due to persistent issues with Tailwind v4 custom colors, even after safelist attempts. Built the Homepage Hero section (`Hero.tsx`) with a video placeholder, heading, and three CTAs, styled with inline colors (navy background, white text, red buttons). Updated `page.tsx` to include the Hero section.
- **Blockers**: None
- **Environment**: Local folder (`/salina-youth-basketball`); GitHub (`https://github.com/your-username/salina-youth-basketball`); Supabase (to be created); Vercel (to be deployed); Cursor (paid plan assumed).
- **Errors**:
  - [May 13, 2025]: `bg-accent` class not applying with Tailwind v4, even after safelist. Resolved by using inline colors (`bg-[#D91E18]`). Decided not to downgrade to Tailwind v3, per user preference.
- **Date**: May 13, 2025
- **Progress**: Resolved shadcn/ui Button rendering issue in `Hero.tsx`. The buttons ("Sign Up", "Schedules", "Tournaments") now match the `btn-neutral` style (bg-[#FFFFFF], text-[#0A0F15], px-[16px] py-[8px], rounded-[0.25rem], hover:bg-[#E6ECEF], shadow, Rubik font). Issue was due to inherited `text-[#FFFFFF]` from parent section overriding button text color, and browser default `a:-webkit-any-link` styles. Fixed by applying `text-[#0A0F15]` directly on `Button` and using `no-underline` on `Link`. Reverted to Tailwind classes for background and hover effects.
- **Blockers**: None
- **Environment**: Local folder (`/salina-youth-basketball`); GitHub (`https://github.com/your-username/salina-youth-basketball`); Supabase (to be created); Vercel (to be deployed); Cursor (paid plan assumed).
- **Errors**:
  - [May 13, 2025]: shadcn/ui Button in `Hero.tsx` not rendering `btn-neutral` style (transparent background, wrong text color). Resolved by using inline styles initially, then reverting to Tailwind classes with proper specificity and `no-underline` on links.
- **Date**: May 13, 2025
- **Progress**: Updated `Hero.tsx` to fix the "Tournaments" button, which wasn’t a link. Converted it to a shadcn/ui `Button` with a `Link` to `/tournaments`, matching the other buttons. Also fixed button alignment to always be in one row by changing `flex flex-col md:flex-row` to `flex flex-row flex-wrap`. Buttons now render correctly with the `btn-neutral` style. Next task: Build the News Carousel for the Homepage.
- **Blockers**: None
- **Environment**: Local folder (`/salina-youth-basketball`); GitHub (`https://github.com/your-username/salina-youth-basketball`); Supabase (to be created); Vercel (to be deployed); Cursor (paid plan assumed).
- **Errors**: None
- **Date**: May 13, 2025
- **Progress**: Updated `Navbar.tsx` to match the functionality of a sample navbar. Added a scroll effect to shrink the navbar width (from 95% to 80%), logo size, and nav link sizes when scrolled (`window.scrollY > 10`). Kept `DropdownMenu` for mobile navigation (instead of `Sheet`, which was missing) to display a vertical menu. Replaced "Login" and "Register" buttons with a single "Get Started" button. Styled the navbar to match the Hero section (navy background `#002C51`, white text `#FFFFFF`, Rubik font for links, Inter font for buttons). Next task: Build the News Carousel for the Homepage.
- **Blockers**: None
- **Environment**: Local folder (`/salina-youth-basketball`); GitHub (`https://github.com/your-username/salina-youth-basketball`); Supabase (to be created); Vercel (to be deployed); Cursor (paid plan assumed).
- **Errors**: None
- **Date**: May 13, 2025
- **Progress**: Further updated `Navbar.tsx`. Replaced "Salina Basketball" text with the logo (`/images/WCS Logo-transparentBG.png`). Removed the `DropdownMenu` for mobile navigation, making the links visible on all screen sizes. Right-aligned the links ("Teams", "Schedules", "Shop", "Join the Team") with small text (`text-sm`) and Inter font (`font-inter`). Styled "Join the Team" to match the Hero section’s CTA buttons (`bg-[#FFFFFF] text-[#0A0F15] hover:bg-[#E6ECEF]`), while other links have no background. Updated navbar background to black (`bg-[black]`) and adjusted padding and sizes for consistency. Next task: Build the News Carousel for the Homepage.
- **Blockers**: None
- **Environment**: Local folder (`/salina-youth-basketball`); GitHub (`https://github.com/your-username/salina-youth-basketball`); Supabase (to be created); Vercel (to be deployed); Cursor (paid plan assumed).
- **Errors**: None
- **Date**: May 13, 2025
- **Progress**: Built the Homepage News Carousel in `NewsCarousel.tsx` using Swiper.js. Added static news items with titles, dates, images, descriptions, and detailed content. Each news item is displayed as a card in a responsive carousel (1 slide on mobile, 2 on tablet, 3 on desktop) with navigation arrows and pagination. Added a "Read More" button to open a custom modal (using state and Tailwind) with full details, as the shadcn/ui `Dialog` component was not confirmed to be installed. Styled the carousel to match the Hero section (navy background `#002C51`, white text `#FFFFFF`, Rubik font for headings, Inter font for body text). Integrated `NewsCarousel` into `page.tsx` below the Hero section. Next task: Add team/schedule previews and other Homepage sections.
- **Blockers**: None
- **Environment**: Local folder (`/salina-youth-basketball`); GitHub (`https://github.com/your-username/salina-youth-basketball`); Supabase (to be created); Vercel (to be deployed); Cursor (paid plan assumed).
- **Errors**: None
- **Date**: May 14, 2025
- **Progress**: Refined the styling of news cards in `NewsCarousel.tsx` to align with the project’s sporty, minimalistic design. Updated cards to have a dark background (`#01182B`), rounded corners, subtle shadow, and a hover effect (scale up and enhanced shadow). Styled the title as uppercase with Rubik font, date and description with Inter font, and the "Read More" button to match the Hero section’s CTAs (`bg-[#FFFFFF] text-[#0A0F15] uppercase`). Ensured consistency with the project’s dark theme and typography. Next task: Add team/schedule previews and other Homepage sections.
- **Blockers**: None
- **Environment**: Local folder (`/salina-youth-basketball`); GitHub (`https://github.com/your-username/salina-youth-basketball`); Supabase (to be created); Vercel (to be deployed); Cursor (paid plan assumed).
- **Errors**: None
- **Date**: May 14, 2025
- **Progress**: Updated `Hero.tsx` to adjust the overlay color to `bg-[black] opacity-[70%]`, matching the navbar’s background. Modified the title’s size to `text-[clamp(4rem,5vw,4rem)]` for consistency across devices, and the subtitle’s size to `text-[clamp(1.5rem,2vw,15rem)]` (noting the max value may be a typo, possibly intended as `1.5rem`). Tightened subtitle spacing with `mb-[8px]`. Updated `NewsCarousel.tsx` to add TypeScript interfaces for news items, improving type safety. Adjusted the modal overlay to `bg-[black]`, increased container padding to `px-16`, and refined card spacing and layout with `flex` for consistent height and button positioning. Fixed shadcn/ui components by ensuring Tailwind CSS is properly included in `global.css`. Next task: Add team/schedule previews and other Homepage sections.
- **Blockers**: None
- **Environment**: Local folder (`/salina-youth-basketball`); GitHub (`https://github.com/your-username/salina-youth-basketball`); Supabase (to be created); Vercel (to be deployed); Cursor (paid plan assumed).
- **Errors**: None
- **Date**: May 14, 2025
- **Progress**: Added team and schedule preview sections to the Homepage. Created `TeamPreview.tsx` to display three teams (Thunderhawks, Firebolts, Stingers) with images, names, age groups, and a "Learn More" button linking to individual team pages. Created `SchedulePreview.tsx` to show upcoming games (Thunderhawks vs. Eagles, Firebolts vs. Tigers, Stingers vs. Wolves) with dates, teams, locations, and a "View Details" button linking to the full schedule. Added `ValuesSection.tsx` to highlight the club’s core values (Teamwork, Excellence, Inspiration). Styled all sections to match the project’s design (navy background `#002C51`, dark cards `#01182B`, white text `#FFFFFF`, Rubik for headings, Inter for body text, uppercase titles). Integrated sections into `page.tsx` below the News Carousel. Homepage sections are now complete.
- **Blockers**: None
- **Environment**: Local folder (`/salina-youth-basketball`); GitHub (`https://github.com/your-username/salina-youth-basketball`); Supabase (to be created); Vercel (to be deployed); Cursor (paid plan assumed).
- **Errors**: None
- **Date**: May 14, 2025
- **Progress**: Built the Team Hub in `app/teams/page.tsx`. Added a list of all teams with details (name, age group, coach, image) using static data. Implemented a filter dropdown to sort teams by age group (All, U-10, U-12, U-14, U-16). Each team card links to an individual Team Sub-Page (to be built). Styled the Team Hub to match the project’s design (navy background `#002C51`, dark cards `#01182B`, white text `#FFFFFF`, Rubik for headings, Inter for body text, uppercase titles). Added a "Back to Homepage" button. Next task: Build the Team Sub-Page.
- **Blockers**: None
- **Environment**: Local folder (`/salina-youth-basketball`); GitHub (`https://github.com/your-username/salina-youth-basketball`); Supabase (to be created); Vercel (to be deployed); Cursor (paid plan assumed).
- **Errors**: None

## To-Do List

- [x] Build Homepage
  - [x] Create Hero section with video and CTAs
  - [x] Fix shadcn/ui Button rendering issue in Hero section
  - [x] Add News Carousel with modals
  - [x] Add team/schedule previews and other sections
- [x] Build Team Hub
- [ ] Build Team Sub-Page
- [ ] Deploy updates to Vercel
- [ ] Commit changes to GitHub
- [ ] Update `PROGRESS.md` with Phase 3 status

### Phase 3: Build Website

**Goal**: Develop the website starting with Homepage, Team Hub, and Team Sub-Page.

- [x] Set up GitHub repository
  - [x] Create public repository `salina-youth-basketball`
  - [x] Add `.gitignore` (Node template)
  - [x] Clone to local
  - [x] Add initial documentation (`PROGRESS.md`, `FUTURE_IMPROVEMENTS.md`)
- [x] Initialize Next.js project with Cursor
  - [x] Create project structure
  - [x] Install dependencies (Tailwind CSS, Supabase, Stripe)
  - [x] Test locally
- [x] Create `.cursor/rules` directory
  - [x] Add `general-rules.mdc`, `styling-rules.mdc`, `supabase-rules.mdc`
- [x] Build Homepage Layout
  - [x] Create `Navbar.tsx` with logo and navigation links
  - [x] Create `Footer.tsx` with logo, Newsletter Signup, and links
  - [x] Update `layout.tsx` to include Navbar and Footer
- [x] Build Homepage
  - [x] Create Hero section with video and CTAs
  - [x] Fix shadcn/ui Button rendering issue in Hero section
  - [x] Add News Carousel with modals
  - [x] Add team/schedule previews and other sections
- [x] Build Team Hub
- [ ] Build Team Sub-Page
- [ ] Deploy updates to Vercel
- [ ] Commit changes to GitHub
- [ ] Update `PROGRESS.md` with Phase 3 status

### Phase 4: Testing and Deployment

**Goal**: Test functionality and deploy the site.

- [ ] Test end-to-end flows (registration, schedule access, t-shirt purchase)
- [ ] Optimize for mobile and desktop
- [ ] Secure API routes (Supabase Auth, Stripe)
- [ ] Deploy to Vercel
- [ ] Commit changes to GitHub
- [ ] Update `PROGRESS.md` with Phase 4 status

### Phase 5: Polish and Iteration

**Goal**: Refine based on feedback and optimize.

- [ ] Improve UI/UX (e.g., loading states, error messages)
- [ ] Optimize performance (e.g., lazy load galleries)
- [ ] Incorporate feedback (e.g., from brother)
- [ ] Finalize documentation (`README.md`)
- [ ] Deploy final updates to Vercel
- [ ] Commit changes to GitHub
- [ ] Update `PROGRESS.md` with Phase 5 status

## Future Improvements Implemented

- None yet (pre-coding phase).

## Prompts

### Start New Conversation with Grok

Hi Grok, I’m continuing work on the Salina Youth Basketball Club website in a new conversation window. Please review the attached `PROGRESS.md` file for the project’s context, progress, and tasks. The site is a mobile-first, custom-built web app for managing youth basketball teams, using Next.js, Tailwind CSS, Supabase, Stripe, Printful, Vercel, and Cursor. The design is a dark theme (navy `#1C2526`, white `#FFFFFF`, red `#D91E18`; Montserrat/Bebas Neue fonts), with a sporty, minimalistic layout for parents, teams, and coaches.

**PROGRESS.md Contents**:  
[See attached `PROGRESS.md`]

**Current Task**:  
[Specify task, e.g., “Set up Next.js project with Tailwind CSS”, “Build Homepage Hero section”]

**Additional Context**:

- Refer to `.cursor/rules/*.mdc` files for AI coding rules (e.g., `styling-rules.mdc` for Tailwind).
- Ensure code aligns with the dark, sporty design and user-friendly journey.
- Use cost-minimal approaches (e.g., free tiers for Supabase/Vercel).
- Update `PROGRESS.md` with task completion and status after each response.

Please provide the requested code, review, or guidance, and suggest how to update `PROGRESS.md` to reflect this work. Let me know if you need specific files or clarification.

## References

- [FUTURE_IMPROVEMENTS.md](./FUTURE_IMPROVEMENTS.md)
- [README.md](./README.md) (to be finalized in Phase 5)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Printful API Docs](https://developers.printful.com/docs/)
- [GitHub Repository](https://github.com/your-username/salina-youth-basketball) (to be created)
