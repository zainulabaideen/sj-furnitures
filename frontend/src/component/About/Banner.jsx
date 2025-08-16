import React from "react";
import AboutBanner from "../../assets/AboutBanner.jpg";

const Banner = () => {
  return (
    <section className="relative h-screen w-full">
      {/* Background image */}
      <img
        src={AboutBanner}
        alt="About Us Banner"
        className="absolute inset-0 w-full h-full object-cover brightness-[30%]"
      />

      {/* Centered content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <article
          data-aos="zoom-in"
          className="text-white text-center space-y-8 md:p-8 px-3 w-full md:max-w-2xl pt-20"
        >
          <header>
            <h1 className="md:text-4xl text-2xl font-bold">About Us</h1>
          </header>
          <p>
            Fusce convallis metus id felis luctus adipiscing. Nullam tincidunt
            adipiscing enim. Nunc sed turpis. Praesent nonummy mi in odio. Cum
            sociis natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Sed in libero ut nibh placerat accumsan. Pellentesque
            commodo eros a enim. Maecenas nec odio et ante tincidunt tempus.
            Curabitur nisi. Nam adipiscing.
          </p>
        </article>
      </div>
    </section>
  );
};

export default Banner;
