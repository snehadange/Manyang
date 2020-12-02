
import { fetching_productInfo_failure,fetching_productInfo_success,fetching_productInfo_request} from '../actions/types';
import { productDescription } from '../../Services/services'


export const fetchingproductInfoRequest = () => ({ type: fetching_productInfo_request});


export const fetchingproductInfoSuccess = (json) => ({
  type: fetching_productInfo_success,
  payload: json
})



export const fetchingproductInfoFailure = (error) => ({
  type:fetching_productInfo_failure,
  payload: error
})

export const fetchproductInfo = (pid) => {
  return async (dispatch) => {
    dispatch(fetchingproductInfoRequest());
    try {
      productDescription(pid).then((productDescriptionData) => {
        console.log("product infoaction",productDescriptionData)
        dispatch(fetchingproductInfoSuccess(productDescriptionData))

      })
    } catch (error) {
      dispatch(fetchingproductInfoFailure(error))
    }
  }
}

