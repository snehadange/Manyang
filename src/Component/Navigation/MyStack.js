import React, { useEffect } from 'react';


import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-community/async-storage';

import LaunchScreen from '../../Screens/Container/LaunchScreen';
import GetStartSwiper from '../../Screens/Container/GetStartSwiper';
import MyTab from './MyTab';
import ProductList from '../../Screens/Product/ProductList';
import ProductDetail from '../../Screens/Product/ProductDetail';
import ProductInformation from '../../Screens/Product/ProductInformation';
import Login from '../../Screens/Auth/Login';
import Register from '../../Screens/Auth/Register';
import ForgetPassword from '../../Screens/Auth/ForgetPassword';
import MyAccount from '../../Screens/Auth/MyAccount';
import EditAccount from '../../Screens/Auth/EditAccount';
import AddressBook from '../../Screens/Auth/AddressBook';
import Checkout from '../../Screens/Cart/Checkout';
import Filter from '../../Screens/Filter';
import NetworkConnect from '../../Screens/connection/NetworkConnect';




const Stack = createStackNavigator()






const MyStack = () => {
  /*  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null)


    useEffect(() => {
        launchFirst()
    }, [])

    const launchFirst = async () => {


        const initialRoute = await AsyncStorage.getItem('initialkey')
        if (initialRoute === null) {
            setIsFirstLaunch(true)
        } else {
            setIsFirstLaunch(false)
        }
    }

       if (isFirstLaunch == null) {
     return null
      } else if (isFirstLaunch === true) {*/
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
          
            <Stack.Screen name="LaunchScreen" component={LaunchScreen} />
            <Stack.Screen name="GetStartSwiper" component={GetStartSwiper} />
            <Stack.Screen name="NetworkConnect" component={NetworkConnect} />
            <Stack.Screen name="Home" component={MyTab} />
            <Stack.Screen name="ProductList" component={ProductList} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="MyAccount" component={MyAccount} />
            <Stack.Screen name="EditAccount" component={EditAccount} />
            <Stack.Screen name="AddressBook" component={AddressBook} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Filter" component={Filter} />
            <Stack.Screen name="ProductInformation" component={ProductInformation} />
        </Stack.Navigator>
    );
} /*else {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="LaunchScreen" component={LaunchScreen} options={{
                    header:null
                }}/>

                <Stack.Screen name="Home" component={MyTab} />
                <Stack.Screen name="NetworkConnect" component={NetworkConnect} />

                <Stack.Screen name="ProductList" component={ProductList} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                <Stack.Screen name="MyAccount" component={MyAccount} />
                <Stack.Screen name="EditAccount" component={EditAccount} />
                <Stack.Screen name="AddressBook" component={AddressBook} />
                <Stack.Screen name="Checkout" component={Checkout} />
                <Stack.Screen name="Filter" component={Filter} />
            </Stack.Navigator>
        )
    }


}*/

export default MyStack;






