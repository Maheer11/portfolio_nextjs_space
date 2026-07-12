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
    'I\'m a versatile software engineer and co-founder of Ketapay, an escrow platform securing payments for Nigerian businesses that buy and sell online. Originally trained in the sciences, I transitioned into software engineering in 2023 and have since taken on full product ownership, hands-on QA, and engineering leadership.',
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
    liveUrl: "https://cozyhandmade.vercel.app/",
    githubUrl: "#",
  },
];

export const projectCategories = ['All', 'Full Stack', 'Mobile', 'AI/ML'] as const;

export type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  learning?: string;
};

export const experienceData: Experience[] = [
  {
    title: "Founding member QA/Software Engineer",
    company: "Ketapay",
    period: "Jan 2023 — Present",
    description:
      "Founding QA/Software Engineer at Ketapay, an escrow platform protecting online transactions between Nigerian businesses. Joined as a founding team member, starting in QA and growing into core software engineering — building and testing critical transaction flows, writing test plans, and shipping features across the platform. Collaborated closely with design, engineering, and operations to translate product requirements into reliable, well-tested code.",
    technologies: ["Docker","Postman", "Testing Library", "Deno(Unit test)"],
    learning:
      'Product thinking matters more than perfect code. Understanding the problem (escrow logic, fintech edge cases) was harder than implementing it. QA wasn\'t just testing—it was the gap between "this works" and "users won\'t be confused."',
  },

  {
    title: "Full-Stack Developer",
    company: "Independent Project",
    period: "Jan 2026 — Present",
    description:
    "Built a food product scanner app that lets users search or scan a product barcode to instantly view its ingredient list, flag ingredients against a personal watchlist (allergens, additives, banned substances), and surface health benefits or risks based on nutritional data. Designed the Supabase schema for products, ingredients, and user watchlists, implemented Row Level Security so users only manage their own lists, and built the ingredient-matching logic to cross-reference scanned products against flagged items in real time.",
  technologies: ["TypeScript", "Supabase", "PostgreSQL", "React", "Barcode/OCR API"],
  learning:
    "Data modeling matters more than UI polish early on — getting the ingredients-to-products relationship right saved me from rewriting the matching logic twice. Also learned that 'health benefits' data needs clear sourcing; users trust the app more when they can see where a claim comes from, not just the claim itself.",
  },
];

export type Education = {
  degree: string;
  school: string;
  period: string;
  description?: string;
};

export const educationData: Education[] = [
  {
    degree: 'B.Sc. Zoology',
    school: 'Kwara State University',
    period: '2015 – 2019',
  },
  {
    degree: 'Grokking the System Design Interview',
    school: 'Interview Ready',
    period: '2024 – Present',
    description: 'In-depth coursework on scalable system architecture, distributed systems design, and enterprise-grade software design patterns.',
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
