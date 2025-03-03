import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { githubLink, linkedinLink, name } from "../constants/constants";

const Footer = () => {
  return (
    <footer className="bottom-0 flex flex-col justify-center items-center py-10 bg-background1 gap-10">
      <div className="flex gap-5">
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
      </div>
      <h2 className="uppercase text-primary1 text-2xl font-bold">{name}</h2>
      <p className="text-sm text-text1">&copy;2025 Espin.  All rights reserved</p>
    </footer>
  );
};

export default Footer;
