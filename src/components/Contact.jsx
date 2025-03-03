import React, { useRef, useState } from "react";
import { SectionWrapper } from "../hoc";
import { motion } from "framer-motion";
import Moon from "./Moon";
import { slideIn, textVariant } from "../utils/motion";
import emailjs from "@emailjs/browser";

const EMAILJS_KEY = import.meta.env.VITE_APP_EMAILJS_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;

const Contact = () => {

  emailjs.init(EMAILJS_KEY);

  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Nicolás",
          from_email: form.email,
          to_email: "nicolasespin.dev@gmail.com",
          message: form.message,
        },
        EMAILJS_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <section className="px-5 py-20 md:px-20 lg:px-5">
      <motion.div variants={textVariant()}>
        <h2 className="mb-20 text-4xl tracking-wider text-center text-text1 lg:text-5xl">
          {"<"}
          <span className="font-bold text-primary1">Contact </span>
          {"/>"}
        </h2>
      </motion.div>
      <div className=" md:flex-row flex-col-reverse flex overflow-hidden gap-5 justify-between items-center ">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-background1 p-8 rounded-2xl bg-opacity-90 shadow-md"
        >
          <p className="text-text1 text-lg font-bold">Get in touch.</p>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col mt-12"
          >
            <label className="flex flex-col">
              <span className="text-text1 font-medium mb-4">Your Name</span>
              <input
                required
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What is your Name?"
                className="bg-background3 py-4 outline-none px-6 placeholder:text-text2 text-white
                 rounded-lg border-none font-medium mb-4"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-text1 font-medium mb-4">Your Email</span>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What is your Email?"
                className="bg-background3 py-4 outline-none px-6 placeholder:text-text2 text-white
                 rounded-lg border-none font-medium mb-4"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-text1 font-medium mb-4">Your Message</span>
              <textarea
                required
                rows="7"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                className="bg-background3 py-4 outline-none px-6 placeholder:text-text2 text-white
                rounded-lg border-none font-medium mb-4 resize-none"
              />
            </label>
            <motion.button
              type="submit"
              className="text-center font-medium w-[150px] p-2 rounded-full border border-primary1 text-text1 bg-custom-gradient flex-grow-0 
            shadow-custom-shadow cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "Sending..." : "Send"}
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-[450px] md:h-[300] md:w-[300] h-[350px] "
        >
          <Moon />
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(Contact, "contact");
