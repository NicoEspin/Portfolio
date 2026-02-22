import React, { useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "../constants/constants";
import { SectionWrapper } from "../hoc";
import { MapPin, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";

/* ─── Single experience card ─── */
const ExperienceCard = ({ experience, index }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(index === 0);
  const isEven = index % 2 === 0;

  const title = t(`experience.items.${experience.id}.title`);
  const date = t(`experience.items.${experience.id}.date`);
  const pointsRaw = t(`experience.items.${experience.id}.points`, { returnObjects: true });
  const points = Array.isArray(pointsRaw) ? pointsRaw : [];

  return (
    <div className="relative flex flex-col lg:flex-row lg:items-start gap-0 lg:gap-0">

      {/* ── Timeline node (center on desktop, left on mobile) ── */}
      <div className="
        hidden lg:flex
        absolute left-1/2 -translate-x-1/2
        flex-col items-center
        z-10
      ">
        {/* Icon bubble */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1, type: "spring", stiffness: 300 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full border-2 border-primary1/50 shadow-lg"
          style={{ background: experience.iconBg }}
        >
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-8 h-8 object-contain"
            loading="lazy"
          />
          {/* Pulse ring */}
          {index === 0 && (
            <span className="absolute inset-0 rounded-full border border-primary1/40 animate-ping opacity-40" />
          )}
        </motion.div>
      </div>

      {/* ── Card: alternates left/right on desktop ── */}
      <div className={`
        w-full lg:w-[calc(50%-3.5rem)]
        ${isEven ? "lg:mr-auto lg:pr-10" : "lg:ml-auto lg:pl-10"}
      `}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30, y: 10 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03]
            hover:border-primary1/30 transition-colors duration-300 overflow-hidden"
        >
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary1/60 via-primary1/20 to-transparent"
          />

          {/* Card header — always visible */}
          <div className="flex items-start gap-4 p-5 sm:p-6">
            {/* Mobile icon (hidden on lg) */}
            <div
              className="lg:hidden flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full border border-primary1/40"
              style={{ background: experience.iconBg }}
            >
              <img
                src={experience.icon}
                alt={experience.company_name}
                className="w-6 h-6 object-contain"
                loading="lazy"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-text1 leading-snug truncate">
                    {title}
                  </h3>
                  <p className="text-sm text-primary1/80 font-medium mt-0.5">
                    {experience.company_name}
                  </p>
                </div>

                {/* Expand toggle */}
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg
                    border border-white/[0.08] bg-white/[0.03] hover:border-primary1/30
                    text-text1/40 hover:text-primary1/70 transition-all duration-200"
                  aria-label={expanded ? t("experience.aria.collapse") : t("experience.aria.expand")}
                >
                  {expanded
                    ? <ChevronUp size={13} />
                    : <ChevronDown size={13} />
                  }
                </button>
              </div>

              {/* Date badge */}
              <div className="flex items-center gap-1.5 mt-2">
                <Calendar size={11} className="text-text1/30 flex-shrink-0" />
                <span className="text-[11px] text-text1/40 font-mono">{date}</span>
              </div>
            </div>
          </div>

          {/* Expandable points */}
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-white/[0.05]">
              <ul className="mt-4 space-y-3">
                {points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    {/* Bullet */}
                    <span className="flex-shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full bg-primary1/50" />
                    <span className="text-xs sm:text-[13px] text-text1/60 leading-relaxed tracking-wide">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

/* ─── Main section ─── */
const Experience = () => {
  const { t } = useTranslation();
  return (
    <section className="px-4 py-16 sm:px-6 md:px-12 lg:px-10 md:py-24 lg:pt-32">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-14 sm:mb-20 text-center"
      >
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-text1/35 mb-3">
          {t("experience.eyebrow")}
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-wider text-text1">
          {"<"}
          <span className="font-bold text-primary1">{t("experience.title")} </span>
          {"/>"}
        </h2>
        <motion.div
          className="mx-auto mt-4 h-[1px] bg-gradient-to-r from-transparent via-primary1/40 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: "160px" }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      {/* Timeline container */}
      <div className="relative max-w-4xl mx-auto">

        {/* ── Vertical line — desktop center, mobile left ── */}
        <div className="
          absolute
          top-0 bottom-0
          left-5 sm:left-6
          lg:left-1/2 lg:-translate-x-px
          w-px
          bg-gradient-to-b from-primary1/30 via-primary1/15 to-transparent
          pointer-events-none
        " />

        {/* Cards */}
        <div className="flex flex-col gap-10 sm:gap-12 lg:gap-14">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>

        {/* Timeline end dot */}
        <div className="
          absolute bottom-0
          left-5 sm:left-6 lg:left-1/2
          -translate-x-1/2
          w-2 h-2 rounded-full bg-primary1/30 border border-primary1/50
        " />
      </div>
    </section>
  );
};

export default SectionWrapper(Experience, "experience");
