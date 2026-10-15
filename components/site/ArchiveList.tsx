"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import { Row } from "./Row";

// Filters are derived from each project's tech list, so synced repos sort themselves.
const filters: { id: string; label: string; test: (p: Project) => boolean }[] = [
  { id: "all", label: "All", test: () => true },
  { id: "ai", label: "AI", test: (p) => p.tech.some((t) => /AI SDK|Claude|Gemini|OpenAI/i.test(t)) },
  { id: "next", label: "Next.js", test: (p) => p.tech.includes("Next.js") },
  { id: "react", label: "React", test: (p) => p.tech.some((t) => /^React( \d+)?$/.test(t)) },
  { id: "backend", label: "Backend", test: (p) => p.tech.some((t) => /NestJS|Express|PostgreSQL|Node/.test(t)) },
];

export function ArchiveList({
  projects,
  pages,
  intro,
}: {
  projects: Project[];
  pages: Record<string, string>; // project title → its /projects page, when it has one
  intro: React.ReactNode;
}) {
  const [active, setActive] = useState("all");
  const test = filters.find((f) => f.id === active)?.test ?? (() => true);
  const shown = projects.filter(test);
  const years = [...new Set(shown.map((p) => p.year ?? 0))].sort((a, b) => b - a);
  const span = (() => {
    const ys = projects.map((p) => p.year).filter((y): y is number => Boolean(y));
    return ys.length ? `${Math.min(...ys)} – ${Math.max(...ys)}` : "";
  })();

  return (
    <>
      <Row
        label={<>{shown.length} {shown.length === 1 ? "project" : "projects"}<br />{span}</>}
        className="mt-16 sm:mt-22"
      >
        <h1 className="mb-3 text-[26px] leading-tight font-semibold tracking-[-0.015em] sm:text-[32px]">
          Everything I&apos;ve built
        </h1>
        <div className="mb-6 leading-relaxed text-body">{intro}</div>
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const on = f.id === active;
            const count = projects.filter(f.test).length;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(f.id)}
                className={cn(
                  "min-h-9 rounded-full border px-3 text-[13px] font-medium transition-colors",
                  on
                    ? "border-foreground bg-foreground text-background"
                    : "border-line bg-surface text-body hover:border-faint",
                )}
              >
                {f.label} <span className={on ? "opacity-70" : "text-faint"}>{count}</span>
              </button>
            );
          })}
        </div>
      </Row>

      <div aria-live="polite">
        {years.map((year) => (
          <Row key={year} label={<span className="font-medium text-foreground">{year || "Undated"}</span>} className="mt-12">
            <ul>
              {shown
                .filter((p) => (p.year ?? 0) === year)
                .map((p) => (
                  <li key={p.title} className="border-t border-hairline py-4 first:border-t-0 sm:first:border-t">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h2 className="font-medium">
                        {pages[p.title] ? (
                          <Link href={pages[p.title]} className="transition-colors hover:text-accent">
                            {p.title} →
                          </Link>
                        ) : (
                          p.title
                        )}
                      </h2>
                      <span className="flex gap-4 font-mono text-[13px]">
                        {p.url && p.url !== "#" && !p.url.startsWith("https://github.com/") && (
                          <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-accent" aria-label={`${p.title} site (opens in new tab)`}>
                            site ↗
                          </a>
                        )}
                        {(p.repo ?? (p.url?.startsWith("https://github.com/") ? p.url : undefined)) && (
                          <a
                            href={p.repo ?? p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted transition-colors hover:text-accent"
                            aria-label={`${p.title} source (opens in new tab)`}
                          >
                            source ↗
                          </a>
                        )}
                      </span>
                    </div>
                    <p className="mt-1 mb-1.5 text-[15px] leading-relaxed text-body">{p.summary ?? p.description}</p>
                    <p className="meta text-xs">{p.tech.join(" · ")}</p>
                  </li>
                ))}
            </ul>
          </Row>
        ))}
        {shown.length === 0 && (
          <Row className="mt-12">
            <p className="text-muted">Nothing tagged that yet.</p>
          </Row>
        )}
      </div>
    </>
  );
}
