## The problem

Every project I run has its own repo, and every repo has its own PRs, CI runs, Vercel deploys and releases. Finding out what was broken or waiting on me meant going through GitHub and Vercel one repo at a time.

## What it does

Outpost connects to my repos through a GitHub App and puts all of that on one dense, dark dashboard. My Work is the inbox: PRs waiting on my review, my own PRs and where they're stuck, PRs nobody has touched in a week, and branches with failing CI. Overview shows the same problems per repo, next to each repo's last production deploy, latest release and PRs per week.

It can also act on what it finds. I can re-run failed jobs, nudge reviewers on a PR, or redeploy a failed Vercel production deploy from the page. A Slack message lists what needs me every morning at 9, and ⌘K jumps to any repo or open PR.

Only I can sign in. For a client, I can make a read-only link to one repo's PRs, CI and latest release.

## Stack

Next.js (App Router) and strict TypeScript, with Tailwind, shadcn/ui and Recharts for the sparklines. Octokit reads GitHub over GraphQL and REST, and the results are cached in Neon Postgres through Drizzle for five minutes, or until a GitHub webhook says something changed. Auth.js handles the GitHub sign-in. Vitest covers the logic, and the Playwright tests run against a mock GitHub API. The demo above was recorded on that same mock. It runs on Vercel.
