

import {fetching_viewcart_success,fetching_viewcart_request,fetching_viewcart_failure,fetching_quantity_sucess} from '../actions/types';


const initialState={
    isFetching:false,
    errorMessage:'',
    viewCart:[],
   // quantity:''
}

const productlistReducer=(state =initialState,action)=>{
     
    switch(action.type){
        case fetching_viewcart_request:
            return{...state,isFetching:true}
        case fetching_viewcart_failure:
            return {...state,isFetching:false,errorMessage:action.payload}  
        case fetching_viewcart_success:
            return{...state,isFetching:false,viewCart:action.payload}  
   
        default:
            return state         
    }
}

export default productlistReducer;