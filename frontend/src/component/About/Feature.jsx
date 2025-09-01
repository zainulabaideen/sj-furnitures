import React from "react";
import { PiTruckLight, PiThumbsUpLight, PiTagLight } from "react-icons/pi";
import { CiMedal } from "react-icons/ci";

const infoItems = [
  {
    icon: (
      <PiTagLight className="w-10 h-10 font-[50px] text-gray-600 absolute translate-x-3.5 translate-y-3.5" />
    ),
    title: "Amazing Value Every Day",
    description: "Items prices fit your budget",
    bg: "bg-yellow-100",
  },
  {
    icon: (
      <PiTruckLight className="w-10 h-10 font-[50px] text-gray-600 absolute translate-x-3.5 translate-y-3.5" />
    ),
    title: "Free Shipping Over $35",
    description: "Popular delivery on 1 - 2 days",
    bg: "bg-blue-50",
  },
  {
    icon: (
      <CiMedal className="w-12 h-12 font-[50px] text-gray-600 absolute translate-x-2.5 translate-y-2.5 rotate-180" />
    ),
    title: "Expert Customer Service",
    description: "Our team on hand 7 days/ week",
    bg: "bg-orange-50",
  },
  {
    icon: (
      <PiThumbsUpLight className="w-10 h-10 font-[50px] text-gray-600 absolute translate-x-3.5 translate-y-3.5" />
    ),
    title: "Unbeatable Selection",
    description: "All things home, all in one place",
    bg: "bg-red-50",
  },
];

const Feature = () => {
  return (
    <section
      data-aos="fade-up"
      className="border border-inherit md:mx-20 mx-3 md:mt-20 my-10 px-4 py-8"
    >
      <div className="flex justify-center w-full">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 text-start md:text-center">
          {infoItems.map((item, index) => (
            <li
              data-aos="zoom-in"
              key={index}
              className="flex flex-col items-start gap-3"
            >
              <div
                className={`relative w-9 h-9 rounded-full mb-5 ${item.bg}`}
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <div className="text-start">
                <h4 className="text-primary font-semibold text-lg">
                  {item.title}
                </h4>
                <p className="text-sm">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Feature;
