import React from "react";
import { GoPackageDependents } from "react-icons/go";
import { MdOutlineDiscount } from "react-icons/md";
import { FcMoneyTransfer } from "react-icons/fc";
import { CiHeadphones } from "react-icons/ci";

const infoItems = [
  {
    icon: GoPackageDependents,
    title: "FREE DELIVERY",
    description: "Free shipping over online payment",
    gradient: "from-pink-400 to-red-500",
  },
  {
    icon: MdOutlineDiscount,
    title: "MEMBER DISCOUNT",
    description: "Get 5% off on repeat orders",
    gradient: "from-purple-400 to-indigo-500",
  },
  {
    icon: FcMoneyTransfer,
    title: "MONEY RETURN",
    description: "Guarantee under 7 to 15 working  Days",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: CiHeadphones,
    title: "SUPPORT 24/7",
    description: "We are here all day, every day",
    gradient: "from-yellow-400 to-orange-500",
  },
];

const Feature = () => {
  return (
    <section
      data-aos="fade-up"
      className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 px-3 md:px-20 py-14"
    >
      <div className="max-w-7xl mx-auto">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {infoItems.map((item, index) => (
            <li
              key={index}
              className="group bg-white/70 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl 
                         transition-all duration-500 ease-in-out p-6 flex flex-col items-center text-center
                         hover:-translate-y-2"
            >
              {/* Icon with gradient background */}
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r ${item.gradient} 
                           shadow-lg transform group-hover:scale-110 transition duration-500`}
              >
                {typeof item.icon === "function" ? (
                  <item.icon className="w-8 h-8 text-white" />
                ) : (
                  <item.icon className="w-8 h-8" />
                )}
              </div>

              {/* Title */}
              <h4 className="mt-5 font-bold text-lg text-gray-800 tracking-wide group-hover:text-secondary transition">
                {item.title}
              </h4>

              {/* Description */}
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Feature;
