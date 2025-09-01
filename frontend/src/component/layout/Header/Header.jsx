import { useState, useEffect } from "react";
import axios from "axios"; 
import logo from "../../../assets/logo[1].png";
import { FaRegUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import LoginModal from "../../LoginSignup/LoginModal";
import { useLocation, useNavigate, NavLink, Link } from "react-router-dom";
import Mobileview from "../Mobileview/Mobileview";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader"; // ✅ use Loader

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [shadow, setShadow] = useState(false);

    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
  if (isAuthenticated) {
    setShowLogin(false);
  }
}, [isAuthenticated]);

  // 🔹 Categories state
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  // Fetch categories with retry
  const fetchCategories = async (retries = 2) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get("/api/categories");
      setCategories(data.categories);
    } catch (err) {
      console.error("Error fetching categories", err);
      if (retries > 0) {
        setTimeout(() => fetchCategories(retries - 1), 1000);
      } else {
        setError("Failed to load categories. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Toggle menu
  const menu = () => setShow(!show);

  // Show login modal
  const handleLoginClick = () => setShowLogin(true);

  // Shadow on scroll
  const handleScroll = () => setShadow(window.scrollY > 0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/products", label: "Products" },
  ];

  return (
    <>
      <div
        className={`top-0 z-50 w-full fixed transition-all duration-300 bg-white overflow-x-hidden ${
          shadow  ? "shadow-lg" : "shadow-none"
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
          <ul className="hidden text-primary lg:flex gap-5 relative">
            {links.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `block cursor-pointer font-semibold border-b-2 py-2 duration-300 hover:text-secondary ${
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

            {/* 🔹 Categories Dropdown */}
            <li
              className="relative cursor-pointer font-semibold py-2"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <span className="hover:text-secondary">Categories</span>

              {showCategories && (
                <ul className="absolute left-0 top-full mt-0 w-48 bg-white shadow-md rounded-md z-50">
                  {loading ? (
                    <li className="px-4 py-2">
                      <Loader />
                    </li>
                  ) : error ? (
                    <li className="px-4 py-2 text-red-500">
                      {error}{" "}
                      <button
                        onClick={() => fetchCategories()}
                        className="text-blue-600 underline ml-2"
                      >
                        Retry
                      </button>
                    </li>
                  ) : categories.length > 0 ? (
                    categories.map((cat, index) => (
                      <li
                        key={index}
                        onClick={() => navigate(`/category/${cat}`)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {cat}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500">No categories</li>
                  )}
                </ul>
              )}
            </li>
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

            {/* User Icon */}
            <FaRegUser
              className="cursor-pointer text-xl"
              onClick={() => navigate("/account")}
            />

            {/* Login Button */}
            {!isAuthenticated && 
            <button
            onClick={handleLoginClick}
            className="bg-primary lg:block hidden text-white px-5 py-2 rounded-full hover:bg-opacity-80"
            >
              Login
            </button>
            }
          </div>
        </nav>

        {/* Mobile View Sidebar */}
        {show && <Mobileview setshow={setShow} />}
      </div>

      {/* Login Modal Popup */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
};

export default Header;
