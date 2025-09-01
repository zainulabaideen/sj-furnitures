import React from "react";

const promos = [
  {
    image: "https://images.pexels.com/photos/7680179/pexels-photo-7680179.jpeg",
    title: "Modern Furniture",
    subtitle: "Save on what's hot right now",
  },
  {
    image: "https://images.pexels.com/photos/33559217/pexels-photo-33559217.jpeg",
    title: "Featured Deals",
    subtitle: "NEW COLLECTION · UP TO 50% OFF",
  },
  {
    image: "https://images.pexels.com/photos/7535042/pexels-photo-7535042.jpeg",
    title: "Designer Room Sets Lexington",
    subtitle: "85% Discount",
  },
];

export default function PromoBannerGrid() {
  return (
    <div className="w-full my-10 px-4 md:px-20 overflow-x-hidden">
      <div
        className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 
                   gap-4 md:gap-6 h-auto md:h-[600px] w-full"
      >
        {/* Top Left */}
        <div
          data-aos="fade-right"
          className="relative group overflow-hidden rounded-xl shadow-lg 
                     h-[220px] sm:h-[260px] md:h-full w-full"
        >
          <img
            src={promos[0].image}
            alt={promos[0].title}
            className="w-full h-full object-cover 
                       transform group-hover:scale-110 transition-all duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white drop-shadow-md">
            <div className="text-lg md:text-2xl font-bold">{promos[0].title}</div>
            <div className="text-xs md:text-sm">{promos[0].subtitle}</div>
          </div>
        </div>

        {/* Right Large (Always full height) */}
        <div
          data-aos="fade-up"
          className="relative md:row-span-2 group overflow-hidden rounded-xl shadow-lg 
                     h-[220px] sm:h-[260px] md:h-full w-full"
        >
          <img
            src={promos[2].image}
            alt={promos[2].title}
            className="w-full h-full object-cover 
                       transform group-hover:scale-110 transition-all duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          <div className="absolute top-6 left-6 text-white drop-shadow-lg">
            <div className="text-xl md:text-3xl font-extrabold tracking-wide">
              {promos[2].title}
            </div>
            <p className="text-sm md:text-lg font-light">{promos[2].subtitle}</p>
          </div>
        </div>

        {/* Bottom Left */}
        <div
          data-aos="fade-left"
          className="relative group overflow-hidden rounded-xl shadow-lg 
                     h-[220px] sm:h-[260px] md:h-full w-full"
        >
          <img
            src={promos[1].image}
            alt={promos[1].title}
            className="w-full h-full object-cover 
                       transform group-hover:scale-110 transition-all duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white drop-shadow-md">
            <div className="uppercase text-xs tracking-widest font-semibold text-primary-200">
              NEW COLLECTION
            </div>
            <div className="text-lg md:text-2xl font-bold">{promos[1].title}</div>
            <div className="text-xs md:text-sm">
              {promos[1].subtitle.split("·")[1]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
