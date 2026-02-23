import React, { useState } from "react";
import { skills } from "../constants/constants.js";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { useTranslation } from "react-i18next";

const categoryAccents = {
  frontend: { symbol: "◈", color: "#a78bfa" },
  backend:  { symbol: "◎", color: "#60a5fa" },
  ai:       { symbol: "◆", color: "#34d399" },
  tools:    { symbol: "◇", color: "#f472b6" },
};

/* ─── Single skill card ─── */
const SkillCard = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.35, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="group relative flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl
      border border-white/[0.06] bg-white/[0.02]
      hover:border-primary1/40 hover:bg-primary1/[0.05]
      transition-all duration-300 cursor-default"
  >
    <div
      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ boxShadow: "inset 0 0 18px rgba(139,92,246,0.07)" }}
    />
    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg
      bg-background2 border border-white/[0.06] group-hover:border-primary1/20
      transition-colors duration-300 flex-shrink-0"
    >
      {skill.logo ? (
        <img
          src={skill.logo}
          alt={skill.name}
          className="w-6 h-6 sm:w-7 sm:h-7 object-contain transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      ) : (
        <span className="text-lg text-primary1/50">?</span>
      )}
    </div>
    <span className="text-[10px] sm:text-xs text-center text-text1/50 group-hover:text-text1/80
      transition-colors duration-300 leading-tight w-full">
      {skill.name}
    </span>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 group-hover:w-3/4
      bg-gradient-to-r from-transparent via-primary1/50 to-transparent
      transition-all duration-300 rounded-full"
    />
  </motion.div>
);

/* ─── Mobile category card (2×2 grid) ─── */
const MobileCategoryCard = ({ category, isActive, onClick, t }) => {
  const title = t(`skills.categories.${category.id}.title`);
  const acc = categoryAccents[category.id] || { symbol: "◉", color: "#a78bfa" };
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-start gap-2 p-4 rounded-2xl border
        text-left w-full transition-all duration-200
        ${isActive
          ? "border-primary1/50 bg-primary1/10"
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04]"
        }`}
    >
      <span
        className="text-xl leading-none transition-colors duration-200"
        style={{ color: isActive ? acc.color : "rgba(255,255,255,0.18)" }}
      >
        {acc.symbol}
      </span>
      <span className={`text-xs font-semibold leading-tight transition-colors duration-200
        ${isActive ? "text-text1" : "text-text1/45"}`}>
        {title}
      </span>
      <span className={`text-[10px] font-mono tabular-nums transition-colors duration-200
        ${isActive ? "text-primary1/70" : "text-text1/25"}`}>
        {category.skills.length} {t("skills.labels.skills")}
      </span>
      {isActive && (
        <motion.div
          layoutId="mobileCard"
          className="absolute inset-0 rounded-2xl border border-primary1/40 pointer-events-none"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
    </button>
  );
};

/* ─── Main component ─── */
const Skills = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = skills[activeIndex];
  const activeTitle = t(`skills.categories.${activeCategory.id}.title`);
  const accent = categoryAccents[activeCategory.id] || { symbol: "◉", color: "#a78bfa" };

  const viewportOpts = { once: true, margin: "-80px" };
  const ease = [0.25, 0.46, 0.45, 0.94];

  return (
    <section className="px-4 py-16 sm:px-6 md:px-12 lg:px-10 md:py-24 lg:pt-32">

      {/* ── Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOpts}
        transition={{ duration: 0.65, ease }}
        className="mb-10 sm:mb-14 text-center"
      >
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-text1/35 mb-3">
          {t("skills.eyebrow")}
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-wider text-text1">
          {"<"}
          <span className="font-bold text-primary1">{t("skills.title")} </span>
          {"/>"}
        </h2>
        <motion.div
          className="mx-auto mt-4 h-[1px] bg-gradient-to-r from-transparent via-primary1/40 to-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: "160px" }}
          viewport={viewportOpts}
          transition={{ delay: 0.3, duration: 0.8, ease }}
        />
      </motion.div>

      <div className="max-w-5xl mx-auto">

        {/* ══ MOBILE / TABLET layout (< lg) ══ */}
        <div className="lg:hidden flex flex-col gap-5">

          {/* 2×2 category grid — staggered cards */}
          <div className="grid grid-cols-2 gap-3">
            {skills.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOpts}
                transition={{ duration: 0.5, delay: index * 0.08, ease }}
              >
                <MobileCategoryCard
                  category={category}
                  isActive={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                  t={t}
                />
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOpts}
            transition={{ duration: 0.5, delay: 0.35, ease }}
            className="flex items-center gap-3"
          >
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="flex items-center gap-1.5 text-[10px] text-text1/35 uppercase tracking-widest">
              <span style={{ color: accent.color }}>{accent.symbol}</span>
              {activeTitle}
              <span className="text-text1/20 font-mono">· {activeCategory.skills.length}</span>
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </motion.div>

          {/* Skill grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease }}
              className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3"
            >
              {activeCategory.skills.map((skill, idx) => (
                <SkillCard key={skill.name} skill={skill} index={idx} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ══ DESKTOP layout (lg+) ══ */}
        <div className="hidden lg:flex gap-10 items-start">

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOpts}
            transition={{ duration: 0.65, ease }}
            className="w-[210px] flex-shrink-0 flex flex-col gap-2"
          >
            {skills.map((category, index) => {
              const title = t(`skills.categories.${category.id}.title`);
              const acc = categoryAccents[category.id] || { symbol: "◉", color: "#a78bfa" };
              const isActive = activeIndex === index;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOpts}
                  transition={{ duration: 0.45, delay: index * 0.07, ease }}
                  onClick={() => setActiveIndex(index)}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border
                    text-sm font-medium text-left w-full transition-all duration-200
                    ${isActive
                      ? "border-primary1/50 bg-primary1/10 text-text1"
                      : "border-white/[0.06] bg-white/[0.02] text-text1/45 hover:text-text1/70 hover:border-white/[0.12]"
                    }`}
                >
                  <span
                    className="text-base flex-shrink-0 transition-colors duration-200"
                    style={{ color: isActive ? acc.color : "rgba(255,255,255,0.2)" }}
                  >
                    {acc.symbol}
                  </span>
                  <span className="flex-1 truncate">{title}</span>
                  <span className={`text-xs tabular-nums ${isActive ? "text-primary1/70" : "text-text1/25"}`}>
                    {category.skills.length}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="desktopTab"
                      className="absolute inset-0 rounded-xl border border-primary1/40 pointer-events-none"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </motion.button>
              );
            })}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOpts}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="flex items-center gap-2 pt-4 mt-1 border-t border-white/[0.06] px-1"
            >
              <span className="text-[10px] text-text1/25 uppercase tracking-widest">{t("skills.labels.total")}</span>
              <span className="text-[10px] text-primary1/50 font-mono">
                {skills.reduce((a, c) => a + c.skills.length, 0)} {t("skills.labels.skills")}
              </span>
            </motion.div>
          </motion.div>

          {/* Skills panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOpts}
            transition={{ duration: 0.65, ease }}
            className="flex-1 min-w-0"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="text-base" style={{ color: accent.color }}>{accent.symbol}</span>
                <h3 className="text-sm sm:text-base font-semibold text-text1">{activeTitle}</h3>
              </div>
              <span className="text-xs text-text1/30 font-mono">
                {activeCategory.skills.length} {t("skills.labels.technologies")}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease }}
                className="grid grid-cols-4 gap-3"
              >
                {activeCategory.skills.map((skill, idx) => (
                  <SkillCard key={skill.name} skill={skill} index={idx} />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default SectionWrapper(Skills, "skills");