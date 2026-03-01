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
    description: [
      "Streamlined ticket assessment processes by scoring based on detailed requirements, contributing to efficient workflow.",
      "Enabled seamless front-end development by proactively communicating with backend teams for critical API details.",
      "Successfully converted complex Figma designs into responsive and fully functional web interfaces.",
      "Played a key role in the successful launch of the new company website using WordPress Elementor.",
      "Guaranteed superior user experience by ensuring the responsiveness and functionality of all HTML and JavaScript elements.",
    ],
  },
  {
    company: "Booky",
    companyDescription:
      "Deals and discoveries platform connecting consumers with food establishments across the Philippines.",
    role: "Software Engineer",
    period: "Aug 2022 — Feb 2025",
    description: [
      "Designed and implemented scalable solutions for complex requirements using React and TypeScript, improving the experience for millions of users.",
      "Collaborated on multiple repositories housing the company's products, ensuring consistency and high performance across the codebase.",
      "Developed and deployed new features aligned with business objectives, increasing platform engagement and driving merchant sales.",
      "Led the development and delivery of a key feature, centralizing all communication to ensure alignment across teams.",
      "Conducted rigorous code reviews, ensuring adherence to coding standards and mitigating potential issues before deployment.",
    ],
  },
  {
    company: "PouchNation",
    companyDescription:
      "All-in-one cashless and guest management solution for venues and events using NFC wearable technology.",
    role: "Software Engineer",
    period: "Jan 2022 — May 2022",
    description: [
      "Contributed to the successful release of PouchNation's Mobile Ordering Web Application, enabling venues to streamline operations.",
      "Improved and expanded features in PouchNation's Venue Dashboard Application, enhancing analytics and venue management capabilities.",
      "Collaborated closely with cross-functional teams to ensure alignment with business goals and deliver solutions on time.",
      "Participated in code reviews and contributed to improving development processes, ensuring high code quality.",
    ],
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
  { name: "SQL", category: "language" },
  { name: "React", category: "framework" },
  { name: "Next.js", category: "framework" },
  { name: "React Native", category: "framework" },
  { name: "Tailwind CSS", category: "framework" },
  { name: "Material UI", category: "framework" },
  { name: "Git", category: "tool" },
  { name: "WordPress", category: "tool" },
  { name: "Figma", category: "tool" },
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
