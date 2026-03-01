import type {
  Education,
  Experience,
  NavLink,
  PersonalInfo,
  Project,
  Skill,
  SocialLink,
} from "@/types/portfolio";

export const personalInfo: PersonalInfo = {
  name: "Luis Michael Goyone",
  title: "Software Engineer",
  tagline:
    "I build accessible, pixel-perfect digital experiences for the web.",
  email: "luismichaelgoyone@gmail.com",
  phone: "(+63) 908 946 8874",
  location: "Baguio City, Philippines",
  bio: "I'm a software engineer with 3+ years of experience designing and building scalable web applications. I specialize in React and TypeScript, and I care deeply about clean code, great user experiences, and collaborative development.\n\nCurrently at 24metrics, where I help protect advertising budgets by converting complex Figma designs into responsive, production-ready interfaces. Previously at Booky, where I built features used by millions of users across the Philippines.",
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const experiences: Experience[] = [
  {
    company: "24metrics",
    companyDescription:
      "Ad fraud protection platform that helps businesses ensure genuine, high-quality traffic.",
    role: "Software Engineer",
    period: "Mar 2025 — Present",
    current: true,
    description: "I bridge the gap between design and production by turning complex Figma layouts into high-performance web interfaces. Beyond front-end development and leading our latest site launch, I focus on workflow efficiency, proactively coordinating with backend teams on API specs and streamlining ticket assessments. I integrate AI into my research and coding process to move faster, though I personally refactor and vet every suggestion to ensure the output is optimized, secure, and fits our specific team standards.",
  },
  {
    company: "Booky",
    companyDescription:
      "Deals and discoveries platform connecting consumers with food establishments across the Philippines.",
    role: "Software Engineer",
    period: "Aug 2022 — Feb 2025",
    description: "I created and delivered scalable React and TypeScript solutions for a platform serving millions, directly boosting user engagement and merchant sales. My work spans across multiple products where I maintain high-performance standards and cross-product consistency. Beyond feature development, I’ve led major initiatives by centralizing cross-team communication and enforcing rigorous code reviews to ensure our deployments remain stable, secure, and optimized for scale.",
  },
  {
    company: "PouchNation",
    companyDescription:
      "All-in-one cashless and guest management solution for venues and events using NFC wearable technology.",
    role: "Software Engineer",
    period: "Jan 2022 — May 2022",
    description: "I contributed to the successful release of PouchNation's Mobile Ordering Web Application, enabling venues to streamline operations. I improved and expanded features in PouchNation's Venue Dashboard Application, enhancing analytics and venue management capabilities. I collaborated closely with cross-functional teams to ensure alignment with business goals and deliver solutions on time. I participated in code reviews and contributed to improving development processes, ensuring high code quality.",
  },
];

export const projects: Project[] = [
  {
    title: "Personal Website v2",
    description:
      "This portfolio — built with Next.js 16, Tailwind CSS v4, and Shadcn/ui. Designed with a focus on clean typography and minimal UI inspired by Brittany Chiang's portfolio.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/ui"],
    url: "#",
    year: 2026,
    featured: true,
  },
  {
    title: "Budget Tracker Web App",
    description:
      "A web application for tracking personal budgets, built with React, TypeScript, Tailwind CSS, and Chart.js.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    url: "https://react-notedt.vercel.app/",
    year: 2024,
    featured: true,
  },
  {
    title: "Personal Website v1",
    description:
      "This is the first version of my personal website, showcasing my projects and skills.",
    tech: ["React 18", "Styled Components", "Vercel"],
    url: "https://luisgoyone.vercel.app/",
    year: 2022,
    featured: false,
  },
  {
    title: "React Notes App",
    description:
      "A simple notes application with create, edit, and delete functionality. Built as a personal learning project to practice React state management.",
    tech: ["React", "JavaScript", "CSS"],
    year: 2023,
    featured: false,
  },
  {
    title: "Movie Search App",
    description:
      "A movie search and discovery app powered by the OMDB API. Allows users to search for films and view details, ratings, and cast information.",
    tech: ["React", "JavaScript", "REST API"],
    year: 2022,
    featured: false,
  },
  {
    title: "OT Tracker",
    description:
      "A full-stack web application for managing employee overtime records.",
    tech: ["React", "TypeScript", "MUI", "Vite", "PostgreSQL", "Node.js", "NestJS ", "Docker", "JWT Authentication"],
    url: "https://github.com/luismgoyone/ot-tracker",
    year: 2026,
    featured: true,
  },
  {
    title: "User Management API",
    description:
      "This is a Node.js Express backend application that serves as a REST API for user management and posting functionality, built as a coding exercise from Booky.",
    tech: ["Node.js", "Express.js", "JavaScript", "REST API", "PostgreSQL", "dotenv"],
    url: "https://github.com/luismgoyone/express-exercise",
    year: 2024,
    featured: true,
  },
];

export const skills: Skill[] = [
  { name: "JavaScript", category: "language" },
  { name: "TypeScript", category: "language" },
  { name: "HTML & CSS", category: "language" },
  { name: "Java", category: "language" },
  { name: "Python", category: "language" },
  { name: "SQL", category: "language" },
  { name: "NestJS", category: "framework" },
  { name: "MUI", category: "framework" },
  { name: "Tailwind CSS", category: "framework" },
  { name: "Vite", category: "framework" },
  { name: "Shadcn/ui", category: "framework" },
  { name: "React", category: "framework" },
  { name: "Next.js", category: "framework" },
  { name: "React Native", category: "framework" },
  { name: "Tailwind CSS", category: "framework" },
  { name: "Material UI", category: "framework" },
    { name: "Node.js", category: "framework" },
  { name: "Express.js", category: "framework" },
  { name: "Git", category: "tool" },
  { name: "WordPress", category: "tool" },
  { name: "Figma", category: "tool" },
    { name: "Docker", category: "tool" },
  { name: "JWT Authentication", category: "tool" },
  { name: "PostgreSQL", category: "tool" },
  { name: "Agile / Scrum", category: "methodology" },
  { name: "Code Review", category: "methodology" },
  { name: "Front-end Development", category: "methodology" },
];

export const education: Education = {
  school: "Saint Louis University",
  degree: "Bachelor of Science in Information Technology",
  period: "Aug 2018 — Jun 2022",
};

export const socialLinks: SocialLink[] = [
  {
    platform: "Email",
    href: "mailto:luismichaelgoyone@gmail.com",
    icon: "Mail",
  },
  {
    platform: "Phone",
    href: "tel:+639089468874",
    icon: "Phone",
  },
  {
    platform: "GitHub",
    href: "https://github.com/luismgoyone",
    icon: "Github",
  },
  {
    platform: "LinkedIn",
    href: "https://www.linkedin.com/in/luisgoyone/",
    icon: "Linkedin",
  },
];
