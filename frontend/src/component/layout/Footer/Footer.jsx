import React from "react";
import logo from "../../../assets/logo[1].png";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTiktok } from "react-icons/fa6";
import { FaXTwitter, FaTelegram, FaVimeoV } from "react-icons/fa6";
import { NavLink, Link } from "react-router-dom";


const Footer = () => {
  const socialApps = [
    { name: "Facebook", icon: FaFacebook, appLink: "#" },
    { name: "Instagram", icon: FaInstagram, appLink: "#" },
    { name: "X (Twitter)", icon: FaXTwitter, appLink: "#" },
    { name: "Tiktok", icon: FaTiktok, appLink: "#" },
    { name: "Whatsapp", icon: IoLogoWhatsapp, appLink: "#" },
  ];

  //Navlinks
  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/products", label: "Products" },
  ];


  const currentYear = new Date().getFullYear();

  return (
    <footer data-aos="fade-up" className="  px-3 md:px-20 pb-10">


      <div className="lg:h-[50vh] flex w-full gap-[10%] md:space-y-0 space-y-10  flex-col lg:flex-row items-start justify-between">

        {/* Left Side */}
        <section
          aria-labelledby="footer-branding"
          className="h-full lg:w-1/2 w-full flex flex-col lg:items-start items-center justify-between lg:gap-10 gap-5 lg:order-first order-last "
        >
          <div >
            <img
              src={logo}
              className="w-40"
              alt="JS Furniture Logo"
              loading="lazy"
            />

          </div>
          <p id="footer-branding">
            We believe that good design should be easy to accept and
            comfortable to enjoy.
          </p>
          <div className="w-full flex md:flex-row flex-col md:items-end items-center space-y-5 justify-between">

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
              <p>&copy; {currentYear} SJ Furniture. All rights reserved.</p>
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
              className="flex flex-wrap   items-center gap-5 justify-between"
            >

              {links.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `block cursor-pointer py-2 duration-300 hover:text-primary ${isActive
                        ? "text-primary"
                        : ""
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}

            </ul>
          </nav>

          {/* Contact & Location */}


          <address className="not-italic md:gap-0 gap-5 flex flex-row md:items-start items-center lg:mt-0 pt-5 justify-between w-full">
            <div>
              <h2 className=" text-gray-600 font-semibold text-xl mb-2">
                Contact Us
              </h2>
              <p>
                <a href="tel:+19998887766">+92 3244773614</a>
              </p>
              <p>
                <a href="mailto:jsfurniture@gmail.com">
                  sjfurniture.official@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-gray-600 font-semibold text-xl mb-2">
                Location
              </h2>
              <p>Baldia Chowk , Kasur</p>
              <p>Ghousia Colony Shah Jammat Furniture House </p>
            </div>
          </address>



        </section>
      </div>
    </footer>
  );
};

export default Footer;
