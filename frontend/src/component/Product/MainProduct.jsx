import React from "react";
import Products from "./Products";

const MainProduct = () => {
  const buttonsCategoryData = [
    { title: "All Products", link: "#" },
    { title: "Latest Products", link: "#" },
    { title: "Best Sellers", link: "#" },
    { title: "Featured Products", link: "#" },
  ];

  return (
    <div className=" pt-10 text-center space-y-10 text-gray-800">
      <h2 className="text-xl md:text-2xl font-semibold">Our Products</h2>
      <h1 className="text-3xl md:text-5xl font-semibold">
        Our <span className="text-secondaryTextClr">Products Collections</span>
      </h1>

      {/* Flex container for buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {buttonsCategoryData.map((item, index) => (
          <button
            className="px-8 py-2 font-semibold border border-inherit rounded-full hover:bg-secondaryBgClr hover:text-white"
          >
            {item.title}
          </button>
        ))}
      </div>

<Products/>

    </div>
  );
};

export default MainProduct;
