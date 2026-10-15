import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectDemo } from "@/components/site/ProjectDemo";
import { Row } from "@/components/site/Row";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { personalInfo } from "@/lib/data";
import { getProjectPage, getProjectPages, projectSlug } from "@/lib/project-pages";
import { siteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectPages().map((p) => ({ slug: projectSlug(p) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = getProjectPage((await params).slug);
  if (!page) return {};
  const { project } = page;
  const url = `${siteUrl}/projects/${projectSlug(project)}/`;
  const description = project.summary ?? project.description;
  return {
    title: `${project.title} · ${personalInfo.shortName}`,
    description,
    alternates: { canonical: url },
    openGraph: { url, title: project.title, description, images: [`${siteUrl}/og-image.png`] },
  };
}

const linkClass = "text-muted transition-colors hover:text-accent";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = getProjectPage((await params).slug);
  if (!page) notFound();
  const { project: p, html } = page;
  const site = p.url && !p.url.startsWith("https://github.com/") ? p.url : undefined;
  const source = p.repo ?? (p.url?.startsWith("https://github.com/") ? p.url : undefined);

  return (
    <div className="px-5">
      <div className="mx-auto max-w-[860px] pt-12 pb-16 sm:pt-18">
        <SiteHeader current="archive" />
        <main>
          <article>
            <Row
              as="header"
              label={
                <span className="flex gap-4 sm:flex-col sm:gap-0">
                  <span>{p.year}</span>
                  {site && (
                    <a href={site} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      site ↗
                    </a>
                  )}
                  {source && (
                    <a href={source} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      source ↗
                    </a>
                  )}
                </span>
              }
              className="mt-16 sm:mt-22"
            >
              <h1 className="mb-3.5 text-[28px] leading-tight font-semibold tracking-[-0.02em] text-balance sm:text-[38px]">
                {p.title}
              </h1>
              <p className="text-lg leading-relaxed text-muted">{p.summary ?? p.description}</p>
              <ul aria-label="Tech" className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <li key={t} className="rounded-[5px] bg-chip px-[7px] py-[5px] font-mono text-xs leading-none text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </Row>
            <Row as="div" className="mt-8">
              {p.demo && <ProjectDemo name={p.demo} label={`${p.title} demo: ${p.summary ?? p.description}`} />}
              {/* Trusted content: markdown files committed to this repo. */}
              <div className="post mt-6" dangerouslySetInnerHTML={{ __html: html }} />
            </Row>
          </article>
        </main>
        <SiteFooter>
          <Link href="/archive" className="text-foreground">
            ← All projects
          </Link>
        </SiteFooter>
      </div>
    </div>
  );
}
