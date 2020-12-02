import { productlistDetails } from '../../Services/services'

import {fetching_productlist_sucsess,fetching_productlist_request,fetching_productlist_failure} from '../actions/types'


  export const fetchingProductlistRequest=()=>({type:fetching_productlist_request});

  export const fetchingProductlistSuccess=(json)=>({
    type:fetching_productlist_sucsess,
    payload:json
  })

  export const fetchingProductlistFailure=(error)=>({
      type:fetching_productlist_failure,
      payload:error
    })

    export const fetchProductlist=(cid)=>{
        return async (dispatch)=>{
            dispatch(fetchingProductlistRequest());
            try{
                productlistDetails(cid).then((categoryData)=>{
                        
                       dispatch(fetchingProductlistSuccess(categoryData))
                
                })
            }catch(error){
                dispatch(fetchingProductlistFailure(error))
            }
        }
    }

 