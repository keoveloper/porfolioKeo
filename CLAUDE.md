# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server (localhost:4321)
pnpm build      # Build for production
pnpm preview    # Preview production build locally
```

## Architecture

This is a single-page Astro 5 portfolio site deployed to Netlify.

**Stack:** Astro 5 + Tailwind CSS 4 (via `@tailwindcss/vite` plugin) + TypeScript + pnpm

**Page structure:** `src/pages/index.astro` composes all sections in order: `Navbar → Hero → About → Skills → Experience → Projects → Contact`. Each section is a standalone `.astro` component in `src/components/`.

**Layout:** `src/layouts/Layout.astro` is the global HTML shell. It sets up the dark theme (`bg-gray-950`), Google Fonts (Inter + JetBrains Mono), a fixed grid background pattern, and an IntersectionObserver-based scroll animation system (`.fade-in` → `.animate-in` class toggle).

**API Route:** `src/pages/api/send.json.ts` handles contact form submissions via POST. It uses the Resend SDK to send emails and requires `RESEND_API_KEY` in `.env`. The route has `prerender = false` since Netlify adapter is used in static mode for everything else.

**Styling:** `src/styles/global.css` only imports Tailwind. Component-scoped styles use `@reference 'tailwindcss'` to access Tailwind utilities inside `<style>` blocks. The color scheme is dark gray (`gray-950` base) with purple-to-blue gradients as the primary accent.

**Adapter:** `astro.config.mjs` uses `@astrojs/netlify/static` — the site is mostly static-rendered, with only the API route rendered at runtime.

## Environment Variables

- `RESEND_API_KEY` — required for the contact form to send emails
