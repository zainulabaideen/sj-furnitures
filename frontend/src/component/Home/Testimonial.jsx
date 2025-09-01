import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { BiSolidQuoteAltLeft } from "react-icons/bi";

const testimonials = [
  {
    id: 1,
    name: "Leslie Alexander",
    title: "Architect",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    review:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
  },
  {
    id: 2,
    name: "Jenny Wilson",
    title: "Interior Designer",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    review:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
  },
  {
    id: 3,
    name: "Cody Fisher",
    title: "Developer",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    review:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
  },
  {
    id: 4,
    name: "Eleanor Pena",
    title: "UI/UX Designer",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    review:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
  },
  {
    id: 5,
    name: "Bessie Cooper",
    title: "Product Manager",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    review:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
  },
  {
    id: 6,
    name: "Wade Warren",
    title: "System Analyst",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    review:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
  },
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(
    window.innerWidth < 1024 ? 1 : 2
  );

  // update slides on resize
  useEffect(() => {
    const handleResize = () =>
      setVisibleSlides(window.innerWidth < 1024 ? 1 : 2);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(testimonials.length / visibleSlides);

  const handleSlide = (index) => setCurrentIndex(index);

  const getCurrentCards = () => {
    const start = currentIndex * visibleSlides;
    return testimonials.slice(start, start + visibleSlides);
  };

  return (
    <section
      aria-labelledby="testimonial-heading"
      data-aos="fade-up"
      className="w-full overflow-hidden md:px-20 px-3 mt-10"
    >
      <div className="w-full md:py-16 py-12 px-3 md:px-8 bg-gray-50  text-center rounded-3xl">


        {/* Section Header */}
        <header>
          <p className="text-sm text-gray-500 uppercase">
            <span className="text-secondary"> — </span>Testimonial
          </p>
          <h2
            id="testimonial-heading"
            className="text-3xl font-semibold text-secondary mt-2 mb-10"
          >
            What <span className="text-primary">Our Clients Say</span>
          </h2>
        </header>

        {/* Testimonials List */}
        <ul
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-center items-start"
          role="list"
        >
          {getCurrentCards().map((item) => (
            <li
              key={item.id}
              data-aos="zoom-out"
              className="bg-white p-6 rounded-xl shadow-md overflow-hidden text-left relative"
            >
              <article>
                <header className="flex items-center mb-4">
                  <img
                    src={item.image}
                    alt={`Photo of ${item.name}`}
                    className="w-16 h-16 rounded-full border-4 border-primary object-cover"
                  />
                  <div className="flex flex-col gap-1 ml-5">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <div
                      className="flex items-center text-yellow-400 mb-2"
                      aria-label={`Rating: ${item.rating} out of 5`}
                    >
                      {Array.from({ length: item.rating }).map((_, idx) => (
                        <FaStar key={idx} />
                      ))}
                      <span className="text-black text-sm ml-2">
                        {item.rating}.0
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto bg-gray-50 h-10 w-10 flex items-center justify-center rounded-full text-primary text-xl">
                    <BiSolidQuoteAltLeft className="w-6 h-6" aria-hidden="true" />
                  </div>
                </header>

                <blockquote className="text-gray-600 text-sm leading-relaxed">
                  <p>{item.review}</p>
                </blockquote>
              </article>
            </li>
          ))}
        </ul>

        {/* Pagination Dots */}
        <nav
          aria-label="Testimonials pagination"
          className="flex justify-center mt-8 space-x-2"
        >
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleSlide(i)}
              aria-current={currentIndex === i ? "true" : "false"}
              aria-label={`Go to testimonials page ${i + 1}`}
              className={`md:w-3 md:h-3 w-2 h-2 rounded-full transition-colors duration-300 ease-in-out ${currentIndex === i ? "bg-primary" : "bg-gray-400"
                }`}
            ></button>
          ))}
        </nav>


      </div>
    </section>
  );
}
