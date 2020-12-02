import React  from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'


import categoryReducer from './src/redux/reducers/categoryReducer';
import productlistReducer from './src/redux/reducers/productlistReducer';
import productdetailsReducer from './src/redux/reducers/productdetailsReducer';
import addcartReducer from './src/redux/reducers/addcartReducer';
import quantityReducer from './src/redux/reducers/qauntityReducer';
import viewcartReducer from './src/redux/reducers/viewcartReducer';
import countCartReducer from './src/redux/reducers/countCartReducer';
import wishlistReducer from './src/redux/reducers/wishlistReducer';
import productInfoReducer from './src/redux/reducers/productInfoReducer';
import filterReducer from './src/redux/reducers/filterReducer'


import MyStack from './src/Component/Navigation/MyStack';



const createStoreMiddleware = applyMiddleware(thunk)(createStore)

const rootReducer = combineReducers({
    categoryReducer,
    productlistReducer,
    productdetailsReducer,
    addcartReducer,
    quantityReducer,
    viewcartReducer,
    countCartReducer,
    wishlistReducer,
    productInfoReducer,
    filterReducer
})

const store = createStoreMiddleware(rootReducer)



console.log("get Store value", store.getState())




export default function App() {

    return (
        <Provider store={store}>
            <NavigationContainer>
                <MyStack />
            </NavigationContainer>
        </Provider>



    );

}
