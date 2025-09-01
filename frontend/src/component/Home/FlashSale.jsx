import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import productData from "../../assets/productData";

const calculateTimeLeft = (endDate) => {
  const difference = +new Date(endDate) - +new Date();
  let timeLeft = {
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  };

  if (difference > 0) {
    timeLeft = {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  }

  return timeLeft;
};

const FlashSale = () => {
  const saleProducts = productData.filter(
    (product) => product.onSale && product.saleEnd
  );

  const [timers, setTimers] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      saleProducts.forEach((product) => {
        newTimers[product.id] = calculateTimeLeft(product.saleEnd);
      });
      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [saleProducts]);

  return (
    <section
      aria-labelledby="flash-sale-heading"
      className="md:px-20 px-3 flex justify-center items-center lg:h-[80vh]"
    >
      <div className="flex md:flex-row flex-col py-10 gap-10 w-full h-full">
        
        {/* Left Side: Offer Details */}
        {saleProducts[0] && (
          <div
            data-aos="fade-right"
            className="md:w-1/2 w-full flex flex-col justify-center items-center p-6 bg-gray-50 rounded-2xl"
          >
            <h2
              id="flash-sale-heading"
              className="text-2xl font-semibold text-gray-800 mb-2"
            >
              Flash <span className="text-secondary">Sale!</span>
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Get <span className="text-secondary">25% off</span> - Limited Time Offer!
            </p>

            {/* Countdown */}
            <div
              className="flex items-start space-x-6 mb-6"
              aria-label={`Sale ends in ${timers[saleProducts[0].id]?.days} days, ${timers[saleProducts[0].id]?.hours} hours, ${timers[saleProducts[0].id]?.minutes} minutes, and ${timers[saleProducts[0].id]?.seconds} seconds`}
            >
              {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => {
                const value =
                  timers[saleProducts[0].id]?.[label.toLowerCase()] || "00";
                return (
                  <React.Fragment key={label}>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-gray-800">{value}</span>
                      <span className="text-xs text-gray-500 mt-1">{label}</span>
                    </div>
                    {index < 3 && (
                      <span className="text-2xl font-bold text-gray-800">:</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* CTA Button */}
            <Link
              to={`/product/${saleProducts[0].id}`}
              aria-label={`Shop now for ${saleProducts[0].name}`}
            >
              <button className="flex items-center justify-center gap-2 bg-primary hover:bg-opacity-95 text-white px-6 py-2 rounded-full font-semibold transition">
                Shop Now
                <FaArrowRight />
              </button>
            </Link>
          </div>
        )}

        {/* Right Side: Images */}
        <div
          data-aos="fade-left"
          className="flex justify-center items-center md:w-1/2 w-full"
        >
          <div className="flex flex-row gap-4 h-full w-full  overflow-hidden">
            {saleProducts.slice(0, 1).map((product) => (
              <img
                key={product.id}
                src={product.image}
                alt={`${product.name} - Flash sale item`}
                className="rounded-md object-cover md:h-full h-1/2 w-full"
                style={{ objectPosition: "center" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
