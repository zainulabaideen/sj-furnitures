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
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);

  const inc = () => {
    if (product.stock <= quantity) return;
    setQuantity((q) => q + 1);
  };

  const dec = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    dispatch(addToCart(id, quantity));
    toast.success("Item Added To Cart");
  };

  if (loading) return <div className="p-10 text-xl">Loading product...</div>;
  if (error) return <div className="p-10 text-xl text-red-600">Error: {error}</div>;
  if (!product || !product._id) return <div className="p-10 text-xl text-red-600">Product not found.</div>;

  return (
    <main className="mt-20 pt-10 md:px-20 px-3">
      <article className="flex md:flex-row flex-col md:items-start items-center justify-between h-auto md:h-[60vh] space-y-5">
        
        {/* Product Image */}
        <figure data-aos="fade-right" className="basis-[43%]">
          <div className="overflow-hidden rounded-lg w-full max-w-lg">
            <img
              src={product.image || img}
              alt={product.name}
              className="w-full h-[50vh] object-cover rounded-lg transition transform ease-in-out duration-700 hover:scale-110"
            />
          </div>
        </figure>

        {/* Product Info */}
        <section data-aos="fade-left" className="basis-[48%] space-y-5">
          <header className="flex gap-10 items-center">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <ReactStars
              count={5}
              size={24}
              value={product.ratings}
              edit={false}
              char="★"
              color="#e5e7eb"
              activeColor="#facc15"
            />
          </header>

          <p className="text-gray-800 font-semibold">PKR {product.price.toLocaleString()}</p>
          <p>{product.description}</p>

          <div className="my-7 flex items-center gap-10">
            <div className="flex gap-5 border-[1px] py-2 rounded-md px-5">
              <button aria-label="Decrease quantity" onClick={dec}>-</button>
              <p>{quantity}</p>
              <button aria-label="Increase quantity" onClick={inc}>+</button>
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
        </section>
      </article>

      {/* Tabs Section */}
      <nav data-aos="fade-up" className="flex w-full items-center justify-center gap-4 mt-10 border-b" aria-label="Product details and reviews">
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
      </nav>

      <section data-aos="fade-up" className="mt-6">
        {activeTab === "details" ? (
          <ProductDetails product={product} />
        ) : (
          <RatingReviews product={product} />
        )}
      </section>

      {/* Related Products */}
      <aside data-aos="fade-up" className="mt-16" aria-label="Related products">
        <RelatedProducts category={product.category} currentProductId={product._id} />
      </aside>

      <ToastContainer />
    </main>
  );
};

export default DisplayProduct;
