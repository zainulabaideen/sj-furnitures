const express = require("express");
const { isAuthenticatedUser ,  authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrders , myOrders, getAllOrders, updateOrderStatus, deleteOrders } = require("../controller/orderController");

const router = express.Router();
  router.route("/order/new").post(isAuthenticatedUser, newOrder);
  router.route("/order/:id").get(isAuthenticatedUser ,getSingleOrders);
  router.route("/orders/me").get(isAuthenticatedUser , myOrders);
  router.route("/admin/orders").get(isAuthenticatedUser , authorizeRoles("admin"), getAllOrders);
  router.route("/admin/order/:id").put(isAuthenticatedUser , authorizeRoles("admin"), updateOrderStatus)
  .delete(isAuthenticatedUser , authorizeRoles("admin") ,deleteOrders);
  

module.exports = router;   