import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const ProductCard = ({ products, filter }) => {
  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="flex justify-center w-full py-10 ">
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 text-primaryTextClr items-stretch">
        {filtered.map((item) => (
          <Link
            to={`/product/${item.id}`}
            state={{ product: item }}
            key={item.id}
          >
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg flex flex-col h-full ">
              <div className=" overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-72 w-full object-cover transition transform ease-in-out duration-700 hover:scale-110"
                />
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p>{item.name}</p>
                  <ReactStars
                    count={5}
                    size={24}
                    value={item.ratingValue}
                    edit={false}
                    char="★"
                    color="#e5e7eb"
                    activeColor="#facc15"
                  />
                </div>
                <p className=" text-start">{item.description}</p>
                <div className="flex gap-4">
                  <span className="font-bold text-gray-600">${item.new_price}</span>
                  <span className="line-through">
                    ${item.old_price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
