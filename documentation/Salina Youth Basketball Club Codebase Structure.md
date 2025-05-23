# Salina Youth Basketball Club Codebase Structure (Updated)

## Root Directory

```
salina-youth-basketball/
├── .git/                  # Git version control
├── .next/                 # Next.js build output
├── documentation/         # Project docs, drills, and planning
│   ├── drills.csv
│   ├── drills.json
│   ├── Salina Youth Basketball Club Codebase Structure.md
│   └── ...
├── node_modules/          # Node.js dependencies
├── public/                # Static assets (images, favicon, etc.)
├── src/                   # Source code
│   ├── app/               # Next.js app directory (routing, pages)
│   │   ├── layout.tsx
│   │   ├── global.css
│   │   ├── ClientLayout.tsx
│   │   ├── page.tsx
│   │   ├── favicon.ico
│   │   ├── coaches/
│   │   │   ├── page.tsx
│   │   │   └── drills/
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   ├── join/
│   │   │   ├── page.tsx
│   │   │   ├── status/
│   │   │   │   └── page.tsx
│   │   │   └── confirm/
│   │   │       └── page.tsx
│   │   ├── shop/
│   │   │   ├── page.tsx
│   │   │   ├── checkout/
│   │   │   │   ├── CheckoutPage.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── confirmation/
│   │   │   │   └── page.tsx
│   │   │   ├── cart/
│   │   │   │   └── page.tsx
│   │   │   ├── product/
│   │   │   └── [category]/
│   │   ├── schedules/
│   │   ├── signup/
│   │   ├── teams/
│   │   └── tournaments/
│   ├── components/        # Reusable React components
│   │   ├── ui/
│   │   │   ├── accordion.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   └── select.tsx
│   │   ├── homepage/
│   │   │   ├── CoachesCorner.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── NewsCarousel.tsx
│   │   │   ├── SchedulePreview.tsx
│   │   │   ├── TeamPreview.tsx
│   │   │   └── ValuesSection.tsx
│   │   └── common/
│   │       ├── Footer.tsx
│   │       └── Navbar.tsx
│   ├── lib/               # Utility functions and API clients
│   │   ├── supabaseClient.ts
│   │   ├── utils.ts
│   │   ├── shop/
│   │   │   └── data.ts
│   │   ├── schedules/
│   │   │   └── data.ts
│   │   └── types/
│   ├── types/             # TypeScript type definitions
│   │   └── latex.d.ts
├── pages/                 # API routes (Next.js API)
│   └── api/
│       ├── create-join-request.ts
│       ├── create-printful-order.ts
│       ├── get-join-request.ts
│       ├── printful-webhooks.ts
│       ├── send-email.ts
│       ├── stripe-payment.ts
│       └── update-join-request.ts
├── .eslintrc.json         # ESLint config
├── eslint.config.mjs      # ESLint config (module)
├── next.config.js         # Next.js config (JS)
├── next.config.ts         # Next.js config (TS)
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Dependency lock file
├── postcss.config.js      # PostCSS config for Tailwind
├── tailwind.config.js     # Tailwind CSS config
├── tsconfig.json          # TypeScript config
├── README.md              # Project overview
└── .gitignore             # Git ignore rules
```

## Key Notes

- **src/app/**: Main Next.js app directory, with subfolders for each route and feature (coaches, join, shop, etc.).
- **src/components/**: All UI and page components, organized by feature and type.
- **src/lib/**: Utility code, including Supabase client and data helpers.
- **pages/api/**: API endpoints for backend logic (join requests, Printful, Stripe, email, etc.).
- **documentation/**: Project documentation, planning, and drill data.

_This structure reflects the current state of the codebase as of this update._
