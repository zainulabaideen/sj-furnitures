import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import RelatedProducts from "./RelatedProducts";
import ProductDetails from "./ProductDetails";
import RatingReviews from "./RatingReviews";
import ReactStars from "react-rating-stars-component";
import { addToCart } from "../../actions/cartAction";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import img from "../../assets/p1_img.jpg"; // fallback image
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DisplayProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [mainImage, setMainImage] = useState(img);

  const detailsRef = useRef(null);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);

  // update main image when product changes
  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0].url || img);
    } else {
      setMainImage(img);
    }
  }, [product]);

  const inc = () => {
    if (product.stock <= quantity) return;
    setQuantity((q) => q + 1);
  };

  const dec = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    dispatch(addToCart(id, quantity));
    toast.success("Item Added To Cart");
  };

  const handleReadMore = () => {
    setActiveTab("details"); // switch to Details tab
    detailsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <div className="p-10 text-xl">Loading product...</div>;
  if (error) return <div className="p-10 text-xl text-red-600">Error: {error}</div>;
  if (!product?._id)
    return <div className="p-10 text-xl text-red-600">Product not found.</div>;

  return (
    <main className="mt-20 pt-10 md:px-20 px-3">
       <div className="space-y-12">
      <article className="flex md:flex-row relative flex-col md:items-start items-center justify-between space-y-5">
        {/* Product Image Gallery */}
        <figure
          data-aos="fade-right"
          className="basis-[43%] flex gap-4 items-center justify-center"
        >
          {/* Thumbnail List */}
          {product?.images?.length > 1 && (
            <div className="flex flex-col gap-3 w-20 overflow-y-auto">
              {product.images.map((image, idx) => (
                <img
                  key={image._id || idx}
                  src={image.url || img}
                  alt={`${product.name} ${idx + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border transition-all duration-300 hover:scale-105 ${
                    mainImage === image.url
                      ? "border-yellow-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url || img)}
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {/* Main Image */}
          <div className="overflow-hidden md:h-[60vh] h-[40vh] rounded-2xl w-full max-w-lg shadow-lg">
            <img
              src={mainImage}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover rounded-2xl transition transform ease-in-out duration-700 hover:scale-110"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = img;
              }}
            />
          </div>
        </figure>

        {/* Product Info */}
        <section
          data-aos="fade-left"
          className="basis-[48%] space-y-6  bg-white rounded-2xl p-6 shadow-md"
        >
          <header className="flex gap-10 items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <ReactStars
              count={5}
              size={24}
              value={product.ratings}
              edit={false}
              char="★"
              color="#e5e7eb"
              activeColor="#fbbf24"
            />
          </header>

          <p className="text-2xl font-bold text-gray-800 text-primary">
            PKR {product.price.toLocaleString()}
          </p>

          {/* Short Description ONLY */}
          <p className="text-gray-700 leading-relaxed text-sm">
            {product.description?.slice(0, 120)}...
          </p>
          {product.description?.length > 120 && (
            <button
              onClick={handleReadMore}
              className="text-yellow-600 text-sm hover:underline font-medium"
            >
              Read More
            </button>
          )}

          {/* Quantity + Add to Cart */}
          <div className="my-7 flex items-center gap-10">
            <div className="flex gap-5 border-[1px] py-2 rounded-lg px-5 shadow-sm">
              <button
                aria-label="Decrease quantity"
                onClick={dec}
                className="px-2 text-lg hover:text-yellow-600"
              >
                -
              </button>
              <p className="font-semibold">{quantity}</p>
              <button
                aria-label="Increase quantity"
                onClick={inc}
                className="px-2 text-lg hover:text-yellow-600"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl shadow-md transition"
            >
              Add to Cart
            </button>
          </div>

          {/* Extra Info */}
          <p className="text-sm text-gray-500">
            Stock: {product.stock > 0 ? product.stock : "Out of stock"}
          </p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-sm text-gray-500">Shipping: {product.shipping}</p>
        </section>
      </article>

      {/* Tabs Section */}
      <nav
        data-aos="fade-up"
         className="flex w-full items-center justify-center gap-4 mt-12 border-b clear-both"
    aria-label="Product details and reviews"
      >
        <button
          onClick={() => setActiveTab("details")}
          className={`px-4 py-2 font-semibold w-1/2 md:w-[30%] ${
            activeTab === "details"
              ? "border-b-2 border-yellow-500 text-yellow-600"
              : "text-gray-500"
          }`}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 font-semibold w-1/2 md:w-[30%] ${
            activeTab === "reviews"
              ? "border-b-2 border-yellow-500 text-yellow-600"
              : "text-gray-500"
          }`}
        >
          Rating & Reviews
        </button>
      </nav>
</div>
      {/* Tab Content */}
      <section data-aos="fade-up" className="mt-6" ref={detailsRef}>
        {activeTab === "details" ? (
          <ProductDetails product={product} />
        ) : (
          <RatingReviews product={product} />
        )}
      </section>

      {/* Related Products */}
      <aside
        data-aos="fade-up"
        className="mt-16"
        aria-label="Related products"
      >
        <RelatedProducts
          category={product.category}
          currentProductId={product._id}
        />
      </aside>
    </main>
  );
};

export default DisplayProduct;
