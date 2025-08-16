import axios from "axios";
import { All_PRODUCT_REQUEST,
    All_PRODUCT_SUCCESS ,
     All_PRODUCT_FAIL,
       PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
   PRODUCT_DETAILS_FAIL,
     NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
   
    CLEAR_ERRORS} from "../constants/productConstants"
    


    export const getProduct = (keyword="" ,  currentPage = 1 ) => async(dispatch)=>{
        try {
            
     dispatch({type:All_PRODUCT_REQUEST});
     const {data} = await axios.get(`/api/products?keyword=${keyword}&page=${currentPage}`);
     dispatch({
        type:All_PRODUCT_SUCCESS,
        payload:data,
     })

        } catch (error) {
            dispatch({
                type: All_PRODUCT_FAIL,
                payload: error.response.data.message
            })
        } 
    }
 

      export const getProductDetails = (id) => async(dispatch)=>{
        try {
            
     dispatch({type:PRODUCT_DETAILS_REQUEST});
     const {data} = await axios.get(`/api/product/${id}`);
     dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload:data.product,
     })

        } catch (error) {
            dispatch({
                type:  PRODUCT_DETAILS_FAIL,
                payload: error.response.data.message
            })
        }
    }
// export const newReview = (reviewData) => async (dispatch) => {
//   try {
//     dispatch({ type: NEW_REVIEW_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.put(`/api/review`, reviewData, config);

//     dispatch({
//       type: NEW_REVIEW_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: NEW_REVIEW_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.reviews || [], // send updated reviews array
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

    // clearing errors 
        export const clearErrors = () => async(dispatch)=>{
            dispatch({type: CLEAR_ERRORS})
        }