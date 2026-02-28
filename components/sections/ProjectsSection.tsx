import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export function ProjectsSection() {
  return (
    <section id="projects" className="mb-20 scroll-mt-16 lg:scroll-mt-0">
      <h2 className="section-label">Projects</h2>

      <div className="space-y-1">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group relative rounded-xl p-5 transition-all duration-200 hover:bg-muted/40 -mx-5"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                {project.url && project.url !== "#" ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1"
                  >
                    {project.title}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ) : (
                  project.title
                )}
              </h3>
            </div>

            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <Badge key={t} variant="secondary" className="text-xs font-medium">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
