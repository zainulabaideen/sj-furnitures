import React from "react";
import FlashSale from "./FlashSale";
import DealsOfTheDay from "./DealsOfTheDay";
import Testimonial from "./Testimonial";
import SocialGallery from "./SocialGallery";
import Hero from "./Hero"


const Home = () => {
  return (
    <>
      <Hero />
      <FlashSale />
      <DealsOfTheDay />
      <Testimonial />
      <SocialGallery />
    </>
  );
};

export default Home;