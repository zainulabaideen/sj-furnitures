import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../../actions/productAction";
import Loader from "../../component/layout/loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from "react-router-dom";
import p2_img from "../../assets/p2_img.jpg";

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

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {loading ? (
        <Loader />
      ) : (
        <section
          className="flex justify-center w-full md:px-20 px-3"
          aria-label="Product Listings"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products &&
              products.map((product) => (
                <article
                  key={product._id}
                  className="w-full max-w-md gap-5 mt-10 bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
                  data-aos="fade-up"
                >
                  <Link to={`/product/${product._id}`}>
                    <figure className="overflow-hidden">
                      <img
                        src={product.image || p2_img}
                        alt={product.name}
                        className="h-72 w-full object-cover transition transform ease-in-out duration-700 hover:scale-110"
                        loading="lazy"
                      />
                    </figure>

                    <div className="px-2 my-5 space-y-2">
                      <header className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <ReactStars
                          count={5}
                          size={20}
                          value={product.rating}
                          char="★"
                          color="#e5e7eb"
                          activeColor="#facc15"
                          onChange={ratingChanged}
                          edit={false}
                        />
                      </header>

                      <p className="text-gray-700 text-start text-sm">
                        {product.description}
                      </p>

                      <footer className="flex gap-5 items-center">
                        <span className="text-gray-700 font-semibold">
                          ${product.price}
                        </span>
                        <span className="line-through text-gray-400">
                          ${product.oldPrice || product.price}
                        </span>
                      </footer>
                    </div>
                  </Link>
                </article>
              ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Products;
