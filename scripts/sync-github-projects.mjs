// Syncs public GitHub repos into lib/github-projects.json for the projects archive.
//
// - Skips forks, archived/private repos, this site's repo, repos tagged
//   `hide-from-portfolio`, and repos already hand-listed in lib/data.ts
//   (matched by repo URL or homepage URL).
// - Keeps existing entries as-is so manual edits to the JSON survive re-runs;
//   drops entries whose repo no longer qualifies.
// - Writes a Markdown summary to $SUMMARY_PATH (used as the PR body).
//
// Usage: GITHUB_TOKEN=... node scripts/sync-github-projects.mjs

import { readFileSync, writeFileSync } from "node:fs";

const OWNER = process.env.GITHUB_OWNER ?? "luismgoyone";
const SITE_REPO = process.env.SITE_REPO ?? "personal-website-v2";
const HIDE_TOPIC = "hide-from-portfolio";
const DATA_TS = "lib/data.ts";
const OUT_JSON = "lib/github-projects.json";

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }),
};

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${path}`);
  return res.json();
}

async function listRepos() {
  const repos = [];
  for (let page = 1; ; page++) {
    const batch = await gh(
      `/users/${OWNER}/repos?type=owner&per_page=100&page=${page}`
    );
    repos.push(...batch);
    if (batch.length < 100) return repos;
  }
}

function normalizeUrl(url) {
  if (!url) return null;
  const withProtocol = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  try {
    const u = new URL(withProtocol);
    return `${u.hostname.replace(/^www\./, "")}${u.pathname}`
      .replace(/\/+$/, "")
      .toLowerCase();
  } catch {
    return null;
  }
}

function prettifyName(name) {
  if (/[A-Z]/.test(name)) return name;
  return name
    .split(/[-_]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function techFor(repo) {
  const topics = (repo.topics ?? []).filter((t) => t !== HIDE_TOPIC);
  if (topics.length > 0) return topics;
  const languages = await gh(`/repos/${OWNER}/${repo.name}/languages`);
  const total = Object.values(languages).reduce((a, b) => a + b, 0);
  return Object.entries(languages)
    .filter(([, bytes]) => total > 0 && bytes / total >= 0.1)
    .slice(0, 3)
    .map(([lang]) => lang);
}

const manualUrls = new Set(
  [...readFileSync(DATA_TS, "utf8").matchAll(/url:\s*"([^"]+)"/g)]
    .map((m) => normalizeUrl(m[1]))
    .filter(Boolean)
);

let existing = [];
try {
  existing = JSON.parse(readFileSync(OUT_JSON, "utf8"));
} catch {
  // First run: no file yet.
}
const existingByRepo = new Map(existing.map((p) => [p.repo, p]));

const repos = await listRepos();
const qualifying = repos.filter(
  (r) =>
    !r.fork &&
    !r.archived &&
    !r.private &&
    r.name !== SITE_REPO &&
    r.name.toLowerCase() !== OWNER.toLowerCase() &&
    !(r.topics ?? []).includes(HIDE_TOPIC) &&
    !manualUrls.has(normalizeUrl(r.html_url)) &&
    !(r.homepage && manualUrls.has(normalizeUrl(r.homepage)))
);

const added = [];
const projects = [];
for (const repo of qualifying) {
  const kept = existingByRepo.get(repo.html_url);
  if (kept) {
    projects.push(kept);
    continue;
  }
  const homepage = repo.homepage?.trim();
  const project = {
    title: prettifyName(repo.name),
    description: repo.description ?? "",
    tech: await techFor(repo),
    url: homepage
      ? /^https?:\/\//i.test(homepage)
        ? homepage
        : `https://${homepage}`
      : repo.html_url,
    repo: repo.html_url,
    year: Number(repo.created_at.slice(0, 4)),
    featured: false,
  };
  projects.push(project);
  added.push(project);
}

const qualifyingUrls = new Set(qualifying.map((r) => r.html_url));
const removed = existing.filter((p) => !qualifyingUrls.has(p.repo));

projects.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
writeFileSync(OUT_JSON, `${JSON.stringify(projects, null, 2)}\n`);

const lines = [];
if (added.length) {
  lines.push("### Added", "");
  for (const p of added) {
    const note = p.description ? "" : " (no description; add one on GitHub or edit it here)";
    lines.push(`- **${p.title}**: ${p.repo}${note}`);
  }
  lines.push("");
}
if (removed.length) {
  lines.push("### Removed (hidden, archived, forked, deleted, or now hand-listed)", "");
  for (const p of removed) lines.push(`- **${p.title}**: ${p.repo}`);
  lines.push("");
}
lines.push(
  `To keep a repo off the site, add the \`${HIDE_TOPIC}\` topic to it on GitHub. You can also edit titles, tech, or links in \`${OUT_JSON}\` on this branch before merging.`
);
const summary = lines.join("\n");
if (process.env.SUMMARY_PATH) writeFileSync(process.env.SUMMARY_PATH, summary);
console.log(summary);
console.log(`\n${added.length} added, ${removed.length} removed, ${projects.length} total.`);
