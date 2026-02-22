import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const tabItems = [
  { href: "hero",       label: "About"      },
  { href: "skills",     label: "Skills"     },
  { href: "experience", label: "Experience" },
  { href: "projects",   label: "Projects"   },
  { href: "contact",    label: "Contact"    },
];

/* ─── Smooth scroll helper ─── */
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
};

/* ─── Cursor pill ─── */
const Cursor = ({ position }) => (
  <motion.li
    animate={position}
    className="absolute z-0 h-7 md:h-10 rounded-full bg-primary1 pointer-events-none"
  />
);

/* ─── Single tab ─── */
const Tab = ({ item, setPosition, isActive }) => {
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
    <li
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className="relative z-10 cursor-pointer"
    >
      <a
        href={`#${item.href}`}
        onClick={handleClick}
        className={`block px-3 py-1.5 md:px-5 md:py-2.5 text-[10px] md:text-sm uppercase tracking-widest font-medium mix-blend-difference transition-colors duration-200
          ${isActive ? "text-white" : "text-text1/60"}`}
      >
        {item.label}
      </a>
    </li>
  );
};

/* ─── Main Navbar ─── */
export const Navbar = () => {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  /* Track scroll to highlight active section */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Find which section is in view
      const sections = tabItems.map((t) => document.getElementById(t.href)).filter(Boolean);
      let current = tabItems[0].href;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120) current = section.id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="flex items-center justify-center pt-6 md:pt-8">
      <div className="fixed z-50">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Outer wrapper — border fades in on scroll */}
          <div
            className={`relative rounded-full transition-all duration-500
              ${scrolled
                ? "border border-white/[0.1] bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                : "border border-white/[0.06] bg-black/20 backdrop-blur-md"
              }`}
          >
            {/* Tab list */}
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
                />
              ))}

              <Cursor position={position} />

              {/* Active section dot indicator — subtle, below cursor */}
              {tabItems.map((item) => (
                activeSection === item.href && (
                  <motion.span
                    key={item.href}
                    layoutId="activeDot"
                    className="absolute bottom-[3px] left-0 flex justify-center pointer-events-none"
                    style={{
                      width: (() => {
                        // We can't measure DOM here easily, so just show a centered dot
                        return "100%"
                      })()
                    }}
                  />
                )
              ))}
            </ul>

            {/* i18n toggle placeholder — hidden for now, slot ready for future */}
            {/* 
            <button className="absolute -right-12 top-1/2 -translate-y-1/2 flex items-center justify-center
              w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm
              text-[10px] font-medium text-text1/50 hover:text-text1/80 hover:border-primary1/30
              transition-all duration-200"
            >
              ES
            </button>
            */}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;