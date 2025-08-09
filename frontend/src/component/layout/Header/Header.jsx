import React, { useState, useEffect } from "react";
import logo from "../../../assets/logo[1].png";
import { FaRegUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useLocation, useNavigate, NavLink, Link } from "react-router-dom";
import Hero from "../hero/Hero";
import Mobileview from "../Mobileview/Mobileview";
import UserProfile from "../../UserProfile/UserProfile"; // ✅ Adjust path if needed
import { useSelector } from "react-redux";

const Header = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [show, setShow] = useState(false);
  const [shadow, setShadow] = useState(false);

  // toggle menu
  const menu = () => {
    setShow(!show);
  };

  // add shadow on scroll
  const handleScroll = () => {
    setShadow(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalCartItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/products", label: "Product" },
  ];

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {isHome && (
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <Hero />
          </div>
        )}

        <div
          className={`top-0 z-50 w-full fixed transition-all duration-300 ${shadow || !isHome ? "bg-white shadow-lg" : "bg-transparent"
            }`}
        >
          <nav className="h-18 py-2 px-3 md:px-20 flex items-center justify-between text-gray-800">
            {/* Mobile Menu Icon */}
            <div className="lg:hidden flex flex-col items-start justify-center self-center h-6 space-y-1 cursor-pointer text-3xl">
              {show ? (
                <IoClose onClick={menu} />
              ) : (
                <HiOutlineMenuAlt1 onClick={menu} />
              )}
            </div>

            {/* Logo */}
            <div className="logo text-center">
              <img src={logo} alt="Logo" className="lg:w-52 w-40" />
            </div>

            {/* Navbar Items */}
            <ul className="hidden text-primary lg:flex gap-5">
              {links.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `block cursor-pointer font-semibold border-b-2 py-2 duration-300 hover:text-secondary ${isActive
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

            {/* Navbar Icons */}
            <div className="font-bold flex items-center md:gap-5 gap-2 relative">
              <Link to="/search">
                <FiSearch className="cursor-pointer text-xl" />
              </Link>
              <NavLink to="/cart" className="relative">
                <HiOutlineShoppingBag className="cursor-pointer text-xl" />
                <div className="absolute -top-2 -right-2 w-4 h-4 text-xs font-medium flex justify-center items-center bg-secondary text-white rounded-full">
                  {totalCartItems}
                </div>
              </NavLink>

              {/* User Icon and Profile Toggle */}
              <FaRegUser
                className="cursor-pointer text-xl"
                onClick={() => navigate("/account")}
              />


              <Link to="/login">
                <button className="bg-primary text-white px-5 py-2 rounded-full hover:bg-opacity-80">
                  Login
                </button>
              </Link>
            </div>
          </nav>

          {/* Mobile View Sidebar */}
          {show && <Mobileview setshow={setShow} />}
        </div>
      </div>
    </>
  );
};

export default Header;
