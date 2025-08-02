// src/reducers/cartReducer.js
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
} from "../constants/cartConstants";

const initialState = {
    cartItems: {} // { [productId]: quantity }
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            {
                const { id, quantity } = action.payload;
                return {
                    ...state,
                    cartItems: {
                        ...state.cartItems,
                        [id]: (state.cartItems[id] || 0) + quantity,
                    },
                };
            }

        case REMOVE_FROM_CART:
            {
                const id = action.payload;
                const updatedQty = (state.cartItems[id] || 0) - 1;

                const updatedCartItems = {...state.cartItems };
                if (updatedQty > 0) {
                    updatedCartItems[id] = updatedQty;
                } else {
                    delete updatedCartItems[id];
                }

                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            }

        default:
            return state;
    }
};

export default cartReducer;