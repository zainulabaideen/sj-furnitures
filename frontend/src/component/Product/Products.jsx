import React,{ useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../../actions/productAction";
import Loader from "../../component/layout/loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import img from "../../assets/p1_img.jpg"; // ✅ fallback image

const Products = ({ currentPage }) => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const { keyword } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, error, keyword, currentPage]);

  // 🔹 Format price in PKR
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // 🔹 Helper function to truncate description
  const getPreviewText = (text, maxLength = 100) => {
    if (!text) return "No description available.";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section
          className="flex justify-center w-full md:px-20 px-3"
          aria-label="Product Listings"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products &&
              products?.map((product) => {
                const description = product.description || "";
                const maxLength = 100;
                const isLong = description?.length > maxLength;
                const previewText = getPreviewText(description, maxLength);

                return (
                  <article
                    key={product._id}
                    className="w-full max-w-md mt-10 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                    data-aos="fade-up"
                  >
                    <Link to={`/product/${product._id}`}>
                      {/* ✅ fallback image handling */}
                      <figure className="overflow-hidden relative">
                        <img
                          src={
                            product?.images && product?.images?.length > 0
                              ? product?.images[0].url
                              : img
                          }
                          alt={product.name || "Product"}
                          className="h-72 w-full object-cover transition duration-700 ease-in-out hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = img;
                          }}
                        />
                        {/* Luxury tag */}
                        <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                          Premium
                        </span>
                      </figure>

                      <div className="px-4 py-5 space-y-3">
                        <header className="flex items-center justify-between">
                          <h2 className="text-lg font-semibold text-gray-900">
                            {product.name}
                          </h2>
                          <ReactStars
                            count={5}
                            size={20}
                            value={5}
                            char="★"
                            edit={false}
                            color="#e5e7eb"
                            activeColor="#fbbf24" // Gold
                          />
                        </header>

                        {/* 🔹 Truncated description */}
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {previewText}
                        </p>

                        {/* 🔹 Read More link if long */}
                        {isLong && (
                          <Link
                            to={`/product/${product._id}`}
                            className="text-yellow-600 text-sm hover:underline font-medium"
                          >
                            Read More
                          </Link>
                        )}

                        {/* Price Section */}
                        <footer className="flex gap-4 items-center pt-3">
                          <span className="text-xl font-bold text-gray-900">
                            {formatPrice(product?.price)}
                          </span>
                          {product?.oldPrice && (
                            <span className="line-through text-gray-400 text-sm">
                              {formatPrice(product?.oldPrice)}
                            </span>
                          )}
                        </footer>
                      </div>
                    </Link>
                  </article>
                );
              })}
          </div>
        </section>
      )}
    </>
  );
};

export default Products;
