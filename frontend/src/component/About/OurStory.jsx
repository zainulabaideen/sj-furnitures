import React from "react";
import StoryBanner from "../../assets/Story-Banner.jpg";
import Sign from "../../assets/Sign.png";

const OurStory = () => {
  return (
    <section className="md:mt-20 mt-10 flex lg:flex-row flex-col items-center justify-between w-full px-3 md:px-20 gap-10">
      {/* Story Section */}
      <article
        data-aos="fade-right"
        className="w-full md:w-3/4 lg:w-1/3 space-y-3 md:space-y-8"
      >
        <h2 className="md:text-start text-center text-primary md:text-4xl text-2xl font-bold">
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
          Cum sociis natoque penatibus et magnis dis partu rient montes,
          nascetur ridiculus mus. Pellenteses eros commodo a enim. Ut enim ad
          minim veniam, exer citation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </article>

      {/* Image Section */}
      <figure
        data-aos="fade-up"
        className="w-full md:w-3/4 flex justify-center lg:w-1/3"
      >
        <img
          src={StoryBanner}
          alt="Company Story Banner"
          className="max-h-96"
        />
      </figure>

      {/* Quote Section */}
      <aside
        data-aos="fade-left"
        className="w-full md:w-3/4 lg:w-1/3 md:space-y-8 space-y-3"
      >
        <blockquote className="text-sm">
          “Every time you make the hard, correct decision you become more
          courageous & every time you make the easy, decision you become a bit
          more cowardly. If you are CEO, these choices will lead to a courageous
          or cowardly company.”
        </blockquote>
        <figure>
          <img
            src={Sign}
            alt="Signature of CEO"
            className="w-44"
          />
          <figcaption className="uppercase text-sm">CEO / Founder</figcaption>
        </figure>
      </aside>
    </section>
  );
};

export default OurStory;
