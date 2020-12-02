import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, FlatList, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../Component/Header';

import { connect } from 'react-redux'
import WishlistItem from '../Component/WishlistItem'
import { fetchWishlist } from '../redux/actions/showWishlistAction'
import { fetchAddToCart } from '../redux/actions/addcartAction'

import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1

const WishList = (props) => {
    const isFocused = useIsFocused()
    const[showdata,setData]=React.useState(false)

    useEffect(() => {
        showWishList()
    }, [isFocused])

    const showWishList = async () => {
        const userid = await AsyncStorage.getItem('userid')
        props.showlist(userid)
        console.log("wishlist___________________", props.wishlist)
    }

    const addtocart = async (id, name, qnt, price) => {
     

        const userid = await AsyncStorage.getItem('userid')

        console.log("id of product", id, name, qnt, price, userid)

        props.fetchaddcart(id, name, qnt, price, userid)

       
            console.log("7777777777777bhfjsbfjsjfj",userid)
        


        if (props.addcart.cartData.Status == '1') {
            Alert.alert(
                //title
                'Hello',
                //body

                "Successfull item add to cart",
                [
                    {
                        text: 'ok', onPress: () => console.log("ADD TO CART IN WISHLIST")
                    },

                ],
                { cancelable: false },
                //clicking out side of alert will not cancel
            );
        }

    }

    return (
        <View style={styles.container}>
            <Header type="wishlist" />

              
                        {props.wishlist.isFetching ? <View style={{  justifyContent: 'center',alignItems:'center',marginTop:100 }}>
                                <ActivityIndicator size={20} color='black' />
                            </View>: <WishlistItem data={props.wishlist.wishList.Data} handleWishlist={(id,name,qnt,price)=>addtocart(id,name,qnt,price)}/>}
                       
                 

        </View>
    )
  

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

})

const mapStateToProps = state => {
    return {
        wishlist: state.wishlistReducer,
        addcart: state.addcartReducer,
    }
}

const mapDispatchToProps = dispatch => {
    return {

        showlist: (uid) => dispatch(fetchWishlist(uid)),
        fetchaddcart: (pid, pname, pqnt, pamt, uid) => dispatch(fetchAddToCart(pid, pname, pqnt, pamt, uid)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);