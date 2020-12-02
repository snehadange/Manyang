import { fetching_wishlist_failure,fetching_wishlist_success,fetching_wishlist_request} from '../actions/types';
import { showWishList } from '../../Services/services'


export const fetchingWishListRequest = () => ({ type: fetching_wishlist_request});


export const fetchingWishListSuccess = (json) => ({
  type: fetching_wishlist_success,
  payload: json
})



export const fetchingWishListFailure = (error) => ({
  type:fetching_wishlist_failure,
  payload: error
})

export const fetchWishlist = (uid) => {
  return async (dispatch) => {
    dispatch(fetchingWishListRequest());
    try {
      showWishList(uid).then((wishlistData) => {
        
        dispatch(fetchingWishListSuccess(wishlistData))

      })
    } catch (error) {
      dispatch(fetchingWishListFailure(error))
    }
  }
}

