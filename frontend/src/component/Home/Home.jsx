import React from "react";
import FlashSale from "./FlashSale";
import Testimonial from "./Testimonial";
import SocialGallery from "./SocialGallery";
import Hero from "./Hero"
import Category from "./Category";
import PromoBannerGrid from "./PromoBannerGrid";
import Feature from "./Feature";
import MainProduct from "../Product/MainProduct";
import { Helmet } from "react-helmet";


const Home = () => {
  return (
    <>


      <Helmet>
        <title>SJ Furnitures | Home</title>
        <meta name="description" content="Welcome to My React App! Explore amazing features and content." />
      </Helmet>

      <Hero />
      <Category />
      <Feature />
   
      <PromoBannerGrid />
      {/* <FlashSale/> */}
         <MainProduct/>
      <Testimonial />
      <SocialGallery />
    </>
  );
};

export default Home;