const { NativeViewGestureHandler } = require("react-native-gesture-handler")




const quantityReducer=(state=0,action)=>{
 
   
    switch(action.type){
        case 'ADD_QUANTITY':
            return state+1;
            
        case 'MINUS_QUANTITY':
            if(state <= 0){
                  return 0;
            }else{
                 return state-1;
            }
           
          
    }
    return state
}

export default quantityReducer;