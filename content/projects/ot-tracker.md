## The problem

Overtime requests need an employee to log them, a supervisor to approve them, and someone to add up the hours at the end of the month. OT Tracker puts all three in one app, with each role seeing only what it should.

## What it does

Employees submit overtime with a start and end time, and the server works out the duration (between 15 minutes and 12 hours). They can edit or delete a request until it's reviewed. Supervisors get a dashboard for their department, with monthly totals, a 30-day trend, hours by department and this month's top overtime against last month's. They approve or reject their team's requests, but never their own. Admins see every department and manage users. A password reset gives a temporary password that has to be changed at the next login.

"Today" and "this month" follow a configurable timezone, Asia/Manila by default. The user is checked again on every request, so deactivating someone or changing their role takes effect immediately.

## How it's built

The front end is React 18, TypeScript and Vite, with MUI, TanStack Query, Zustand for the session and Recharts for the charts. The back end is NestJS with TypeORM migrations on PostgreSQL 15, plus JWT auth, bcrypt, helmet and a five-per-minute login limit. Jest covers units, and Supertest runs end-to-end against a real Postgres. Pushing a version tag runs CI, deploys the front end to Netlify and the API to Render, and the database is on Neon.

You can try it with `admin@company.com`, `supervisor@company.com` or `employee@company.com` (password `password123`). The demo data resets on the 1st of every month.
