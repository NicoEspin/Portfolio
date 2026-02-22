import { motion } from "framer-motion";
import { Github, ArrowUpRight, ExternalLink } from "lucide-react";

const ProjectCard = ({ project, delay, featured = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      className={`group relative flex flex-col w-full bg-[#0a0f1e] rounded-2xl overflow-hidden
        border border-white/[0.07] hover:border-primary1/40
        transition-colors duration-500 will-change-transform transform-gpu
        ${featured ? "sm:col-span-2" : ""}
      `}
    >
      {/* ── Image area ── */}
      <div className={`relative overflow-hidden ${featured ? "h-[260px] sm:h-[320px]" : "h-[200px] sm:h-[220px]"}`}>
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Dark gradient overlay — always */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/40 to-transparent" />

        {/* Category tags — top left */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {project.category?.map((cat, i) => (
            <span
              key={i}
              className="text-[10px] px-2.5 py-1 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm text-text1/70 font-medium"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* GitHub icon — top right */}
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 flex items-center justify-center size-9 rounded-full
            border border-white/20 bg-black/50 backdrop-blur-sm
            text-text1/70 hover:text-text1 hover:border-primary1/50
            transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github size={15} />
        </motion.a>
      </div>

      {/* ── Content area ── */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 gap-4">

        {/* Title + live link */}
        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-bold text-text1 leading-tight ${featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"}`}>
            {project.title}
          </h3>
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center justify-center size-8 rounded-full
              border border-primary1/40 bg-primary1/10 text-primary1/80
              hover:bg-primary1/20 hover:border-primary1/70
              transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Live preview"
          >
            <ExternalLink size={13} />
          </motion.a>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-text1/55 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Highlights */}
        {project.highlights && (
          <ul className="flex flex-col gap-1.5">
            {project.highlights.slice(0, 2).map((h, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="flex-shrink-0 mt-[6px] w-1 h-1 rounded-full bg-primary1/50" />
                <span className="text-[11px] sm:text-xs text-text1/45 leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, featured ? 12 : 6).map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2.5 py-1 rounded-full
                border border-white/[0.08] bg-white/[0.03]
                text-text1/50 transition-colors duration-200
                group-hover:border-primary1/20 group-hover:text-text1/65"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > (featured ? 12 : 6) && (
            <span className="text-[10px] px-2.5 py-1 rounded-full border border-white/[0.05] text-text1/30">
              +{project.stack.length - (featured ? 12 : 6)}
            </span>
          )}
        </div>

        {/* ── CTA buttons — Hero style ── */}
        <div className="flex gap-3 items-center pt-1">
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-1 py-2 rounded-full
              border border-primary1 text-text1 bg-custom-gradient shadow-custom-shadow
              text-sm font-medium"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Live Preview
            <ArrowUpRight size={13} className="opacity-70" />
          </motion.a>

          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center size-10 rounded-full
              border border-primary1 text-text1 bg-custom-gradient shadow-custom-shadow
              flex-shrink-0"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={16} />
          </motion.a>
        </div>
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]
        bg-gradient-to-r from-transparent via-primary1/40 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
    </motion.div>
  );
};

export default ProjectCard;