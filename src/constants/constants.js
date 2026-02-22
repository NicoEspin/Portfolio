// Import logos dynamically
const importAllLogos = import.meta.glob(
  "../assets/icons/*.{svg,png,webp,jpg,jpeg,gif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

export const logos = Object.fromEntries(
  Object.entries(importAllLogos).map(([path, url]) => {
    const fileName = path.split("/").pop();
    return [fileName, url];
  }),
);

// NAVIGATION
export const navItems = [
  { title: "About", href: "about" },
  { title: "Skills", href: "skills" },
  { title: "Experience", href: "experience" },
  { title: "Projects", href: "projects" },
  { title: "Contact", href: "contact" },
];

// HERO SECTION
export const name = "Nicolas Espin";
export const roles = [
  "Full Stack Developer",
  "Frontend Architect",
  "AI Integration Specialist",
];

export const description =
  "I build scalable web applications that solve real business problems. At Andeshire, I architected the complete frontend migration from legacy Django Templates to a modern Next.js + TypeScript + Redux stack, establishing patterns and conventions used by the entire development team. I specialize in high-performance React ecosystems and AI agent orchestration—automating recruiting workflows that transform hours of manual work into minutes. My focus is creating systems that are maintainable, fast, and deliver measurable business impact.";

export const resumeLink =
  "https://docs.google.com/document/d/1iLgZIBS7QwWeZ5vD7CncYoO3VJ0BKyYp/edit";

export const githubLink = "https://github.com/NicoEspin";
export const linkedinLink =
  "https://www.linkedin.com/in/nicol%C3%A1s-espin-2b59a0183/";

// SKILLS SECTION
export const skills = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", logo: logos["react.svg"] },
      { name: "Next.js", logo: logos["nextjs.svg"] },
      { name: "TypeScript", logo: logos["typescript.svg"] },
      { name: "Redux Toolkit", logo: logos["redux.svg"] },
      { name: "Tailwind CSS", logo: logos["tailwind.svg"] },
      { name: "JavaScript", logo: logos["js.svg"] },
      { name: "HTML5", logo: logos["html.svg"] },
      { name: "CSS3", logo: logos["css.svg"] },
      { name: "Axios", logo: logos["axios.svg"] },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", logo: logos["nodejs.svg"] },
      { name: "NestJS", logo: logos["nestjs.svg"] || logos["nestjs.png"] },
      { name: "Express", logo: logos["express.svg"] },
      { name: "PostgreSQL", logo: logos["postgresql.svg"] },
      { name: "MongoDB", logo: logos["mongodb.svg"] },
      { name: "Firebase", logo: logos["firebase.svg"] },
      { name: "Socket.io", logo: logos["socket.svg"] },
      { name: "Django", logo: logos["django.svg"] || logos["django.png"] },
    ],
  },
  {
    title: "AI & Automation",
    skills: [
      { name: "OpenAI API", logo: logos["openai.svg"] || logos["openai.png"] },
      { name: "Gemini API", logo: logos["gemini.svg"] || logos["gemini.png"] },
      { name: "AI Agents", logo: logos["agent.svg"] || logos["brain.svg"] },
      { name: "n8n", logo: logos["n8n.svg"] },
      { name: "Playwright MCP", logo: logos["playwright.svg"] },
      {
        name: "Prompt Engineering",
        logo: logos["prompt.svg"] || logos["chat.svg"],
      },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", logo: logos["git.svg"] },
      { name: "GitHub", logo: logos["github.svg"] },
      { name: "VS Code", logo: logos["vscode.svg"] },
      { name: "Postman", logo: logos["postman.svg"] },
      { name: "AWS", logo: logos["aws.svg"] },
      { name: "Docker", logo: logos["docker.svg"] },
      { name: "Vercel", logo: logos["vercel.svg"] || logos["vercel.png"] },
      { name: "WordPress", logo: logos["wordpress.svg"] },
      { name: "Bubble.io", logo: logos["bubble.svg"] },
    ],
  },
];

