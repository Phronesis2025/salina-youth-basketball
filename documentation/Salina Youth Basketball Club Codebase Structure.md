# Salina Youth Basketball Club Codebase Structure (Updated)

## Root Directory

```
salina-youth-basketball/
├── .git/                  # Git version control
├── .next/                 # Next.js build output
├── .cursor/               # Cursor IDE configuration
├── documentation/         # Project docs, drills, and planning
│   ├── drills.csv
│   ├── drills.json
│   ├── Salina Youth Basketball Club - PROGRESS.md
│   ├── Salina Youth Basketball Club Codebase Structure.md
│   ├── Salina Youth Basketball Club - FUTURE_IMPROVEMENTS.md
│   ├── Salina Youth Basketball Club Website Structure.md
│   ├── Salina Youth Basketball Club Website - Phase 2 Content and Structure.md
│   └── Salina Youth Basketball Club Website - Phase 1 Project Document.md
├── node_modules/          # Node.js dependencies
├── public/                # Static assets
│   ├── images/            # Image assets
│   ├── videos/            # Video assets
│   ├── fullcalendar/      # FullCalendar assets
│   ├── next.svg
│   ├── vercel.svg
│   ├── globe.svg
│   ├── file.svg
│   └── window.svg
├── src/                   # Source code
│   ├── app/               # Next.js app directory (App Router)
│   │   ├── layout.tsx     # Root layout component
│   │   ├── global.css     # Global styles
│   │   ├── ClientLayout.tsx # Client-side layout wrapper
│   │   ├── page.tsx       # Homepage
│   │   ├── favicon.ico    # Site favicon
│   │   ├── about/         # About page
│   │   │   └── page.tsx
│   │   ├── coaches/       # Coach dashboard and resources
│   │   │   ├── page.tsx   # Main coach dashboard
│   │   │   ├── login/     # Coach login
│   │   │   ├── videos/    # Video resources
│   │   │   ├── resources/ # General resources
│   │   │   ├── rules/     # Rules and regulations
│   │   │   ├── highlight/ # Game highlights
│   │   │   └── drills/    # Drill library
│   │   ├── join/          # Team registration
│   │   │   ├── page.tsx
│   │   │   ├── status/    # Registration status
│   │   │   │   └── page.tsx
│   │   │   └── confirm/   # Registration confirmation
│   │   │       └── page.tsx
│   │   ├── shop/          # E-commerce store
│   │   │   ├── page.tsx   # Shop homepage
│   │   │   ├── checkout/  # Checkout process
│   │   │   │   └── page.tsx
│   │   │   ├── confirmation/ # Order confirmation
│   │   │   │   └── page.tsx
│   │   │   ├── cart/      # Shopping cart
│   │   │   │   └── page.tsx
│   │   │   ├── product/   # Individual product pages
│   │   │   └── [category]/ # Category pages
│   │   ├── schedules/     # Game schedules
│   │   │   └── page.tsx
│   │   ├── signup/        # General signup pages
│   │   │   └── page.tsx
│   │   ├── teams/         # Team information
│   │   │   ├── page.tsx   # Teams overview
│   │   │   └── [id]/      # Individual team pages
│   │   └── tournaments/   # Tournament information
│   │       └── page.tsx
│   ├── components/        # Reusable React components
│   │   ├── ui/            # Base UI components (shadcn/ui)
│   │   │   ├── accordion.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── select.tsx
│   │   ├── homepage/      # Homepage-specific components
│   │   │   ├── CoachesCorner.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── NewsCarousel.tsx
│   │   │   ├── SchedulePreview.tsx
│   │   │   ├── TeamPreview.tsx
│   │   │   └── ValuesSection.tsx
│   │   └── common/        # Shared layout components
│   │       ├── Footer.tsx
│   │       └── Navbar.tsx
│   ├── lib/               # Utility functions and configurations
│   │   ├── supabaseClient.ts # Legacy Supabase client
│   │   ├── utils.ts       # General utilities
│   │   ├── supabase/      # Supabase configuration
│   │   │   ├── client.ts  # Client-side Supabase
│   │   │   └── server.ts  # Server-side Supabase
│   │   ├── shop/          # Shop-related utilities
│   │   │   └── data.ts
│   │   ├── schedules/     # Schedule utilities
│   │   │   └── data.ts
│   │   ├── tournaments/   # Tournament utilities
│   │   └── types/         # Type definitions
│   └── types/             # Global TypeScript definitions
│       └── latex.d.ts
├── pages/                 # API routes (Pages Router)
│   └── api/               # Backend API endpoints
│       ├── auth/          # Authentication endpoints
│       │   └── login.ts
│       ├── coaches/       # Coach-specific endpoints
│       │   ├── get-team-game-results.ts
│       │   ├── game-result-add.ts
│       │   ├── schedule-update.ts
│       │   ├── schedule-add.ts
│       │   ├── roster-add.ts
│       │   ├── roster-remove.ts
│       │   ├── news-add/
│       │   ├── news-update/
│       │   ├── news-delete/
│       │   └── get-team-news/
│       ├── create-join-request.ts      # Team registration
│       ├── get-join-request.ts
│       ├── update-join-request.ts
│       ├── create-printful-order.ts    # E-commerce integration
│       ├── printful-webhooks.ts
│       ├── stripe-payment.ts
│       ├── send-email.ts               # Email notifications
│       ├── create-tournament-registration.ts # Tournament registration
│       ├── get-team-schedules.ts       # Schedule data
│       ├── get-team-players.ts         # Player data
│       ├── get-coach-team.ts           # Coach assignments
│       └── get-coach-role.ts           # Coach permissions
├── .eslintrc.json         # ESLint configuration (legacy)
├── eslint.config.mjs      # ESLint configuration (modern)
├── next.config.js         # Next.js configuration (legacy)
├── next.config.ts         # Next.js configuration (TypeScript)
├── next-env.d.ts          # Next.js TypeScript definitions
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Dependency lock file
├── postcss.config.js      # PostCSS configuration for Tailwind
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── components.json        # shadcn/ui component configuration
├── README.md              # Project overview
├── .gitignore             # Git ignore rules
└── fullcalendar-core-6.1.15.tgz # FullCalendar package
```

