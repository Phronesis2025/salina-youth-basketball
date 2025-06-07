# Codebase Structure (as of now)

## Root

- carousel.txt
- printful_products/
- printful_products.zip
- Freelance.pdf
- Screenshot 2025-05-13 182710.png
- HTML_CSS_JS.txt
- README.md
- WCS-Grok.txt
- WCS User Journey MOSCOW plan.txt
- WCS Project Statement.txt
- Ideas.txt
- salina-youth-basketball/
- ...

## salina-youth-basketball/

- CODEBASE_STRUCTURE.md
- package.json
- package-lock.json
- eslint.config.mjs
- tsconfig.json
- tailwind.config.js
- README.md
- postcss.config.js
- next.config.ts
- next.config.js
- components.json
- .prettierrc
- .eslintrc.json
- next-env.d.ts
- .gitignore
- fullcalendar-core-6.1.15.tgz
- .next/
- .git/
- .cursor/
- documentation/
- public/
- src/
- pages/

### documentation/

- Salina Youth Basketball Club Website Structure.md
- Salina Youth Basketball Club Website - Phase 2 Content and Structure.md
- Salina Youth Basketball Club Website - Phase 1 Project Document.md
- Salina Youth Basketball Club Codebase Structure.md
- Salina Youth Basketball Club - PROGRESS.md
- Salina Youth Basketball Club - FUTURE_IMPROVEMENTS.md
- drills.json
- drills.csv

### public/

- \_document.tsx
- favicon.ico
- window.svg
- vercel.svg
- next.svg
- globe.svg
- file.svg
- fullcalendar/
- videos/

### src/

- styles/
- components/
- lib/
- types/

#### src/components/

- layout/
- shop/
- ui/
- homepage/
- common/

##### src/components/common/

- Navbar.tsx
- Footer.tsx

##### src/components/ui/

- select.tsx
- label.tsx
- input.tsx
- form.tsx
- dropdown-menu.tsx
- dialog.tsx
- card.tsx
- button.tsx
- accordion.tsx

#### src/lib/

- utils.ts
- supabaseClient.ts
- supabase/
- tournaments/
- shop/
- schedules/
- types/

##### src/lib/supabase/

- server.ts
- client.ts

#### src/types/

- latex.d.ts

### pages/

- layout.tsx
- \_app.tsx
- test.tsx
- index.tsx
- hello.tsx
- \_document.tsx
- api/
- coaches/
- schedules/
- tournaments/
- teams/
- signup/
- shop/
- join/
- about/

#### pages/api/

- stripe-payment.ts
- get-all-schedules.ts
- update-join-request.ts
- send-email.ts
- printful-webhooks.ts
- get-team-schedules.ts
- get-team-players.ts
- get-join-request.ts
- get-coach-team.ts
- get-coach-role.ts
- create-tournament-registration.ts
- create-printful-order.ts
- create-join-request.ts
- coaches/
- auth/

##### pages/api/coaches/

- schedule-update.ts
- schedule-add.ts
- roster-remove.ts
- roster-add.ts
- news-update.ts
- news-delete.ts
- news-add.ts
- get-team-news.ts
- get-team-game-results.ts
- game-result-add.ts

##### pages/api/auth/

- login.ts

#### pages/coaches/

- index.tsx
- page.tsx
- videos/
- rules/
- resources/
- login/
- drills/
- highlight/

##### pages/coaches/videos/

- index.tsx

##### pages/coaches/rules/

- index.tsx

##### pages/coaches/resources/

- index.tsx

##### pages/coaches/login/

- index.tsx

##### pages/coaches/drills/

- [id]/

###### pages/coaches/drills/[id]/

- index.tsx

##### pages/coaches/highlight/

- page.tsx

#### pages/schedules/

- index.tsx

#### pages/join/

- index.tsx
- status/
- confirm/

##### pages/join/confirm/

- index.tsx

##### pages/join/status/

- index.tsx

#### pages/about/

- index.tsx

#### pages/teams/

- index.tsx
- [id]/

##### pages/teams/[id]/

- index.tsx

#### pages/tournaments/

- index.tsx

#### pages/shop/

- index.tsx
- checkout/
- [category]/
- confirmation/
- cart/
- product/

##### pages/shop/cart/

- index.tsx
