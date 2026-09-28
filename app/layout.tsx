import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { education, personalInfo, socialLinks } from "@/lib/data";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Luis Michael Goyone — Software Engineer";
const description =
  "Personal portfolio of Luis Michael Goyone, a Software Engineer specializing in React and TypeScript who builds web products and AI-assisted development workflows with Claude Code agents.";
const ogImage = {
  url: `${siteUrl}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Luis Michael Goyone — Software Engineer",
};

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title,
  description,
  keywords: [
    "Software Engineer",
    "React",
    "TypeScript",
    "Next.js",
    "Front-end Developer",
    "AI-assisted development",
    "Claude Code",
    "Portfolio",
  ],
  authors: [{ name: "Luis Michael Goyone", url: siteUrl }],
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    type: "profile",
    url: `${siteUrl}/`,
    siteName: "Luis Michael Goyone",
    title,
    description,
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  jobTitle: personalInfo.title,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Baguio City",
    addressCountry: "PH",
  },
  sameAs: socialLinks
    .filter((l) => l.platform === "GitHub" || l.platform === "LinkedIn")
    .map((l) => l.href),
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.school,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
