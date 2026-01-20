//importar dinamicamente los logos

const importAllLogos = import.meta.glob(
  "../assets/icons/*.{svg,png,webp,jpg,jpeg,gif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);
export const logos = Object.fromEntries(
  Object.entries(importAllLogos).map(([path, url]) => {
    const fileName = path.split("/").pop(); // más robusto que replace
    return [fileName, url];
  })
);

//NAV
export const navItems = [
  { title: "About", href: "about" },
  { title: "Skills", href: "skills" },
  { title: "Experience", href: "experience" },
  { title: "Projects", href: "projects" },
  { title: "Contact", href: "contact" },
];
//NAV

//HERO
export const name = "Nicolas Espin";
export const roles = [
  "Full Stack Developer",
  "Wordpress Developer",
  "Bubble Developer",
];
export const description =
  "I’m a Full Stack Developer with 2+ years of experience, with a strong focus on Front-End using React/Next.js, I led the migration of the front-end from Django Templates to Next.js + TypeScript + Redux, defining the architecture, patterns, and conventions for the new stack; I enjoy building scalable, high-performance products, having designed a robust design system and worked on optimizations and I also contributed to the development and orchestration of AI agents integrated into real recruiting workflows; my main stack includes Next.js, React, TypeScript, Redux Toolkit, TailwindCSS, Node.js/Nest.js, Express, MongoDB, PostgreSQL."

export const resumeLink =
  "https://docs.google.com/document/d/1iLgZIBS7QwWeZ5vD7CncYoO3VJ0BKyYp/edit";

export const githubLink = "https://github.com/NicoEspin";
export const linkedinLink =
  "https://www.linkedin.com/in/nicol%C3%A1s-espin-2b59a0183/";

//Skills
export const skills = [
  {
    title: "Frontend",
    skills: [
      {
        name: "React.js",
        logo: logos["react.svg"],
      },
      {
        name: "Tailwind",
        logo: logos["tailwind.svg"],
      },
      {
        name: "Javascript",
        logo: logos["js.svg"],
      },
      {
        name: "Typescript",
        logo: logos["typescript.svg"],
      },
      { name: "Next.js", logo: logos["nextjs.svg"] },
      {
        name: "CSS",
        logo: logos["css.svg"],
      },
      {
        name: "HTML",
        logo: logos["html.svg"],
      },
      {
        name: "Redux",
        logo: logos["redux.svg"],
      },

      {
        name: "Axios",
        logo: logos["axios.svg"],
      },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Nodejs", logo: logos["nodejs.svg"] },
      { name: "MongoDB", logo: logos["mongodb.svg"] },
      { name: "Firebase", logo: logos["firebase.svg"] },
      { name: "Socket.io", logo: logos["socket.svg"] },
      { name: "Express", logo: logos["express.svg"] },
      { name: "Postgresql", logo: logos["postgresql.svg"] },
    ],
  },
  {
    title: "Technologies",
    skills: [
      {
        name: "Git",
        logo: logos["git.svg"],
      },
      { name: "VS Code", logo: logos["vscode.svg"] },
      { name: "Postman", logo: logos["postman.svg"] },
      { name: "Github", logo: logos["github.svg"] },
      { name: "Wordpress", logo: logos["wordpress.svg"] },
      { name: "Bubble.io", logo: logos["bubble.svg"] },
    ],
  },
  {
    title: "Learning",
    skills: [
      { name: "Docker", logo: logos["docker.svg"] },
      { name: "AWS", logo: logos["aws.svg"] },
      { name: "n8n", logo: logos["n8n.svg"] },
    ],
  },
];
//Skills

//Experience
export const experiences = [
  {
    title: "Full Stack Developer",
    company_name: "Andeshire",
    icon: logos["logo-andes.webp"],
    iconBg: "#bbb3f2",
    date: "Jan 2025 - Present",
    points: [
      "Led a full front-end migration from Django Templates to Next.js (TypeScript) + Redux, defining the architecture, patterns, and conventions of the new stack. ",
      "Designed and built a design system and component architecture (600+ components), with global state in Redux organized by features and slices. ",
      " Implemented performance optimizations (lazy loading, selective memoization, bundle/code splitting, and selector audits) that reduced load times and improved perceived speed. ",
      "Developed and orchestrated AI agents to automate recruiting workflows (content generation, analysis, and automated actions), integrating them with existing services. ",
      "Collaborated on the Django (Python) backend to expose secure, high-performance endpoints,standardizing API contracts and handling front-end data serialization/normalization. ",
      "Stablished quality practices: robust state management, error handling, reusable hooks, and PR/code conventions to scale team development. ",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Personal Projects",
    icon: logos["code.svg"],
    iconBg: "#E6DEDD",
    date: "Dec 2022 - Present",
    points: [
      "I designed and developed web applications from scratch using the MERN stack (MongoDB, Express.js, React.js, Node.js), ensuring clean and scalable code.",
      "I identified and resolved technical issues, providing continuous support to ensure the proper functioning of the applications.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "I efficiently managed my projects, following best practices within my knowledge, optimizing application performance, and successfully deploying them to production.",
    ],
  },
  {
    title: "Wordpres Developer",
    company_name: "Freelance",
    icon: logos["wordpress.svg"],
    iconBg: "#fff",
    date: "Aug 2024 - Feb 2025",
    points: [
      "I have created and optimized multiple custom websites for various clients, ensuring they meet specific requirements and expectations regarding design and functionality.",
      "I provided ongoing support and tailored solutions for technical issues, ensuring my clients' websites run smoothly without interruptions.",
      "I advised my clients on the best use of WordPress and related tools, helping them make informed decisions about their web projects.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
    ],
  },
  {
    title: "Bubble.io Developer",
    company_name: "WeHunter",
    icon: logos["bubble.svg"],
    iconBg: "#bbb3f2",
    date: "Feb 2025 - may 2025",
    points: [
      "Collaborated in the development of an MVP using Bubble.io (low-code platform), working in an agile team to implement optimizations and iterative improvements that enhanced platform performance.",
      "Database Design: Built and structured the database schema, creating tables, defining relationships, and ensuring data integrity for scalability",
      "API Integrations: Integrated third-party APIs (e.g., country/country-code lookup services) and implemented custom workflows for real-time data validation in both frontend (forms, dynamic UI) and backend (business logic, error handling).",
      "Backend-Frontend Connectivity: Developed seamless data flows between frontend and backend, enabling dynamic features such as conditional UI elements, filters, and user input validations.",
      "UI/UX Development: Translated Figma designs into fully functional Bubble.io interfaces, ensuring responsive layouts, accessibility, and a smooth user experience.",
      "Quality Assurance: Conducted testing (unit, integration) to validate API reliability, data consistency, and error-free form submissions.",
    ],
  },
];
//Projects
export const projects = [
  {
    title: "Warup",
    category: ["Fullstack", "Backend", "Frontend"],
    description:
      "Real-time chat application with user authentication and message storage",
    image: "/projects/warup.webp",
    stack: [
      "Reactjs",
      "TailwindCSS",
      "Zutsand",
      "DaysiUi",
      "Nodejs",
      "Express",
      "MongoDB",
      "Socket.io",
    ],
    link: "https://chat-app-1-xsfr.onrender.com/login",
    github: "https://github.com/NicoEspin/Chat-App",
  },
  {
    title: "Andeshire",
    category: ["Fullstack", "Backend", "Frontend"],
    description:
      "ATS filter with AI to boost X10 the efficiency of the recruitment process",
    image: "/projects/andes-app.webp",
    stack: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Redux",
      "Next-intl",
      "Shadcn",
      "Django",
      "AWS",
      "Nest.js",
      "PostgreSQL",
      "Socket.io",
      "OpenAI",
    ],
    link: "https://andeshire.com/",
    github: "https://github.com/NicoEspin/Chat-App",
  },
  {
    title: "Synttek",
    category: "Frontend",
    description: "Modern Landing Page for a web development Agency",
    image: "/projects/synttek.webp",
    stack: ["Reactjs", "Next.js", "Next-intl", "TailwindCSS", "Framer Motion"],
    link: "https://syntek-phi.vercel.app/es",
    github: "https://github.com/NicoEspin/Syntek",
  },
  {
    title: "Portfolio for Designer",
    category: "Frontend",
    description: "Portfolio for Graphic Designer",
    image: "/projects/portfolio-ac.webp",
    stack: ["Next.js", "Vercel", "TailwindCSS", "Framer motion", "HeroUi"],
    link: "https://anttonella-catalano.vercel.app/",
    github: "https://github.com/NicoEspin/ACportfolio",
  },
  {
    title: "Admin Dashboard",
    category: "Frontend",
    description: "Admin Dashboard with Charts",
    image: "/projects/dashboard.webp",
    stack: ["Reactjs", "TailwindCSS", "Recharts", "Vercel", "Framer Motion"],
    link: "https://admin-dashboard-2hf2.vercel.app/",
    github: "https://github.com/NicoEspin/Admin-Dashboard",
  },
  {
    title: "VirtualR",
    category: "Frontend",
    description: "Landing Page",
    image: "/projects/virtualr.webp",
    stack: ["Reactjs", "TailwindCSS", "Firebase(Deploy)"],
    link: "https://virtualr-62845.web.app/",
    github: "https://github.com/NicoEspin/VirtualR",
  },
];

//Projects
