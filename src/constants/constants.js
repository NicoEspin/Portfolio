//importar dinamicamente los logos

const importAllLogos = import.meta.glob("../assets/icons/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

export const logos = Object.keys(importAllLogos).reduce((acc, path) => {
  const fileName = path.replace("../assets/icons/", "");
  acc[fileName] = importAllLogos[path];
  return acc;
}, {});

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
  "I am a motivated and versatile individual, always eager to take on new challenges. With a passion for learning, I am dedicated to delivering high-quality results. With a positive attitude and a growth mindset, I am ready to make a meaningful contribution and achieve great things.";
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
    title: "Admin Dashboard",
    category: "Frontend",
    description: "Admin Dashboard with Charts",
    image: "/projects/dashboard2.webp",
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
  {
    title: "PortfolioAC",
    category: "Frontend",
    description: "Freelance job: Portfolio for a graphic designer",
    image: "/projects/antto-port.webp",
    stack: [
      "Reactjs",
      "Tailwind",
      "NextUI",
      "Framer Motion",
      "Firebase(Deploy)",
    ],
    link: "https://portfolio-ac-1c027.web.app/",
    github: "https://github.com/NicoEspin/PortfolioAC",
  },

  {
    title: "E-commerce",
    category: "Frontend",
    description: "E-commerce web App",
    image: "/projects/ecommerce-react.webp",
    stack: ["Reactjs", "Firebase", "CSS", "MaterialUI"],
    link: "https://ecommerce-6899c.web.app/",
    github: "https://github.com/NicoEspin/reactFinal",
  },
  {
    title: "Game List App",
    category: "Frontend",
    description: "Game list Web App using RAWG API",
    image: "/projects/gamelist.webp",
    stack: ["Reactjs", "RAWG API", "TailwindCSS", "Axios"],
    link: "https://game-list-app-8d0d2.web.app/",
    github: "https://github.com/NicoEspin/GameListApp",
  },
];

//Projects
