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
- **Phase 3 (Build Website)**: Not started.
- **Phase 4 (Testing and Deployment)**: Not started.
- **Phase 5 (Polish and Iteration)**: Not started.

**Key Milestones**: Defined project goals, planned website structure, set up color scheme and design guidelines, prepared placeholder content (20-team dataset, Coaches Corner articles, t-shirt designs).

## Files for Review
- None yet (pre-coding phase).

## Current State

- **Date**: May 13, 2025
- **Progress**: Updated `PROGRESS.md` with Phase 2 status, marking the phase as complete. Phase 1 defined the project’s goals, audience, and design (dark theme with navy `#1C2526`, white `#FFFFFF`, red `#D91E18`). Phase 2 planned the sitemap, navigation, and content for all pages (Homepage, Team Hub, Team Sub-Page, etc.), including placeholder data (team dataset, AI-generated articles, t-shirt designs). Ready to start Phase 3: Build Website, beginning with project setup (GitHub repo, Next.js project in Cursor) and coding the Homepage.
- **Blockers**: None
- **Environment**: Local folder (`/salina-youth-basketball`); GitHub (to be created); Supabase (to be created); Vercel (to be deployed); Cursor (assumed paid plan for AI features).
- **Errors**: None (pre-coding phase).

## To-Do List
- Set up GitHub repository and Next.js project in Cursor.
- Create initial `.mdc` files and documentation (`development-rules.md`, `FUTURE_IMPROVEMENTS.md`).
- Start Phase 3: Build the Homepage.

## Build Process Rules
1. **Code vs. Prompt**: Provide code for initial files (e.g., `tailwind.config.js`); use Cursor prompts for complex tasks or error debugging. Correct errors with full code if known, else provide a prompt to debug specific files.
2. **No Commented-Out Code**: Include clean code unless a specific section is requested.
3. **Clarify First**: Ask clarifying questions before providing code or prompts; deliver only requested items after answers. Proceed with best-guess for simple tasks (e.g., styling a button).
4. **Future Improvements**: Track features (e.g., custom tournament form) and optimizations (e.g., lazy loading galleries) in `FUTURE_IMPROVEMENTS.md`, prioritizing cost-free ideas but noting paid features with costs.
5. **Error Handling**: Track errors and Cursor fixes in `PROGRESS.md`’s Current State or Errors section. Analyze Cursor’s solutions to improve code accuracy.
6. **X Thread**: Suggest milestones for X posts to share in a thread after completion, focusing on engaging tips for using Grok and Cursor (e.g., setting AI rules). Keep posts community-oriented, not tutorials.
7. **Additional Rules**: Open to updates during the project, documented here.

## Phase Checklists

### Phase 1: Define Goal and Audience
**Goal**: Define the project’s purpose, audience, goals, and design.
- [x] Define primary purpose (showcase club, streamline registrations, sell merchandise)
- [x] Set specific goals (team schedules, tournament signups, Parent Portal)
- [x] Identify target audience (parents in central Kansas, external teams)
- [x] Outline problems/needs solved (easy registration, schedule access)
- [x] Set tone and vibe (sporty, cutting-edge, minimalistic, dark theme)
- [x] Review inspirations (TeamSnap, TheTournament)
- [x] Update `PROGRESS.md` with Phase 1 status

### Phase 2: Plan Content and Structure
**Goal**: Create sitemap, navigation, and page content.
- [x] Define sitemap (Homepage, Team Hub, Coaches Corner, etc.)
- [x] Plan navigation menu (Home, Teams, Tournaments, Shop)
- [x] Detail page content (e.g., Homepage: Hero, News Carousel; Team Sub-Page: Schedules, Gallery)
- [x] Generate placeholder content (team dataset, Coaches Corner articles, t-shirt designs)
- [x] Outline content needs (text, images, videos, dynamic data)
- [x] Update `PROGRESS.md` with Phase 2 status

### Phase 3: Build Website
**Goal**: Develop the website starting with Homepage, Team Hub, and Team Sub-Page.
- [ ] Set up GitHub repository
  - [ ] Create public repository `salina-youth-basketball`
  - [ ] Add `.gitignore` (Node template)
  - [ ] Clone to local
  - [ ] Add initial documentation (`PROGRESS.md`, `FUTURE_IMPROVEMENTS.md`)
- [ ] Initialize Next.js project with Cursor
  - [ ] Create project structure
  - [ ] Install dependencies (Tailwind CSS, Supabase, Stripe)
  - [ ] Test locally
- [ ] Create `.cursor/rules` directory
  - [ ] Add `general-rules.mdc`, `styling-rules.mdc`, `supabase-rules.mdc`
- [ ] Build Homepage
  - [ ] Create Hero section with video and CTAs
  - [ ] Add News Carousel with modals
  - [ ] Add team/schedule previews and other sections
- [ ] Build Team Hub
  - [ ] Create team grid with filters
  - [ ] Add search bar and master calendar link
- [ ] Build Team Sub-Page
  - [ ] Create dynamic page with coach bio, schedules, roster, gallery, t-shirts
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