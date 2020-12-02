import {fetchFilterData} from '../../Services/services'

import {fetching_filter_failure,fetching_filter_request,fetching_filter_success} from '../actions/types'


  export const fetchingFilterRequest=()=>({type: fetching_filter_request});

  export const fetchingFilterSuccess=(json)=>({
    type:fetching_filter_success,
    payload:json
  })

  export const fetchingFilterFailure=(error)=>({
      type:fetching_filter_failure,
      payload:error
    })

    export const fetchFilter=(cid,type,weight,purity,metaltype,discount,size)=>{
        return async dispatch=>{
            dispatch(fetchingFilterRequest());
            try{
                fetchFilterData(cid,type,weight,purity,metaltype,discount,size).then((filterDataResponse)=>{
                       console.log("filter response in action --------",filterDataResponse)
                       dispatch(fetchingFilterSuccess(filterDataResponse))
               
                })
            }catch(error){
                dispatch(fetchingFilterFailure(error))
            }
        }
    }