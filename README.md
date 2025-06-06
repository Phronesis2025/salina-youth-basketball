# Salina Youth Basketball Club

A modern web application for the Salina Youth Basketball Club, built with Next.js, TypeScript, Tailwind CSS, and Supabase. This project supports team management, schedules, tournaments, a shop, and more, with a focus on mobile-first design and a custom color scheme.

---

## Project Overview

- **Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Supabase, Stripe, Radix UI, FullCalendar
- **Styling:** Tailwind CSS with custom colors (navy `#002C51`, red `#F11A20`, white `#FFFFFF`), Inter (body) and Rubik (headings) fonts
- **Features:**
  - Team and schedule management
  - Tournament registration
  - Online shop with Stripe payments
  - Parent and coach portals (Supabase Auth)
  - News, values, and community sections
  - Mobile-first, responsive design

---

## Directory Structure

```
salina-youth-basketball/
├── documentation/         # Project docs, drills, and planning
├── node_modules/          # Node.js dependencies
├── public/                # Static assets (images, favicon, videos)
├── src/                   # Source code
│   ├── app/               # Next.js app directory (routing, pages)
│   ├── components/        # Reusable React components (ui, homepage, common)
│   ├── lib/               # Utility functions and API clients (Supabase, shop, schedules)
│   └── types/             # TypeScript type definitions
├── pages/                 # API routes (Next.js API)
│   └── api/               # Backend endpoints (join, shop, email, etc.)
├── .eslintrc.json         # ESLint config
├── tailwind.config.js     # Tailwind CSS config (custom colors, fonts)
├── tsconfig.json          # TypeScript config
├── package.json           # Project dependencies and scripts
└── README.md              # Project overview (this file)
```

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in Supabase/Stripe keys.
3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## Styling & Design

- **Colors:** Navy (`#002C51`), Red (`#F11A20`), White (`#FFFFFF`)
- **Fonts:** Inter (body), Rubik (headings), Montserrat, Bebas Neue (footer)
- **Mobile-first:** Uses Tailwind's responsive breakpoints
- **Hover effects:** Red accents (e.g., `hover:border-red-600`)

---

## Key Technologies

- **TypeScript:** All code is written in TypeScript for type safety
- **Supabase:** Auth, database, and API integration (see `/src/lib/supabaseClient.ts`)
- **Stripe:** Secure payments for the shop
- **Radix UI:** Accessible UI primitives
- **Jest:** Unit tests for components

---

## Contributing

- Use functional React components and hooks
- Follow Tailwind and project color/typography guidelines
- Write unit tests for new components
- Log errors for failed Supabase/Stripe queries (do not display to users)

---

## More Info

- See `/documentation/Salina Youth Basketball Club Codebase Structure.md` for detailed structure
- See `/documentation/Salina Youth Basketball Club Website Structure.md` for feature planning

---

© 2024 Salina Youth Basketball Club / World Class Sports
