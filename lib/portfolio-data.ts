/* ============================================================
   PORTFOLIO DATA — Edit this file to customize all content
   ============================================================ */

export const siteConfig = {
  name: 'Mahmud Abdul Gafar',
  title: 'Software Engineer',
  email: 'mahhir09@gmail.com',
  phone: '08037646510',
  location: 'Abuja, Nigeria',
  github: 'https://github.com/Maheer11',
  linkedin: 'https://linkedin.com/in/abdul-gafarmahmud',
  twitter: 'https://twitter.com',
};

export const heroData = {
  greeting: 'Hello, I\'m',
  name: siteConfig.name,
  title: 'Software Engineer',
  description:
    'I build responsive, user-centered web and mobile products across the stack — from React and TypeScript front-ends to Java/Spring Boot services. Passionate about turning complex problems into elegant solutions.',
  cta: 'View My Work',
};

export const aboutData = {
  heading: 'About Me',
  paragraphs: [
    'I\'m a versatile software engineer and founding member of Ketapay, an escrow platform securing payments for Nigerian businesses that buy and sell online. Originally trained in the sciences, I transitioned into software engineering in 2023 and have since taken on full product ownership, hands-on QA, and engineering leadership.',
    'I build responsive, user-centered web and mobile products across the stack — from React and TypeScript front-ends to Java/Spring Boot services. I move fluently between writing code, reading and reasoning about unfamiliar codebases, and shaping raw ideas into clear, buildable solutions.',
    'I\'m known as a fast learner and dependable problem solver who ships reliable software in collaborative teams. When I\'m not building, you\'ll find me playing football or basketball, exploring board games, or working on side projects.',
  ],
  stats: [
    { label: 'Projects Built', value: 8 },
    { label: 'Companies', value: 4 },
    { label: 'Tech Stack', value: 10 },
    { label: 'Years in Tech', value: 2 },
  ],
};

export type Skill = {
  name: string;
  category: string;
};

export const skillsData: Skill[] = [
  // Frontend
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'HTML / CSS', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'Java', category: 'Backend' },
];

export const skillCategories = ['All', 'Frontend', 'Backend'] as const;

export type ProjectImage = {
  src: string;
  label: string;
  type: "desktop" | "mobile";
};

