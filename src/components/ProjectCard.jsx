import { motion } from "framer-motion";
import { Github } from "lucide-react";
const ProjectCard = ({ project, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      className="group relative flex flex-col justify-between w-full h-[500px] bg-[#0f172a] rounded-2xl overflow-hidden shadow-md will-change-transform transform-gpu"
    >
      {/* Borde animado optimizado */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(108,99,255,0)_0%,_rgba(255,255,255,0.1)_50%,_rgba(108,99,255,0)_100%)] bg-[length:300%_100%] animate-[border-glow_8s_ease_infinite]" />
      </div>

      {/* Imagen del proyecto con transición suave */}
      <div className="h-2/5 overflow-hidden relative z-10">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col justify-between h-3/5 p-6 relative z-10">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-text1">{project.title}</h3>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text1 hover:text-primary1"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
          </motion.a>
        </div>

        <p className="text-sm text-text1 opacity-80 line-clamp-4 mb-3">
          {project.description}
        </p>

        {/* Tecnologías con el efecto original que funcionaba */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((tech, idx) => (
            <span
              key={idx}
              className="relative text-xs px-2 py-[2px] bg-[#1e293b] border border-gray-700 text-text1 rounded-full overflow-hidden z-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] group-hover:before:animate-[glow-sweep_1.5s_ease-in-out_infinite] before:z-10"
            >
              <span className="relative z-20">{tech}</span>
            </span>
          ))}
        </div>

        {/* Botón con animación mejorada */}
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 text-center text-sm text-text1 bg-gradient-to-r from-primary1/70 to-primary2/70 rounded-full border border-primary1 shadow-md"
          whileHover={{
            scale: 1.03,
            boxShadow: "0px 0px 15px rgba(133, 76, 230, 0.6)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10,
          }}
        >
          Live Preview
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;