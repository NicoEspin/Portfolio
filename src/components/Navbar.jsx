import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-center pt-10 md:pt-10">
      <div className="fixed z-50 items-center">
        <SlideTabs />
      </div>
    </nav>
  );
};

const tabItems = [
  { href: "hero", label: "About" },
  { href: "skills", label: "Skills" },
  { href: "experience", label: "Experience" },
  { href: "projects", label: "Projects" },
  { href: "contact", label: "Contact" }
];


const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border border-gray-700 bg-transparent backdrop-blur-xl bg-opacity-70"
    >
      {tabItems.map((item, index) => (
        <Tab key={index} href={item.href} setPosition={setPosition}>
          {item.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ href, children, setPosition }) => {
  const ref = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    const element = document.getElementById(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-2 py-1.5 text-xs uppercase text-text1 mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      <a href={`#${href}`} onClick={handleClick} className="py-3">
        {children}
      </a>
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
    
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-primary1 md:h-12"
    />
  );
};
