import React,{ useState } from "react";
import Products from "./Products";
import { useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import { Helmet } from "react-helmet";

const MainProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { productsCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const setCurrentPageNo = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Helmet>
        <title>SJ Furnitures | Our Products</title>
        <meta
          name="description"
          content="Check out our amazing products available in the store."
        />
      </Helmet>

      <main className="pt-10 text-center space-y-10 mt-20 text-gray-800">
        {/* Page Header */}
        <header>
          <h1
            data-aos="fade-up"
            className="text-3xl md:text-5xl font-semibold text-primary"
          >
            Our <span className="text-secondary">Products Collection</span>
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Browse our carefully curated collection of high-quality products.
          </p>
        </header>

        {/* Products Section */}
        <section aria-label="Product listings">
          <Products currentPage={currentPage} />
        </section>

        {/* Pagination */}
        {resultPerPage < productsCount && (
          <nav
            aria-label="Pagination navigation"
            className="flex justify-center mt-12"
          >
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="›"
              prevPageText="‹"
              firstPageText="«"
              lastPageText="»"
              itemClass="mx-1"
              linkClass="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-primary hover:text-white transition duration-200"
              activeClass="!bg-primary !text-white"
              activeLinkClass="!bg-primary !text-white"
            />
          </nav>
        )}
      </main>
    </>
  );
};

export default MainProduct;
 