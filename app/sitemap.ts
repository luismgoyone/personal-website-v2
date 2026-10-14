import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/archive/`, changeFrequency: "monthly", priority: 0.5 },
    ...(posts.length > 0
      ? [
          { url: `${siteUrl}/writing/`, changeFrequency: "monthly" as const, priority: 0.6 },
          ...posts.map((p) => ({ url: `${siteUrl}/writing/${p.slug}/`, lastModified: p.date, priority: 0.6 })),
        ]
      : []),
  ];
}
