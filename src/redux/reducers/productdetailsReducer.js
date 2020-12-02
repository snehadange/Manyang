

import {fetching_productdetails_failure,
    fetching_productdetails_request,fetching_productdetails_sucsess} from '../actions/types'


const initialState={
    isFetching:false,
    errorMessage:'',
    productdetails:[]
}

const productdetailsReducer=(state =initialState,action)=>{
    
  
    switch(action.type){
        case fetching_productdetails_request:
            return{...state,isFetching:true}
        case fetching_productdetails_failure:
            return {...state,isFetching:false,errorMessage:action.payload}  
        case fetching_productdetails_sucsess:
            return{...state,isFetching:false,productdetails:action.payload}  
        default:
            return state         
    }
    
} 

export default productdetailsReducer;