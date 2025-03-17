import { projects } from "../constants/constants";
import { fadeIn, textVariant } from "../utils/motion";
import { motion, useTime, useTransform } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { Github } from "lucide-react";

const Projects = () => {
  const time = useTime();

  // Efecto de gradiente rotativo con colores adaptados
  const rotate = useTransform(time, [0, 3000], [0, 360], { clamp: false });
  const rotatingBorder = useTransform(rotate, (r) => {
    return `conic-gradient(
      from ${r}deg,
      hsla(262, 60%, 60%, 0.8) 0%,
      hsla(250, 60%, 70%, 0.8) 15%,
      hsla(220, 60%, 60%, 0.8) 30%,
      hsla(150, 50%, 60%, 0.8) 45%, 
      hsla(240, 60%, 60%, 0.8) 60%,
      hsla(290, 50%, 55%, 0.8) 75%,
      hsla(300, 50%, 65%, 0.8) 100%
    )`;
  });

  return (
    <section className="px-5 md:px-20 lg:px-5 py-20">
      <motion.div variants={textVariant()}>
        <h2 className="mb-20 text-4xl tracking-wider text-center text-text1 lg:text-5xl">
          {"<"}
          <span className="font-bold text-primary1">Projects </span>
          {"/>"}
        </h2>
      </motion.div>

      <div className="lg:grid lg:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <motion.article
            variants={fadeIn("up", "spring", idx * 0.5, 0.75)}
            key={idx}
            className="bg-cover bg-center rounded-lg shadow-xl overflow-hidden p-5 md:p-10 mb-8 lg:mb-0 relative"
            style={{
              backgroundImage: `url(${project.image})`,
            }}
          >
            {/* Borde animado */}
            <motion.div
              className="absolute -inset-[1px] rounded-lg z-0"
              style={{
                background: rotatingBorder,
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
                padding: "3px", // Grosor del borde
              }}
            />

            {/* Contenido */} 
            <div className="relative z-10">
              <motion.a
                href={project.github}
                target="_blank"
                className="flex justify-center items-center size-11 border rounded-full border-primary1 text-text1 bg-custom-gradient shadow-custom-shadow"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github />
              </motion.a>

              <motion.div
                whileHover={{ y: -20 }}
                className="p-5 backdrop-blur-md bg-opacity-60 rounded-xl mt-32 bg-background2 flex flex-col justify-between min-h-[250px]"
              >
                <h2 className="text-xl font-extrabold text-center tracking-wide text-text1">
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-text1 text-center tracking-tight opacity-80">
                  {project.description}
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-3">
                  {project.stack.map((skill, idx) => (
                    <div
                      key={idx}
                      className="bg-[#17202D] rounded-xl p-1 border border-gray-500"
                    >
                      <h3 className="text-xs text-text1 opacity-80">{skill}</h3>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex justify-center">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    className="text-center text-sm w-[150px] p-2 rounded-full border border-primary1 text-text1 bg-custom-gradient flex-grow-0 shadow-custom-shadow cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Live Preview
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Projects, "projects");
