import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
/* ─── SVG flag icons ─── */
import usaFlag from "../assets/icons/usa.svg";
import argFlag from "../assets/icons/argentina.svg";

/* ─── Nav items (bilingual) ─── */
const tabItems = [
  { href: "hero",       key: "nav.tabs.about" },
  { href: "skills",     key: "nav.tabs.skills" },
  { href: "experience", key: "nav.tabs.experience" },
  { href: "projects",   key: "nav.tabs.projects" },
  { href: "contact",    key: "nav.tabs.contact" },
];

/* ─── Smooth scroll ─── */
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
};

/* ─── Pill cursor ─── */
const Cursor = ({ position }) => (
  <motion.li
    animate={position}
    className="absolute z-0 h-7 md:h-10 rounded-full bg-primary1 pointer-events-none"
  />
);

/* ─── Desktop single tab ─── */
const Tab = ({ item, setPosition, isActive, t }) => {
  const ref = useRef(null);

  const handleMouseEnter = () => {
    if (!ref.current) return;
    const { width } = ref.current.getBoundingClientRect();
    setPosition({ left: ref.current.offsetLeft, width, opacity: 1 });
  };

  const handleClick = (e) => {
    e.preventDefault();
    scrollTo(item.href);
  };

  return (
    <li ref={ref} onMouseEnter={handleMouseEnter} className="relative z-10 cursor-pointer">
      <a
        href={`#${item.href}`}
        onClick={handleClick}
        className={`block px-3 py-1.5 md:px-5 md:py-2.5 text-[10px] md:text-sm uppercase tracking-widest font-medium mix-blend-difference transition-colors duration-200
          ${isActive ? "text-white" : "text-text1/60"}`}
      >
        {t(item.key)}
      </a>
    </li>
  );
};

/* ─── Logo ─── */
const Logo = ({ t }) => (
  <button
    onClick={() => scrollTo("hero")}
    className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm
      hover:border-primary1/40 hover:bg-primary1/10 transition-all duration-300 group flex-shrink-0"
    aria-label={t("nav.aria.goTop")}
  >
    {/* Recreating the <NE/> logo mark with text */}
    <span className="font-mono text-[9px] font-bold leading-none text-primary1 group-hover:text-primary1 tracking-tight select-none">
      &lt;NE/&gt;
    </span>
  </button>
);



const USAFlag = ({ t }) => (
  <img
    src={usaFlag}
    alt={t("nav.lang.en")}
    className="w-5 h-5 rounded-full object-cover"
    draggable={false}
  />
);
const ARGFlag = ({ t }) => (
  <img
    src={argFlag}
    alt={t("nav.lang.es")}
    className="w-5 h-5 rounded-full object-cover"
    draggable={false}
  />
);

