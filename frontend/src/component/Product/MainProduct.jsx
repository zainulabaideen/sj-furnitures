import React, { useState } from "react";
import Products from "./Products";
import { useSelector } from "react-redux";
import Pagination from "react-js-pagination";

const MainProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, products, productsCount, resultPerPage } = useSelector((state) => state.products);

  const setCurrentPageNo = (page) => {
    setCurrentPage(page);
  };

  return (
    <main className="pt-10 text-center space-y-10 mt-20 text-gray-800">
      <header>
        <h1
          data-aos="fade-up"
          className="text-3xl md:text-5xl font-semibold text-primary"
        >
          Our <span className="text-secondary">Products Collections</span>
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
          className="paginationBox flex justify-center mt-8"
        >
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="First"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </nav>
      )}
    </main>
  );
};

export default MainProduct;
