# personal-website-v2

Personal portfolio of Luis Michael Goyone, a software engineer who builds web products and the AI agent workflows that ship them.

Live at **https://luisgoyone.com**

## Stack

Next.js 16 (App Router, static export), TypeScript, Tailwind CSS v4, and markdown posts (gray-matter + marked).

## Editing content

- Almost all content (experience, projects, the agent pipeline, availability, testimonials, Now, links) lives in `lib/data.ts`. The home intro paragraph is in `app/page.tsx`.
- Testimonials and Now are hidden while their lists in `lib/data.ts` are empty. Only add real quotes.
- Posts are markdown files in `content/writing/` with `title`, `date`, `summary` and `draft` front matter. Drafts show in `npm run dev` (marked "draft") and are left out of builds, the RSS feed (`/feed.xml`) and the sitemap. The Writing nav link and home section appear once a post is published.
- Site metadata, Open Graph tags, and JSON-LD are in `app/layout.tsx`; the canonical URL is in `lib/site.ts`.
- `app/robots.ts` and `app/sitemap.ts` generate `robots.txt` and `sitemap.xml` at build time.
- Public GitHub repos tagged with the `portfolio` topic are synced into `lib/github-projects.json` (archive only) by the hourly **Sync GitHub projects** workflow, which opens a PR with any changes (or run it now with `gh workflow run sync-projects.yml`). Remove the topic to take a repo off the site. Run it locally with `GITHUB_TOKEN=$(gh auth token) node scripts/sync-github-projects.mjs`.
- `public/` holds the resume PDF (`Luis_Goyone_Resume.pdf`), the Open Graph image, and `llms.txt`.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static site in ./out
```

## Deployment

Every push to `main` (and every published release) triggers `.github/workflows/deploy.yml`, which builds the site and deploys `./out` to GitHub Pages. The custom domain `luisgoyone.com` is set in the repo's Pages settings (DNS is on Cloudflare), so the site is served from the root with no base path.
