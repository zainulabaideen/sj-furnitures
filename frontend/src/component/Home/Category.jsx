import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import AOS from "aos";
import "aos/dist/aos.css";

// Import local images
import img1 from "../../assets/p1_img.jpg";
import img2 from "../../assets/p2_img.jpg";
import img3 from "../../assets/p3_img.jpg";
import img4 from "../../assets/p4_img.jpg";
import img5 from "../../assets/p4_img.jpg";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Array of local images
  const categoryImages = [img1, img2, img3, img4, img5];

  // Init AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/categories");
        const formattedCategories = Array.isArray(data.categories)
          ? data.categories.map((cat, index) => ({
              name: cat,
              image: categoryImages[index % categoryImages.length],
            }))
          : [];
        setCategories(formattedCategories);
      } catch (error) {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="w-full md:px-20 px-4 z-0 flex flex-col items-center mb-20"
    >
      {/* Section Heading */}
      <div className="text-center pb-10 pt-5">
        <p className="text-gray-400 text-sm tracking-widest uppercase">
          <span className="text-secondary">—</span> Find Your Favourite
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold md:font-extrabold text-primary">
          Shop By{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-600">
            Categories
          </span>
        </h2>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/category/${cat.name}`)}
              data-aos={idx % 2 === 0 ? "fade-left" : "fade-right"} // 👈 alternating animation
              className="relative group h-48 md:h-60 rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                draggable="false"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300";
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition duration-500"></div>

              {/* Category Name */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-white">
                <h3 className="text-lg md:text-xl font-bold drop-shadow-lg tracking-wide group-hover:text-secondary transition">
                  {cat.name}
                </h3>
                <div className="w-12 h-1 bg-secondary mt-2 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No categories found.</p>
      )}
    </div>
  );
}
