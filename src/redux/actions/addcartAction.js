import {addtoCart } from '../../Services/services'

import {fetching_addcart_failure,
    fetching_addcart_request,fetching_addcart_sucsess} from '../actions/types'


  export const fetchingAddToCartRequest=()=>({type: fetching_addcart_request});

  export const fetchingAddToCartSuccess=(json)=>({
    type:fetching_addcart_sucsess,
    payload:json
  })

  export const fetchingAddToCartFailure=(error)=>({
      type:fetching_addcart_failure,
      payload:error
    })

    export const fetchAddToCart=(pid,pname,pqnt,pamt,uid)=>{
        return async dispatch=>{
            dispatch(fetchingAddToCartRequest());
            try{
                addtoCart(pid,pname,pqnt,pamt,uid).then((addcartData)=>{
                       
                       dispatch(fetchingAddToCartSuccess(addcartData))
               
                })
            }catch(error){
                dispatch(fetchingProductDetailsFailure(error))
            }
        }
    }