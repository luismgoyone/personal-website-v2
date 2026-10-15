import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { getProjectPages, projectSlug } from "@/lib/project-pages";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/archive/`, changeFrequency: "monthly", priority: 0.5 },
    ...getProjectPages().map((p) => ({ url: `${siteUrl}/projects/${projectSlug(p)}/`, priority: 0.6 })),
    ...(posts.length > 0
      ? [
          { url: `${siteUrl}/writing/`, changeFrequency: "monthly" as const, priority: 0.6 },
          ...posts.map((p) => ({ url: `${siteUrl}/writing/${p.slug}/`, lastModified: p.date, priority: 0.6 })),
        ]
      : []),
  ];
}
