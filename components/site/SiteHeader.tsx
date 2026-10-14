import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { getPosts } from "@/lib/posts";
import { personalInfo } from "@/lib/data";
import { cn } from "@/lib/utils";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function SiteHeader({ current }: { current?: "writing" | "archive" }) {
  const hasPosts = getPosts().length > 0;
  const navClass = (page: string) =>
    cn("transition-colors hover:text-foreground", current === page ? "text-foreground" : "text-muted");

  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <Link href="/" className="flex items-center gap-3 font-semibold">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-accent" />
        {personalInfo.shortName}
      </Link>
      <nav aria-label="Primary" className="flex items-center gap-5 text-sm">
        {hasPosts && (
          <Link href="/writing" className={navClass("writing")} aria-current={current === "writing" ? "page" : undefined}>
            Writing
          </Link>
        )}
        <Link href="/archive" className={navClass("archive")} aria-current={current === "archive" ? "page" : undefined}>
          Archive
        </Link>
        <a href={`${basePath}/Luis_Goyone_Resume.pdf`} target="_blank" rel="noopener noreferrer" className={navClass("")}>
          Resume
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
