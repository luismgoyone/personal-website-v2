export interface NavLink {
  label: string;
  href: string;
}

export interface Experience {
  company: string;
  companyDescription: string;
  role: string;
  period: string;
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
  icon: "Mail" | "Github" | "Linkedin" | "ExternalLink";
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  location: string;
  bio: string;
}
