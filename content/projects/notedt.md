## The problem

Most budget apps want an account, and often your bank login, before they show you anything. Notedt needs neither. Everything stays in your browser.

## What it does

You add income and expenses, and the overview shows the month's income, expenses and net against the month before, plus how your spending splits across categories. Each category can have a monthly budget. The bar fills as you spend and turns red when you go over. Rent, bills and salary can be set as recurring, and they add themselves on their day.

There's no backend. Data lives in `localStorage`, with JSON backup and restore, plus CSV export and import. It installs as a PWA and works offline. On a phone it switches to a bottom tab bar and bottom-sheet dialogs.

## How it's built

The first version stored each transaction under its own numeric key in `localStorage`. The current one saves a single versioned object, and older data is migrated on first load, so nobody loses entries when they update.

React 19, React Router, React Hook Form, Tailwind CSS 4 and strict TypeScript, built with Vite and vite-plugin-pwa. The data logic is plain functions tested with Vitest. Playwright runs the production build on a desktop and a Pixel 7 profile, offline mode included. GitHub Actions runs it all on every PR, and it deploys to Vercel.
