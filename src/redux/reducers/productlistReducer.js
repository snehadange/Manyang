

import {fetching_productlist_sucsess,fetching_productlist_request,fetching_productlist_failure} from '../actions/types'


    const initialState={
        isFetching:false,
        errorMessage:'',
        productlist:[]
    }

    const productlistReducer=(state =initialState,action)=>{
    
        switch(action.type){
            case fetching_productlist_request:
                return{...state,isFetching:true}
            case fetching_productlist_failure:
                return {...state,isFetching:false,errorMessage:action.payload}  
            case fetching_productlist_sucsess:
                return{...state,isFetching:false,productlist:action.payload}  
            default:
                return state         
        }
    }

    export default productlistReducer;