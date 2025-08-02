import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import RelatedProducts from "./RelatedProducts";
import ProductDetails from "./ProductDetails";
import RatingReviews from "./RatingReviews";
import ReactStars from "react-rating-stars-component";
import { addToCart } from "../../actions/cartAction";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import img from "../../assets/p1_img.jpg"; // fallback image
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DisplayProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  const { product, loading, error } = useSelector((state) => state.productDetails);

  useEffect(() => {
     if (error) {
          toast.error(error); // ✅ show error toast
          dispatch(clearErrors())
        }
    dispatch(getProductDetails(id));
  }, [dispatch, id , error]);

  const inc = () => setQuantity((q) => q + 1);
  const dec = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    dispatch(addToCart(product._id, quantity));
  };

  if (loading) return <div className="p-10 text-xl">Loading product...</div>;
  if (error) return <div className="p-10 text-xl text-red-600">Error: {error}</div>;
  if (!product || !product._id) return <div className="p-10 text-xl text-red-600">Product not found.</div>;

  return (
    <div className="mt-20 pt-10 md:px-20 px-3">
      <div className="flex md:flex-row flex-col md:items-start items-center justify-between h-auto md:h-[60vh] space-y-5">
        {/* Image section */}
        <div className="basis-[43%]">
          <div className="overflow-hidden rounded-lg w-full max-w-lg">
            <img
              src={product.image || img}
              alt={product.name}
              className="w-full h-[50vh] object-cover rounded-lg transition transform ease-in-out duration-700 hover:scale-110"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="basis-[48%] space-y-5">
          <div className="flex gap-10 items-center">
            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
            <ReactStars
              count={5}
              size={24}
              value={product.ratings}
              edit={false}
              char="★"
              color="#e5e7eb"
              activeColor="#facc15"
            />
          </div>

          <p className="text-gray-800 font-semibold">PKR {product.price.toLocaleString()}</p>
          <p>{product.description}</p>

          <div className="my-7 flex items-center gap-10">
            <div className="flex gap-5 border-[1px] py-2 rounded-md px-5">
              <button onClick={dec}>-</button>
              <p>{quantity}</p>
              <button onClick={inc}>+</button>
            </div>

            <button
              onClick={handleAddToCart}
              className="text-white bg-primary hover:opacity-90 px-5 py-2 rounded-lg"
            >
              Add to cart
            </button>
          </div>

          <p className="text-sm text-gray-500">Stock: {product.stock > 0 ? product.stock : "Out of stock"}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
        </div>
      </div>

      {/* Tabs: Details & Reviews */}
      <div>
        <div className="flex w-full items-center justify-center gap-4 mt-10 border-b">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-2 font-semibold w-1/2 md:w-[30%] ${activeTab === "details" ? "border-b-2 border-secondary text-secondary" : ""
              }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 font-semibold w-1/2 md:w-[30%] ${activeTab === "reviews" ? "border-b-2 border-secondary text-secondary" : "text-gray-500"
              }`}
          >
            Rating & Reviews
          </button>
        </div>

        <div className="mt-6">
          {activeTab === "details" ? (
            <ProductDetails product={product} />
          ) : (
            <RatingReviews product={product} />
          )}
        </div>

      </div>

      {/* Related Products */}
      <div className="mt-16">
        <RelatedProducts category={product.category} currentProductId={product._id} />
      </div>
    </div>
  );
};

export default DisplayProduct;
