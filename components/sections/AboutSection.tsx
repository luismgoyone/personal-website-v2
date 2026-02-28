import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { education, personalInfo } from "@/lib/data";
import { GraduationCap } from "lucide-react";

export function AboutSection() {
  const paragraphs = personalInfo.bio.split("\n\n");

  return (
    <section id="about" className="mb-20 scroll-mt-16 lg:scroll-mt-0">
      <h2 className="section-label">About</h2>
      <div className="space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-muted-foreground leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <Separator className="my-8" />

      {/* Education */}
      <Card className="border-border/50 bg-card/50">
        <CardContent className="flex items-start gap-4 pt-6">
          <div className="shrink-0 mt-0.5">
            <GraduationCap className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">
              {education.school}
            </p>
            <p className="text-sm text-muted-foreground">{education.degree}</p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              {education.period}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
