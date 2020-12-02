import {countCart} from '../../Services/services'

import {fetching_countcart_success,fetching_countcart_failure,fetching_countcart_request} from '../actions/types'


  export const fetchingCountCartRequest=()=>({type:fetching_countcart_request});

  export const fetchingCountCartSuccess=(json)=>({
    type:fetching_countcart_success,
    payload:json
  })

  export const fetchingCountCartFailure=(error)=>({
      type:fetching_countcart_failure,
      payload:error
    })

    export const fetchCountCart=(cid)=>{
        return async (dispatch)=>{
            dispatch(fetchingCountCartRequest());
            try{
                countCart(cid).then((countData)=>{
                   
                       dispatch(fetchingCountCartSuccess(countData.Data))
                
                })
            }catch(error){
                dispatch(fetchingCountCartFailure(error))
            }
        }
    }

 