import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import productData from "../../assets/productData";
import ReactStars from "react-rating-stars-component";

const DealsOfTheDay = () => {
  // Filter products with a discount
  const discountedProducts = productData.filter(
    (product) => product.discount && product.onSale
  );

  return (
    <section
      aria-labelledby="deals-heading"
      className="md:mx-20 mx-3 py-8"
    >
      {/* Header section */}
      <header className="flex flex-col lg:flex-row items-center lg:justify-between justify-center mb-8">
        <div data-aos="fade-right" className="lg:text-start text-center">
          <p className="text-sm lg:block hidden text-gray-800">Today Deals</p>
          <h2
            id="deals-heading"
            className="text-3xl font-bold text-primary"
          >
            <span className="text-secondary">Deals</span> of the Day
          </h2>
        </div>
        <p
          data-aos="fade-left"
          className="max-w-md text-gray-500 mt-3 md:mt-0"
        >
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam,
        </p>
      </header>

      {/* Product deals grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {discountedProducts.map((product) => (
          <article
            data-aos="fade-up"
            key={product.id}
            className="bg-gray-50 rounded-2xl overflow-hidden w-full shadow flex gap-5 md:h-[40vh]"
          >
            <div className="flex items-center w-1/2 justify-between relative">
              <span className="bg-primary/70 absolute top-1 left-1 text-white text-xs px-3 py-1 rounded-full font-semibold">
                {product.discount}
              </span>
              <img
                data-aos="fade-zoom-in"
                src={product.image}
                alt={`${product.name} product image`}
                className="h-full object-cover w-full"
              />
            </div>

            <div className="w-1/2 py-5 mx-2">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-gray-800">
                  ${product.new_price.toFixed(2)}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ${product.old_price.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-1 mb-2" aria-label={`Rated ${product.ratingValue} out of 5`}>
                <ReactStars
                  count={5}
                  size={20}
                  value={product.ratingValue}
                  edit={false}
                  char="★"
                  color="#e5e7eb"
                  activeColor="#facc15"
                />
              </div>

              <p className="text-xs text-gray-600 mb-4">{product.description}</p>

              <Link
                to={`/product/${product.id}`}
                className="inline-flex items-center gap-2 text-secondary font-semibold"
                aria-label={`Shop now for ${product.name}`}
              >
                Shop Now <FaArrowRight />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DealsOfTheDay;
