import React from "react";
import BgAnimation from "./bg/BgAnimation";
import {
  name,
  description,
  resumeLink,
  roles,
  githubLink,
  linkedinLink,
} from "../constants/constants.js";

import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Tilt } from "react-tilt";

import { zoomIn, fadeIn, textVariant } from "../utils/motion.js";

import { SectionWrapper } from "../hoc";

const HeroSection = () => {
  return (
    <main className=" mx-auto px-5 py-10 lg:pt-20 md:px-20 lg:px-5">
      <div className="flex  flex-col-reverse gap-12  py-8 lg:justify-between sm:content-center lg:flex-row ">
        <div
          className="z-10 flex flex-col items-center justify-center gap-12 lg:items-start"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            variants={fadeIn("right", 0.2, 1)}
            className="text-4xl font-semibold lg:text-6xl text-start text-text1 uppercase "
          >
            {name}
          </motion.h1>
          <motion.h2 variants={fadeIn("right", "spring", 1, 0.75)} 
          className="text-2xl font-bold md:text-3xl lg:text-4xl text-start text-primary1">
            <Typewriter
              options={{
                strings: roles,
                autoStart: true,
                loop: true,
                deleteSpeed: 30,
                delay: 75,
                cursor: "|",
              }}
            />
          </motion.h2>
          <motion.p 
          variants={textVariant(1.5)}
          className="text-sm md:text-md lg:text-lg lg:max-w-xl text-text1">
            {description}
          </motion.p>
          <motion.div variants={fadeIn("right", "spring", 2, 0.75)} className="flex gap-10">
            <motion.a
              href={resumeLink}
              target="_blank"
              className="text-center w-[150px] md:w-[200px] p-2 rounded-full border border-primary1 text-text1 bg-custom-gradient flex-grow-0 
             shadow-custom-shadow "
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.a>
            <motion.a
              href={githubLink}
              target="_blank"
              className=" flex justify-center items-center size-11 border  rounded-full border-primary1 text-text1 
               bg-custom-gradient 
              shadow-custom-shadow "
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github />
            </motion.a>
            <motion.a
              href={linkedinLink}
              target="_blank"
              className=" flex justify-center items-center size-11 border  rounded-full border-primary1 text-text1 
               bg-custom-gradient 
              shadow-custom-shadow "
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin />
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="relative flex justify-center order-1 items-center w-full max-w-[300px] 
          mx-auto lg:mx-0"
          variants={zoomIn(2.5, 1)}
        >
          <div
            className="absolute inset-0 z-0 flex items-center justify-center "
            style={{ transform: "scale(1.5) translateY(105px)" }}
          >
            <BgAnimation className="w-full h-full" />
          </div>
          <Tilt>
            <img
              src="./Yo-profile.webp"
              className="relative rounded-full max-h-[300px] max-w-[300px]  z-10 border-2 border-primary1 shadow-custom-shadow
               lg:min-w-[300px] lg:min-h-[300px]"
              alt={name}
            />
          </Tilt>
        </motion.div>
      </div>
    </main>
  );
};

export default SectionWrapper(HeroSection, "hero");
