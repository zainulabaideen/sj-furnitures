import React from "react";
import StoryBanner from "../../assets/Story-Banner.jpg";
import Sign from "../../assets/Sign.png";

const OurStory = () => {
  return (
    <section className="md:mt-20 mt-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-screen-xl mx-auto px-4 md:px-8 gap-10 overflow-hidden">
      {/* Story Section */}
      <article
        data-aos="fade-right"
        className="w-full lg:w-1/3 space-y-3 md:space-y-6 text-center md:text-start"
      >
        <h2 className="text-primary md:text-4xl text-2xl font-bold">
          Our Story
        </h2>
        <p>
          Pellentesque commodo eros a enim. Maecenase odio et ante tincidunt
          tempus. Curabitur nisi. Nam adipiscing.
        </p>
        <h3 className="text-secondary font-bold md:text-xl">
          Business Startup
        </h3>
        <p>
          Cum sociis natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus. Pellentesque eros commodo a enim. Ut enim ad
          minim veniam, exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </article>

      {/* Image Section */}
      <figure
        data-aos="fade-up"
        className="w-full lg:w-1/3 flex justify-center"
      >
        <img
          src={StoryBanner}
          alt="Company Story Banner"
          className="max-h-96 max-w-full object-contain"
        />
      </figure>

      {/* Quote Section */}
      <aside
        data-aos="fade-left"
        className="w-full lg:w-1/3 space-y-3 md:space-y-6 text-center md:text-start"
      >
        <blockquote className="text-sm italic">
          “Every time you make the hard, correct decision you become more
          courageous & every time you make the easy decision you become a bit
          more cowardly. If you are CEO, these choices will lead to a courageous
          or cowardly company.”
        </blockquote>
        <figure className="flex flex-col items-center md:items-start">
          <img
            src={Sign}
            alt="Signature of CEO"
            className="w-40 max-w-full"
          />
          <figcaption className="uppercase text-sm">CEO / Founder</figcaption>
        </figure>
      </aside>
    </section>
  );
};

export default OurStory;
