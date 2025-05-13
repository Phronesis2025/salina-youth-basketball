# Salina Youth Basketball Club Website - Phase 2: Plan the Content and Structure

## Overview
This phase defines the website’s sitemap, navigation, and page-specific content to ensure a seamless user experience for parents, external teams, and coaches. The structure supports a custom build using Cursor, Next.js (frontend), Tailwind CSS (styling), Supabase (database, authentication, storage), Stripe (payments), and Printful (merchandise fulfillment), with a sporty, cutting-edge, trendy, and minimalistic design. Content includes placeholder text, AI-generated assets, and dynamic data, tailored for 20+ teams in central Kansas.

## Sitemap
- **Homepage**: Entry point showcasing the club and key CTAs.
- **Team Hub**: Parent page with sub-pages for each team.
  - **Team Sub-Page**: Details for a specific team (e.g., `/teams/u12-boys`).
- **Coaches Corner**: AI-generated resources for parents/players.
- **Tournament Registry**: Embedded TourneyMachine form for external team signups.
- **Merch Page**: Shop for team and tournament t-shirts.
- **Parent Portal**: Protected area for parents to view schedules, rosters, and payment history.
- **About/Contact**: Club information and contact form.
- **News Page**: Archive of news articles.

## Navigation Menu
- **Primary Menu** (Header):
  - Home
  - Teams (dropdown or filterable grid)
  - Coaches Corner
  - Tournaments (links to Tournament Registry)
  - Shop (links to Merch Page)
  - Parent Portal (login link)
  - About/Contact
- **Footer Links**:
  - Newsletter Signup
  - Privacy Policy
  - Terms of Service

## Page-by-Page Content

### 1. Homepage
- **Purpose**: Welcome visitors, showcase the club’s energy, and guide users to key actions (register, view schedules, shop).
- **Content**:
  - **Hero Section**: Hype video (user-provided or AI-generated) with overlay text (“Join Salina’s Premier Youth Basketball Club”). Three CTAs: “Sign Up for a Tournament,” “Register Player,” “Register a New Player.”
  - **Values Section**: Placeholder text (“Teamwork, Discipline, Basketball Excellence”) with icons (trophy, handshake, basketball).
  - **News Carousel**: 3–5 cards (image, title, date, excerpt) fetched from Supabase, newest first. Modals display full article text.
  - **Teams Preview**: Grid of 4–6 team cards (e.g., “U12 Boys”) linking to Team Hub, with filters (age group, gender).
  - **Schedules Preview**: Embedded FullCalendar showing upcoming games/tournaments, linking to Team Hub or Tournament Registry.
  - **Tournaments Callout**: Banner (“Join Our Tournaments!”) linking to Tournament Registry.
  - **Merch Preview**: 2–3 featured t-shirts (e.g., “Tournament Fireball Tee”) linking to Merch Page.
  - **Coaches Corner Preview**: 1–2 articles (e.g., “5 Dribbling Drills for Kids”) linking to Coaches Corner.
  - **About/Contact Snippet**: Brief club intro and contact form.
  - **Newsletter Signup**: Form for email collection (Supabase, MailerLite integration).
- **Technical Notes**:
  - Next.js for dynamic rendering, Tailwind CSS, Swiper.js for carousel.
  - Supabase table: `news` (fields: `id`, `title`, `image`, `content`, `date`).
  - Stripe for registration CTAs.

### 2. Team Hub
- **Purpose**: Central hub for browsing 20+ teams.
- **Content**:
  - **Team Grid**: Filterable grid of team cards (e.g., “U10 Boys Thunder”), each with name, age group, gender, thumbnail. Filters: grade/middle/high school, boys/girls.
  - **Search Bar**: Optional team name search.
  - **CTA**: “View All Schedules” linking to master calendar.
- **Technical Notes**:
  - Next.js dynamic routes (`/teams/[teamId]`).
  - Supabase table: `teams` (fields: `id`, `name`, `coach_name`, `age`, `grade_level`, `roster`).

