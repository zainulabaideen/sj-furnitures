import React from "react";
import Banner from "./Banner";
import OurStory from "./OurStory";
import Feature from "./Feature";
import BestStore from "./BestStore";
import Testimonials from "./Testimonials";
import Team from "./Team";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>

      <Helmet>
        <title>SJ Furnitures | About Us</title>
        <meta name="description" content="Learn more about us and what makes our app special." />
      </Helmet>

  

        <Banner />
        <OurStory />
        <Feature />
        <BestStore />
        <Testimonials />
        <Team />
  
    </>
  );
};

export default About;