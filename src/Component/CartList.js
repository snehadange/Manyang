import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, FlatList, Image, ImagePickerIOS } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../Component/Header';


import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1

const imgbaseurl = "https://demo.suprjewels.app/consumerapp_api/file/products/"

const CartList = (props) => {
    const [quantity,setquantity]=React.useState(null)
   

  
 
    return (
        <View style={styles.container}>
            <FlatList

                showsHorizontalScrollIndicator={false}
                data={props.data}
                renderItem={({ item, index }) => {
                  
                    return (


                        <View style={{ backgroundColor: 'white', elevation: 5, margin: 10, flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'space-around' }}>
                            <TouchableOpacity>
                                <Image source={{ uri:"https://manyangjewellers.com/api/file/"+item.product_img}} style={{ width: 100, height: 100 }} />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                <View style={{ height: HEIGHT / 17 }}>
                                    <Text style={{ color: '#808080', fontFamily: 'Poppins-Bold' }}>{item.name}</Text>
                                </View>
                                <View style={{ backgroundColor: '#D3D3D3', width: WIDTH / 3, borderRadius: 10, height: HEIGHT / 20, padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                   {/* <TouchableOpacity >
                                        <FontAwesome5 name="plus" size={20} />
                                   </TouchableOpacity>*/}
                                    <Text>{item.qnt} Quantity</Text>

                                   {/* <TouchableOpacity>
                                        <FontAwesome5 name="minus" size={20} />
                                   </TouchableOpacity>*/}
                                </View>

                            </View>
                            <View>
                                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Roboto-Medium' }}>₹{item.price}</Text>
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
const mapStateToProps = state => {
   console.log("quantity in cartlist",state.quantityReducer)
    return {
        quantity: state.quantityReducer,
       
    }
}

const mapDispatchToProps = dispatch => {
    return {
       
        addQuantity: () => dispatch({ type: 'ADD_QUANTITY' }),
        minusQuantity: () => dispatch({ type: 'MINUS_QUANTITY' }),

    }

}


export default connect(mapStateToProps, mapDispatchToProps)(CartList);

