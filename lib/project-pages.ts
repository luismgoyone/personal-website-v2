import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { projects } from "@/lib/data";
import type { Project } from "@/types/portfolio";

// A project gets its own page at /projects/<slug> when content/projects/<slug>.md
// exists. The markdown is the write-up; everything else comes from lib/data.ts.
const pagesDir = path.join(process.cwd(), "content/projects");

export function projectSlug(p: Project): string {
  return p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function hasProjectPage(p: Project): boolean {
  return fs.existsSync(path.join(pagesDir, `${projectSlug(p)}.md`));
}

export function getProjectPages(): Project[] {
  return projects.filter(hasProjectPage);
}

export function getProjectPage(slug: string): { project: Project; html: string } | undefined {
  const project = projects.find((p) => projectSlug(p) === slug);
  if (!project || !hasProjectPage(project)) return undefined;
  const md = fs.readFileSync(path.join(pagesDir, `${slug}.md`), "utf8");
  return { project, html: marked.parse(md, { async: false }) };
}
