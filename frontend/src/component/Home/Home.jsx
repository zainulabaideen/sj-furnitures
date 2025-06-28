import React from 'react'
import MainProduct from '../Product/MainProduct'
import LoginSignUp from "../LoginSignup/LoginSignup"

const Home = () => {
  return (
    <div className='md:px-20 px-3'>
      <MainProduct/>
      <LoginSignUp/>
    </div>
  )
}

export default Home