## Architecture Overview

### Frontend (Next.js 13+ App Router)

- **Framework**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS with custom color scheme (navy, white, red)
- **UI Components**: shadcn/ui component library
- **Typography**: Inter (body), Rubik (headings)
- **State Management**: React hooks (useState, useEffect)

### Backend (API Routes)

- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **E-commerce**: Printful integration for merchandise
- **Payments**: Stripe integration
- **Email**: Custom email service

### Key Features

1. **Homepage**: Hero section, team previews, schedule previews, news carousel
2. **Coach Dashboard**: Team management, drill library, game results, roster management
3. **Team Registration**: Multi-step registration process with status tracking
4. **E-commerce Store**: Printful-integrated merchandise store
5. **Schedule Management**: Game schedules and tournament information
6. **Team Pages**: Individual team information and rosters

### Development Standards

- **Language**: TypeScript for all files
- **Components**: Functional components with React hooks
- **Naming**: PascalCase for components, camelCase for functions
- **Error Handling**: Try-catch blocks for API calls
- **Testing**: Jest for unit tests
- **Mobile-First**: Responsive design with Tailwind breakpoints

## Key Notes

- **src/app/**: Next.js App Router with file-based routing
- **src/components/**: Organized by feature (homepage, common) and type (ui)
- **src/lib/**: Utilities, API clients, and type definitions
- **pages/api/**: RESTful API endpoints for all backend functionality
- **documentation/**: Comprehensive project documentation and planning

_This structure reflects the current state of the codebase as of this update._
