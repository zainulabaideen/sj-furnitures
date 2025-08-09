// src/actions/cartActions.js
import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, quantity) => async(dispatch , getState) =>  {
  const {data} = await axios.get(`/api/product/${id}`);
  dispatch({
    type : ADD_TO_CART,
    payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        images: data.product.images[0].url,
        stock: data.product.stock,
        quantity,

    }  
  });

  localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => {
    return {
        type: REMOVE_FROM_CART,
        payload: id,
    };
};