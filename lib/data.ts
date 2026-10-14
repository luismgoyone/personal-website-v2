import type {
  Education,
  Availability,
  Experience,
  PersonalInfo,
  Project,
  NowEntry,
  PipelineStep,
  Skill,
  SocialLink,
  Testimonial,
} from "@/types/portfolio";
import githubProjects from "./github-projects.json";

export const personalInfo: PersonalInfo = {
  name: "Luis Michael Goyone",
  shortName: "Luis Goyone",
  title: "Software Engineer",
  tagline: "I build web apps, and the AI agents that help me ship them.",
  location: "Philippines · Remote",
  bio: "I'm a software engineer with 4+ years of experience designing and building scalable web applications. I specialize in React and TypeScript, and I care deeply about clean code, great user experiences, and collaborative development.\n\nCurrently at 24metrics, where I build the React front end and Go API with AI agents, and write the specs and docs for what I build. Part-time, I'm a software engineer at Chief (formerly Storytell), where I run my own Claude Code agent pipeline that takes Linear tickets to review-ready pull requests across web, desktop, and Go backend code. Previously at Booky, where I built features used by millions of users across the Philippines.",
};

export const experiences: Experience[] = [
  {
    company: "Chief (formerly Storytell)",
    companyUrl: "https://chief.bot",
    companyDescription:
      "AI meeting assistant that transcribes meetings, summarizes them, and acts on them across tools like Notion, Slack, GitHub, and Linear.",
    role: "Software Engineer (Part-time)",
    summary:
      "Built the Claude Code setup that takes my Linear tickets to review-ready PRs, with a recorded Playwright run on every UI change. Also built the iOS and Android apps.",
    period: "Jun 2026 – Present",
    current: true,
    description: [
      "Merged 149 pull requests in my first three months, 25% of the engineering team's human-authored merges.",
      "Designed and run my own Claude Code pipeline (planner, coder and tester subagents, plus slash commands and skills for scoping, review, browser verification, video proof and review follow-up) that takes Linear tickets to review-ready pull requests across the web app, native desktop app, shared TypeScript libraries, and Go backend.",
      "Every UI change is verified in a real browser with Playwright and recorded as video.",
      "Built native iOS (SwiftUI) and Android (Jetpack Compose) versions of the desktop app.",
      "Agents draft the code; I own scope, review, and what ships.",
    ],
    tech: ["Claude Code", "TypeScript", "SolidJS", "Go", "SwiftUI", "Kotlin", "PostgreSQL", "Playwright"],
  },
  {
    company: "24metrics",
    companyDescription:
      "Ad fraud protection platform that helps businesses ensure genuine, high-quality traffic.",
    role: "Software Engineer",
    period: "Mar 2025 – Present",
    summary:
      "Ad fraud protection platform. Started out hand-coding the front end. Now I build front end and Go back end together with agents, and I write the specs and docs too.",
    current: true,
    description: [
      "Hand-coded the React and TypeScript front end from Figma for my first five months, then spent six months building and launching the company's WordPress site with Elementor, WP Rocket and custom PHP snippets.",
      "Started coding with AI in early 2026, first with Gemini as an assistant, then shipping in Cursor with Claude for review and the harder tasks.",
      "Learned Go in Q3 2026. Now I ship front end and back end changes together, and agents write most of the code.",
      "Designed the front end and back end specs for two customer-facing features and wrote their documentation.",
      "Wrote Cursor skills that create Linear tickets and carry them out to a draft PR with screenshots, plus a developer agent whose rules come from real review comments.",
      "Built a skill that renders documentation screenshots from the real UI with fictional data, so the docs never need a real customer account.",
    ],
    tech: ["React", "TypeScript", "Go", "Cursor", "Claude Code", "Figma", "WordPress"],
  },
  {
    company: "Booky",
    companyDescription:
      "Deals and discoveries platform connecting consumers with food establishments across the Philippines.",
    role: "Software Engineer",
    period: "Aug 2022 – Feb 2025",
    summary:
      "Shipped React features for a deals app used by millions in the Philippines, and ran code review across teams.",
    description: [
      "I created and delivered scalable React and TypeScript solutions for a platform serving millions, directly boosting user engagement and merchant sales.",
      "My work spans across multiple products where I maintain high-performance standards and cross-product consistency.",
      "Beyond feature development, I’ve led major initiatives by centralizing cross-team communication and enforcing rigorous code reviews to ensure our deployments remain stable, secure, and optimized for scale.",
    ],
    tech: ["React", "React Native", "TypeScript", "Material UI"],
  },
  {
    company: "PouchNation",
    companyDescription:
      "All-in-one cashless and guest management solution for venues and events using NFC wearable technology.",
    role: "Software Engineer",
    period: "Jan – May 2022",
    summary:
      "Mobile ordering web app and venue dashboard for cashless events.",
    description: [
      "I contributed to the successful release of PouchNation's Mobile Ordering Web Application, enabling venues to streamline operations.",
      "I improved and expanded features in PouchNation's Venue Dashboard Application, enhancing analytics and venue management capabilities.",
      "I collaborated closely with cross-functional teams to ensure alignment with business goals and deliver solutions on time.",
      "I participated in code reviews and contributed to improving development processes, ensuring high code quality.",
    ],
    tech: ["React", "REST APIs"],
  },
];

