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
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  url?: string;
  year?: number;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: "language" | "framework" | "tool" | "methodology";
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: "Mail" | "Phone" | "Github" | "Linkedin" | "ExternalLink";
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}
