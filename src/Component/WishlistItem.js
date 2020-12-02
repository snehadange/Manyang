import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, FlatList, Image, ImagePickerIOS } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from './Header';


import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import Wishlist from '../Screens/Wishlist';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1



const WishlistItem = (props) => {
  




    return (
        <View style={styles.container}>
            <FlatList

                showsHorizontalScrollIndicator={false}
                data={props.data}
                renderItem={({ item, index }) => {
                    
                    return (
                        <View style={{ backgroundColor: 'white', elevation: 5, margin: 10, flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'space-around' }}>
                            <View>
                                <Image source={{ uri: "https://manyangjewellers.com/api/file/" + item.product_img }} style={{ width: 80, height: 100 }} />
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                <View style={{ height: HEIGHT / 17, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: '#808080', fontFamily: 'Poppins-Bold' }}>{item.name}</Text>
                                </View>
                                <View>
                                    <TouchableOpacity style={{ backgroundColor: '#0A3873', width: WIDTH / 2, borderRadius: 10, height: HEIGHT / 20, padding: 10, justifyContent: 'center', alignItems: 'center' }} onPress={(id,name,qnt,price)=>props.handleWishlist(item.pid,item.name,item.qnt,item.price)}>
                                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Add To Cart</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View>
                                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Roboto-Medium' }}>{item.price}₹</Text>
                            </View>
                        </View>

                    );
                }}
                keyExtractor={(item, index) => {
                    return index.toString();
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFECF4'
    },

})



export default WishlistItem;

