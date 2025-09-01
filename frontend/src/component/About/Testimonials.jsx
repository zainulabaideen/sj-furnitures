import React, { useState } from "react";
import TestimonialBg from "../../assets/test-background.jpg";
import Ava1 from "../../assets/avatar.jpg";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

/* --- static testimonial data --- */
const testimonials = [
  {
    id: 1,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint eveniet possimus adipisci.",
    name: "Ronaldo Conner",
    role: "Sr. Designer",
    avatar: Ava1,
  },
  {
    id: 2,
    text:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Sarah Lee",
    role: "Project Manager",
    avatar: Ava1,
  },
  {
    id: 3,
    text:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    name: "Ahmed Riaz",
    role: "Lead Developer",
    avatar: Ava1,
  },
  {
    id: 4,
    text:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    name: "Sofia Méndez",
    role: "UX Researcher",
    avatar: Ava1,
  },
  {
    id: 5,
    text:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    name: "Peter Wong",
    role: "QA Engineer",
    avatar: Ava1,
  },
];

/* --- component --- */
const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section
      aria-label="Customer Testimonials"
      className="relative h-80 w-full text-primary my-20"
    >
      {/* Background image */}
      <img
        src={TestimonialBg}
        alt="Testimonials background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Testimonial slides */}
      <div className="absolute inset-0 flex items-center justify-center">
        {testimonials.map((item, i) => (
          <article
            key={item.id}
            className={`flex flex-col items-center justify-center space-y-8 md:p-8 px-3 rounded-lg w-full md:max-w-3xl transition-opacity duration-700 ${
              i === index
                ? "opacity-100"
                : "opacity-0 pointer-events-none absolute"
            }`}
          >
            <blockquote className="text-center italic">{item.text}</blockquote>
            <footer className="flex items-center justify-center gap-5">
              <img
                src={item.avatar}
                alt={`${item.name} - ${item.role}`}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="text-xl font-bold">{item.name}</p>
                <p className="text-secondary font-semibold tracking-wide">
                  {item.role}
                </p>
              </div>
            </footer>
          </article>
        ))}

        {/* Navigation buttons */}
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="absolute md:left-20 left-3 top-1/2 -translate-y-1/2 z-20 md:grid place-content-center md:w-10 md:h-10 bg-white rounded-full text-gray-500 text-2xl"
        >
          <MdKeyboardArrowLeft />
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="absolute md:right-20 right-3 top-1/2 -translate-y-1/2 z-20 md:grid place-content-center md:w-10 md:h-10 bg-white rounded-full text-gray-500 text-2xl"
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
