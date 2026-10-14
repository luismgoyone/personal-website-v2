import { socialLinks } from "@/lib/data";
import { getPosts } from "@/lib/posts";
import { Row } from "./Row";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function SiteFooter({ children }: { children?: React.ReactNode }) {
  const hasPosts = getPosts().length > 0;
  const links = [
    ...socialLinks.map((l) => ({ label: l.platform, href: l.href })),
    ...(hasPosts ? [{ label: "RSS", href: `${basePath}/feed.xml` }] : []),
    { label: "llms.txt", href: `${basePath}/llms.txt` },
  ];

  return (
    <Row as="footer" label={`© ${new Date().getFullYear()}`} className="mt-22 border-t border-line pt-6">
      <div className="flex flex-wrap justify-between gap-3 text-sm">
        <span className="flex flex-wrap gap-x-5 gap-y-2">
          {children}
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-muted transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </span>
        <span className="meta">Next.js · Geist · GitHub Pages</span>
      </div>
    </Row>
  );
}
