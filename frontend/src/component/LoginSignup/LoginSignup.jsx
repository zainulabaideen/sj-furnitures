import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import avatarPlaceholder from "../../assets/avatar.jpg";
import { registerUser, loginUser } from "../../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LoginSignup = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(true);

  // 👉 Put redirect definition here (before using it in effects)
  const redirect = location.search ? location.search.split("=")[1] : "/account";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(avatarPlaceholder);

  const { error, loading, isAuthenticated, isRegistered } = useSelector(
    (state) => state.user
  );

useEffect(() => {
  if (isRegistered && isSignUp) { 
    navigate("/verify-otp", { 
      state: { email: formData.email },
      replace: true // This prevents going back to registration
    });
    
    // ✅ Show only one toast
    toast.success("Registration successful! Please verify your email.", {
      autoClose: 3000,
    });
    
    // ✅ Reset the registration flag
    dispatch({ type: "USER_REGISTERED_RESET" });
  }

  if (isAuthenticated && !isSignUp) {
    toast.success("Login Successful!", { autoClose: 3000 });
    navigate(redirect);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      avatar: null,
    });
    setAvatarPreview(avatarPlaceholder);
  }

  if (error) {
    if(error=="Please login to access this resource"){
      dispatch({ type: "CLEAR_ERRORS" });
    } else {
      toast.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
  }
}, [isRegistered, isAuthenticated, error, isSignUp, navigate, redirect, formData.email, dispatch]);

  useEffect(() => {
    if (formData.avatar) {
      const objectUrl = URL.createObjectURL(formData.avatar);
      setAvatarPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [formData.avatar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      const myForm = new FormData();
      myForm.set("name", formData.name);
      myForm.set("email", formData.email);
      myForm.set("password", formData.password);
      myForm.set("phone", formData.phone);
      myForm.set("address", formData.address);
      if (formData.avatar) {
        myForm.set("avatar", formData.avatar);
      }
      dispatch(registerUser(myForm));
    } else {
      dispatch(loginUser(formData.email, formData.password));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="relative content-center bg-white z-50 text-primaryTextClr lg:w-[900px] mx-5 md:h-[560px] h-[620px] lg:mx-auto overflow-hidden shadow-lg rounded-xl">
      {/* Brown Panel */}
      <div
        className={`md:block hidden absolute top-0 h-full w-[40%] bg-primary text-white p-10 transition-transform duration-700 ease-in-out z-20 overflow-hidden ${isSignUp ? "translate-x-0" : "translate-x-[150%]"
          }`}
      >
        <div className="relative w-full h-full overflow-hidden">
          {/* Welcome Back */}
          <div
            className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center transition-transform duration-700 ease-in-out ${isSignUp ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="mb-6 px-4">
              To keep connected with us please login with your credentials
            </p>
            <button
              onClick={() => setIsSignUp(false)}
              className=" text-white px-8 py-2 font-semibold border-[1px] border-white rounded-full hover:bg-white/20"
            >
              Login
            </button>
          </div>

          {/* New Here */}
          <div
            className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center transition-transform duration-700 ease-in-out ${isSignUp ? "-translate-x-full" : "translate-x-0"
              }`}
          >
            <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
            <p className="mb-6 px-4">
              Enter your credentials and start your journey with us.
            </p>
            <button
              onClick={() => setIsSignUp(true)}
              className=" border-[1px] border-white text-white px-8 py-2 font-semibold rounded-full hover:bg-white/20"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <form
        onSubmit={handleSubmit}
        className={`absolute top-0 h-full w-full md:w-[60%] flex flex-col justify-center items-center md:p-10 p-5 transition-transform duration-700 ease-in-out z-10 text-center 
          ${isSignUp ? "md:translate-x-[66.666%]" : "translate-x-0"}`}
      >
        <div className="w-full max-w-md space-y-5">
          <h2 className="text-3xl text-secondary font-bold mb-4">
            {isSignUp ? "Create Account" : "Login"}
          </h2>
          <p className="mb-6">{isSignUp ? "Join us by filling out the info" : "Sign in to your account"}</p>

          {isSignUp && (
            <div className="space-y-4 flex items-center flex-col">
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <img
                  src={avatarPreview}
                  className="h-20 w-20 rounded-full object-cover"
                  alt="Avatar Preview"
                  title="Upload avatar"
                />
              </label>
              <input
                type="file"
                id="avatar-upload"
                name="avatar"
                accept="image/*"
                hidden
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-sm bg-gray-100 focus:outline-none"
                required
              />

              {/* ✅ New Phone Field */}
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-sm bg-gray-100 focus:outline-none"
                required
              />

              {/* ✅ New Address Field */}
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-sm bg-gray-100 focus:outline-none"
                required
              />
            </div>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-sm bg-gray-100 focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-sm bg-gray-100 focus:outline-none"
            required
          />

          {!isSignUp && (
            <div className="mt-4 text-right">
              <Link to="/password/forgot" className="text-secondary text-sm hover:underline">
                Forgot your password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="hover:bg-opacity-85 w-1/3 bg-primary text-white py-3 rounded-full font-semibold"
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
          </button>

          <div className="md:hidden block text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="cursor-pointer text-secondary hover:underline"
            >
              {isSignUp ? "Login" : "Sign up now"}
            </span>
          </div>
        </div>
      </form>

      {/* Close button */}
      <button
        onClick={onClose}
        className={`absolute top-4 right-4 z-50 outline-none ${isSignUp ? "" : "md:text-white"}`}
        aria-label="Close modal"
      >
        <IoClose className="text-2xl" />
      </button>
    </div>
  );
};

export default LoginSignup;
