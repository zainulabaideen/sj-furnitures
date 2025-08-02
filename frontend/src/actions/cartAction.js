// src/actions/cartActions.js
import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

export const addToCart = (id, quantity) => {
    return {
        type: ADD_TO_CART,
        payload: { id, quantity },
    };
};

export const removeFromCart = (id) => {
    return {
        type: REMOVE_FROM_CART,
        payload: id,
    };
};