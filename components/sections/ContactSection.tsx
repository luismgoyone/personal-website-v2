import { Button } from "@/components/ui/button";
import { personalInfo } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="mb-20 scroll-mt-16 lg:scroll-mt-0">
      <h2 className="section-label">Contact</h2>

      <p className="text-muted-foreground leading-relaxed mb-2">
        I&apos;m currently open to new opportunities. Whether you have a
        question, a project in mind, or just want to say hi — my inbox is
        always open.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-8">
        Based in{" "}
        <span className="text-foreground font-medium">
          {personalInfo.location}
        </span>
        . Available for remote work worldwide.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <a href={`mailto:${personalInfo.email}`}>
            Say Hello
            <ArrowUpRight className="ml-1.5 h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}>
            {personalInfo.phone}
          </a>
        </Button>
      </div>
    </section>
  );
}
