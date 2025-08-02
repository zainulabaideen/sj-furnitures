import React , {useEffect} from 'react'
import MainProduct from '../Product/MainProduct'
import LoginSignUp from "../LoginSignup/LoginSignup"
import Hero from '../layout/hero/Hero'
import {getProduct} from "../../actions/productAction";



const Home = () => {  



  return (  
    <>  
  
     <div className='md:px-20 px-3 mt-20'>
      <MainProduct/>
    </div>
  

    </>
   
  )
}

export default Home
