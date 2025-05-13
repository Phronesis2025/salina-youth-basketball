# Salina Youth Basketball Club Codebase Structure

## Root Directory
- **Project Type**: Next.js (TypeScript for type safety).
- **Key Files**:
  - `package.json`: Dependencies (next, react, tailwindcss, supabase-js, stripe, swiper, @fullcalendar/core).
  - `.env.local`: Environment variables (Supabase URL/key, Stripe/Printful keys).
  - `next.config.js`: Next.js configuration (e.g., image optimization).
  - `tsconfig.json`: TypeScript settings.
  - `tailwind.config.js`: Tailwind CSS customizations (e.g., sporty colors: orange, black, white).
  - `postcss.config.js`: PostCSS for Tailwind.

## Directory Structure
```
salina-youth-basketball/
├── public/                   # Static assets
│   ├── images/               # Logos, team thumbnails, placeholders
│   ├── favicon.ico           # Site favicon
│   └── videos/               # Hype video (optional)
├── src/                      # Source code
│   ├── components/           # Reusable React components
│   │   ├── common/           # Shared UI elements
│   │   │   ├── Button.tsx    # CTA buttons
│   │   │   ├── Navbar.tsx    # Sticky header
│   │   │   ├── Footer.tsx    # Footer with links
│   │   │   └── Modal.tsx     # News article modals
│   │   ├── homepage/         # Homepage-specific
│   │   │   ├── Hero.tsx      # Video and CTAs
│   │   │   ├── NewsCarousel.tsx # Swiper.js carousel
│   │   │   └── TeamPreview.tsx # Team card grid
│   │   ├── team/             # Team Hub and sub-pages
│   │   │   ├── TeamCard.tsx  # Team grid card
│   │   │   ├── ScheduleTabs.tsx # Tabbed schedule UI
│   │   │   └── GalleryGrid.tsx # Masonry photo grid
│   │   ├── shop/             # Merch Page
│   │   │   ├── ProductCard.tsx # T-shirt card
│   │   │   └── CountdownTimer.tsx # Limited-edition timer
│   │   ├── portal/           # Parent Portal
│   │   │   ├── Dashboard.tsx  # Schedules, roster, payments
│   │   │   └── ProfileForm.tsx # Update profile
│   │   └── coaches/          # Coaches Corner
│   │       ├── ArticleCard.tsx # Article grid card
│   │       └── VideoPlayer.tsx # Embedded video
│   ├── pages/                # Next.js pages
│   │   ├── _app.tsx          # Custom App (global styles, providers)
│   │   ├── _document.tsx     # Custom Document (HTML structure)
│   │   ├── index.tsx         # Homepage
│   │   ├── teams/            # Team Hub
│   │   │   ├── index.tsx     # Team grid
│   │   │   └── [teamId].tsx  # Team sub-page
│   │   ├── coaches-corner.tsx # Coaches Corner
│   │   ├── tournaments.tsx   # Tournament Registry
│   │   ├── shop.tsx          # Merch Page
│   │   ├── portal.tsx        # Parent Portal (protected)
│   │   ├── about.tsx         # About/Contact
│   │   ├── news.tsx          # News Page
│   │   └── api/              # API routes
│   │       ├── auth/         # Supabase Auth endpoints
│   │       ├── teams.ts      # Fetch team data
│   │       ├── schedules.ts  # CRUD for schedules
│   │       ├── payments.ts   # Stripe checkout
│   │       └── products.ts   # Fetch products
│   ├── lib/                  # Utilities and integrations
│   │   ├── supabase.ts       # Supabase client setup
│   │   ├── stripe.ts         # Stripe client setup
│   │   ├── printful.ts       # Printful API helpers
│   │   └── types.ts          # TypeScript interfaces (Team, Product, etc.)
│   ├── styles/               # Global and component styles
│   │   ├── globals.css       # Tailwind imports, base styles
│   │   └── fonts.css         # Custom fonts (e.g., Montserrat, Bebas Neue)
│   └── hooks/                # Custom React hooks
│       ├── useAuth.ts        # Supabase Auth state
│       ├── useTeams.ts       # Fetch team data
│       └── useCart.ts        # Shopping cart state
├── tests/                    # Unit and integration tests
│   ├── components/           # Component tests
│   └── pages/                # Page tests
├── scripts/                  # Utility scripts
│   └── seed.ts               # Seed Supabase with initial data
└── README.md                 # Project documentation
```

## Key Components
- **Components**: Modular, reusable (e.g., `Button`, `ProductCard`) for consistent UI.
- **Pages**: Map to **Phase 2** sitemap, with dynamic routes for teams.
- **API Routes**: Handle Supabase queries (e.g., fetch news), Stripe sessions, and Printful orders.
- **Utilities**: Centralized Supabase/Stripe/Printful logic for reusability.
- **Hooks**: Manage state and data fetching (e.g., `useAuth` for login status).

## Dependencies
- **Core**: `next`, `react`, `react-dom`, `typescript`.
- **Styling**: `tailwindcss`, `postcss`.
- **Data**: `@supabase/supabase-js`.
- **Payments**: `stripe`.
- **UI**: `swiper`, `@fullcalendar/core`, `@fullcalendar/react`.
- **Testing**: `jest`, `@testing-library/react`.

## Development Workflow
- **Cursor**: Use AI-assisted coding for rapid component/API development.
- **Supabase**: Initialize tables (`teams`, `news`, etc.) and import dataset.
- **Vercel**: Deploy for preview and production.
- **Testing**: Unit tests for components, integration tests for APIs.
- **Secrets**: Store API keys in `.env.local`.

## Scalability and Maintenance
- **Modular Design**: Add new teams or features by extending components/routes.
- **Supabase**: Flexible schema for future data (e.g., more tournaments).
- **Budget**: Vercel/Supabase costs within $20–$30/month (free tiers initially).
- **Documentation**: README and inline comments for admin handoff.