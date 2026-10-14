import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export interface Post {
  slug: string;
  title: string;
  date: Date;
  summary: string;
  draft: boolean;
  html: string;
  readingMinutes: number;
}

const postsDir = path.join(process.cwd(), "content/writing");

// Drafts render in `next dev` so they can be previewed, and never ship in a build.
const includeDrafts = process.env.NODE_ENV === "development";

function readPost(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(postsDir, file), "utf8"));
  const words = content.trim().split(/\s+/).length;
  return {
    slug,
    title: String(data.title ?? slug),
    // gray-matter parses YAML dates into Date objects already.
    date: data.date instanceof Date ? data.date : new Date(String(data.date)),
    summary: String(data.summary ?? ""),
    draft: Boolean(data.draft),
    html: marked.parse(content, { async: false }),
    readingMinutes: Math.max(1, Math.round(words / 230)),
  };
}

// Newest first.
export function getPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map(readPost)
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

// Dates are calendar days, so format in UTC to avoid shifting a day by timezone.
export function formatDate(date: Date, style: "day" | "month" = "month"): string {
  return date.toLocaleDateString("en-GB", {
    day: style === "day" ? "numeric" : undefined,
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
