import { All_PRODUCT_REQUEST,
    All_PRODUCT_SUCCESS ,
     All_PRODUCT_FAIL,
    CLEAR_ERRORS,
   PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
     NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
   PRODUCT_DETAILS_FAIL
  } from "../constants/productConstants"


  export  const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case All_PRODUCT_REQUEST:
      return {
        loading: true,
        products: []
      };

    case All_PRODUCT_SUCCESS:
      return { 
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage:action.payload.resultPerPage,
      };

    case All_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};




//  export const productDetailsReducer = (state = { product: {} }, action) => {
//   switch (action.type) {
//     case  PRODUCT_DETAILS_REQUEST:
//       return {
//         loading: true,
//         ...state,
//       };

//     case  PRODUCT_DETAILS_SUCCESS:
//       return {
//         loading: false,
//         products: action.payload,

//       };

//     case PRODUCT_DETAILS_FAIL:
//       return {
//         loading: false,
//         error: action.payload
//       };

//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null
//       };

//     default:
//       return state;
//   }
// };

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload, // ✅ fixed here
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


// export const newReviewReducer = (state = {}, action) => {
//   switch (action.type) {
//     case NEW_REVIEW_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case NEW_REVIEW_SUCCESS:
//       return {
//         loading: false,
//         success: action.payload,
//       };
//     case NEW_REVIEW_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     case NEW_REVIEW_RESET:
//       return {
//         ...state,
//         success: false,
//       };
//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };
export const newReviewReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
        reviews: action.payload, // now an array
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

