export interface Experience {
  company: string;
  companyDescription: string;
  role: string;
  period: string;
  summary: string; // one line for the home page
  description: string[];
  current?: boolean;
  companyUrl?: string;
  tech?: string[];
}

export interface Project {
  title: string;
  description: string;
  summary?: string; // short one-liner for the archive table; falls back to description
  tech: string[];
  url?: string;
  repo?: string;
  year?: number;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: "ai" | "language" | "framework" | "tool" | "methodology";
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  honors?: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: "Github" | "Linkedin" | "ExternalLink";
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  location: string;
  bio: string;
}

export interface PipelineStep {
  agent: string;
  does: string;
  output: string;
  human?: boolean;
}

export interface Availability {
  intro: string;
  services: { label: string; example?: string }[]; // example: a project title in lib/data.ts
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface NowEntry {
  updated: string;
  items: string[];
}
