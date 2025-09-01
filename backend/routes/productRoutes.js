const express = require("express");
const { isAuthenticatedUser ,  authorizeRoles } = require("../middleware/auth");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReviews, getAllCategories, getProductsByCategory, getRelatedProducts } = require("../controller/productController");
const { getAllUsers } = require("../controller/userController");
 

const router = express.Router();

  router.route("/products").get(   getAllProducts);
  router.route("/admin/product/new").post( isAuthenticatedUser, authorizeRoles("admin") ,createProduct);  
  router.route("/admin/product/:id").put( isAuthenticatedUser, authorizeRoles("admin") ,updateProduct)
  .delete( isAuthenticatedUser, authorizeRoles("admin") , deleteProduct).get(getProductDetails)

  router.route("/product/:id/related").get(getRelatedProducts); // ✅ NEW

   router.route("/product/:id").get(getProductDetails);
   router.route("/review").put(isAuthenticatedUser,createProductReview);
   router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReviews);

   router.route("/categories").get(getAllCategories);
   router.route("/products/category/:category").get(getProductsByCategory);

   


module.exports = router;