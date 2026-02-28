"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navLinks, personalInfo, socialLinks } from "@/lib/data";
import type { SocialLink } from "@/types/portfolio";

const iconMap = {
  Mail,
  Phone,
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
        target={link.href.startsWith("mailto") || link.href.startsWith("tel") ? "_self" : "_blank"}
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

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
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
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
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
