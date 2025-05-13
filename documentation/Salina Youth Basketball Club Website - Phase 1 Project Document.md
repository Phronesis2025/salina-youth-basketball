# Salina Youth Basketball Club Website - Phase 1: Define Goal and Audience

## Project Overview
The Salina Youth Basketball Club website is a custom-built, mobile-first platform designed to promote the club, streamline registrations, and engage parents, players, and external teams in central Kansas. It aims to simplify administrative tasks for the club owner, enhance user experience for parents, and generate revenue through merchandise sales. Built from scratch using Cursor, with Supabase for the database, Stripe for payments, and a print-on-demand system for merchandise, the site will feature a sporty, cutting-edge, trendy, and minimalistic design optimized for both mobile and desktop.

## Primary Purpose
- **Showcase the Club**: Highlight the Salina Youth Basketball Club’s values, teams, and energy to attract and retain members.
- **Streamline Operations**: Provide an easy way for parents to register players, pay dues, and access schedules, and for external teams to sign up for tournaments.
- **Generate Revenue**: Offer team and tournament t-shirts via a merchandise shop to create additional income.

## Specific Goals
- Provide team schedules, tournament schedules, and club information to parents, players, and external teams.
- Enable coaches to update team schedules and an admin to manage monthly news updates.
- Facilitate secure payments for registrations, dues, and merchandise using Stripe.
- Reduce administrative time by automating tasks (e.g., registrations, payments) currently handled manually or via TourneyMachine.
- Increase parent satisfaction through a user-friendly Parent Portal and newsletter signup.

## Target Audience
- **Primary**: Parents of grade school, middle school, and high school children (ages 5–18) interested in basketball, primarily in central Kansas (Salina and surrounding areas).
- **Secondary**: Coaches of external youth teams registering for tournaments, likely from the Midwest region.
- **Characteristics**: Busy parents valuing convenience, potentially non-tech-savvy, seeking easy access to schedules, payments, and news. Coaches need clear tournament registration processes.

## Problems/Needs Solved
- **For Parents**: Simplifies player registration, dues payments, and schedule access, reducing communication with coaches. Provides a Parent Portal for payment history and schedules, plus a Coaches Corner for skill-building resources.
- **For External Teams**: Offers a straightforward tournament registration process (via embedded TourneyMachine form) with secure payments.
- **For Club Owner**: Automates registrations, payments, and schedule updates, saving hours weekly compared to manual processes or TourneyMachine. Generates revenue via hands-off merchandise sales.

## Tone and Vibe
- **Sporty**: Reflects basketball energy with dynamic imagery (e.g., game highlights, player action shots).
- **Cutting-Edge and Trendy**: Modern design with bold colors (e.g., orange, black, white), clean fonts (e.g., Montserrat, Bebas Neue), and interactive elements like carousels.
- **Minimalistic**: Clean layouts, intuitive navigation, and prominent CTAs (e.g., “Register Now”) to avoid clutter and enhance usability.

## Inspirations and Examples
- **TeamSnap (https://www.teamsnap.com/teams)**: Roster and schedule management, user-friendly interface.
- **LeagueApps (https://leagueapps.com/youth-sports-websites/)**: Seamless registration and payment flows.
- **RCX Sports (https://rcxsports.com/)**: Bold visuals, tournament focus.
- **TheTournament (https://thetournament.com/)**: Hype video, event-driven design.
- **ProSupps (https://prosupps.darkroom.engineering/)**: Minimalistic, trendy aesthetic.

## Additional Details
- **Scope**:
  - 20+ teams (boys and girls, grade school, middle school, high school).
  - Merchandise: 2–3 t-shirts per team and 2–3 per tournament, fulfilled via print-on-demand (e.g., Printful), with AI-generated designs.
  - Tournament Registry: Embed TourneyMachine for now, collecting team name, coach name/email, player count, age group, and other fields for various tournament types (boys/girls, age-based).
  - Coaches Corner: Static AI-generated content (articles, videos) for parents/players, posted regularly.
  - News: Monthly updates displayed in a carousel or card layout, with modals for full articles.
  - Newsletter: Optional signup for parents and external teams, managed via a free service (e.g., MailerLite).
- **Technical Requirements**:
  - Built from scratch using Cursor, Next.js (frontend), Tailwind CSS (styling), Supabase (database, authentication, storage), Stripe (payments), and Vercel (hosting).
  - Budget: $20–$30/month, covering Supabase, Vercel, and Stripe usage (no upfront costs for Printful).
  - Coaches update schedules via a custom dashboard; one admin manages news.
- **Geographic Focus**: Central Kansas (Salina-based, serving surrounding areas). Optimize for local SEO (e.g., “Salina youth basketball”).

## Benefits for the Club Owner
- **Time Savings**: Automates registrations, payments, and schedule updates, reducing hours spent on manual tasks or TourneyMachine.
- **Cost Savings**: Low operational cost ($20–$30/month), with print-on-demand eliminating inventory expenses.
- **Revenue**: Merchandise sales (team/tournament t-shirts) generate income with minimal effort.
- **Parent Satisfaction**: User-friendly features (Parent Portal, schedules, newsletter) reduce inquiries and improve engagement.

## Next Steps
Proceed to **Phase 2: Plan the Content and Structure** to define the sitemap, page-specific content, and navigation structure, ensuring alignment with the club’s goals and user needs.