import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button } from 'react-native';

import {fetchCountCart} from '../redux/actions/countcartAction';
import { fetchViewCart } from '../../src/redux/actions/viewcartAction';
import { connect } from 'react-redux';

import { Badge } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';


const QuantityBadge = (props) => {
 
  const isFocused=useIsFocused();

  useEffect(() => {

    viewProduct()

  },[isFocused])

  const viewProduct=()=>{
  //  props.countCart()
     
  }

  return (
    <Badge style={{ backgroundColor: 'orange' }}>{ props.count}</Badge>
    
 )
}


const mapStateToProps = (state) => {
  
  return {
    quantity: state.quantityReducer,
    cartdata: state.viewcartReducer,
    itemcount:state.countCartReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    viewCart: (uid) => dispatch(fetchViewCart(uid)),
    countCart:(uid)=>dispatch(fetchCountCart(uid))
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(QuantityBadge);

 //export default QuantityBadge; 