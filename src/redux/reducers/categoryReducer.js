
import {fetching_category_failure,
    fetching_category_request,fetching_category_sucsess} from '../actions/types'


    const initialState={
        isFetching:false,
        errorMessage:'',
        category:[]
    }

    const categoryReducer=(state =initialState,action)=>{
       
        switch(action.type){
            case fetching_category_request:
                return{...state,isFetching:true}
            case fetching_category_failure:
                return {...state,isFetching:false,errorMessage:action.payload}  
            case fetching_category_sucsess:
                return{...state,isFetching:false,category:action.payload}  
            default:
                return state         
        }
    }

    export default categoryReducer;