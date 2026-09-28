# personal-website-v2

Personal portfolio of Luis Michael Goyone, a software engineer who builds web products and the AI agent workflows that ship them.

Live at **https://luismgoyone.github.io/personal-website-v2/**

## Stack

Next.js 16 (App Router, static export), TypeScript, Tailwind CSS v4, and Shadcn/ui.

## Editing content

- Almost all content (bio, experience, projects, skills, links) lives in `lib/data.ts`.
- Site metadata, Open Graph tags, and JSON-LD are in `app/layout.tsx`; the canonical URL is in `lib/site.ts`.
- `app/robots.ts` and `app/sitemap.ts` generate `robots.txt` and `sitemap.xml` at build time.
- `public/` holds the resume PDF (`Luis_Goyone_Resume.pdf`), the Open Graph image, and `llms.txt`.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
NEXT_PUBLIC_BASE_PATH=/personal-website-v2 npm run build   # static site in ./out
```

## Deployment

Publishing a GitHub release triggers `.github/workflows/deploy.yml`, which builds with the `/personal-website-v2` base path and deploys `./out` to GitHub Pages.