export type Project = {
  id: string;
  title: string;
  description: string;
  /** 1 to N screenshots. Card shows the first "desktop" image (or images[0]) as the cover; the rest are browsable in the gallery lightbox. */
  images: ProjectImage[];
  tags: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const projectsData: Project[] = [
  {
    id: "constructhq",
    title: "ConstructHQ",
    description:
      "A construction-company operations platform with staff attendance and clock-in, expense approvals, project tracking, and payroll dashboards.",
    images: [
      { src: "/projects/constructhqweb.png", label: "Dashboard overview", type: "desktop" },
      { src: "/projects/constructhqmobile.png", label: "Mobile dashboard", type: "mobile" },
      // Add up to 2 more desktop + 2 more mobile screenshots here as they're ready —
      // e.g. { src: "/projects/constructhq-attendance-web.png", label: "Attendance", type: "desktop" }
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    category: "Full Stack",
    liveUrl: "https://constructhq-umber.vercel.app/",
    // githubUrl: — add when the repo is public
  },
  {
    id: "watchlist",
    title: "Watchlist",
    description:
      "Scans food labels and explains ingredients in plain English, flagging ones worth watching — built for Nigeria.",
    images: [{ src: "/projects/watchlist.png", label: "Watchlist", type: "desktop" }],
    tags: ["Next.js", "React", "Vite", "Tailwind CSS"],
    category: "Full Stack",
    liveUrl: "https://watchlist-delta-one.vercel.app/",
    // githubUrl: — add when the repo is public
  },
  {
    id: "escrow-platform",
    title: "Escrow Platform",
    description:
      "An escrow platform securing payments for online transactions between Nigerian businesses.",
    images: [{ src: "/projects/ketapay.png", label: "Escrow app", type: "mobile" }],
    tags: ["React", "TypeScript", "Tailwind", "Node.js"],
    category: "Mobile",
    liveUrl: "https://ketapay.com",
    githubUrl: "#",
  },
  {
    id: "analytics-platform",
    title: "DataViz Analytics",
    description:
      "An interactive analytics platform with customizable dashboards, advanced charting, and automated reporting for business intelligence.",
    images: [
      {
        src: "https://cdn.abacus.ai/images/8749ee05-42d1-4235-867e-aa287b5eef36.png",
        label: "DataViz Analytics",
        type: "desktop",
      },
    ],
    tags: ["Python", "React", "D3.js", "PostgreSQL"],
    category: "Full Stack",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "social-platform",
    title: "E-commerce website for wool knitting",
    description:
      "A modern e-commerce platform for wool knitting enthusiasts, featuring product listings, custom designs, user reviews, and a community forum.",
    images: [{ src: "/projects/ecommerce.png", label: "Ecommerce", type: "desktop" }],
    tags: ["Typescript", "Supabase", "Node", "Tailwind CSS"],
    category: "Full Stack",
    liveUrl: "https://cozihandmade.com",
    githubUrl: "#",
  },
];

export const projectCategories = ['All', 'Full Stack', 'Mobile', 'AI/ML'] as const;

export type ExperienceCategory = "engineering" | "qa" | "freelance";

export type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  learning?: string;
  category: ExperienceCategory[];
  keyMetric: string;
};

export const experienceData: Experience[] = [
  {
    title: "Builder — WatchList: AI Food-Label Scanner",
    company: "Personal Product",
    period: "2026",
    description:
      "Designed, built, and deployed WatchList, a food-label scanning web app for everyday shoppers in Nigeria: photograph a product's ingredient panel and get a plain-English breakdown, with ingredients \"worth watching\" flagged and the general, true-for-everyone reason why. Architected a deliberately minimal, stateless backend — a single Supabase Edge Function as the secure boundary, receiving the image, calling Claude (Opus 4.8) via Anthropic's API with a tightly constrained prompt, and returning a structured breakdown. No database, no stored user photos — a privacy-first pilot choice. Engineered the safety layer in the prompt itself: declines to guess unreadable labels, flags ingredients as \"generally worth watching\" rather than giving personal medical advice, and cites no numbers without a named source. Ran a friends-and-family pilot via a deployed URL against real Nigerian packaging — faded, curved, glare-hit labels — validating vision-model extraction on messy real-world input.",
    technologies: ["Supabase Edge Functions", "Claude (Anthropic API)", "Next.js"],
    category: ["engineering"],
    keyMetric: "Zero database, zero stored photos — privacy-first pilot validated on real Nigerian packaging.",
  },
  {
    title: "Builder — ConstructHQ: Construction Workforce & Project Management Platform",
    company: "Personal Product",
    period: "2026",
    description:
      "Designed and built ConstructHQ, a construction-company operations platform covering staff attendance and clock-in, expense approvals, project tracking, and payroll dashboards.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    category: ["engineering"],
    keyMetric: "4 core modules shipped solo: attendance, expense approvals, project tracking, and payroll.",
  },
  {
    title: "QA Engineer — AI-Assisted Exploratory Testing (MCP)",
    company: "Ketapay",
    period: "2026",
    description:
      "Built an AI-assisted exploratory testing workflow by connecting Google Chrome's DevTools MCP (Model Context Protocol) server to Claude Code, enabling an AI agent to drive and inspect live browser sessions against Ketapay's web application. Directed agent-driven inspection of critical user flows — escrow invites, KYC steps, profile dashboard in sync with escrow creation and ratings — surfacing console errors, network-request failures, and rendered UI state at diagnosis speed a manual pass can't match. Operated the full MCP architecture hands-on: host (Claude Code), client, and tool-exposing server, including the permission and safety considerations of giving an AI agent live browser access.",
    technologies: ["Chrome DevTools MCP", "Claude Code", "Playwright"],
    category: ["qa"],
    keyMetric: "Built the full MCP pipeline — host, client, and tool-exposing server — for agent-driven browser testing.",
  },
  {
    title: "Founding Member & Software Engineer",
    company: "Ketapay",
    period: "2025 — Present",
    description:
      "Joined Ketapay as a founding team member of an escrow platform that protects online transactions between Nigerian businesses by holding buyer funds securely until both parties confirm a completed sale. Designed and built the public marketing site and product story pages (TypeScript, Next.js, Tailwind CSS) — hero, product pages, and blog live at ketapay.com. Ketapay's product backend runs on Supabase Edge Functions powering the platform's data and user layer. Owned QA for MVP1: installed sandbox builds via TestFlight and tested the complete escrow flow — funding, holding, release, and every fallback UI state — from the user side and against server-side behavior. Logged 150+ clear, reproducible issues in Linear across the MVP1 cycle, then worked a find → log → fix → verify loop with engineering through successive TestFlight builds; MVP1 shipped to production with those defects caught and resolved before any customer saw them. Grew into a core engineering and product role: architecture decisions, feature design, and input into the platform's technical direction. Drove product vision, translating secure-escrow requirements into prioritized engineering work and intuitive user journeys across design, engineering, and operations.",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Supabase Edge Functions", "TestFlight", "Linear"],
    learning:
      'Product thinking matters more than perfect code. Understanding the problem (escrow logic, fintech edge cases) was harder than implementing it. QA wasn\'t just testing—it was the gap between "this works" and "users won\'t be confused."',
    category: ["engineering", "qa"],
    keyMetric: "150+ reproducible issues logged in Linear across MVP1 — zero shipped to customers.",
  },
  {
    title: "Independent Web Builds — Supabase-Backed Sites",
    company: "Freelance / Personal Projects",
    period: "2025 — Present",
    description:
      "Built Cozy Handmade, an artisan e-commerce brand landing page and storefront, with Next.js and Supabase. Also built this personal portfolio website with Next.js and Supabase.",
    technologies: ["Next.js", "TypeScript", "Supabase"],
    category: ["freelance"],
    keyMetric: "2 Supabase-backed sites shipped end-to-end: Cozy Handmade storefront and this portfolio.",
  },
  {
    title: "Front-End Engineer — Scalable TypeScript Refactor (MVP)",
    company: "OneStop Solutions",
    period: "2023",
    description:
      "Refactored a critical production module to TypeScript, enforcing strong type safety and eliminating runtime type errors. Designed a modular, reusable architecture integrable across multiple applications, improving development efficiency and consistency. Established standardized, self-documenting code patterns that improved developer onboarding.",
    technologies: ["TypeScript", "React"],
    category: ["engineering"],
    keyMetric: "Refactored a critical production module into a reusable architecture used across multiple apps.",
  },
  {
    title: "Web Developer — Construction Company Website",
    company: "Nalot Multisystems Limited",
    period: "Sep 2023 — Dec 2025",
    description:
      "Developed and deployed a responsive WordPress/PHP website — service listings, project showcases, blog, and validated, spam-protected contact forms. Optimized performance and SEO, improving page-load speed and search rankings to boost lead generation. Managed hosting, domain, backups, and SSL, with ongoing post-launch support and feature updates.",
    technologies: ["WordPress", "PHP"],
    category: ["engineering"],
    keyMetric: "Improved page-load speed and search rankings to boost lead generation.",
  },
  {
    title: "Software Developer — Office Management App",
    company: "Nalot Multisystems Limited, Abuja",
    period: "Apr 2022 — Jun 2023",
    description:
      "Contributed to an office-operations platform including an attendance clock-in system. Implemented staff authentication with role-based access to internal data for viewing and managing profiles. Organized and structured company data to support efficient, streamlined operations.",
    technologies: ["PHP"],
    category: ["engineering"],
    keyMetric: "Shipped role-based authentication securing internal staff data access.",
  },
  {
    title: "ICT Support & Digital Learning Facilitator",
    company: "Digital Economy Learning Centre — NITDA, Nigeria",
    period: "Apr 2021 — Apr 2024",
    description:
      "Deployed and maintained connectivity for learning centres nationwide (KU-band, 3 Mbps down / 2 Mbps up). Installed e-learning infrastructure, locally hosted SaaS learning material, networked systems, and HUAWEI IdeaHub units across centres. Delivered hands-on digital tutorial classes to learners across the country.",
    technologies: [],
    category: [],
    keyMetric: "Deployed connectivity and e-learning infrastructure to learning centres nationwide.",
  },
];

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#case-study' },
  { label: 'Skills', href: '#skills' },
  { label: 'Now', href: '#now' },
  { label: 'Contact', href: '#contact' },
] as const;
