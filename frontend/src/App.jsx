import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./component/layout/Header/Header.jsx";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.jsx";
import About from "./component/About/About.jsx";
import LoginSignup from "./component/LoginSignup/LoginSignup.jsx";
import Loader from "./component/layout/loader/Loader.js";
import ProductDetails from "./component/Product/DisplayProduct.jsx";
import DisplayProduct from "./component/Product/DisplayProduct.jsx";
import MainProduct from "./component/Product/MainProduct.jsx";
import Search from "./component/Search/Search.jsx";
import Products from "./component/Product/Products.jsx";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import store from "./store.js"
import { loadUser } from "./actions/userActions.js";
import UserOptions from "./component/layout/Header/UserOptions/UserOptions.jsx";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user)

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <div className="bg-bg-clr">
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<DisplayProduct />} />
        <Route path="/products" element={<MainProduct />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/loading" element={<Loader />} /> */}
      </Routes>

      <Footer />

      {/* ✅ Global ToastContainer always visible */}
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
