import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { color, motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { experiences } from "../constants/constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "#1F2937",
      color: "#ffff",
      boxShadow: "1px -1px 17px 4px rgba(147, 51, 234, 0.5)",
      border: "1px, solid, #364153",
    }}
    contentArrowStyle={{ borderRight: "7px solid #1F2937" }}
    date={experience.date}
    iconStyle={{ background: experience.iconBg }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img
          loading="lazy"
          src={experience.icon}
          alt={experience.company_name}
          className="w-[60%] h-[60%] object-contain"
        />
      </div>
    }
  >
    <div>
      <h3 className="text-text1 text-xl font-bold">{experience.title}</h3>
      <p
        className="text-text2 italic font-semibold text-[16px]"
        style={{ margin: "0" }}
      >
        {experience.company_name}
      </p>
    </div>
    <ul className="mt-5 list-disc ml-5 space-y-2">
      {experience.points.map((point, index) => (
        <li
          key={`experience-point-${index}`}
          className="text-text1 text-xs md:text-[15px] text-balance pl-1 tracking-wider opacity-80"
        >
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const Experience = () => {
  return (
    <>
      <section className="py-20 md:px-20 lg:px-5 px-5">
        <motion.div variants={textVariant()}>
          <h2 className="mb-20 text-4xl tracking-wider text-center text-text1 lg:text-5xl">
            {"<"}
            <span className="font-bold text-primary1">Experience </span>
            {"/>"}
          </h2>
        </motion.div>

        <div className="flex flex-col">
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} />
            ))}
          </VerticalTimeline>
        </div>
      </section>
    </>
  );
};

export default SectionWrapper(Experience, "experience");
