import { projects } from "../constants/constants";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <section className="px-4 py-16 sm:px-6 md:px-12 lg:px-10 md:py-24 lg:pt-32">
      {/* ── Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12 sm:mb-16 text-center"
      >
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-text1/35 mb-3">
          What I've built
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-wider text-text1">
          {"<"}
          <span className="font-bold text-primary1">Projects </span>
          {"/>"}
        </h2>
        <motion.div
          className="mx-auto mt-4 h-[1px] bg-gradient-to-r from-transparent via-primary1/40 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: "160px" }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      {/* ── Grid ──
          First card is "featured" → spans 2 cols on sm+
          Rest fill in a standard 2-col grid                */}
      <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
        {projects.map((project, idx) => (
          <ProjectCard
            key={idx}
            project={project}
            delay={Math.min(idx * 0.1, 0.4)}
            featured={idx === 0}
          />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Projects, "projects");
