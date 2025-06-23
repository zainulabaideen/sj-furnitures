import axios from "axios";
import { All_PRODUCT_REQUEST,
    All_PRODUCT_SUCCESS ,
     All_PRODUCT_FAIL,
    CLEAR_ERRORS} from "../constants/productConstants"


    export const getProduct = () => async(dispatch)=>{
        try {
            
     dispatch({type:All_PRODUCT_REQUEST});
     const {data} = await axios.get("/api/products");
     dispatch({
        type:All_PRODUCT_SUCCESS,
        payload:data,
     })

        } catch (error) {
            dispatch({
                type: All_PRODUCT_FAIL,
                payload: error.response.date.message
            })
        }
    }
 
    // clearing errors 
        export const clearErrors = () => async(dispatch)=>{
            dispatch({type: CLEAR_ERRORS})
        }