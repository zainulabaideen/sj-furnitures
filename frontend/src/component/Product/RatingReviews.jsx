 import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { IoTrashBin } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";

axios.defaults.withCredentials = true;

const RatingReviews = ({ product }) => {
  const currentUserId = useSelector((s) => s.user?.id);

  const [reviews, setReviews] = useState(product?.reviews || []);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const productId = product._id;

  const submitReview = async () => {
    if (!rating || !text.trim()) return;

    setLoading(true);
    try {
      const { data } = await axios.post("/api/reviews", {
        productId,
        rating,
        text,
      });

      // Update local review state after successful post
      setReviews(data.reviews || []);
      setText("");
      setRating(0);
    } catch (err) {
      console.error("Submit review error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const { data } = await axios.delete("/api/reviews", {
        params: { id: reviewId, productId },
      });

      // Update reviews after delete
      setReviews(data.reviews || []);
    } catch (err) {
      console.error("Delete review error:", err);
    }
  };

  return (
    <div className="space-y-10 mt-10">
      {/* ── Write Review ── */}
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
          onClick={submitReview}
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Submit Review"}
        </button>
      </div>

      {/* ── List Reviews ── */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-5">
          Customer Reviews ({reviews.length})
        </h3>

        {reviews.length === 0 && (
          <p className="text-gray-600">No reviews yet.</p>
        )}

        {reviews.map((rev) => (
          <div key={rev._id || rev.user} className="border-b py-4 flex gap-3">
            <div className="flex-1">
              <ReactStars
                count={5}
                value={rev.reviews || rev.rating}
                edit={false}
                isHalf={true}
                size={20}
                activeColor="#facc15"
              />
              <p className="text-gray-700 mt-2">{rev.comment || rev.text}</p>
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










// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ReactStars from "react-rating-stars-component";
// import { IoTrashBin } from "react-icons/io5";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// axios.defaults.withCredentials = true; // send auth cookies for every request

// const RatingReviews = ({review}) => {
//   const { id: productId } = useParams();

//   // current logged‑in user (adapt selector to your auth slice)
//   const currentUserId = useSelector((s) => s.user?.id);

//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(0);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);

//   /* ── fetch on mount / refresh ───────────────── */
//   useEffect(() => {
//     fetchReviews();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [productId]);

//   const fetchReviews = async () => {
//     try {
//       const { data } = await axios.get(`/api/reviews`, {
//         params: { productId },
//       });
//       setReviews(data.reviews || []);
//     } catch (err) {
//       console.error("Fetch reviews error:", err);
//     }
//   };

//   /* ── submit review ──────────────────────────── */
//   const submitReview = async () => {
//     if (!rating || !text.trim()) return;

//     setLoading(true);
//     try {
//       await axios.post("/api/reviews", { productId, rating, text });
//       setText("");
//       setRating(0);
//       fetchReviews();
//     } catch (err) {
//       console.error("Submit review error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ── delete review ──────────────────────────── */
//   const deleteReview = async (reviewId) => {
//     try {
//       await axios.delete("/api/reviews", {
//         params: { id: reviewId, productId },
//       });
//       setReviews((prev) => prev.filter((r) => r._id !== reviewId));
//     } catch (err) {
//       console.error("Delete review error:", err);
//     }
//   };

//   return (
//     <div className="space-y-10 mt-10">
//       {/* ── Write Review ── */}
//       <div className="space-y-4">
//         <h3 className="text-xl font-semibold text-gray-800">Write a Review</h3>
//         <ReactStars
//           count={5}
//           value={rating}
//           onChange={setRating}
//           isHalf={true}
//           size={30}
//           activeColor="#facc15"
//         />

//         <textarea
//           rows={4}
//           placeholder="Share your thoughts about the product…"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="w-full border border-gray-300 rounded p-2"
//         />

//         <button
//           onClick={submitReview}
//           disabled={loading}
//           className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 disabled:opacity-60"
//         >
//           {loading ? "Submitting…" : "Submit Review"}
//         </button>
//       </div>

//       {/* ── List Reviews ── */}
//       <div>
//         <h3 className="text-xl font-semibold text-gray-800 mb-5">
//           Customer Reviews ({reviews.length})
//         </h3>

//         {reviews.length === 0 && (
//           <p className="text-gray-600">No reviews yet.</p>
//         )}

//         {reviews.map((rev) => (
//           <div key={rev._id} className="border-b py-4 flex gap-3">
//             <div className="flex-1">
//               <ReactStars
//                 count={5}
//                 value={rev.rating}
//                 edit={false}
//                 isHalf={true}
//                 size={20}
//                 activeColor="#facc15"
//               />
//               <p className="text-gray-700 mt-2">{rev.text}</p>
//               <p className="text-sm text-gray-400 mt-1">— {rev.userName}</p>
//             </div>

//             {/* Delete button only for author */}
//             {rev.userId === currentUserId && (
//               <button onClick={() => deleteReview(rev._id)}>
//                 <IoTrashBin className="w-5 h-5 text-red-500 hover:text-red-700" />
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RatingReviews;
