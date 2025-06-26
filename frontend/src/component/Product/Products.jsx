import React from "react";
import ReactStars from "react-rating-stars-component";
import p1_img from "../../assets/p1_img.jpg";
import p2_img from "../../assets/p2_img.jpg";
import p3_img from "../../assets/p3_img.jpg";
import p4_img from "../../assets/p4_img.jpg";

const Products = () => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  let data_product = [
    {
      id: 1,
      name: "Chair",
      discription: "Wood",
      ratingValue: "4",
      image: p1_img,
      new_price: 50.0,
      old_price: 80.5,
    },
    {
      id: 2,
      name: "Bed",
      discription: "Wood",
      ratingValue: "3",
      image: p2_img,
      new_price: 85.0,
      old_price: 120.5,
    },
    {
      id: 3,
      name: "Sofa",
      discription: "Wood",
      ratingValue: "4",
      image: p3_img,
      new_price: 60.0,
      old_price: 100.5,
    },
    {
      id: 4,
      name: "Chair",
      discription: "Wood",
      ratingValue: "2",
      image: p4_img,
      new_price: 100.0,
      old_price: 150.0,
    },
  ];

  return (

<div className="flex justify-center w-full ">


    <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center lg:grid-cols-3 gap-10 text-primaryTextClr">
      {data_product.map((item, i) => (
        <div
          className="w-full max-w-md gap-5 mt-10 bg-gray-50 rounded-xl overflow-hidden"
          key={i}
        >
          <div>
            <img
              src={item.image}
              className=" h-72 w-full transition transform ease-in-out duration-700 hover:scale-110"
            />
          </div>
          <div className=" px-2 my-5 space-y-2">
            <div className=" flex items-center justify-between">
              <p>{item.name}</p>
              <ReactStars
                count={5}
                size={24}
                value={item.ratingValue}
                char="★" // force built-in star
                color="#e5e7eb" // empty-star colour (light-gray)
                activeColor="#facc15" // filled-star colour (amber-400/gold)
                onChange={ratingChanged}
              />
            </div>
            <p className=" text-lg text-gray-700 text-start font-semibold">
              {item.discription}
            </p>

            <div className=" flex gap-5 ">
              <div className=" text-gray-700 font-semibold">
                ${item.new_price}
              </div>
              <div className="  line-through">${item.old_price}</div>
            </div>
          </div>
        </div>
      ))}
</div>
    </div>
  );
};

export default Products;
