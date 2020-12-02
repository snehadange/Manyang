import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, TouchableHighlight, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Badge } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { fetchCountCart } from '../redux/actions/countcartAction'

import { connect } from 'react-redux'

import Entypo from 'react-native-vector-icons/Entypo';

import QuantityBadge from './QuantityBadge';
import AsyncStorage from '@react-native-community/async-storage';

import { useHeaderHeight } from '@react-navigation/stack';
//const headerHeight = useHeaderHeight();

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1

const Header = (props) => {
  const [index, setIndex] = React.useState(0)
  const headerHeight = useHeaderHeight()
  //useEffect(()=>{
  // props.type === "Home"?console.log("count of item",props.count):null
  // })


  return (
    <View style={{flex:0.15,backgroundColor:'white'}}>
      {props.type === "Home" ?
        <View style={{ flex: 0.93, marginTop: HEIGHT / 45, flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', justifyContent: 'space-between'}}>
          <TouchableOpacity>
            <Ionicons name="menu" size={30} color="white" />
          </TouchableOpacity>
          <View >
            <Image source={require('../../assets/manyangLogo.png')} style={{ width: WIDTH / 3.5, height: HEIGHT / 10 ,marginTop:10}} />
          </View>
          <View style={{ position: 'relative' ,marginTop:10}}>

            <TouchableOpacity onPress={() => (props.handleCart())} >

              <Ionicons name="cart" size={35} color="black" />

            </TouchableOpacity>
            <View style={{ position: 'absolute' }}>
              <QuantityBadge count={props.count} />
            </View>
          </View>
        </View> : null}

      {props.type === "ProductList" ?
        <View style={{ flex: 1, marginTop: HEIGHT / 18, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={props.goBack()}>
            <Ionicons name="chevron-back" size={30} color="black" />
          </TouchableOpacity>

          <Text style={{ textTransform: 'uppercase', fontSize: 16, fontFamily: 'Poppins-SemiBold' }}>{props.productType}</Text>
          <View style={{ position: 'relative' }}>
            <TouchableOpacity onPress={() => (props.handleCart())}>
              <Ionicons name="cart" size={35} color="black" />
            </TouchableOpacity>
            <View style={{ position: 'absolute' }}>
              <QuantityBadge count={props.count} />
            </View>
          </View>
        </View> : null}

      {
        props.type === "Me" ?
          <View style={{ flex: 0.8, marginTop: HEIGHT / 18, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => props.handleBack()}>
              <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>

            <Text style={{ textTransform: 'uppercase', fontSize: 16, fontFamily: 'Poppins-SemiBold' }}>{props.type}</Text>
            <View style={{ position: 'relative' }}>
              <TouchableOpacity onPress={() => (props.handleCart())}>
                <Ionicons name="cart" size={35} color="black" />
              </TouchableOpacity>
              <View style={{ position: 'absolute' }}>
                <QuantityBadge count={props.count} />
              </View>
            </View>
          </View>
          : null

      }

      {
        props.type === "MyAccount" ?
          <View style={{ flex: 0.8, marginTop: HEIGHT / 18, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => props.handleBack()}>
              <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>

            <Text style={{ textTransform: 'uppercase', fontSize: 16, fontFamily: 'Poppins-SemiBold' }}>{props.type}</Text>
            <View style={{ position: 'relative' }}>
              <TouchableOpacity >
                <Ionicons name="cart" size={35} color="black" />
              </TouchableOpacity>
              <View style={{ position: 'absolute' }}>
                <QuantityBadge />
              </View>
            </View>
          </View>
          : null
      }



      {
        props.type === "Cart" ?
          <View style={{ flex:0.8, marginTop: HEIGHT / 35, justifyContent: 'center', marginHorizontal: 10, alignItems: 'center', flexDirection: 'column' }}>


            <Text style={{ textTransform: 'uppercase', fontSize: 16, fontFamily: 'Poppins-SemiBold' }}>{props.type}</Text>
            <Text style={{ textTransform: 'uppercase', fontSize: 12 }}>{props.count} items</Text>

          </View>
          : null
      }

      {
        props.type === "wishlist" ?
          <View style={{ flex: 0.8, marginTop: HEIGHT / 35, justifyContent: 'center', marginHorizontal: 10, alignItems: 'center', flexDirection: 'column' }}>


            <Text style={{ textTransform: 'uppercase', fontSize: 16, fontFamily: 'Poppins-SemiBold' }}>{props.type}</Text>
            {/*<Text style={{ textTransform: 'uppercase', fontSize: 12 }}>{props.count} items</Text>*/}

          </View>
          : null
      }

{
        props.type === "Filter" ?
          <View style={{ flex: 0.8, marginTop: HEIGHT / 35, justifyContent: 'center', marginHorizontal: 10, alignItems: 'center', flexDirection: 'column' }}>


            <Text style={{ textTransform: 'uppercase', fontSize: 16, fontFamily: 'Poppins-SemiBold' }}>{props.type}</Text>
            {/*<Text style={{ textTransform: 'uppercase', fontSize: 12 }}>{props.count} items</Text>*/}

          </View>
          : null
      }




      {
        props.type === "Description" ?
          <View style={{ flex: 0.8, marginTop: HEIGHT / 18, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, alignItems: 'center', width: WIDTH / 1.6 }}>
            <TouchableHighlight onPress={() => props.close()} >
              <Entypo name="cross" size={20} />
            </TouchableHighlight>

            <Text style={{ textTransform: 'uppercase', fontSize: 16, fontFamily: 'Poppins-SemiBold' }}>{props.type}</Text>



          </View>
          : null
      }
      {
        props.type === "Checkout" ?
          <View style={{ flex: 0.8, marginTop: HEIGHT / 18, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, alignItems: 'center', width: WIDTH / 1.6 }}>
            <TouchableHighlight onPress={() => props.back()} >
              <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableHighlight>

            <Text style={{ textTransform: 'uppercase', fontSize: 16, fontFamily: 'Poppins-SemiBold' }}>{props.type}</Text>



          </View>
          : null
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
 //  height:headerHeight,
    backgroundColor: 'white',
   // elevation: 2,


  },

})
export default Header;
