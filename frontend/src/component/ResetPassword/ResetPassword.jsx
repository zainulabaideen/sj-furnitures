import React, { useState , useEffect, Fragment } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { loadUser, updatePassword, updateProfile } from "../../actions/userActions";
import Loader from "../layout/loader/Loader";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";


const ResetPassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {error , isUpdated , loading} = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

    
    useEffect(() => {

  
      if (isUpdated) {
        dispatch(loadUser());
        toast.success("Updated  Successful!");
        navigate("/account");
        dispatch({
          type: UPDATE_PASSWORD_RESET,
        });
      }
  
  
      if (error) {
        toast.error(error);
      }
    }, [isUpdated, error, ,navigate]);

  const handleUpdatePassword = (e) => {
    e.preventDefault();


    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword" , newPassword);
    myForm.set("confirmPassword" , confirmPassword);

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

   dispatch(updatePassword(myForm));
    // You can redirect to profile here if needed using useNavigate()
  };



  return (

    <Fragment>
      {
         loading ? <Loader /> :    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
          Change  Password
        </h2>

        <form onSubmit={handleUpdatePassword} className="space-y-5">
          {/* Old Password Field */}

            <div className="relative">
            <label htmlFor="oldPassword" className="block text-gray-700 font-medium mb-2">
              Old Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full px-4 py-2 pr-10 bg-gray-100 outline-none"
            />
            <span
              className="absolute right-3 top-[45px] text-gray-500 hover:text-primary cursor-pointer"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {/* New Password Field */}
          <div className="relative">
            <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 pr-10 bg-gray-100 outline-none"
            />
            <span
              className="absolute right-3 top-[45px] text-gray-500 hover:text-primary cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEye /> : <FaEyeSlash />}
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
   
    
  );
};

export default ResetPassword;
