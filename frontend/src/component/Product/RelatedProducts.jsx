import React from "react";
import productData from "../../assets/productData";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";



const RelatedProducts = ({ category, currentProductId }) => {
  const related = productData.filter(
    (item) => item.category === category && item.id !== currentProductId
  );

  if (related.length === 0) return null;

  return (
    <div>
      <h3 className="text-3xl font-semibold mb-4 text-secondary ">Related Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-20">
        {related.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg flex flex-col h-full ">
              <div className=" overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-72 w-full object-cover transition transform ease-in-out duration-700 hover:scale-110"
                />
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p>{product.name}</p>
                  <ReactStars
                    count={5}
                    size={24}
                    value={product.ratingValue}
                    edit={false}
                    char="★"
                    color="#e5e7eb"
                    activeColor="#facc15"
                  />
                </div>
                <p className=" text-start">{product.description}</p>
                <div className="flex gap-4">
                  <span className="font-bold text-gray-600">
                    ${product.new_price}
                  </span>
                  <span className="line-through">${product.old_price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
