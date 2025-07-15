import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../../component/layout/loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

import p1_img from "../../assets/p1_img.jpg";
import p2_img from "../../assets/p2_img.jpg";
import p3_img from "../../assets/p3_img.jpg";
import p4_img from "../../assets/p4_img.jpg";

const Products = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error); // ✅ show error toast
    }
    dispatch(getProduct());
  }, [dispatch, error]);

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
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-primaryTextClr">
            {products &&
              products.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <div className="w-full max-w-md gap-5 mt-10 bg-gray-50 rounded-xl overflow-hidden">
                    <div>
                      <img
                        src={p2_img} // Replace with product.image if available
                        alt={product.name}
                        className="h-72 w-full transition transform ease-in-out duration-700 hover:scale-110"
                      />
                    </div>
                    <div className="px-2 my-5 space-y-2">
                      <div className="flex items-center justify-between">
                        <p>{product.name}</p>
                        <ReactStars
                          count={5}
                          size={24}
                          value={product.rating}
                          char="★"
                          color="#e5e7eb"
                          activeColor="#facc15"
                          onChange={ratingChanged}
                        />
                      </div>
                      <p className="text-lg text-gray-700 text-start font-semibold">
                        {product.description}
                      </p>
                      <div className="flex gap-5">
                        <div className="text-gray-700 font-semibold">
                          ${product.price}
                        </div>
                        <div className="line-through">${product.price}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
