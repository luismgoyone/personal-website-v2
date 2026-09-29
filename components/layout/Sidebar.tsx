"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navLinks, personalInfo, socialLinks } from "@/lib/data";
import type { SocialLink } from "@/types/portfolio";

const iconMap = {
  Mail,
  Github,
  Linkedin,
} as const;

function SocialButton({ link }: { link: SocialLink }) {
  const Icon = iconMap[link.icon as keyof typeof iconMap];
  if (!Icon) return null;
  return (
    <Button variant="ghost" size="icon" asChild>
      <a
        href={link.href}
        target={link.href.startsWith("mailto") ? "_self" : "_blank"}
        rel="noopener noreferrer"
        aria-label={link.platform}
      >
        <Icon className="h-5 w-5" />
      </a>
    </Button>
  );
}

export function Sidebar() {
  const [activeSection, setActiveSection] = useState<string>("");
  // While a nav click's smooth scroll is in flight, keep the clicked section
  // active instead of recomputing it (sections near the page end can't reach
  // the threshold, so recomputing would highlight the wrong one).
  const clickLock = useRef<{ timer: number } | null>(null);

  const releaseLockWhenIdle = () => {
    if (!clickLock.current) return;
    window.clearTimeout(clickLock.current.timer);
    clickLock.current.timer = window.setTimeout(() => {
      clickLock.current = null;
    }, 150);
  };

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    clickLock.current = { timer: 0 };
    releaseLockWhenIdle();
  };

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.href.replace("#", "")))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      // Short trailing sections (e.g. Contact) can never scroll up to the
      // threshold, so the bottom of the page always activates the last one.
      if (atBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }
      const threshold = window.innerHeight * 0.4;
      let current = "";
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= threshold) current = el.id;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (clickLock.current) {
        releaseLockWhenIdle();
        return;
      }
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      if (clickLock.current) window.clearTimeout(clickLock.current.timer);
    };
  }, []);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Name & title */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
            {personalInfo.name}
          </h1>
          <h2 className="text-lg font-medium text-foreground/80 mb-4">
            {personalInfo.title}
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            {personalInfo.tagline}
          </p>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:block" aria-label="Page sections">
          <ul className="list-none space-y-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => handleNavClick(id)}
                    className={`group flex items-center gap-4 py-2 text-sm transition-all duration-200 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`block h-px transition-all duration-200 ${
                        isActive
                          ? "w-12 bg-foreground"
                          : "w-6 bg-muted-foreground group-hover:w-12 group-hover:bg-foreground"
                      }`}
                    />
                    <span className="text-xs font-semibold tracking-widest uppercase">
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Social links + theme toggle */}
      <div className="flex items-center gap-1 mt-10 lg:mt-0">
        {socialLinks.map((link) => (
          <SocialButton key={link.platform} link={link} />
        ))}
        <div className="ml-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
