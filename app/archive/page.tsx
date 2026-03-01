import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects, personalInfo } from "@/lib/data";
import { SpotlightEffect } from "@/components/layout/SpotlightEffect";

export const metadata: Metadata = {
  title: `All Projects — ${personalInfo.name}`,
};

function getHostname(url: string): string | null {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return null;
  }
}

const sortedProjects = [...projects].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

export default function ArchivePage() {
  return (
    <>
    <SpotlightEffect />
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 lg:px-24 lg:py-24">
        {/* Back link */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          {personalInfo.name}
        </Link>

        {/* Header */}
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
          All Projects
        </h1>
        <p className="text-muted-foreground mb-16">
          A complete list of things I&apos;ve built over the years.
        </p>

        {/* Table */}
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pb-4 pr-6 w-16">
                Year
              </th>
              <th className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pb-4 pr-6">
                Project
              </th>
              <th className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pb-4 pr-6 hidden sm:table-cell">
                Built with
              </th>
              <th className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pb-4 hidden lg:table-cell">
                Link
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.map((project) => {
              const hostname = project.url && project.url !== "#"
                ? getHostname(project.url)
                : null;

              return (
                <tr
                  key={project.title}
                  className="group border-t border-border hover:bg-muted/40 transition-colors"
                >
                  {/* Year */}
                  <td className="py-4 pr-6 align-top text-sm text-muted-foreground tabular-nums">
                    {project.year ?? "—"}
                  </td>

                  {/* Project name */}
                  <td className="py-4 pr-6 align-top">
                    <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </span>
                    {/* Tech + link shown inline on small screens */}
                    <div className="flex flex-wrap gap-1.5 mt-2 sm:hidden">
                      {project.tech.map((t, index) => (
                        <Badge key={`${project.title}-${t}-${index}`} variant="secondary" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    {hostname && (
                      <div className="mt-1 lg:hidden">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          {hostname}
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </td>

                  {/* Built with */}
                  <td className="py-4 pr-6 align-top hidden sm:table-cell">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t, index) => (
                        <Badge key={`${project.title}-${t}-${index}`} variant="secondary" className="text-xs font-medium">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </td>

                  {/* Link */}
                  <td className="py-4 align-top hidden lg:table-cell">
                    {hostname ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
                        aria-label={`${project.title} (opens in new tab)`}
                      >
                        {hostname}
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground/30 text-sm">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
