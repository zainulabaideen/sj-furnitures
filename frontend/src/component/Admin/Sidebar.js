import "./sidebar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight"; // ✅ added
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useState } from "react";

const Sidebar = () => {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      {/* Products dropdown */}
      <div className="my-2">
        <button
          onClick={() => setProductsOpen(!productsOpen)}
          className="flex items-center justify-between w-full p-3 my-1 rounded-md text-gray-800 hover:bg-gray-100"
        >
          <span className="flex items-center">
            <ChevronRightIcon
              className={`mr-2 transition-transform ${
                productsOpen ? "rotate-90" : ""
              }`}
            />
            Products
          </span> 
        </button>

        {productsOpen && (
          <div className="ml-4 border-l-2 border-gray-300">
            <Link
              to="/admin/products"
              className="flex items-center p-3 pl-8 my-1 rounded-md text-gray-800 hover:bg-gray-100"
            >
              <PostAddIcon className="mr-2" />
              All Products
            </Link>
            <Link
              to="/admin/product"
              className="flex items-center p-3 pl-8 my-1 rounded-md text-gray-800 hover:bg-gray-100"
            >
              <AddIcon className="mr-2" />
              Create Product
            </Link>
          </div>
        )}
      </div>

      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
