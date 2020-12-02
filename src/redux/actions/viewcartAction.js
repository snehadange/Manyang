import { fetching_viewcart_success, fetching_viewcart_request, fetching_viewcart_failure, fetching_quantity_sucess } from '../actions/types';
import { viewCart } from '../../Services/services'


export const fetchingViewCartRequest = () => ({ type: fetching_viewcart_request });


export const fetchingViewCartSuccess = (json) => ({
  type: fetching_viewcart_success,
  payload: json
})



export const fetchingViewCartFailure = (error) => ({
  type: fetching_viewcart_failure,
  payload: error
})

export const fetchViewCart = (uid) => {
  return async (dispatch) => {
    dispatch(fetchingViewCartRequest());
    try {
      viewCart(uid).then((viewcartData) => {
        console.log("*******************", viewcartData)
        dispatch(fetchingViewCartSuccess(viewcartData))

      })
    } catch (error) {
      dispatch(fetchingViewCartFailure(error))
    }
  }
}

