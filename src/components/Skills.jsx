import React from "react";
import { skills } from "../constants/constants.js";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const Skills = () => {
  return (
    <section className="px-5 py-20 md:pt-44 lg:mt-28 md:px-20 lg:px-5">
      <motion.div variants={textVariant()}>
        <h2 className="mb-20 text-4xl lg:text-5xl tracking-wider text-center text-text1 ">
          {"<"}
          <span className="font-bold text-primary1">My Stack </span>
          {"/>"}
        </h2>
      </motion.div>
      <div className="grid grid-cols-1  gap-8 md:gap-10 md:px-10 lg:gap-20 md:grid-cols-2 ">
        {skills.map((category, index) => (
          <Tilt key={index}>
            <motion.div
              variants={fadeIn("right", "spring", index * 0.5, 0.75)}
              className="bg-gray-800 p-4 rounded-lg shadow-card-shadow flex flex-col items-center justify-between  
              min-h-[350px]  md:min-h-[450px] 
             border border-gray-700 bg-opacity-90 "
            >
              <h2 className="mb-4 text-xl font-bold text-center text-white">
                {category.title}
              </h2>
              <div className="flex-grow w-full">
                <div className="grid   gap-4 grid-cols-3  ">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-2 p-2 border border-gray-800 rounded-lg shadow-lg "
                    >
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="size-8 md:size-11 mb-2"
                      />
                      <span className="text-sm text-center text-text1 opacity-80">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Skills, "skills");
