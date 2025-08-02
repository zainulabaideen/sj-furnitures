import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { productReducer, productDetailsReducer } from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  products: productReducer,         // for all products
  productDetails: productDetailsReducer, // for single product
  cart: cartReducer,
  user: userReducer,
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
