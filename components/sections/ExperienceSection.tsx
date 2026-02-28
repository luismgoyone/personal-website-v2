import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { experiences } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="mb-20 scroll-mt-16 lg:scroll-mt-0">
      <h2 className="section-label">Experience</h2>

      <div className="space-y-1">
        {experiences.map((exp) => (
          <div
            key={exp.company}
            className="group relative rounded-xl p-5 transition-all duration-200 hover:bg-muted/40 -mx-5"
          >
            <div className="flex flex-col sm:flex-row sm:gap-8">
              {/* Date */}
              <div className="shrink-0 mb-2 sm:mb-0">
                <p className="text-xs font-medium text-muted-foreground/70 whitespace-nowrap pt-0.5 sm:text-right sm:w-32">
                  {exp.period}
                </p>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-foreground text-sm leading-snug">
                    {exp.role}{" "}
                    <span className="text-foreground/80">· {exp.company}</span>
                  </h3>
                  {exp.current && (
                    <Badge
                      variant="secondary"
                      className="shrink-0 text-xs"
                    >
                      Current
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {exp.companyDescription}
                </p>
                <ul className="space-y-1.5">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-muted-foreground"
                    >
                      <span className="shrink-0 mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 px-5 sm:pl-[9.5rem]">
        <Button variant="outline" size="sm" asChild>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            View Full Resume
            <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
          </a>
        </Button>
      </div>
    </section>
  );
}
