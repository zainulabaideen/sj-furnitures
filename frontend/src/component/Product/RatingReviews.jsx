import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { IoTrashBin } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { newReview } from "../../actions/productAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

axios.defaults.withCredentials = true;

const RatingReviews = ({ product }) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector((s) => s.user?.id);
  const {
    loading,
    success,
    reviews: newReviews,
    error,
  } = useSelector((s) => s.newReview || {});

  const [reviews, setReviews] = useState(Array.isArray(product?.reviews) ? product.reviews : []);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const productId = product?._id;

  // When new review is successfully added
  useEffect(() => {
    if (success && Array.isArray(newReviews)) {
      setReviews(newReviews);
      toast.success("Review added successfully!");
      setRating(0);
      setText("");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    if (error) {
      toast.error(error);
    }
  }, [success, newReviews, error, dispatch]);

  // Fetch latest reviews from server
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews`, {
        params: { productId },
      });
      setReviews(Array.isArray(data?.reviews) ? data.reviews : []);
    } catch (err) {
      console.error("Fetch reviews error:", err);
      setReviews([]); // prevent undefined
    }
  };

  const submitReviewHandler = () => {
    if (!rating || !text.trim()) {
      toast.error("Please add a rating and comment.");
      return;
    }
    dispatch(newReview({ rating, comment: text, productId }));
  };

  const deleteReview = async (reviewId) => {
    try {
      const { data } = await axios.delete("/api/reviews", {
        params: { id: reviewId, productId },
      });
      setReviews(Array.isArray(data?.reviews) ? data.reviews : []);
    } catch (err) {
      console.error("Delete review error:", err);
    }
  };

  return (
    <div className="space-y-10 mt-10">
      {/* Write Review */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Write a Review</h3>
        <ReactStars
          count={5}
          value={rating}
          onChange={setRating}
          isHalf={true}
          size={30}
          activeColor="#facc15"
        />
        <textarea
          rows={4}
          placeholder="Share your thoughts about the product…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        />
        <button
          onClick={submitReviewHandler}
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Submit Review"}
        </button>
      </div>

      {/* List Reviews */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-5">
          Customer Reviews ({reviews?.length})
        </h3>

        {reviews?.length === 0 && (
          <p className="text-gray-600">No reviews yet.</p>
        )}

        {Array.isArray(reviews) &&
          reviews.map((rev) => (
            <div key={rev._id || rev.user} className="border-b py-4 flex gap-3">
              <div className="flex-1">
                <ReactStars
                  count={5}
                  value={rev.rating}
                  edit={false}
                  isHalf={true}
                  size={20}
                  activeColor="#facc15"
                />
                <p className="text-gray-700 mt-2">{rev.comment}</p>
                <p className="text-sm text-gray-400 mt-1">— {rev.name}</p>
              </div>

              {rev.user === currentUserId && (
                <button onClick={() => deleteReview(rev._id)}>
                  <IoTrashBin className="w-5 h-5 text-red-500 hover:text-red-700" />
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RatingReviews;
