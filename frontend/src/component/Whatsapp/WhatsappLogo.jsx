import React, { useState, useEffect } from "react";
import "./Ws.css";
import { BsArrowUp, BsWhatsapp } from "react-icons/bs";
import { motion, AnimatePresence } from "motion/react";

const WhatsAppLogo = () => {
  const phoneNumber = "+923016803719";
  const message = "Hello, I have a question!";

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const generateWhatsAppLink = () => {
    return `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(message)}`;
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <>
      <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
        <div className="whatsapp-container bottom-[40px] md:right-5 left-5 ">
          <BsWhatsapp className="whatsapp-icon" />
          <span className="notification-badge">1</span>
        </div>
      </a>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            className="scroll-to-top-btn hover:bg-primary hover:text-white animate-bounce  bg-gray-200 text-black p-3 bottom-8 left-[50%] "
            onClick={handleScrollToTop}
            style={{
              zIndex: 40,
              borderRadius: "50%",
              fontSize: "18px",
              cursor: "pointer",
            }}
            aria-label="Scroll to top"
          >
            <BsArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

    </>
  );
};

export default WhatsAppLogo;
