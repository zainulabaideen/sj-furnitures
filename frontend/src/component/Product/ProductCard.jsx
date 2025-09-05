import ReactStars from "react-rating-stars-component";
import { Link, useParams } from "react-router-dom";

const ProductCard = ({ products }) => {
  const { categoryName } = useParams(); // 🔹 category from URL like /category/:categoryName

  // 🔹 Filter products by category if categoryName is present
  const filtered = categoryName
    ? products.filter((p) => p.category === categoryName)
    : products;

  // 🔹 Helper for short description
  const getPreviewText = (text, maxLength = 100) => {
    if (!text) return "No description available.";
    return text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <section
      className=" md:px-20 px-3 flex flex-col justify-center w-full py-10"
      aria-label="Product cards"
    >
      {/* 🔹 Show Dynamic Category Title */}
      <h2 className="text-3xl font-semibold mb-10 text-center text-secondary capitalize">
        {categoryName ? `${categoryName} Collection` : "Browse Our Collection"}
      </h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 text-primaryTextClr items-stretch">
        {filtered?.length > 0 ? (
          filtered.map((item) => {
            const description = item.description || "";
            const maxLength = 100;
            const isLong = description?.length > maxLength;
            const previewText = getPreviewText(description, maxLength);

            return (
              <article
                key={item._id}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-lg flex flex-col h-full"
              >
                <Link
                  to={`/product/${item._id}`}
                  state={{ product: item }}
                  className="block h-full"
                >
                  {/* 🔹 Product Image */}
                  <figure className="overflow-hidden">
                    <img
                      src={
                        item?.images && item?.images?.length > 0
                          ? item?.images[0].url
                          : "/default-product-image.png"
                      }
                      alt={item.name}
                      className="h-72 w-full object-cover transition transform ease-in-out duration-700 hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/default-product-image.png";
                      }}
                    />
                  </figure>

                  <div className="p-4 space-y-2">
                    {/* 🔹 Title & Stars */}
                    <header className="flex items-center justify-between">
                      <h2 className="text-lg font-medium">{item?.name}</h2>
                      <ReactStars
                        count={5}
                        size={20}
                        value={item?.ratings || item?.ratingValue || 5}
                        edit={false}
                        char="★"
                        color="#e5e7eb"
                        activeColor="#facc15"
                      />
                    </header>

                    {/* 🔹 Short Description */}
                    <p className="text-start text-sm text-gray-600">
                      {previewText}
                    </p>

                    {/* 🔹 Read More link */}
                    {isLong && (
                      <Link
                        to={`/product/${item._id}`}
                        state={{ product: item }}
                        className="text-secondary text-sm hover:underline"
                      >
                        Read More
                      </Link>
                    )}

                    {/* 🔹 Price */}
                    <footer className="flex gap-4 items-center">
                      <span className="font-bold text-gray-600">
                        ${item?.price || item?.new_price}
                      </span>
                      {(item?.oldPrice || item?.old_price) && (
                        <span className="line-through text-gray-400">
                          ${item?.oldPrice || item?.old_price}
                        </span>
                      )}
                    </footer>
                  </div>
                </Link>
              </article>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No products found in this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductCard;
