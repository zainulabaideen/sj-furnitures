import React, { useState , useEffect, Fragment } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate ,  useParams   } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { loadUser, updatePassword, resetPassword } from "../../actions/userActions";
import Loader from "../layout/loader/Loader";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";


// inside your component



const UpdatePassword = () => {

const { token } = useParams();

    
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
      const {error , success , loading} = useSelector((state) => state.forgotPassword);
    
      const navigate = useNavigate();
      const dispatch = useDispatch();
    
        
        useEffect(() => {
    
      
          if (success) {
            dispatch(loadUser());
            toast.success("Updated  Successful!");
            navigate("/login");
         
          }
      
      
          if (error) {
            toast.error(error);
          }
        }, [success, error, ,navigate]);
    
      const handleForgotPassword = (e) => {
        e.preventDefault();
    
    
        const myForm = new FormData();
    
       
        myForm.set("password" , password);
        myForm.set("confirmPassword" , confirmPassword);
    
        if (password !== confirmPassword) {
          toast.error("Passwords do not match!");
          return;
        }
    
dispatch(resetPassword(token, myForm));
       
        // You can redirect to profile here if needed using useNavigate()
      };
    
    
  return (
     <Fragment>
      {
         loading ? <Loader /> :    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
          Change  Password
        </h2>

        <form onSubmit={handleForgotPassword} className="space-y-5">
         
          {/* New Password Field */}
          <div className="relative">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
               Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 pr-10 bg-gray-100 outline-none"
            />
            <span
              className="absolute right-3 top-[45px] text-gray-500 hover:text-primary cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 pr-10 bg-gray-100 outline-none"
            />
            <span
              className="absolute right-3 top-[45px] text-gray-500 hover:text-primary cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-sm hover:bg-primary-85 transition"
          >
            Update Password
          </button>
        </form>
      </div>
      }
    </Fragment>
  )
}

export default UpdatePassword