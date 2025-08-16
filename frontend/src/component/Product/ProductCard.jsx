import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const ProductCard = ({ products, filter }) => {
  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <section
      className="flex justify-center w-full py-10"
      aria-label="Product cards"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 text-primaryTextClr items-stretch">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg flex flex-col h-full"
          >
            <Link
              to={`/product/${item.id}`}
              state={{ product: item }}
              className="block h-full"
            >
              <figure className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-72 w-full object-cover transition transform ease-in-out duration-700 hover:scale-110"
                  loading="lazy"
                />
              </figure>

              <div className="p-4 space-y-2">
                <header className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">{item.name}</h2>
                  <ReactStars
                    count={5}
                    size={20}
                    value={item.ratingValue}
                    edit={false}
                    char="★"
                    color="#e5e7eb"
                    activeColor="#facc15"
                  />
                </header>

                <p className="text-start text-sm text-gray-600">
                  {item.description}
                </p>

                <footer className="flex gap-4 items-center">
                  <span className="font-bold text-gray-600">
                    ${item.new_price}
                  </span>
                  {item.old_price && (
                    <span className="line-through text-gray-400">
                      ${item.old_price}
                    </span>
                  )}
                </footer>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductCard;