const manualProjects: Project[] = [
  {
    title: "Outpost",
    description:
      "A personal engineering control center that brings PRs, CI, deployments and releases across all your GitHub repos into one dense dashboard.",
    summary: "PRs, CI, deployments and releases across all your GitHub repos in one dense dashboard.",
    tech: ["Next.js", "TypeScript", "GitHub API", "GitHub Apps", "Vercel"],
    url: "https://outpost.luisgoyone.com",
    repo: "https://github.com/luismgoyone/outpost",
    year: 2026,
    featured: true,
  },
  {
    title: "OT Tracker",
    description:
      "A full-stack web application for managing employee overtime records.",
    summary: "Full-stack app for managing employee overtime records.",
    tech: ["React", "TypeScript", "MUI", "Vite", "PostgreSQL", "Node.js", "NestJS", "Docker", "JWT Authentication"],
    url: "https://ot.luisgoyone.com",
    repo: "https://github.com/luismgoyone/ot-tracker",
    year: 2026,
    featured: true,
  },
  {
    title: "Lead Autopilot",
    description:
      "An AI inquiry autopilot for a demo dental clinic. AI tags each inquiry, logs it to Google Sheets, emails a reply, alerts the owner, and holds urgent ones for approval.",
    summary: "AI inquiry autopilot for a demo dental clinic: tags, logs to Sheets, replies, and alerts the owner.",
    tech: ["Next.js", "TypeScript", "AI SDK", "Gemini API", "Google Sheets", "Resend", "Cloudflare Turnstile", "Discord Webhooks", "Tailwind CSS", "Vercel"],
    url: "https://leads.luisgoyone.com",
    repo: "https://github.com/luismgoyone/lead-autopilot",
    year: 2026,
    featured: true,
  },
  {
    title: "Notedt",
    description:
      "A web application for tracking personal budgets, built with React, TypeScript, Tailwind CSS, and Chart.js.",
    summary: "Budget tracker with Chart.js charts.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    url: "https://notedt.luisgoyone.com",
    repo: "https://github.com/luismgoyone/react-notedt",
    year: 2024,
    featured: true,
  },
  {
    title: "ParsePass",
    description:
      "Turns any resume into a clean, ATS-friendly version and shows exactly what an applicant tracking system reads, before and after. It flags layout problems like two-column designs and tables, uses AI to restructure the resume into one single-column template with an honesty check that flags anything not in the original, and proves the export parses by reading it back. Also matches a resume against a job description's keywords and suggests stronger bullet wording without adding facts.",
    summary: "See what an ATS reads from your resume, and export an ATS-friendly version that provably parses.",
    tech: ["Next.js", "TypeScript", "Claude API", "Gemini API", "Tailwind CSS", "pdf.js", "Playwright", "Vercel"],
    url: "https://parsepass.luisgoyone.com",
    repo: "https://github.com/luismgoyone/ParsePass",
    year: 2026,
    featured: false,
  },
  {
    title: "Northmark",
    description:
      "A read-only decision dashboard for an XAUUSD (gold) M5 trading strategy. It watches the live market, runs a breakout-and-retest checklist as a sequence of pure, testable gates, and shows at a glance whether to wait or that a setup is live, with the entry, stop, targets, and lot size it implies. It never places orders.",
    summary: "Read-only decision dashboard for an XAUUSD (gold) M5 trading strategy. Never places orders.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Vitest", "Vercel"],
    url: "https://northmark.luisgoyone.com",
    repo: "https://github.com/luismgoyone/northmark",
    year: 2026,
    featured: false,
  },
  {
    title: "Personal Website v2",
    description:
      "This site: a Next.js 16 static export with Tailwind CSS v4, a markdown writing section, and a project archive synced from GitHub.",
    summary: "This site: Next.js 16, Tailwind CSS v4, markdown posts, and an archive synced from GitHub.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Markdown"],
    url: "https://github.com/luismgoyone/personal-website-v2",
    year: 2026,
    featured: false,
  },
  {
    title: "Personal Website v1",
    description:
      "This is the first version of my personal website, showcasing my projects and skills.",
    summary: "The first version of my personal website.",
    tech: ["React 18", "Styled Components", "Vercel"],
    url: "https://luisgoyone.vercel.app/",
    year: 2022,
    featured: false,
  },
  {
    title: "User Management API",
    description:
      "This is a Node.js Express backend application that serves as a REST API for user management and posting functionality, built as a coding exercise from Booky.",
    summary: "Express REST API for user management and posts, built as a coding exercise from Booky.",
    tech: ["Node.js", "Express.js", "JavaScript", "REST API", "PostgreSQL", "dotenv"],
    url: "https://github.com/luismgoyone/express-exercise",
    year: 2024,
    featured: false,
  },
];

