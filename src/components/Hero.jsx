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

import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Tilt } from "react-tilt";

import { SectionWrapper } from "../hoc";

// Subtle grid overlay
const GridLines = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.035]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#a78bfa" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" />
    </svg>
  </div>
);

// Reusable fade-in with direct animate (no variant inheritance needed)
const FadeIn = ({ children, delay = 0, direction = "up", className = "" }) => {
  const dirMap = {
    up:    { y: 24, x: 0 },
    down:  { y: -24, x: 0 },
    left:  { y: 0, x: -24 },
    right: { y: 0, x: 24 },
  };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

// Stat badge
const StatBadge = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className="flex flex-col items-center gap-1 px-5 py-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
  >
    <span className="text-xl font-bold text-primary1 leading-none">{value}</span>
    <span className="text-[10px] text-text1/45 uppercase tracking-widest whitespace-nowrap">{label}</span>
  </motion.div>
);

const HeroSection = () => {
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1];

  return (
    <main className="relative mx-auto px-5 py-10 lg:pt-16 md:px-20 lg:px-10 overflow-hidden min-h-screen flex items-center">

      {/* Subtle grid */}
      <GridLines />

      {/* Main layout */}
      <div className="relative z-10 w-full flex flex-col-reverse gap-16 lg:gap-0 lg:flex-row lg:items-center lg:justify-between py-8">

        {/* ─── LEFT COLUMN ─── */}
        <div className="flex flex-col items-start justify-center gap-8 w-full lg:max-w-[55%]">

          {/* Availability badge */}
          <FadeIn delay={0.1} direction="down">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary1/30 bg-primary1/5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-xs text-text1/60 tracking-widest uppercase">Available for opportunities</span>
            </div>
          </FadeIn>

          {/* Name — split for visual weight */}
          <div className="flex flex-col gap-0">
            <FadeIn delay={0.2} direction="left">
              <h1 className="text-5xl font-black lg:text-7xl text-text1 uppercase tracking-tight leading-none">
                {firstName}
              </h1>
            </FadeIn>
            <FadeIn delay={0.35} direction="left">
              <div className="flex items-center gap-4">
                <h1
                  className="text-5xl font-black lg:text-7xl uppercase tracking-tight leading-none"
                  style={{
                    WebkitTextStroke: "1.5px rgba(167, 139, 250, 0.7)",
                    color: "transparent",
                  }}
                >
                  {lastName}
                </h1>
                {/* Decorative accent line */}
                <motion.div
                  className="h-[3px] bg-gradient-to-r from-primary1 to-transparent rounded-full hidden lg:block"
                  initial={{ width: 0 }}
                  animate={{ width: "120px" }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </FadeIn>
          </div>

          {/* Typewriter role */}
          <FadeIn delay={0.5} direction="left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-primary1 rounded-full flex-shrink-0" />
              <h2 className="text-lg font-semibold md:text-xl lg:text-2xl text-primary1/90 font-mono">
                <Typewriter
                  options={{
                    strings: roles,
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 30,
                    delay: 75,
                    cursor: "▮",
                  }}
                />
              </h2>
            </div>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.7} direction="up">
            <p className="text-sm md:text-base lg:text-[15px] lg:max-w-[520px] text-text1/55 leading-relaxed">
              {description}
            </p>
          </FadeIn>

          {/* Stats row */}
          <div className="flex gap-4 flex-wrap">
            <StatBadge value="1000+" label="Components built" delay={0.85} />
            <StatBadge value="20+"   label="Projects shipped"  delay={0.95} />
            <StatBadge value="3+"   label="Years experience"  delay={1.05} />
          </div>

          {/* CTA Buttons — original styles preserved */}
          <FadeIn delay={1.15} direction="up">
            <div className="flex gap-4 items-center">
              <motion.a
                href={resumeLink}
                target="_blank"
                className="text-center w-[150px] md:w-[200px] p-2 rounded-full border border-primary1 text-text1 bg-custom-gradient flex-grow-0 shadow-custom-shadow flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Resume
                <ArrowUpRight size={14} className="opacity-70" />
              </motion.a>
              <motion.a
                href={githubLink}
                target="_blank"
                className="flex justify-center items-center size-11 border rounded-full border-primary1 text-text1 bg-custom-gradient shadow-custom-shadow"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href={linkedinLink}
                target="_blank"
                className="flex justify-center items-center size-11 border rounded-full border-primary1 text-text1 bg-custom-gradient shadow-custom-shadow"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
          </FadeIn>
        </div>

        {/* ─── RIGHT COLUMN — Profile Image ─── */}
        <motion.div
          className="relative flex justify-center order-1 lg:order-2 items-center w-full max-w-[320px] mx-auto lg:mx-0 lg:max-w-[380px]"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Rotating ring with glowing dot */}
          <motion.div
            className="absolute inset-0 rounded-full border border-primary1/10"
            style={{ transform: "scale(1.25)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary1"
              style={{ boxShadow: "0 0 12px rgba(139,92,246,0.9)" }}
            />
          </motion.div>

          {/* Counter-rotating dashed ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-white/[0.05]"
            style={{ transform: "scale(1.5)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />

          {/* BG animation blob */}
          <div
            className="absolute inset-0 z-0 flex items-center justify-center"
            style={{ transform: "scale(1.5) translateY(105px)" }}
          >
            <BgAnimation className="w-full h-full" />
          </div>

          {/* Profile image */}
          <Tilt
            options={{
              max: 15,
              scale: 1.03,
              speed: 400,
              glare: true,
              "max-glare": 0.12,
            }}
          >
            <img
              src="./Yo-profile.webp"
              className="relative rounded-full max-h-[300px] max-w-[300px] z-10 border-2 border-primary1 shadow-custom-shadow lg:min-w-[300px] lg:min-h-[300px]"
              alt={name}
            />
          </Tilt>

          {/* Floating tag — tech stack */}
          <motion.div
            className="absolute -bottom-4 -left-6 z-20 px-3 py-2 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md text-xs text-text1/70 font-mono"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <span className="text-primary1">const</span> stack ={" "}
            <span className="text-green-400">"Next · Node · AI"</span>
          </motion.div>

          {/* Floating tag — location */}
          <motion.div
            className="absolute -top-2 -right-4 z-20 px-3 py-2 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md text-xs text-text1/70 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <span className="text-base">🌍</span>
            <span>Remote / Worldwide</span>
          </motion.div>
        </motion.div>
      </div>

    </main>
  );
};

export default SectionWrapper(HeroSection, "hero");