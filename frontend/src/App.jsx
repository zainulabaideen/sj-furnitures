import { Routes, Route, useNavigate } from "react-router-dom";
import AOS from 'aos';
import "./App.css";
import 'aos/dist/aos.css';
import Header from "./component/layout/Header/Header.jsx";
import Footer from "./component/layout/Footer/Footer.jsx";
import Home from "./component/Home/Home.jsx";
import About from "./component/About/About.jsx";
import LoginModal from "./component/LoginSignup/LoginModal.jsx";
import ProductDetails from "./component/Product/DisplayProduct.jsx";
import MainProduct from "./component/Product/MainProduct.jsx";
import Search from "./component/Search/Search.jsx";
import Products from "./component/Product/Products.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import store from "./store.js";
import { loadUser } from "./actions/userActions.js";
import UserOptions from "./component/layout/Header/UserOptions/UserOptions.jsx";
import { useSelector } from "react-redux";
import UserProfile from "./component/UserProfile/UserProfile.jsx";
import ResetPassword from "./component/ResetPassword/ResetPassword.jsx";
import Protectedroute from "./component/route/Protectedroute.js";
import UpdateProfile from "./component/UserProfile/UpdateProfile.jsx";
import ForgotPassword from "./component/UserProfile/ForgotPassword.jsx";
import UpdatePassword from "./component/UserProfile/UpdatePassword.jsx";
import Cart from "./component/Cart/Cart.jsx";
import Checkout from "./component/Cart/Checkout.jsx"
import MyOrders from "./component/orders/MyOrders.jsx";
import OrderDetails from "./component/orders/OrderDetails.jsx";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: false,     // animation should not happen only once - while scrolling down
    });
  }, []);

  return (
    <div className="bg-bg-clr">
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<MainProduct />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Protectedroute><UserProfile /></Protectedroute>} />
        <Route path="/update-profile" element={<Protectedroute><UpdateProfile /></Protectedroute>} />
        <Route path="/resetPassword" element={<Protectedroute><ResetPassword /></Protectedroute>} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<UpdatePassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login/shipping" element={<Protectedroute><Checkout/></Protectedroute>} />
        <Route path="/orders" element={<Protectedroute><MyOrders/></Protectedroute>} />
        <Route path="/order/:id" element={<Protectedroute><OrderDetails/></Protectedroute>} />




        {/* Login route also opens modal */}  
        <Route
          path="/login"
          element={<LoginModal isOpen={true} onClose={() => navigate(-1)} />}
        />
      </Routes>

      <Footer />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
