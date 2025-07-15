import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { IoClose } from "react-icons/io5";
import "./MobileView.css"
import { useNavigate } from 'react-router-dom'
import logo from "../../../assets/logo[1].png";

const Mobileview = ({ setshow }) => {
  const navigate = useNavigate();

  return (
    <div className="mobileview">
      <div className="top">
        <div className="logo">  
          <img src={logo} alt="" />
        </div>
        <div className="fatimes">
          <IoClose onClick={() => { setshow(false) }} className='cross' />

        </div>
      </div>
      <div className="middle">
        <ul className='mobilemenu' onClick={() => { setshow(false) }}  >
          <li onClick={() => navigate("/")}><p>Home</p></li>
       
          <li onClick={() => navigate("/portfolio")}><p>Portfolio</p></li>
          <li  onClick={() => navigate("/about")}><p>About</p></li>
          <li onClick={() => navigate("/contact")}><p>Contact</p></li>
        </ul>
      </div>




    </div>
  )
}

export default Mobileview