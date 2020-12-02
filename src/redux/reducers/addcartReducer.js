

import {fetching_addcart_failure,
    fetching_addcart_request,fetching_addcart_sucsess} from '../actions/types'


const initialState={
    isFetching:false,
    errorMessage:'',
    cartData:[]
}

const addcartReducer=(state =initialState,action)=>{
    
    
    switch(action.type){
        case fetching_addcart_request:
            return{...state,isFetching:true}
        case fetching_addcart_failure:
            return {...state,isFetching:false,errorMessage:action.payload}  
        case fetching_addcart_sucsess:
            return{...state,isFetching:false,cartData:action.payload}  
        default:
            return state         
    }
    
} 

export default addcartReducer;