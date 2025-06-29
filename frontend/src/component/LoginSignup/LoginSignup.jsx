import React, { useState } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import avatar from "../../assets/avatar.jpg";

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  // Showing and hiding Icons and text in input fields while focus
  const [isNameFieldActive, setIsNameFieldActive] = useState(false);
  const [isEmailFieldActive, setIsEmailFieldActive] = useState(false);
  const [isPasswordFieldActive, setIsPasswordFieldActive] = useState(false);

  return (
    <div className=" text-primaryTextClr relative lg:w-[900px] mx-5 h-[550px] lg:mx-auto overflow-hidden shadow-lg rounded-xl">
      {/* Green Panel (40% width) */}
      <div
        className={`md:block hidden absolute top-0 h-full w-[40%] bg-primary text-white p-10 transition-transform duration-700 ease-in-out z-20 overflow-hidden ${
          isSignUp ? "translate-x-0" : "translate-x-[150%]"
        }`} 
      >
        {/* Content Container */}
        <div className="relative w-full h-full overflow-hidden">
          {/* Welcome Back Content - Slides from right */}
          <div
            className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center transition-transform duration-700 ease-in-out ${
              isSignUp ? "translate-x-0" : "translate-x-full"
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

          {/* New Here Content - Slides from left */}
          <div
            className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center transition-transform duration-700 ease-in-out ${
              isSignUp ? "-translate-x-full" : "translate-x-0"
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

      {/* Form Panel (60% width) */}
      <form
        className={`absolute top-0 h-full w-full md:w-[60%] flex flex-col justify-center items-center md:p-10 p-5 transition-transform duration-700 ease-in-out z-10 text-center ${
          isSignUp ? "md:translate-x-[66.666%]" : "translate-x-0"
        }`}
      >
        <div className="w-full max-w-md space-y-5">
          <h2 className="text-3xl text-secondary font-bold mb-4">
            {isSignUp ? "Create Account" : "Login"}
          </h2>
          <p className="mb-6">
            {isSignUp
              ? "Join us by filling out the information below"
              : "Sign in to your account"}
          </p>

          {/*  User's profile picture and user name fields*/}

          {isSignUp && (
            <div className=" space-y-10 flex items-center flex-col">
              {/*  User's profile picture field*/}

              <div className="upload-area rounded-full cursor-pointer">
                <label htmlFor="file-input">
                  <img
                    className=" h-20 w-20 rounded-full cursor-pointer" title="Change picture"
                    src={avatar}
                    alt=""
                  />
                </label>
                <input
                  className="box-border cursor-pointer outline-none border-2 w-full text-gray-600 border-gray-400 rounded-md px-3 py-1"
                  type="file"
                  name="avatar"
                  id="file-input"
title="Upload profile picture"
                  hidden
                />
              </div>

              {/*  user name field */}

              <div className=" w-full relative flex items-center">
                {!isNameFieldActive && (
                  <p className="absolute flex items-center left-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <AiOutlineUser className="mx-2 text-lg" />
                    Name
                  </p>
                )}
                <input
                  type="text"
                  name="name"
                  className="w-full cursor-text px-4 py-2 rounded-sm bg-gray-100 focus:outline-none border-none"
                  onFocus={() => setIsNameFieldActive(true)}
                  onBlur={() => setIsNameFieldActive(false)}
                />
              </div>
            </div>
          )}

          {/*   Email field     */}

          <div className="relative flex items-center">
            {!isEmailFieldActive && (
              <p className="absolute flex items-center left-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <AiOutlineMail className="mx-2 text-lg" />
                Email
              </p>
            )}
            <input
              type="email"
              name="email"
              className="w-full cursor-text px-4 py-2 rounded-sm bg-gray-100 focus:outline-none border-none"
              onFocus={() => setIsEmailFieldActive(true)}
              onBlur={() => setIsEmailFieldActive(false)}
            />
          </div>

          {/*  Password field  */}

          <div className="relative flex items-center">
            {!isPasswordFieldActive && (
              <p className="absolute flex items-center left-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <AiOutlineLock className="mx-2 text-xl" />
                Password
              </p>
            )}
            <input
              type="password"
              name="password"
              className="w-full cursor-text px-4 py-2 rounded-sm bg-gray-100 focus:outline-none border-none"
              onFocus={() => setIsPasswordFieldActive(true)}
              onBlur={() => setIsPasswordFieldActive(false)}
            />
          </div>

          {!isSignUp && (
            <div className="mt-4 ">
              <a
                href="#"
                className=" text-secondary text-sm hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          )}

          <button
            type="button"
            className=" hover:bg-opacity-85 w-1/3 bg-secondary text-white py-3 rounded-full font-semibold"
          >
            {isSignUp ? "SignUp" : "Login"}
          </button>

          {/*  Switch to login or signup in small screens*/}

          <div className="md:hidden block text-sm">
            <h1>
              {isSignUp ? "Already have an account" : "Do not have an account"}{" "}
              <span
                onClick={() => setIsSignUp(!isSignUp)}
                className=" cursor-pointer text-secondaryTextClr hover:underline"
              >
                {isSignUp ? "Login" : "Create Now"}
              </span>
            </h1>
          </div>  
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
