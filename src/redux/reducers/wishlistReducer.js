

import { fetching_wishlist_failure,fetching_wishlist_success,fetching_wishlist_request} from '../actions/types';


const initialState={
    isFetching:false,
    errorMessage:'',
    wishList:[],
   
}

const wishlistReducer=(state =initialState,action)=>{
    
    switch(action.type){
        case fetching_wishlist_request:
            return{...state,isFetching:true}
        case fetching_wishlist_failure:
            return {...state,isFetching:false,errorMessage:action.payload}  
        case fetching_wishlist_success:
            return{...state,isFetching:false,wishList:action.payload}  
   
        default:
            return state         
    }
}

export default wishlistReducer;