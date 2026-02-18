# Nossa Snacks - CLAUDE.md

## Project Overview

**Nossa Snacks** is a Brazilian snack food brand's pre-launch landing page and email waitlist platform. The site is written in Portuguese and targets a July 2026 launch. It collects emails via a waitlist form and integrates with Brevo (formerly Sendinblue) for email list management.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4 + inline styles with CSS `clamp()` for fluid typography
- **Animations:** Framer Motion
- **Email Service:** Brevo API
- **Deployment:** Vercel

## Common Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm start        # Serve production build
```

There is no test suite configured. Lint before committing.

## Project Structure

```
app/
  api/subscribe/route.ts   # Email signup API endpoint (POST only)
  privacy/page.tsx         # LGPD privacy policy page
  layout.tsx               # Root layout + metadata
  page.tsx                 # Home page
  globals.css              # Global styles, Reigo font definitions, CSS tokens
components/
  Hero.tsx                 # Main hero section with waitlist form
  CustomCursor.tsx         # Animated custom cursor (Framer Motion)
  Footer.tsx               # Footer with links
lib/
  brevo.ts                 # Brevo API integration
public/                    # Static assets (fonts, SVGs, images)
```

## Environment Variables

Create a `.env.local` for local development:

```
BREVO_API_KEY=your_key_here
BREVO_LIST_ID=your_list_id_here
```

When `BREVO_API_KEY` is missing, the API route runs in mock mode (logs to console instead of calling Brevo).

## Key Conventions

- **Language:** All user-facing text is in Brazilian Portuguese.
- **Components:** Use `"use client"` only where needed (Hero, CustomCursor). Pages and layout are server components.
- **Styling:** CSS design tokens are defined in `:root` inside `globals.css`. Use Tailwind for layout/spacing; use inline styles for complex responsive values (`clamp()`).
- **Colors:** Dark brown background `#291918`, cream foreground `#F9EFE1`.
- **Fonts:** Custom Reigo family (7 weights, loaded via `@font-face` in `globals.css`) + Poppins from Google Fonts.
- **Hydration:** Components that depend on `window` (e.g., `window.matchMedia`) must guard against SSR with null checks. See `Hero.tsx` for the pattern.
- **LGPD compliance:** The waitlist form includes an explicit consent checkbox (unchecked by default). Do not remove or pre-check it.
- **TypeScript:** Strict mode is on. Avoid `any`.
- **Error handling:** API routes return descriptive error messages in Portuguese.