/* ─── Language Toggle — classic toggle switch with flag thumb ─── */
const LangToggle = ({ lang, onToggle, t }) => {
  const isEN = lang === "en";
  return (
    <button
      onClick={onToggle}
      aria-label={isEN ? t("nav.aria.switchToEs") : t("nav.aria.switchToEn")}
      role="switch"
      aria-checked={isEN}
      className={`relative flex items-center w-14 h-7 rounded-full border transition-all duration-300 flex-shrink-0 cursor-pointer
        ${isEN
          ? "bg-white/[0.06] border-white/10 hover:border-primary1/40"
          : "bg-white/[0.06] border-white/10 hover:border-primary1/40"
        }`}
    >
      {/* Track label — current language code on the active side, next to the thumb */}
      <span
        className="absolute text-[8px] font-mono tracking-widest text-white/40 uppercase select-none pointer-events-none"
        style={{ left: isEN ? "29px" : "7px", transition: "all 0.3s" }}
      >
        {isEN ? "EN" : "ES"}
      </span>

      {/* Sliding thumb with the active flag */}
      <motion.span
        animate={{ x: isEN ? 2 : 30 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="absolute flex items-center justify-center w-[22px] h-[22px] rounded-full
          bg-white/10 border border-white/20 shadow-[0_2px_6px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {isEN ? <USAFlag t={t} /> : <ARGFlag t={t} />}
      </motion.span>
    </button>
  );
};

/* ─── Mobile Hamburger ─── */
const Hamburger = ({ open, onClick, t }) => (
  <button
    onClick={onClick}
    aria-label={open ? t("nav.aria.closeMenu") : t("nav.aria.openMenu")}
    className="relative z-[200] flex flex-col justify-center items-center w-9 h-9 rounded-full border border-white/10
      bg-white/[0.04] backdrop-blur-sm hover:border-primary1/40 hover:bg-primary1/10 transition-all duration-300"
  >
    {/* Both bars are absolutely positioned at the center so the X is perfectly aligned */}
    <motion.span
      animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute block w-4 h-[1.5px] bg-white/80 origin-center"
    />
    <motion.span
      animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute block w-4 h-[1.5px] bg-white/80 origin-center"
    />
  </button>
);

/* ─── Mobile Full-Screen Overlay ─── */
const MobileMenu = ({ open, lang, onToggleLang, activeSection, onClose, t }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Expanding circle overlay — starts from top-right corner */}
          <motion.div
            key="overlay-bg"
            initial={{ clipPath: "circle(0% at 95% 5%)" }}
            animate={{ clipPath: "circle(150% at 95% 5%)" }}
            exit={{ clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl"
          />

          {/* Content fades in after circle expands */}
          <motion.div
            key="overlay-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="fixed inset-0 z-[110] flex flex-col"
          >
            {/* Spacer so content clears the fixed top bar (logo + hamburger) */}
            <div className="h-16" />

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-8">
              <ul className="space-y-2">
                {tabItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 40, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <a
                      href={`#${item.href}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        setTimeout(() => scrollTo(item.href), 400);
                      }}
                      className={`group flex items-baseline gap-4 py-3 border-b border-white/[0.06] transition-all duration-200 hover:border-primary1/30`}
                    >
                      {/* Index number */}
                      <span className="text-[10px] text-text1/30 font-mono tracking-widest w-5 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {/* Label */}
                      <span
                        className={`text-3xl font-medium uppercase tracking-wider transition-colors duration-200
                          ${activeSection === item.href ? "text-primary1" : "text-white/70 group-hover:text-white"}`}
                      >
                        {t(item.key)}
                      </span>
                      {/* Active dot */}
                      {activeSection === item.href && (
                        <motion.span
                          layoutId="mobileDot"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-primary1 flex-shrink-0"
                        />
                      )}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom bar — lang toggle + footer copy, safely away from the hamburger */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.65, duration: 0.35 }}
              className="flex items-center justify-between px-8 pb-10"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-text1/20 font-mono">
                {t("nav.mobileFooter")}
              </p>
              <LangToggle lang={lang} onToggle={onToggleLang} t={t} />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ─── Main Navbar ─── */
export const Navbar = () => {
  const { t, i18n } = useTranslation();

  const lang = (i18n.resolvedLanguage || i18n.language || "en").startsWith("es")
    ? "es"
    : "en";
  const toggleLang = () => i18n.changeLanguage(lang === "en" ? "es" : "en");

  const [position, setPosition]       = useState({ left: 0, width: 0, opacity: 0 });
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Active section tracker */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = tabItems.map((t) => document.getElementById(t.href)).filter(Boolean);
      let current = tabItems[0].href;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 120) current = section.id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Desktop nav ─────────────────────────────────────── */}
      <nav className="hidden md:flex items-center justify-center pt-8">
        <div className="fixed z-50 flex items-center gap-3">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-3"
          >
            {/* Logo */}
            <Logo t={t} />

            {/* Pill nav */}
            <div
              className={`relative rounded-full transition-all duration-500
                ${scrolled
                  ? "border border-white/[0.1] bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                  : "border border-white/[0.06] bg-black/20 backdrop-blur-md"
                }`}
            >
              <ul
                className="relative flex items-center rounded-full px-1 py-1"
                onMouseLeave={() => setPosition((p) => ({ ...p, opacity: 0 }))}
              >
                {tabItems.map((item) => (
                  <Tab
                    key={item.href}
                    item={item}
                    setPosition={setPosition}
                    isActive={activeSection === item.href}
                    t={t}
                  />
                ))}
                <Cursor position={position} />
              </ul>
            </div>

            {/* Language toggle */}
            <LangToggle lang={lang} onToggle={toggleLang} t={t} />
          </motion.div>
        </div>
      </nav>

      {/* ── Mobile nav ──────────────────────────────────────── */}
      <nav className="md:hidden flex items-center justify-between px-5 pt-5 fixed top-0 left-0 right-0 z-[150]">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Logo t={t} />
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Hamburger open={mobileOpen} onClick={() => setMobileOpen((v) => !v)} t={t} />
        </motion.div>
      </nav>

      {/* ── Mobile overlay ──────────────────────────────────── */}
      <MobileMenu
        open={mobileOpen}
        lang={lang}
        onToggleLang={toggleLang}
        activeSection={activeSection}
        onClose={() => setMobileOpen(false)}
        t={t}
      />
    </>
  );
};

export default Navbar;
