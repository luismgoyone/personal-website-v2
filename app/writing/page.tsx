import type { Metadata } from "next";
import Link from "next/link";
import { Row } from "@/components/site/Row";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { personalInfo } from "@/lib/data";
import { formatDate, getPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Writing · ${personalInfo.name}`,
  alternates: { canonical: `${siteUrl}/writing/` },
  openGraph: { url: `${siteUrl}/writing/`, images: [`${siteUrl}/og-image.png`] },
};

export default function WritingPage() {
  const posts = getPosts();

  return (
    <div className="px-5">
      <div className="mx-auto max-w-[860px] pt-12 pb-16 sm:pt-18">
        <SiteHeader current="writing" />
        <main>
          <Row label={`${posts.length} ${posts.length === 1 ? "post" : "posts"}`} className="mt-16 sm:mt-22">
            <h1 className="mb-6 text-[26px] leading-tight font-semibold tracking-[-0.015em] sm:text-[32px]">Writing</h1>
            {posts.length === 0 ? (
              <p className="text-muted">Nothing published yet.</p>
            ) : (
              <ul>
                {posts.map((post) => (
                  <li key={post.slug} className="border-t border-hairline py-4 first:border-t-0">
                    <Link href={`/writing/${post.slug}`} className="group block">
                      <span className="flex flex-wrap justify-between gap-x-4">
                        <span className="font-medium group-hover:text-accent">
                          {post.title}
                          {post.draft && <span className="meta"> · draft</span>}
                        </span>
                        <span className="meta">{formatDate(post.date)}</span>
                      </span>
                      {post.summary && <span className="mt-1 block text-[15px] leading-relaxed text-body">{post.summary}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Row>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
