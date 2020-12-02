

import {fetching_filter_failure,fetching_filter_request,fetching_filter_success} from '../actions/types'


const initialState={
    isFetching:false,
    errorMessage:'',
    filterdata:[]
}

const filterReducer=(state =initialState,action)=>{
    
    
    switch(action.type){
        case fetching_filter_request:
            return{...state,isFetching:true}
        case fetching_filter_failure:
            return {...state,isFetching:false,errorMessage:action.payload}  
        case fetching_filter_success:
            return{...state,isFetching:false,filterdata:action.payload}  
        default:
            return state         
    }
    
} 

export default filterReducer;