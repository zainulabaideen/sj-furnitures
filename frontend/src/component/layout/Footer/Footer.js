import React from "react";
import Title from "./Title";
import logo from "../../../assets/logo[1].png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaVimeoV } from "react-icons/fa";

const Footer = () => {
  const socialApps = [
    { icon: FaFacebook, appLink: "#" },
    { icon: FaInstagram, appLink: "#" },
    { icon: FaXTwitter, appLink: "#" },
    { icon: FaTelegram, appLink: "#" },
    { icon:FaVimeoV, appLink: "#" },
  ];

  //current year
  const currentYear = new Date().getFullYear();

  return (
    <div className=" px-3 md:px-20 py-10 text-TextClr">
      <Title />

      <footer className=" lg:h-[50vh] flex w-full gap-[20%] space-y-10 flex-col lg:flex-row items-start justify-between">
        {/* Left Side of footer ___ logo , socialmedia icons and copyright */}

        <div className=" h-full lg:w-1/2 w-full flex flex-col items-start pt-0 md:pt-10 justify-between md:gap-10 md:order-first order-last">
          <div className=" md:space-y-3 space-y-1">
            <img src={logo} className="w-40" alt="" />
            <p>
              We believe that good design should be easy to accept and
              comfortable to enjoy
            </p>
          </div>

          <div className=" w-full flex md:flex-row flex-col md:items-end items-center space-y-5 mt-5 justify-between">
            {/*  Social media icons container  */}
            <div className=" lg:w-fit flex lg:grid grid-flow-col lg:grid-cols-2 lg:grid-rows-3 gap-2">
              {socialApps.map((item, index) => (
                <a key={index} href={item.appLink} className="bg-gray-500 cursor-pointer hover:bg-gray-600 hover:scale-110 p-2 rounded-full">
                  <item.icon className=" text-white"/>
                </a>
              ))}
            </div>

            {/* Copy right section*/}
            <div className="flex lg:flex-col flex-row">
              <p>&copy; {currentYear} - Copyright.</p>
              <p>   All rights are reserved</p>
            </div>
          </div>
        </div>

        {/* Right side of footer ___ List items , Contact location and languages */}

        <div className="lg:w-1/2 w-full flex flex-col items-start justify-between md:space-y-10 space-y-5 md:pb-0 pb-10 order-2">
          <ul className=" flex gap-5 md:gap-20 items-center justify-between lg:w-full">
            <li className="focus:text-hClr hover:text-hClr cursor-pointer ">
              Home
            </li>
            <li className="focus:text-hClr hover:text-hClr cursor-pointer ">
              About
            </li>
            <li className="focus:text-hClr hover:text-hClr cursor-pointer ">
              Testimonials{" "}
            </li>
            <li className="focus:text-hClr hover:text-hClr cursor-pointer ">
              Products
            </li>
          </ul>

          {/* Contact and location*/}

          <div className=" md:w-full flex md:flex-row flex-col md:items-end items-start justify-between space-y-5">
            <div className=" md:gap-10 gap-5 flex lg:flex-col md:flex-row flex-col md:w-2/3 md:justify-between">
              <div className="contact">
                <h2 className="text-hClr font-semibold text-xl mb-2">
                  Contact Us
                </h2>
                <p>+1(999)888-77-66</p>
                <p>jsfurniture@gmail.com</p>
              </div>

              <div className="Location">
                <h2 className="text-hClr font-semibold text-xl mb-2">
                  Location
                </h2>
                <p>456789, Moscow,</p>
                <p>Mianistikiya 22/2/5, Office 4</p>
              </div>
            </div>
            {/*Languages */}
            <div className="languages md:text-center">
              <h2 className="text-hClr font-semibold text-xl mb-2">
                Languages
              </h2>
              <div className=" flex gap-5">
                <p className="focus:text-hClr hover:text-hClr cursor-pointer">
                  En
                </p>
                <p className="focus:text-hClr hover:text-hClr cursor-pointer">
                  Es
                </p>
                <p className="focus:text-hClr hover:text-hClr cursor-pointer">
                  Fr
                </p>
                <p className="focus:text-hClr hover:text-hClr cursor-pointer">
                  Ur
                </p>
              </div>
            </div>
          </div>



        </div>
      </footer>
    </div>
  );
};

export default Footer;
