import React, { useEffect } from 'react';

import { View, Text, ActivityIndicator } from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QuantityBadge from '../QuantityBadge';

import Home from '../../Screens/Home';
import Cart from '../../Screens/Cart/Cart';
import Filter from '../../Screens/Filter';
import Wishlist from '../../Screens/Wishlist';
import User from '../../Screens/User';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchCountCart } from '../../redux/actions/countcartAction';

const Tab = createBottomTabNavigator()
const AuthStack = createStackNavigator();


const MyTab = (props) => {
    useEffect(()=>{
        showData()
      
    },[])

    const showData=async()=>{
        const userid = await AsyncStorage.getItem('userid')
    
        props.countCart(userid)
    }
  return (
        <Tab.Navigator tabBarOptions={{
            labelStyle: { fontSize: 12 },
            tabStyle: { width: 120 },
            style: { backgroundColor: 'white' },
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
            showLabel: true,
            showIcon: true
        }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ color }) => (

                    <FontAwesome5 name="home" size={20} color={color} />
                )
            }} />
            <Tab.Screen name="Cart" component={Cart} options={{
                tabBarIcon: ({ color }) => (
                    <View>
                        <FontAwesome5 name="shopping-cart" size={25} color={color} />
                        <View style={{ position: 'absolute' }}>
                           <QuantityBadge count={props.itemcount.countItem}/>
                       
                        </View>
                    </View>
                )
            }} />
          {/* <Tab.Screen name="Filter" component={Filter} options={{
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="filter" size={25} color={color} />
                )
            }} />*/}
            <Tab.Screen name="Wishlist" component={Wishlist} options={{
                tabBarIcon: ({ color, focused }) => (

                    <AntDesign name={focused ? "heart" : "hearto"} size={25} color={color} />
                )
            }} />
            <Tab.Screen name="User" component={User} options={{
                tabBarIcon: ({ color }) => (
                    <AntDesign name="user" size={25} color={color} />
                )
            }} />
        </Tab.Navigator>
    )
    
}

const mapStateToProps = state => {
   
    return {
       
        itemcount: state.countCartReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
        countCart: (uid) => dispatch(fetchCountCart(uid)),
    }

}

export default  connect(mapStateToProps, mapDispatchToProps)(MyTab);