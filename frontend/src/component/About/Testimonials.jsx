import React, { useState } from 'react';
import TestimonialBg from '../../assets/test-background.jpg';

// 👉 supply real JPG/PNG files here or external URLs
import Ava1 from '../../assets/avatar.jpg';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';


/* --- static testimonial data ------------------------------------------- */
const testimonials = [
  {
    id: 1,
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint eveniet possimus adipisci.',
    name: 'Ronaldo Conner',
    role: 'Sr. Designer',
    avatar: Ava1,
  },
  {
    id: 2,
    text:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    name: 'Sarah Lee',
    role: 'Project Manager',
    avatar: Ava1,
  },
  {
    id: 3,
    text:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    name: 'Ahmed Riaz',
    role: 'Lead Developer',
    avatar: Ava1,
  },
  {
    id: 4,
    text:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    name: 'Sofia Méndez',
    role: 'UX Researcher',
    avatar: Ava1,
  },
  {
    id: 5,
    text:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    name: 'Peter Wong',
    role: 'QA Engineer',
    avatar: Ava1,
  },
];

/* --- component ---------------------------------------------------------- */
 const Testimonials =() => {
  const [index, setIndex] = useState(0);






  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <div className="relative h-80 w-full text-primary my-20">
      {/* background */}
      <img
        src={TestimonialBg}
        alt="Testimonials background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* all slides (only the active one is visible) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {testimonials.map((item, i) => (
          <div
            key={item.id}
            className={`flex flex-col items-center justify-center space-y-8 md:p-8 px-3 rounded-lg w-full md:max-w-3xl transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'
            }`}
          >
            <p className="text-center">{item.text}</p>

            <div className="flex items-center justify-center gap-5">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-secondary font-semibold tracking-wide">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* arrows */}
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="absolute md:left-20 left-3 top-1/2 -translate-y-1/2 z-20 hidden md:grid place-content-center w-10 h-10 bg-white rounded-full text-gray-300 text-2xl"
        >
          <MdKeyboardArrowLeft />
        </button>

        <button
          onClick={next}
          aria-label="Next testimonial"
          className="absolute md:right-20 right-3 top-1/2 -translate-y-1/2 z-20 hidden md:grid place-content-center w-10 h-10 bg-white rounded-full text-gray-300 text-2xl"
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
}
export default Testimonials