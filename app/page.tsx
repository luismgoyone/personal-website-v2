import { SpotlightEffect } from "@/components/layout/SpotlightEffect";
import { Sidebar } from "@/components/layout/Sidebar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

export default function HomePage() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 lg:px-24 lg:py-0">
      <SpotlightEffect />
      <div className="lg:flex lg:justify-between lg:gap-4">
        {/* Left: sticky sidebar */}
        <aside className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-5/12 lg:flex-col lg:justify-between lg:py-24">
          <Sidebar />
        </aside>

        {/* Right: scrollable content */}
        <main className="pt-24 lg:w-7/12 lg:py-24">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>
      </div>
    </div>
  );
}
