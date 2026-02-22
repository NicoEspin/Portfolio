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

// HERO SECTION
export const name = "Nicolas Espin";

export const resumeLink =
  "https://docs.google.com/document/d/1iLgZIBS7QwWeZ5vD7CncYoO3VJ0BKyYp/edit";

export const githubLink = "https://github.com/NicoEspin";
export const linkedinLink =
  "https://www.linkedin.com/in/nicol%C3%A1s-espin-2b59a0183/";

// SKILLS SECTION
export const skills = [
  {
    id: "frontend",
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
    id: "backend",
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
    id: "ai",
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
    id: "tools",
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
    id: "andeshire",
    company_name: "Andeshire",
    icon: logos["logo-andes.webp"],
    iconBg: "#bbb3f2",
  },
  {
    id: "wehunter",
    company_name: "WeHunter",
    icon: logos["bubble.svg"],
    iconBg: "#bbb3f2",
  },
  {
    id: "freelance",
    company_name: "Freelance",
    icon: logos["wordpress.svg"],
    iconBg: "#fff",
  },
  {
    id: "personal",
    company_name: "Personal Projects",
    icon: logos["code.svg"],
    iconBg: "#E6DEDD",
  },
];

// PROJECTS SECTION
export const projects = [
  {
    id: "andeshire",
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
  },
  {
    id: "thumblify",
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
  },
  {
    id: "warup",
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
  },
  {
    id: "synttek",
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
  },
  {
    id: "designer",
    image: "/projects/portfolio-ac.webp",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "HeroUI", "Vercel"],
    link: "https://anttonella-catalano.vercel.app/",
    github: "https://github.com/NicoEspin/ACportfolio",
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
export const contactEmail = "nicolasespin.dev@gmail.com";
