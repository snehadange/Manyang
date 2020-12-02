

import { fetching_productInfo_failure,fetching_productInfo_success,fetching_productInfo_request} from '../actions/types';


const initialState={
    isFetching:false,
    errorMessage:'',
    productInfo:[],
 
}

const productInfoReducer=(state =initialState,action)=>{
    
    switch(action.type){
        case fetching_productInfo_request:
            return{...state,isFetching:true}
        case fetching_productInfo_failure:
            return {...state,isFetching:false,errorMessage:action.payload}  
        case fetching_productInfo_success:
            return{...state,isFetching:false,productInfot:action.payload}  
   
        default:
            return state         
    }
}

export default productInfoReducer;