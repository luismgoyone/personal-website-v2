import { personalInfo } from "@/lib/data";
import { getPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getPosts()
    .map((post) => {
      const url = `${siteUrl}/writing/${post.slug}/`;
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description>${escape(post.summary)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(personalInfo.name)}</title>
    <link>${siteUrl}/</link>
    <description>${escape(personalInfo.tagline)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