// EXPERIENCE SECTION
export const experiences = [
  {
    title: "Full Stack Developer",
    company_name: "Andeshire",
    icon: logos["logo-andes.webp"],
    iconBg: "#bbb3f2",
    date: "Jan 2025 - Present",
    points: [
      "Architected and executed migration from monolithic Django Templates to Next.js + TypeScript + Redux, establishing codebase standards and patterns adopted by the entire development team",
      "Engineered a comprehensive design system of 600+ reusable components with feature-based Redux architecture, reducing new feature development time by approximately 30%",
      "Implemented advanced performance optimizations including lazy loading, code splitting, selective memoization, and selector audits—significantly improving Core Web Vitals and perceived load speed",
      "Designed and orchestrated AI agent workflows that automate candidate screening, content generation, and recruiting actions, delivering measurable efficiency gains to the HR team",
      "Standardized API contracts between Django backend and frontend, eliminating data inconsistencies and reducing integration-related bugs by establishing clear serialization protocols",
      "Established team-wide quality practices including robust state management patterns, reusable custom hooks, comprehensive error handling, and strict PR review conventions",
    ],
  },
  {
    title: "Bubble.io Developer",
    company_name: "WeHunter",
    icon: logos["bubble.svg"],
    iconBg: "#bbb3f2",
    date: "Feb 2025 - May 2025",
    points: [
      "Delivered production-ready MVP in 3 months using Bubble.io, enabling the client to validate their business model with real users and secure early traction",
      "Architected scalable database schema with complex relational models supporting 10,000+ records while maintaining query performance and data integrity",
      "Built robust API integrations with third-party services (country lookup, validation APIs) featuring custom error handling, retry logic, and real-time data validation",
      "Translated Figma designs into pixel-perfect functional interfaces with responsive layouts, accessibility compliance, and smooth user interactions",
      "Implemented automated testing workflows and quality assurance protocols that identified and resolved 20+ critical issues pre-launch",
    ],
  },
  {
    title: "WordPress Developer",
    company_name: "Freelance",
    icon: logos["wordpress.svg"],
    iconBg: "#fff",
    date: "Aug 2024 - Feb 2025",
    points: [
      "Developed 5+ custom WordPress solutions from scratch, each tailored to specific client business requirements and branding guidelines",
      "Achieved 50% average reduction in page load times through performance optimization techniques including caching strategies, image optimization, and minimal plugin architecture",
      "Maintained 100% client retention rate through proactive communication, ongoing technical support, and empowering clients with content management training",
      "Implemented mobile-first responsive design and cross-browser compatibility across all projects, directly contributing to improved client SEO rankings",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Personal Projects",
    icon: logos["code.svg"],
    iconBg: "#E6DEDD",
    date: "Dec 2022 - Present",
    points: [
      "Architected and deployed multiple full-stack applications using MERN stack (MongoDB, Express.js, React.js, Node.js), focusing on clean code architecture and scalability",
      "Implemented real-time functionality using Socket.io, JWT authentication systems, and RESTful API design patterns",
      "Managed complete project lifecycles from concept to deployment, utilizing CI/CD pipelines and cloud infrastructure (Vercel, Firebase, Render)",
      "Continuously refined development workflows and adopted industry best practices for code quality, security, and performance optimization",
    ],
  },
];

// PROJECTS SECTION
export const projects = [
  {
    title: "Andeshire",
    category: ["Full Stack", "AI Integration", "Enterprise"],
    description:
      "Enterprise-grade ATS platform with AI-powered candidate filtering that 10x's recruiting team efficiency through automated screening and intelligent workflow orchestration",
    image: "/projects/andes-app.webp",
    stack: [
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "Tailwind CSS",
      "shadcn/ui",
      "Next-Intl",
      "NestJS",
      "Django",
      "PostgreSQL",
      "AWS",
      "Socket.io",
      "OpenAI",
    ],
    link: "https://andeshire.com/",
    github: "https://github.com/NicoEspin/andeshire-platform",
    highlights: [
      "600+ component design system",
      "AI agent orchestration",
      "Real-time collaboration features",
    ],
  },
  {
    title: "Thumblify",
    category: ["Full Stack", "AI", "Product"],
    description:
      "AI-powered YouTube thumbnail generator with authentication, personal gallery, and a public community feed. Includes styles, aspect ratios, color schemes, visibility (public/private), and reference images to guide generation.",
    image: "/projects/thumblify.webp", // asegurate de subir esta imagen a /public/projects
    stack: [
      // Frontend
      "React",
      "TypeScript",
      "Tailwind",
      "i18next",
      "Axios",
      "Motion",
      "Lucide",
      // Backend
      "Node.js",
      "Express",
      "MongoDB",
      "Cloudinary",
      "Gemini (@google/genai)",
    ],
    link: "https://thumblify-chi-henna.vercel.app/",
    github: "https://github.com/NicoEspin/Thumbnail-Generator", // Frontend repo
    highlights: [
      "Generation with style, aspect ratio, color scheme, visibility (public/private) + optional text overlay",
      "Reference images (up to 2) with roles: auto/person/background/style",
      "My Generations gallery + Community feed with pagination (Load more)",
      "Backend repo: https://github.com/NicoEspin/Thumbnail-Generator-Backend",
    ],
  },
  {
    title: "Warup",
    category: ["Full Stack", "Real-time", "WebSocket"],
    description:
      "High-performance real-time chat platform handling 100+ concurrent connections with sub-100ms message delivery and persistent message history",
    image: "/projects/warup.webp",
    stack: [
      "React.js",
      "Zustand",
      "Tailwind CSS",
      "DaisyUI",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "JWT Auth",
      "Cloudinary",
    ],
    link: "https://chat-app-1-xsfr.onrender.com/login",
    github: "https://github.com/NicoEspin/Chat-App",
    highlights: [
      "Real-time bidirectional communication",
      "Persistent chat history",
      "Responsive mobile-first design",
    ],
  },
  {
    title: "Synttek",
    category: ["Frontend", "Landing Page", "Animation"],
    description:
      "High-converting landing page for a web development agency featuring sophisticated animations and internationalization support",
    image: "/projects/synttek.webp",
    stack: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "Framer Motion",
      "Next-Intl",
    ],
    link: "https://syntek-phi.vercel.app/es",
    github: "https://github.com/NicoEspin/Syntek",
    highlights: [
      "Smooth scroll animations",
      "Multi-language support",
      "Optimized Core Web Vitals",
    ],
  },
  {
    title: "Portfolio for Designer",
    category: ["Frontend", "Portfolio", "Animation"],
    description:
      "Award-worthy portfolio website for a graphic designer featuring immersive animations and dynamic content presentation",
    image: "/projects/portfolio-ac.webp",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "HeroUI", "Vercel"],
    link: "https://anttonella-catalano.vercel.app/",
    github: "https://github.com/NicoEspin/ACportfolio",
    highlights: [
      "Custom cursor interactions",
      "Gallery with smooth transitions",
      "SEO-optimized for creative professionals",
    ],
  },
  // {
  //   title: "Admin Dashboard",
  //   category: ["Frontend", "Dashboard", "Data Viz"],
  //   description:
  //     "Comprehensive analytics dashboard with interactive data visualization, real-time metrics, and intuitive user management interface",
  //   image: "/projects/dashboard.webp",
  //   stack: ["React.js", "Tailwind CSS", "Recharts", "Framer Motion", "Vercel"],
  //   link: "https://admin-dashboard-2hf2.vercel.app/",
  //   github: "https://github.com/NicoEspin/Admin-Dashboard",
  //   highlights: [
  //     "Interactive charts and graphs",
  //     "Dark/light mode toggle",
  //     "Responsive data tables",
  //   ],
  // },
  // {
  //   title: "VirtualR",
  //   category: ["Frontend", "Landing Page", "Marketing"],
  //   description:
  //     "Modern SaaS landing page with compelling value proposition, feature highlights, and conversion-optimized call-to-actions",
  //   image: "/projects/virtualr.webp",
  //   stack: ["React.js", "Tailwind CSS", "Firebase Hosting"],
  //   link: "https://virtualr-62845.web.app/",
  //   github: "https://github.com/NicoEspin/VirtualR",
  //   highlights: [
  //     "Clean modern UI/UX",
  //     "Fast load times",
  //     "Mobile-responsive design",
  //   ],
  // },
];

// CONTACT SECTION
export const contactInfo = {
  email: "nicolasespin.dev@gmail.com",
  location: "Remote / Available Worldwide",
  availability: "Open to full-time opportunities and freelance projects",
};
