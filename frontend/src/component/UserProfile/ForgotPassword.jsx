import React, { useState, useEffect, Fragment } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { loadUser, forgotPassword } from "../../actions/userActions";
import Loader from "../layout/loader/Loader";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");


  const { error, message, loading } = useSelector((state) => state.forgotPassword);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {


    if (message) {
      toast.success(message);

    }


    if (error) {
      toast.error(error);
    }
  }, [message, dispatch, error,]);

  const handleForgotPassword = (e) => {
    e.preventDefault();


    const myForm = new FormData();

    myForm.set("email", email);




    dispatch(forgotPassword(myForm));
    // You can redirect to profile here if needed using useNavigate()
  };
  return (
    <Fragment>
      {
        loading ? <Loader /> : <section className="flex items-center justify-center h-auto md:h-screen md:mt-0 mt-20 px-3"> <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
            Forgot   Password
          </h2>

          <form onSubmit={handleForgotPassword} className="space-y-5">

            {/* WEmail Field */}
            <div className="relative">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type={email}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 pr-10 bg-gray-100 outline-none"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-sm hover:bg-primary-85 transition"
            >
              Send Email
            </button>
          </form>
        </div>
        </section>
      }
    </Fragment>
  )
}

export default ForgotPassword