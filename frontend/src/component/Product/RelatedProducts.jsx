import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import axios from "axios";

const RelatedProducts = ({ category, currentProductId }) => {
  const [related, setRelated] = useState([]);

  // 🔹 Helper function to truncate description
  const getPreviewText = (text, maxLength = 100) => {
    if (!text) return "No description available.";
    return text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const { data } = await axios.get(`/api/product/${currentProductId}/related`);
        setRelated(data?.products);
      } catch (error) {
        console.error("Failed to load related products", error);
      }
    };
    fetchRelated();
  }, [category, currentProductId]);

  if (related?.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="text-3xl font-semibold mb-4 text-secondary">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {related.map((product) => {
          const description = product.description || "";
          const maxLength = 100; // 🔹 Adjust description preview length
          const isLong = description?.length > maxLength;
          const previewText = getPreviewText(description, maxLength);

          return (
            <article
              key={product._id}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-lg flex flex-col h-full"
            >
              <Link to={`/product/${product._id}`}>
                <figure className="overflow-hidden">
                  <img
                    src={
                      product?.images && product?.images?.length > 0
                        ? product?.images[0].url
                        : "/default-product-image.png"
                    }
                    alt={product.name}
                    className="h-72 w-full object-cover transition transform ease-in-out duration-700 hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/default-product-image.png";
                    }}
                  />
                </figure>

                <div className="p-4 space-y-2">
                  <header className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{product?.name}</h3>
                    <ReactStars
                      count={5}
                      size={20}
                      value={product?.ratings || 5}
                      edit={false}
                      char="★"
                      color="#e5e7eb"
                      activeColor="#facc15"
                    />
                  </header>

                  {/* 🔹 Truncated description */}
                  <p className="text-sm text-gray-600">{previewText}</p>

                  {/* 🔹 Read More link if long */}
                  {isLong && (
                    <Link
                      to={`/product/${product._id}`}
                      className="text-secondary text-sm hover:underline"
                    >
                      Read More
                    </Link>
                  )}

                  <footer className="flex gap-4 items-center">
                    <span className="font-bold text-gray-600">
                      PKR {product?.price}
                    </span>
                  </footer>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedProducts;
