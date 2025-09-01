import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
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
import ProtectedRoute from "./component/route/Protectedroute.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import UsersList from "./component/Admin/UsersList.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import CategoryProducts from "./component/CategoryProducts";
import VerifyOtp from "./component/VerifyOtp.jsx";
import OrderSuccess from "./component/orders/OrderSuccess.jsx";
import WhatsappLogo from "./component/Whatsapp/WhatsappLogo"

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]); // 👈 Use key to trigger on every navigation

  return null;
}



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
      <ScrollToTop />
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <WhatsappLogo/>
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
        <Route path="/login/shipping" element={<Protectedroute><Checkout /></Protectedroute>} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/orders" element={<Protectedroute><MyOrders /></Protectedroute>} />
        <Route path="/order/:id" element={<Protectedroute><OrderDetails /></Protectedroute>} />


        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />


        {/* Admin Rutes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}> <Dashboard /> </ProtectedRoute>} />

        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}> <ProductList /> </ProtectedRoute>} />
        <Route path="/admin/product" element={<ProtectedRoute isAdmin={true}> <NewProduct /> </ProtectedRoute>} />
        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}> <UpdateProduct /> </ProtectedRoute>} />

        <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}> <OrderList /> </ProtectedRoute>} />
        <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}> <ProcessOrder /> </ProtectedRoute>} />


        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}> <UsersList /> </ProtectedRoute>} />
        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}> <UpdateUser /> </ProtectedRoute>} />

        <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true}> <ProductReviews /> </ProtectedRoute>} />



        {/* Login route also opens modal */}
        <Route path="/login" element={<LoginModal isOpen={true} onClose={() => navigate(-1)} />} />
        {/* <Route path="/login" element={
            isAuthenticated ?
              <Navigate to="/account" replace /> :
              <LoginModal isOpen={true} onClose={() => navigate(-1)} />
          }
        /> */}

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
