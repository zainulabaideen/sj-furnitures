// src/reducers/cartReducer.js
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

const initialState = {
    cartItems: {} // { [productId]: quantity }
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:

            const item = action.payload;
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    ),
                };

            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }

        case REMOVE_FROM_CART: {
            const id = action.payload;

            const updatedCartItems = state.cartItems
                .map(item =>
                    item.product === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0); // remove completely if qty = 0

            return {
                ...state,
                cartItems: updatedCartItems,
            };
        }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            }


        default:
            return state;
    }
};

export default cartReducer;