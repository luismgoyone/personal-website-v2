import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Row } from "@/components/site/Row";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { personalInfo } from "@/lib/data";
import { formatDate, getPost, getPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export const dynamicParams = false;

// A static export refuses an empty list, so while every post is a draft one
// placeholder slug is generated; it renders the 404 page and is linked nowhere.
const NO_POSTS_SLUG = "_";

export function generateStaticParams() {
  const slugs = getPosts().map((p) => ({ slug: p.slug }));
  return slugs.length > 0 ? slugs : [{ slug: NO_POSTS_SLUG }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const url = `${siteUrl}/writing/${post.slug}/`;
  return {
    title: `${post.title} · ${personalInfo.shortName}`,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.summary,
      publishedTime: post.date.toISOString(),
      images: [`${siteUrl}/og-image.png`],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <div className="px-5">
      <div className="mx-auto max-w-[860px] pt-12 pb-16 sm:pt-18">
        <SiteHeader current="writing" />
        <main>
          <article>
            <Row
              as="header"
              label={
                <>
                  <time dateTime={post.date.toISOString().slice(0, 10)}>{formatDate(post.date, "day")}</time>
                  <br />
                  {post.readingMinutes} min read{post.draft && " · draft"}
                </>
              }
              className="mt-16 sm:mt-22"
            >
              <h1 className="mb-3.5 text-[28px] leading-tight font-semibold tracking-[-0.02em] text-balance sm:text-[38px]">
                {post.title}
              </h1>
              {post.summary && <p className="text-lg leading-relaxed text-muted">{post.summary}</p>}
            </Row>
            <Row as="div" className="mt-8">
              {/* Trusted content: markdown files committed to this repo. */}
              <div className="post" dangerouslySetInnerHTML={{ __html: post.html }} />
            </Row>
          </article>
        </main>
        <SiteFooter>
          <Link href="/writing" className="text-foreground">
            ← All writing
          </Link>
        </SiteFooter>
      </div>
    </div>
  );
}
