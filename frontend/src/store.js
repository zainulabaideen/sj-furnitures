import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  productReducer,
  adminProductsReducer,
  newProductReducer,
  productDetailsReducer,
  newReviewReducer,
  reviewReducer,
  productReviewsReducer,
} from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import {
  profileReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/userReducer";
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  product: productDetailsReducer,
  adminProducts: adminProductsReducer,
  cart: cartReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  newReview: newReviewReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  orderDetails: orderDetailsReducer,
  newProduct: newProductReducer,
  productDetails: productDetailsReducer,
  review: reviewReducer,
  productReviews: productReviewsReducer,
  userDetails: userDetailsReducer,
});

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  devTools: true, // enabled automatically in dev mode
});

export default store;
