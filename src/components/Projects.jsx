import { projects } from "../constants/constants";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import ProjectCard from "./ProjectCard";
import { textVariant } from "../utils/motion";

const Projects = () => {
  return (
    <section className="px-5 md:px-20 lg:px-5 py-20">
      <motion.div variants={textVariant()}>
        <h2 className="mb-20 text-4xl tracking-wider text-center text-text1 lg:text-5xl">
          {"<"}
          <span className="font-bold text-primary1">Projects </span>
          {"/>"}
        </h2>
      </motion.div>

      <div className="grid gap-10 sm:grid-cols-2">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} delay={idx * 0.2} />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Projects, "projects");
