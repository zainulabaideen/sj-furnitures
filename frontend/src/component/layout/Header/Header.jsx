import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import logo from "../../../assets/logo[1].png";
import { FaRegUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [toggle, setToggle] = useState(true);
  const [shadow, setShadow] = useState(false);

  // toggle functionality for small screens
  const menu = () => {
    setToggle(!toggle);
  };

  // overscroll y navbar shadow
  const handleScroll = () => {
    setShadow(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // list items of navbar

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/product", label: "Product" },
  ];

  return (
    <div
      className={`top-0 z-50 w-full fixed transition-shadow duration-300 ${
        shadow ? "shadow-lg" : ""
      }`}
    >
      <nav className=" h-18 py-2 px-3 md:px-20 flex items-center justify-between bg-white text-gray-800">
        

        {/*  Open close menu  */}
        <div class=" lg:hidden flex flex-col items-start justify-center self-center h-6 space-y-1 cursor-pointer  text-3xl">
          {" "}
          {toggle ? (
            <HiOutlineMenuAlt1 onClick={menu}  />
          ) : (
            <IoClose onClick={menu} />
          )}{" "}
        </div>


        {/*  Logo  */}
        <div className="logo text-center">
          <img src={logo} alt="" className="lg:w-52 w-40" />
        </div>
        {/*  Navbar list items */}
        <ul className="hidden text-primary lg:flex gap-5">
          {links.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `block cursor-pointer font-semibold border-b-2 py-2 duration-300 hover:text-secondary  ${
                    isActive
                      ? "text-secondary border-secondary"
                      : "border-transparent"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>




        {/*  Navbar icons  */}
        <div className=" font-bold flex md:gap-5 gap-2">
          <FiSearch className="cursor-pointer text-xl" />
          <HiOutlineShoppingBag className="cursor-pointer text-xl" />
          <FaRegUser className="cursor-pointer text-xl" />
        </div>{" "}





      </nav>
      {/*  sidebar rendering logic  */}
      <div
        className={` w-full bg-white text-primary lg:hidden block transition-transform duration-500 absolute ${
          toggle ? " -translate-x-full" : ""
        }`}
      >
        {/*  sidebar list items */}
        <ul className="py-5 space-y-5 flex flex-col items-center">
          {links.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `block cursor-pointer font-semibold border-b-2 py-2 duration-300 hover:text-secondary  ${
                    isActive
                      ? "text-secondary border-secondary"
                      : "border-transparent"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>{" "}
    </div>
  );
};

export default Header;
