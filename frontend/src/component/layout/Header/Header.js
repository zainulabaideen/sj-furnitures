import React, { useState } from "react";
import Sidebar from "./Sidebar";
import logo from "../../../assets/logo[1].png";
import { FaRegUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [toggle, setToggle] = useState(true);
  const menu = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <nav className=" h-14 py-2 w-full px-3 md:px-20 flex items-center justify-between bg-white text-gray-800">
        {/*  Open close menu  */}

        <div class="w-[10%] flex flex-col items-start justify-center self-center h-6 space-y-1 cursor-pointer ">
          {toggle ? (
            <HiOutlineMenuAlt1 onClick={menu} className="text-xl"/>
          ) : (
            <IoClose onClick={menu} className="text-xl"/>
          )}
        </div>

        {/*  Logo  */}

        <div className="logo text-center">
          <img src={logo} alt="" className="lg:w-52 w-40" />
        </div>

        {/*  Navbar list items  */}

        <div className="contact flex gap-5">
          <FiSearch className="cursor-pointer text-xl" />
          <HiOutlineShoppingBag className="cursor-pointer text-xl" />
          <FaRegUser className="cursor-pointer text-xl" />
        </div>
      </nav>

      {/*  sidebar rendering logic  */}

      <div
        className={` w-full duration-300 absolute ${
          toggle ? "opacity-0" : "opacity-100"
        }`}
      >
        <Sidebar />
      </div>
    </div>
  );
};

export default Header;
