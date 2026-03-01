import { Badge } from "@/components/ui/badge";
import { skills } from "@/lib/data";
import type { Skill } from "@/types/portfolio";

const categoryLabels: Record<Skill["category"], string> = {
  language: "Languages",
  framework: "Frameworks & Libraries",
  tool: "Tools",
  methodology: "Practices",
};

const categories: Skill["category"][] = [
  "language",
  "framework",
  "tool",
  "methodology",
];

export function SkillsSection() {
  return (
    <section id="skills" className="mb-20 scroll-mt-16 lg:scroll-mt-0">
      <h2 className="section-label">Skills</h2>

      <div className="space-y-6">
        {categories.map((category) => {
          const categorySkills = skills.filter((s) => s.category === category);
          if (categorySkills.length === 0) return null;
          return (
            <div key={category}>
              <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest mb-3">
                {categoryLabels[category]}
              </p>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, index) => (
                  <Badge
                    key={`${category}-${skill.name}-${index}`}
                    variant="secondary"
                    className="text-sm font-medium"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
