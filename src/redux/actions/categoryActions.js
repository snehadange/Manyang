import { categoryDetails } from '../../Services/services'

import {fetching_category_failure,
  fetching_category_request,fetching_category_sucsess} from '../actions/types'


  export const fetchingCategoryRequest=()=>({type:fetching_category_request});

  export const fetchingCategorySuccess=(json)=>({
    type:fetching_category_sucsess,
    payload:json
  })

  export const fetchingCategoryFailure=(error)=>({
      type:fetching_category_failure,
      payload:error
    })

    export const fetchCategory=()=>{
        return async dispatch=>{
            dispatch(fetchingCategoryRequest());
            try{
                categoryDetails().then((categoryData)=>{
                       console.log("_______CAtegoryDAta in Action",categoryData)
                       dispatch(fetchingCategorySuccess(categoryData))
               
                })
            }catch(error){
                dispatch(fetchingCategoryFailure(error))
            }
        }
    }