### 3. Team Sub-Page (e.g., `/teams/u12-boys`)
- **Purpose**: Detailed info for a specific team.
- **Content**:
  - **Coach Bio**: Placeholder (e.g., “Coach John Smith, dedicated to youth development”).
  - **Core Values**: Placeholder (“Teamwork, Leadership, Skill Building”).
  - **Schedules**: Tabbed interface (Practice, Games, Tournaments) using FullCalendar. Coaches edit via dashboard. Google Calendar sync option.
  - **Roster**: List of player names and numbers (e.g., “Liam Johnson, #3”).
  - **Gallery**: Masonry grid of user-submitted photos with submission form (moderated by coaches).
  - **Team Shirts**: 2–3 t-shirts (e.g., “Team Logo Tee”) with Stripe checkout.
- **Technical Notes**:
  - Supabase tables: `schedules` (fields: `team_id`, `type`, `date`, `location`), `photos` (fields: `team_id`, `image_url`, `approved`), `teams` (for roster).
  - Stripe and Printful API for shirts.
  - Supabase Auth for coach dashboard.

### 4. Coaches Corner
- **Purpose**: Provide AI-generated resources for skill development.
- **Content**:
  - **Article List**: Blog-style grid of static articles (e.g., “5 Dribbling Drills for Kids”, “Parent Tips for Supporting Your Athlete”). Categories: Skills, Parent Tips.
  - **Video Section**: 1–3 AI-generated videos (e.g., “Shooting Basics” script).
  - **CTA**: Optional “Submit a Topic” form.
- **Technical Notes**:
  - Supabase table: `resources` (fields: `id`, `title`, `type`, `content`, `category`).

### 5. Tournament Registry
- **Purpose**: Allow external teams to sign up via TourneyMachine.
- **Content**:
  - **Embedded Form**: Iframe for TourneyMachine form (collects team name, coach name/email, player count, age group).
  - **Tournament List**: Static list or calendar of tournaments (boys/girls, age-based).
  - **CTA**: “Contact Us” for inquiries.
- **Technical Notes**:
  - Static page with iframe.

### 6. Merch Page
- **Purpose**: Sell team and tournament t-shirts.
- **Content**:
  - **Product Grid**: 2–3 t-shirts per team and tournament (e.g., “Tournament Fireball Tee”). Includes image, description, price, “Buy Now” button.
  - **Limited-Edition Highlight**: Countdown timer for tournament shirts.
  - **Filter**: By team or tournament.
- **Technical Notes**:
  - Supabase table: `products` (fields: `id`, `name`, `type`, `team_id`, `image`, `price`).
  - Stripe for payments, Printful API for fulfillment.

### 7. Parent Portal
- **Purpose**: Secure area for parents to view team data.
- **Content**:
  - **Dashboard**: Team schedules (calendar), roster (player names/numbers), payment history (Stripe).
  - **Newsletter Toggle**: Subscribe/unsubscribe option.
  - **CTA**: “Update Profile” for parent details.
- **Technical Notes**:
  - Supabase Auth (table: `users`, fields: `id`, `email`, `team_id`).
  - Stripe API for payment history.

### 8. About/Contact
- **Purpose**: Share club info and contact options.
- **Content**:
  - **About Section**: Placeholder mission (“Salina Youth Basketball Club fosters teamwork, discipline, and basketball excellence”).
  - **Contact Form**: Fields for name, email, message Ascended to submit (name, email, message). Stored in Supabase.
  - **Map**: Embedded Google Map of Salina, Kansas.
- **Technical Notes**:
  - Supabase table: `contacts` (fields: `id`, `name`, `email`, `message`).

### 9. News Page
- **Purpose**: Archive all news articles.
- **Content**:
  - **Article Grid**: Cards (image, title, date, excerpt) with modals for full text.
  - **Filter**: By date or category (optional).
- **Technical Notes**:
  - Supabase `news` table.

## Content Needs
- **Text**:
  - Placeholder values/mission: “Teamwork, Discipline, Basketball Excellence” (Homepage, About).
  - Coach bios: Generic for 20 coaches (e.g., “Coach [Name], experienced coach”).
  - News articles: 3–5 samples (2 provided).
  - Coaches Corner: 2 articles, 1 video script (provided).
- **Images**:
  - Team thumbnails: 20 generic basketball images (Unsplash/AI-generated).
  - T-shirt designs: 3 samples (provided).
  - News/Coaches Corner images: Stock/AI-generated.
- **Videos**:
  - Homepage video: User-provided or AI-generated (pending).
  - Coaches Corner video: 1 sample script (provided).
- **Dynamic Data**:
  - Teams dataset: 20 teams (provided).
  - Schedules: Placeholder (e.g., “Practice: May 20, 2025, 5 PM”).
  - Photos: Placeholder gallery images (moderated).

## Technical Structure
- **Frontend**: Next.js with dynamic routes, Tailwind CSS, Swiper.js (carousel), FullCalendar (schedules).
- **Backend**: Supabase for tables (`teams`, `schedules`, `news`, `resources`, `products`, `photos`, `users`, `contacts`), storage (images, videos), and authentication.
- **Payments**: Stripe for registrations, dues, and merch.
- **Fulfillment**: Printful API for t-shirts.
- **Hosting**: Vercel ($20–$30/month budget).

## Navigation Flow
- **Parents**: Homepage → “Register Player”/Parent Portal → Team Hub/Merch Page.
- **External Teams**: Homepage → Tournaments → Tournament Registry.
- **Coaches**: Login → Dashboard → Update schedules/moderate photos.
- **Visitors**: Homepage → Teams/Coaches Corner/About/Contact.