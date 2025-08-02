import React, { Fragment , useEffect , useState} from "react";
import Products from "./Products";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";




const MainProduct = () => {
  const [currentPage , setCurrentPage] = useState(1)
  const { loading, error, products, productsCount , resultPerPage } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
 setCurrentPage(e)
  }
    
 


  const buttonsCategoryData = [
    { title: "All Products", link: "#" },
    { title: "Latest Products", link: "#" },
    { title: "Best Sellers", link: "#" },
    { title: "Featured Products", link: "#" },
  ];
  console.log("productsCount:", productsCount);
console.log("resultPerPage:", resultPerPage);


  return (

 <div className=" pt-10 text-center space-y-10 text-gray-800">
      <h2 className="text-xl md:text-2xl font-semibold">Our Products</h2>
      <h1 className="text-3xl md:text-5xl font-semibold">
        Our <span className="text-secondaryTextClr">Products Collections</span>
      </h1>

      {/* Flex container for buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {buttonsCategoryData.map((item, index) => (
          <button
            className="px-8 py-2 font-semibold border border-inherit rounded-full hover:bg-secondaryBgClr hover:text-white"
          >
            {item.title}
          </button>
        ))}
      </div>

   <Products  currentPage={currentPage}/>

    {resultPerPage < productsCount && (
       <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
         </div>
    )}
    </div>
 
  );
};

export default MainProduct;
