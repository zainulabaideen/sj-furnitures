import hero from "../../assets/hero.avif";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import React from "react";

export default function Hero() {
  return (
    <section className="relative mt-16 px-8 w-full lg:h-[90vh] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-white to-primary/5"></div>

      <div className="flex flex-col lg:flex-row items-center justify-between max-w-screen-xl mx-auto px-6 lg:px-12 h-full relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="lg:w-1/2 w-full flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 mb-8 lg:mb-0"
        >
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-4xl mt-10 sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-tight"
          >
            Luxury Furniture,
            <br />
            Timeless Stories
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-gray-600 text-base sm:text-lg max-w-md"
          >
            Discover carefully crafted furniture that transforms your space into
            an elegant sanctuary. Comfort meets sophistication in every detail.
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/products">
              <button className="px-8 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-full font-semibold shadow-lg flex items-center justify-center gap-3 w-full sm:w-auto">
                Explore Collection <FaArrowRight />
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="lg:w-1/2 w-full flex mb-8 justify-center items-center relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-md lg:max-w-full"
            whileHover={{ scale: 1.02 }}
          >
            <motion.img
              src="https://images.pexels.com/photos/33647499/pexels-photo-33647499.jpeg"
              alt="Luxury Furniture"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.7 }}
              className="w-full h-[45vh]  sm:h-[55vh] lg:h-[80vh] object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Shape with animation */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="hidden lg:block absolute w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -top-20 -right-40"
      ></motion.div>
    </section>
  );
}
