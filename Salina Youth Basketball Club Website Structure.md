# Salina Youth Basketball Club Website Structure

## Root
- **URL**: `/`
- **Components**:
  - **Header**: Sticky navigation bar with logo, menu (Home, Teams, Coaches Corner, Tournaments, Shop, Parent Portal, About/Contact), and login link.
  - **Main Content**: Dynamic page content based on route.
  - **Footer**: Links (Newsletter Signup, Privacy Policy, Terms of Service), contact info, social media icons.
- **Purpose**: Provides consistent navigation and branding across all pages.

## Pages
1. **Homepage** (`/`)
   - **Purpose**: Showcase the club, drive key actions (register, shop, explore).
   - **Components**:
     - Hero: Video with overlay text and CTAs (“Sign Up for Tournament,” “Register Player,” “Register a New Player”).
     - Values: Placeholder text (“Teamwork, Discipline, Basketball Excellence”) with icons.
     - News Carousel: 3–5 cards with modals for full articles (Supabase-driven).
     - Teams Preview: 4–6 team cards linking to Team Hub.
     - Schedules Preview: FullCalendar widget for upcoming events.
     - Tournaments Callout: Banner linking to Tournament Registry.
     - Merch Preview: 2–3 t-shirt cards linking to Merch Page.
     - Coaches Corner Preview: 1–2 article cards.
     - About/Contact: Brief intro and contact form.
     - Newsletter Signup: Email form.
   - **Dynamic Data**: News, teams, schedules (Supabase).
   - **Integrations**: Stripe for registration CTAs.

2. **Team Hub** (`/teams`)
   - **Purpose**: Browse all 20+ teams.
   - **Components**:
     - Team Grid: Filterable cards (name, age group, gender, thumbnail).
     - Search Bar: Optional team name search.
     - CTA: “View All Schedules” (master calendar).
   - **Dynamic Data**: Team list (Supabase `teams` table).
   - **Sub-Pages**:
     - **Team Sub-Page** (`/teams/[teamId]`, e.g., `/teams/u12-boys`)
       - **Purpose**: Detailed team info.
       - **Components**:
         - Coach Bio: Placeholder text and headshot.
         - Core Values: Placeholder (“Teamwork, Leadership, Skill Building”).
         - Schedules: Tabbed FullCalendar (Practice, Games, Tournaments) with Google Calendar sync.
         - Roster: List of players and numbers (e.g., “Liam Johnson, #3”).
         - Gallery: Masonry grid of user-submitted photos with submission form.
         - Team Shirts: 2–3 t-shirt cards with Stripe checkout.
       - **Dynamic Data**: Schedules, roster, photos (Supabase).
       - **Integrations**: Stripe, Printful for shirts.

3. **Coaches Corner** (`/coaches-corner`)
   - **Purpose**: Provide AI-generated skill-building resources.
   - **Components**:
     - Article Grid: Static articles (e.g., “5 Dribbling Drills”) with categories (Skills, Parent Tips).
     - Video Section: 1–3 embedded videos (e.g., “Shooting Basics”).
     - CTA: Optional “Submit a Topic” form.
   - **Dynamic Data**: Articles, videos (Supabase `resources` table).

4. **Tournament Registry** (`/tournaments`)
   - **Purpose**: Facilitate external team signups.
   - **Components**:
     - Embedded Form: TourneyMachine iframe (collects team name, coach info, etc.).
     - Tournament List: Static list or calendar of events.
     - CTA: “Contact Us” link.
   - **Integrations**: TourneyMachine iframe.

5. **Merch Page** (`/shop`)
   - **Purpose**: Sell team and tournament t-shirts.
   - **Components**:
     - Product Grid: T-shirts (2–3 per team/tournament) with images, descriptions, prices.
     - Limited-Edition Highlight: Countdown timer for tournament shirts.
     - Filter: By team or tournament.
   - **Dynamic Data**: Products (Supabase `products` table).
   - **Integrations**: Stripe, Printful API.

6. **Parent Portal** (`/portal`, protected)
   - **Purpose**: Secure area for parents.
   - **Components**:
     - Dashboard: Team schedules (calendar), roster (players/numbers), payment history.
     - Newsletter Toggle: Subscribe/unsubscribe.
     - CTA: “Update Profile” form.
   - **Dynamic Data**: Schedules, roster, payments (Supabase, Stripe).
   - **Security**: Supabase Auth for login.

7. **About/Contact** (`/about`)
   - **Purpose**: Share club info and contact options.
   - **Components**:
     - About: Placeholder mission (“Salina Youth Basketball Club fosters teamwork...”).
     - Contact Form: Name, email, message fields.
     - Map: Embedded Google Map (Salina, Kansas).
   - **Dynamic Data**: Contact submissions (Supabase `contacts` table).

8. **News Page** (`/news`)
   - **Purpose**: Archive news articles.
   - **Components**:
     - Article Grid: Cards with modals for full text.
     - Filter: By date or category (optional).
   - **Dynamic Data**: News (Supabase `news` table).

## Key Features
- **Navigation**: Sticky header and footer for consistent access.
- **Dynamic Components**: News carousel, team filters, schedules, product grid.
- **Protected Routes**: Parent Portal and coach dashboard (Supabase Auth).
- **Integrations**:
  - Stripe: Payments for registrations, dues, t-shirts.
  - Printful: T-shirt fulfillment.
  - TourneyMachine: Embedded tournament form.
  - Supabase: Data, storage, authentication.
- **SEO**: Optimized for “Salina youth basketball” with meta tags.
- **Accessibility**: ARIA labels, keyboard navigation.

## User Flows
- **Parents**: Homepage → Register/Player Portal → Team Hub/Shop.
- **External Teams**: Homepage → Tournaments → Registry.
- **Coaches**: Login → Dashboard → Update schedules/photos.
- **Visitors**: Homepage → Teams/Coaches Corner/About.