import React from "react";
import Title from "./Title";
import logo from "../../../assets/logo[1].png";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaTelegram, FaVimeoV } from "react-icons/fa6";

const Footer = () => {
  const socialApps = [
    { name: "Facebook", icon: FaFacebook, appLink: "#" },
    { name: "Instagram", icon: FaInstagram, appLink: "#" },
    { name: "X (Twitter)", icon: FaXTwitter, appLink: "#" },
    { name: "Telegram", icon: FaTelegram, appLink: "#" },
    { name: "Vimeo", icon: FaVimeoV, appLink: "#" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer data-aos="fade-up" className="px-3 md:px-20 pb-10">
      <Title />

      <div className="lg:h-[50vh] flex w-full gap-[20%] md:space-y-0 space-y-10  flex-col lg:flex-row items-start justify-between">
        
        {/* Left Side */}
        <section
          aria-labelledby="footer-branding"
          className="h-full lg:w-1/2 w-full flex flex-col lg:items-start items-center pt-0 md:pt-10 justify-between md:gap-10 lg:order-first order-last "
        >
          <div>
            <img
              src={logo}
              className="w-40"
              alt="JS Furniture Logo"
              loading="lazy"
            />
            <p id="footer-branding">
              We believe that good design should be easy to accept and
              comfortable to enjoy.
            </p>
          </div>

          <div className="w-full flex md:flex-row flex-col md:items-end items-center space-y-5 mt-5 justify-between">
            
            {/* Social Media */}
            <nav aria-label="Social Media" className="lg:w-fit flex lg:grid grid-flow-col lg:grid-cols-2 lg:grid-rows-3 gap-2">
              {socialApps.map((item, index) => (
                <a
                  key={index}
                  href={item.appLink}
                  aria-label={`Follow us on ${item.name}`}
                  className="bg-primary/90 cursor-pointer hover:bb-primary hover:scale-110 p-2 rounded-full"
                >
                  <item.icon className="text-white" size={20} />
                </a>
              ))}
            </nav>

            {/* Copyright */}
            <div className="flex lg:flex-col flex-row text-sm">
              <p>&copy; {currentYear} JS Furniture. All rights reserved.</p>
            </div>
          </div>
        </section>

        {/* Right Side */}
        <section
          aria-labelledby="footer-navigation"
          className="lg:w-1/2 w-full h-full flex flex-col items-center lg:items-start justify-between md:space-y-0 space-y-5 md:pb-0 pb-10 order-2 "
        >
          <nav aria-label="Footer Navigation" className="lg:w-full">
            <ul
              id="footer-navigation"
              className="flex flex-wrap gap-5 md:gap-20 items-center justify-between"
            >
              <li>
                <a href="#" className="focus:text-hClr hover:text-hClr">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="focus:text-hClr hover:text-hClr">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="focus:text-hClr hover:text-hClr">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="focus:text-hClr hover:text-hClr">
                  Products
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact & Location */}
          
            
            <address className="not-italic md:gap-0 gap-5 flex md:flex-row items-end flex-col  md:justify-between w-full">
              <div>
                <h2 className=" text-gray-600 font-semibold text-xl mb-2">
                  Contact Us
                </h2>
                <p>
                  <a href="tel:+19998887766">+1 (999) 888-77-66</a>
                </p>
                <p>
                  <a href="mailto:jsfurniture@gmail.com">
                    jsfurniture@gmail.com
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-gray-600 font-semibold text-xl mb-2">
                  Location
                </h2>
                <p>456789, Moscow</p>
                <p>Mianistikiya 22/2/5, Office 4</p>
              </div>
            </address>

          
        
        </section>
      </div>
    </footer>
  );
};

export default Footer;
