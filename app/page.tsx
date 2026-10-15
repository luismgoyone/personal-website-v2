import Link from "next/link";
import { PipelineSwitch } from "@/components/site/PipelineSwitch";
import { ProjectDemo } from "@/components/site/ProjectDemo";
import { Row } from "@/components/site/Row";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { availability, experiences, now, personalInfo, projects, socialLinks, testimonials } from "@/lib/data";
import { formatDate, getPosts } from "@/lib/posts";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const HOME_PROJECT_LIMIT = 4;

// Featured projects, in lib/data.ts order; the rest live in the archive.
const featuredProjects = projects.filter((p) => p.featured).slice(0, HOME_PROJECT_LIMIT);
const linkedIn = socialLinks.find((l) => l.platform === "LinkedIn");
const chief = experiences.find((e) => e.company.startsWith("Chief"));

function projectHref(title: string) {
  const p = projects.find((x) => x.title === title);
  return p?.url ?? p?.repo;
}

export default function HomePage() {
  const posts = getPosts();
  const pipelinePost = posts.find((p) => p.slug === "agent-pipeline");

  return (
    <div className="px-5">
      <div className="mx-auto max-w-[860px] pt-12 pb-16 sm:pt-18">
        <SiteHeader />

        <main>
          <Row label={<>{personalInfo.title}<br />{personalInfo.location}</>} className="mt-16 sm:mt-22">
            <h1 className="mb-5 text-[26px] leading-tight font-semibold tracking-[-0.015em] text-balance sm:text-[32px]">
              {personalInfo.tagline}
            </h1>
            <p className="mb-3.5 leading-relaxed text-body">
              Part-time at{" "}
              <a href={chief?.companyUrl} target="_blank" rel="noopener noreferrer" className="link text-foreground">
                Chief
              </a>
              , where I merged{" "}
              <strong className="font-semibold text-foreground">149 pull requests in my first three months</strong>, a
              quarter of the team&apos;s human-authored merges, with a Claude Code setup I built. Full-time at 24metrics,
              where I went from hand-coding the React front end to shipping front end and Go API changes together with
              agents, and writing the specs and docs for what I build. Before that, two and a half years at Booky shipping React features used by
              millions.
            </p>
            <p className="leading-relaxed text-body">The agents write most of the code. I read every diff before it ships.</p>
          </Row>

          <Row label="How a ticket ships">
            <PipelineSwitch
              captions={{
                chief: (
                  <>
                    I wrote all of these myself. They run across Chief&apos;s web app, desktop app, shared TypeScript and
                    Go backend.
                    {pipelinePost && (
                      <>
                        {" "}
                        <Link href={`/writing/${pipelinePost.slug}`} className="link text-foreground">
                          Read how it works →
                        </Link>
                      </>
                    )}
                  </>
                ),
                "24metrics": (
                  <>
                    Leaner than the Chief setup: one developer agent, and I run tickets in parallel by hand. Built in
                    Cursor for 24metrics&apos; React front end and Go API.
                  </>
                ),
              }}
            />
          </Row>

          <Row label="Projects" id="projects">
            <ul>
              {featuredProjects.map((p) => (
                <li key={p.title}>
                  <a
                    href={p.url ?? p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex justify-between gap-4 py-2.5"
                  >
                    <span>
                      <span className="font-medium group-hover:text-accent">{p.title}</span>
                      <span className="text-muted"> · {p.summary ?? p.description}</span>
                    </span>
                    <span className="meta shrink-0">{p.year}</span>
                  </a>
                  {p.demo && <ProjectDemo name={p.demo} label={`${p.title} demo: ${p.summary ?? p.description}`} />}
                </li>
              ))}
            </ul>
            <Link href="/archive" className="mt-2 inline-block text-sm text-muted transition-colors hover:text-foreground">
              Everything else in the archive →
            </Link>
          </Row>

          {posts.length > 0 && (
            <Row label="Writing">
              <ul>
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/writing/${post.slug}`} className="group flex justify-between gap-4 py-2.5">
                      <span className="font-medium group-hover:text-accent">
                        {post.title}
                        {post.draft && <span className="meta"> · draft</span>}
                      </span>
                      <span className="meta shrink-0">{formatDate(post.date)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Row>
          )}

          <Row label="Experience" id="experience">
            <ul className="flex flex-col gap-7">
              {experiences.map((exp) => (
                <li key={exp.company}>
                  <div className="flex flex-wrap justify-between gap-x-4 gap-y-0.5">
                    <h3 className="font-medium">
                      {exp.company.replace(/ \(.*\)$/, "")}{" "}
                      <span className="font-normal text-muted">· {exp.role}</span>
                    </h3>
                    <span className="meta">{exp.period}</span>
                  </div>
                  <p className="mt-1 leading-relaxed text-body">{exp.summary}</p>
                  {exp.tech && exp.tech.length > 0 && (
                    <ul aria-label="Tech" className="mt-2.5 flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <li key={t} className="rounded-[5px] bg-chip px-[7px] py-[5px] font-mono text-xs leading-none text-muted">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <a
              href={`${basePath}/Luis_Goyone_Resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block text-sm text-muted transition-colors hover:text-foreground"
            >
              Full resume (PDF) →
            </a>
          </Row>

          {testimonials.length > 0 && (
            <Row label="Kind words">
              <div className="flex flex-col gap-8">
                {testimonials.map((t) => (
                  <blockquote key={t.name}>
                    <p className="mb-1.5 text-lg leading-normal">&ldquo;{t.quote}&rdquo;</p>
                    <footer className="meta">
                      {t.name}, {t.role} at {t.company}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </Row>
          )}

          {now.items.length > 0 && (
            <Row label={<>Now<br /><span className="text-tree">{now.updated}</span></>}>
              <ul className="list-disc space-y-1 pl-[18px] text-body">
                {now.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Row>
          )}

          <Row label="Available for">
            <p className="leading-relaxed text-body">
              {availability.intro}{" "}
              {availability.services.map((s, i) => {
                const href = s.example ? projectHref(s.example) : undefined;
                const sep = i === availability.services.length - 1 ? ". " : i === availability.services.length - 2 ? ", and " : ", ";
                return (
                  <span key={s.label}>
                    {s.label}
                    {href && (
                      <>
                        {" ("}
                        <a href={href} target="_blank" rel="noopener noreferrer" className="link text-foreground">
                          like {s.example}
                        </a>
                        {")"}
                      </>
                    )}
                    {sep}
                  </span>
                );
              })}
              {linkedIn && (
                <a href={linkedIn.href} target="_blank" rel="noopener noreferrer" className="link text-foreground">
                  Message me on LinkedIn
                </a>
              )}
              .
            </p>
          </Row>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
