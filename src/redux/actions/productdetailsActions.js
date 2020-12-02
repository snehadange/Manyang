import { productDetails, productlistDetails } from '../../Services/services'

import {fetching_productdetails_failure,
  fetching_productdetails_request,fetching_productdetails_sucsess} from '../actions/types'


  export const fetchingProductDetailsRequest=()=>({type:fetching_productdetails_request});

  export const fetchingProductDetailsSuccess=(json)=>({
    type:fetching_productdetails_sucsess,
    payload:json
  })

  export const fetchingProductDetailsFailure=(error)=>({
      type:fetching_productdetails_failure,
      payload:error
    })

    export const fetchProductDetails=(pid,uid)=>{
        return async dispatch=>{
            dispatch(fetchingProductDetailsRequest());
            try{
                productDetails(pid,uid).then((productDetailsData)=>{
                      // console.log(";;;;;;;;;;;;;;;;;;;;;;",productDetailsData.Product_details)
                       dispatch(fetchingProductDetailsSuccess(productDetailsData.Product_details))
               
                })
            }catch(error){
                dispatch(fetchingProductDetailsFailure(error))
            }
        }
    }