// Auto-synced from GitHub by .github/workflows/sync-projects.yml (archive only).
export const projects: Project[] = [
  ...manualProjects,
  ...(githubProjects as Project[]),
];

export const skills: Skill[] = [
  { name: "Claude Code (subagents, skills, slash commands)", category: "ai" },
  { name: "Multi-agent workflows", category: "ai" },
  { name: "MCP integrations", category: "ai" },
  { name: "Prompt engineering", category: "ai" },
  { name: "AI-assisted code review", category: "ai" },
  { name: "JavaScript", category: "language" },
  { name: "TypeScript", category: "language" },
  { name: "Go", category: "language" },
  { name: "HTML & CSS", category: "language" },
  { name: "Java", category: "language" },
  { name: "Python", category: "language" },
  { name: "SQL", category: "language" },
  { name: "React", category: "framework" },
  { name: "Next.js", category: "framework" },
  { name: "SolidJS", category: "framework" },
  { name: "React Native", category: "framework" },
  { name: "Node.js", category: "framework" },
  { name: "Express.js", category: "framework" },
  { name: "NestJS", category: "framework" },
  { name: "Tailwind CSS", category: "framework" },
  { name: "Material UI", category: "framework" },
  { name: "Shadcn/ui", category: "framework" },
  { name: "Vite", category: "framework" },
  { name: "Git", category: "tool" },
  { name: "Playwright", category: "tool" },
  { name: "PostgreSQL", category: "tool" },
  { name: "Docker", category: "tool" },
  { name: "JWT Authentication", category: "tool" },
  { name: "Figma", category: "tool" },
  { name: "WordPress", category: "tool" },
  { name: "Agile / Scrum", category: "methodology" },
  { name: "Code Review", category: "methodology" },
  { name: "Front-end Development", category: "methodology" },
];

export const education: Education = {
  school: "Saint Louis University",
  degree: "Bachelor of Science in Information Technology",
  period: "Aug 2018 — Jun 2022",
  honors: "Cum Laude",
};

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    href: "https://github.com/luismgoyone",
    icon: "Github",
  },
  {
    platform: "LinkedIn",
    href: "https://www.linkedin.com/in/luisgoyone/",
    icon: "Linkedin",
  },
];

// The agent pipeline shown on the home page, one row per stage.
// The 24metrics setup: Cursor skills and agent, Claude Code as second reviewer.
export const cursorPipeline: PipelineStep[] = [
  { agent: "/execute-ticket", does: "ticket and Figma in, draft PR out", output: "pr" },
  { agent: "developer", does: "implements, checks types and the browser", output: "diff", depth: 1 },
  { agent: "claude code", does: "reviews the branch, tests it in Playwright", output: "review" },
  { agent: ".mdc rules", does: "repeat review notes become rules", output: "rules" },
  { agent: "luis", does: "scope, review, merge", output: "ship", human: true },
];

export const pipeline: PipelineStep[] = [
  { agent: "/scope", does: "asks the owner, writes a context brief", output: "brief" },
  {
    agent: "/loop /ticket",
    does: "runs unattended in a worktree to a draft PR",
    brief: "plan, code, test, review, verify, record",
    output: "pr",
  },
  { agent: "planner", does: "a scoped plan from the ticket and code", output: "plan", depth: 1 },
  { agent: "coder", does: "implements exactly the plan", output: "diff", depth: 1 },
  { agent: "tester", does: "writes and runs the tests", output: "tests", depth: 1 },
  { agent: "/code-review", does: "lint, types, review; blocks go to coder", output: "clean", depth: 1 },
  { agent: "/gate", does: "drives the real app in Playwright", output: "pass", depth: 1 },
  { agent: "/record", does: "records the flow as video on the PR", output: "video", depth: 1 },
  { agent: "/resolve-comments", does: "fixes or answers each review thread", output: "push" },
  { agent: "/learn", does: "repeat review notes become coder rules", output: "rules" },
  { agent: "luis", does: "scope, review, merge", output: "ship", human: true },
];

export const availability: Availability = {
  intro: "I take on a few contract projects on the side:",
  services: [
    { label: "AI automations for small businesses", example: "Lead Autopilot" },
    { label: "front ends built from Figma" },
    { label: "internal dashboards", example: "Outpost" },
  ],
};

// Real quotes only (name, role, company). The section stays hidden while empty.
export const testimonials: Testimonial[] = [];

// What I'm focused on right now. The section stays hidden while `items` is empty.
export const now: NowEntry = {
  updated: "Oct 2026",
  items: [],
};
