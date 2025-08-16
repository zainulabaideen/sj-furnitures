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
    <section
      className="mt-20"
      aria-labelledby="related-products-heading"
    >
      <h2
        id="related-products-heading"
        className="text-3xl font-semibold mb-4 text-secondary"
      >
        Related Products
      </h2>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        data-aos="fade-up"
      >
        {related.map((product) => (
          <article
            key={product.id}
            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg flex flex-col h-full"
            itemScope
            itemType="https://schema.org/Product"
          >
            <Link to={`/product/${product.id}`}>
              <figure className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-72 w-full object-cover transition transform ease-in-out duration-700 hover:scale-110"
                  loading="lazy"
                  itemProp="image"
                />
              </figure>

              <div className="p-4 space-y-2">
                <header className="flex items-center justify-between">
                  <h3
                    className="text-lg font-semibold"
                    itemProp="name"
                  >
                    {product.name}
                  </h3>
                  <ReactStars
                    count={5}
                    size={20}
                    value={product.ratingValue}
                    edit={false}
                    char="★"
                    color="#e5e7eb"
                    activeColor="#facc15"
                  />
                </header>

                <p
                  className="text-start text-sm text-gray-600"
                  itemProp="description"
                >
                  {product.description}
                </p>

                <footer className="flex gap-4 items-center">
                  <span
                    className="font-bold text-gray-600"
                    itemProp="price"
                    content={product.new_price}
                  >
                    ${product.new_price}
                  </span>
                  <span className="line-through text-gray-400">
                    ${product.old_price}
                  </span>
                  <meta itemProp="priceCurrency" content="USD" />
                </footer>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
