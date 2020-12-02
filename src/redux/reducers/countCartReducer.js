


import {fetching_countcart_success,fetching_countcart_failure,fetching_countcart_request} from '../actions/types'


const initialState={
    isFetching:false,
    errorMessage:'',
    countItem:[]
}

const countCartReducer=(state =initialState,action)=>{
    
  
    switch(action.type){
        case fetching_countcart_request:
            return{...state,isFetching:true}
        case fetching_countcart_failure:
            return {...state,isFetching:false,errorMessage:action.payload}  
        case fetching_countcart_success:
            return{...state,isFetching:false,countItem:action.payload}  
        default:
            return state         
    }
    
} 

export default countCartReducer;