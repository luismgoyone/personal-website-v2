import type { Metadata } from "next";
import { ArchiveList } from "@/components/site/ArchiveList";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { personalInfo, projects } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `All projects · ${personalInfo.name}`,
  alternates: { canonical: `${siteUrl}/archive/` },
  openGraph: { url: `${siteUrl}/archive/`, images: [`${siteUrl}/og-image.png`] },
};

const sortedProjects = [...projects].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

export default function ArchivePage() {
  return (
    <div className="px-5">
      <div className="mx-auto max-w-[860px] pt-12 pb-16 sm:pt-18">
        <SiteHeader current="archive" />
        <main>
          <ArchiveList
            projects={sortedProjects}
            intro={
              <>
                Side projects, experiments and exercises, newest first. New public repos tagged{" "}
                <code className="rounded bg-chip px-1.5 py-0.5 font-mono text-sm">portfolio</code> show up here
                automatically.
              </>
            }
          />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
