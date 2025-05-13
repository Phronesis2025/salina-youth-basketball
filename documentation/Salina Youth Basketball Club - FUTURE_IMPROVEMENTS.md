# Future Improvements: Salina Youth Basketball Club Website

## Overview

This file tracks suggested enhancements for the website’s features, processes, or performance. Ideas prioritize cost-minimality (within $20–$30/month budget) and alignment with the dark, sporty, minimalistic design (navy `#1C2526`, white `#FFFFFF`, red `#D91E18`). Each entry includes benefits, estimated costs, and target implementation phase.

## Ideas

### Phase 3: Build Website
- **Process**: Use `pnpm` instead of `npm` for faster dependency installation.
  - **Benefit**: Reduces install time and disk space, improving setup efficiency.
  - **Cost**: Free (`npm install -g pnpm`).
  - **Phase**: Phase 3 (Build).
- **Process**: Add a `concurrently` script to run local development with Next.js and Supabase CLI.
  - **Benefit**: Simplifies development by running both services with one command.
  - **Cost**: Free (`npm install -g concurrently`).
  - **Phase**: Phase 3 (Build).
- **Feature**: Add a favicon using the WCS Basketball logo.
  - **Benefit**: Enhances branding consistency in browser tabs.
  - **Cost**: Free (create in Canva or use logo directly).
  - **Phase**: Phase 3 (Build).
- **Process**: Use Next.js `image` component for optimized image loading.
  - **Benefit**: Improves performance by automatically optimizing images (e.g., team thumbnails, t-shirt images).
  - **Cost**: Free (built into Next.js).
  - **Phase**: Phase 3 (Build).
- **Feature**: Add a loading spinner for the News Carousel.
  - **Benefit**: Improves UX by providing feedback while news data loads from Supabase.
  - **Cost**: Free (uses React state, Tailwind CSS).
  - **Phase**: Phase 3 (Build).

### Phase 4: Testing and Deployment
- **Process**: Add a GitHub Action for automatic linting on push.
  - **Benefit**: Ensures code consistency (e.g., ESLint rules) without manual checks.
  - **Cost**: Free (GitHub Actions free tier for public repositories).
  - **Phase**: Phase 4 (Testing and Deployment).
- **Process**: Create a `.github/workflows/ci.yml` to run tests on pull requests.
  - **Benefit**: Catches issues early before merging code, improving quality.
  - **Cost**: Free (GitHub Actions free tier).
  - **Phase**: Phase 4 (Testing and Deployment).
- **Feature**: Add Vercel analytics to track mobile usage metrics.
  - **Benefit**: Provides insights into user interactions (e.g., page views, device types).
  - **Cost**: Free (Vercel Analytics free tier).
  - **Phase**: Phase 4 (Testing and Deployment).
- **Feature**: Replace TourneyMachine with a custom tournament registration form.
  - **Benefit**: Offers full control over the registration process, aligning with site branding.
  - **Cost**: Free (uses Supabase, Stripe).
  - **Phase**: Phase 4 (Testing and Deployment).

### Phase 5: Polish and Iteration
- **Feature**: Add player stats to Team Sub-Pages and Parent Portal.
  - **Benefit**: Enhances engagement by providing detailed player performance data.
  - **Cost**: Free (requires new Supabase table: `player_stats`).
  - **Phase**: Phase 5 (Polish).
- **Feature**: Implement lazy loading for team galleries.
  - **Benefit**: Improves page load times, especially for mobile users.
  - **Cost**: Free (uses Next.js `loading` attribute or Intersection Observer).
  - **Phase**: Phase 5 (Polish).
- **Feature**: Add a CHANGELOG.md file.
  - **Benefit**: Tracks changes across phases for future reference.
  - **Cost**: Free (documentation).
  - **Phase**: Phase 5 (Polish).
- **Feature**: Add live game updates to Team Sub-Pages.
  - **Benefit**: Increases engagement by providing real-time game info for parents.
  - **Cost**: Free (uses Supabase Realtime).
  - **Phase**: Phase 5 (Polish).

## Implemented Improvements
- None yet (pre-coding phase).

## References
- [PROGRESS.md](./PROGRESS.md)
- [Supabase Realtime Docs](https://supabase.com/docs/guides/realtime)
- [Next.js Image Optimization](https://nextjs.org/docs/pages/api-reference/components/image)