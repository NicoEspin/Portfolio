import React, { useRef, useState } from "react";
import { SectionWrapper } from "../hoc";
import { motion, AnimatePresence } from "framer-motion";
import Moon from "./Moon";
import emailjs from "@emailjs/browser";
import { Mail, User, MessageSquare, Send, CheckCircle, Github, Linkedin } from "lucide-react";
import { githubLink, linkedinLink, contactInfo } from "../constants/constants.js";

const EMAILJS_KEY         = import.meta.env.VITE_APP_EMAILJS_KEY;
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;

const inputBase =
  "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-text1 placeholder:text-text1/25 outline-none transition-all duration-200 focus:border-primary1/50 focus:bg-primary1/[0.03] resize-none";

/* ─── Success state ─── */
const SuccessState = ({ onReset }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center gap-5 py-12 text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 20 }}
      className="flex items-center justify-center w-14 h-14 rounded-full border border-green-500/40 bg-green-500/10"
    >
      <CheckCircle size={26} className="text-green-400" />
    </motion.div>
    <div>
      <h3 className="text-base font-semibold text-text1 mb-1.5">Message sent!</h3>
      <p className="text-xs text-text1/45 max-w-[220px] leading-relaxed">
        Thanks for reaching out. I'll get back to you as soon as possible.
      </p>
    </div>
    <button
      onClick={onReset}
      className="text-xs text-primary1/50 hover:text-primary1 transition-colors duration-200 underline underline-offset-4"
    >
      Send another message
    </button>
  </motion.div>
);

/* ─── Main component ─── */
const Contact = () => {
  emailjs.init(EMAILJS_KEY);

  const formRef = useRef();
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          to_name:    "Nicolás",
          from_email: form.email,
          to_email:   "nicolasespin.dev@gmail.com",
          message:    form.message,
        },
        EMAILJS_KEY
      )
      .then(() => {
        setLoading(false);
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        setError("Something went wrong. Please try again.");
      });
  };

  return (
    <section className="px-4 py-16 sm:px-6 md:px-12 lg:px-10 md:py-24 lg:pt-32 mb-10">

      {/* ── Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12 sm:mb-16 text-center"
      >
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-text1/35 mb-3">
          Let's work together
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-wider text-text1">
          {"<"}
          <span className="font-bold text-primary1">Contact </span>
          {"/>"}
        </h2>
        <motion.div
          className="mx-auto mt-4 h-[1px] bg-gradient-to-r from-transparent via-primary1/40 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: "160px" }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      {/* ── Main layout ── */}
      <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row gap-8 lg:gap-12 items-center">

        {/* ── LEFT: Form panel ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          className="w-full md:flex-1 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8 relative overflow-hidden"
        >
          {/* Subtle top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary1/30 to-transparent pointer-events-none" />

          <p className="text-base font-semibold text-text1 mb-1">Get in touch</p>
          <p className="text-xs text-text1/40 mb-6 leading-relaxed">
            Have a project in mind or want to chat? Drop me a message.
          </p>

          <AnimatePresence mode="wait">
            {sent ? (
              <SuccessState key="success" onReset={() => setSent(false)} />
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                {/* Name */}
                <label className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-1.5 text-[10px] text-text1/40 uppercase tracking-widest">
                    <User size={10} className="text-primary1/50" /> Name
                  </span>
                  <input
                    required
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nicolas Espin"
                    className={inputBase}
                  />
                </label>

                {/* Email */}
                <label className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-1.5 text-[10px] text-text1/40 uppercase tracking-widest">
                    <Mail size={10} className="text-primary1/50" /> Email
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    className={inputBase}
                  />
                </label>

                {/* Message */}
                <label className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-1.5 text-[10px] text-text1/40 uppercase tracking-widest">
                    <MessageSquare size={10} className="text-primary1/50" /> Message
                  </span>
                  <textarea
                    required
                    rows={5}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    className={inputBase}
                  />
                </label>

                {/* Error */}
                {error && (
                  <p className="text-xs text-red-400/70 -mt-1">{error}</p>
                )}

                {/* Submit — Hero button style */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-fit mt-1 px-7 py-2 rounded-full
                    border border-primary1 text-text1 bg-custom-gradient shadow-custom-shadow
                    text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: loading ? 1 : 1.06 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                >
                  {loading ? (
                    <>
                      <motion.div
                        className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={12} className="opacity-80" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── RIGHT: Moon + info ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
          className="w-full md:flex-1 flex flex-col items-center gap-6"
        >
          {/* 3D Moon — the visual centerpiece */}
          <div className="w-full h-[280px] sm:h-[340px] md:h-[380px] lg:h-[420px]">
            <Moon />
          </div>

          {/* Availability badge */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-green-500/20 bg-green-500/[0.04]">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <p className="text-xs text-text1/50">{contactInfo.availability}</p>
          </div>

          {/* Email + socials row */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-xs text-text1/40 hover:text-primary1/80 transition-colors duration-200 font-mono"
            >
              {contactInfo.email}
            </a>
            <span className="w-px h-3 bg-white/10" />
            <motion.a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center size-8 rounded-full border border-primary1 text-text1 bg-custom-gradient shadow-custom-shadow"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={14} />
            </motion.a>
            <motion.a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center size-8 rounded-full border border-primary1 text-text1 bg-custom-gradient shadow-custom-shadow"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={14} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(Contact, "contact");