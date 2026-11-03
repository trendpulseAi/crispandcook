# Crisp & Cook

Fast static recipe blog built with Astro, hosted free on Cloudflare Pages.

## Settings
Edit `src/site.config.mjs` to add your AdSense ID, Adsterra scripts (Native Banner and Social Bar only), GA4 ID, and Amazon tag.

## Add a post
1. `npm run new -- "Air Fryer Salmon Bites" 2026-11-06`
2. Put the photo in the new folder as `cover.jpg`.
3. Fill in `index.md`, edit it by hand, and set `draft: false`.
4. Commit and push. Cloudflare publishes it automatically.

Posts with a future `date` stay hidden until that day. The daily GitHub Action rebuilds the site so they go live on schedule.

## Cloudflare Pages build settings
- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
