import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, FlatList, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../Component/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'



import { connect } from 'react-redux'
import { fetchViewCart } from '../../redux/actions/viewcartAction';
import { fetchCountCart } from '../../redux/actions/countcartAction';

import AsyncStorage from '@react-native-community/async-storage';
import CartList from '../../Component/CartList';
import { useIsFocused } from '@react-navigation/native'


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1



const Cart = (props) => {
    const isFocused = useIsFocused();
    const [showid, setid] = React.useState(false)

    useEffect(() => {

        viewProduct()
        console.log("Count of items",props.itemcount.countItem)
    }, [isFocused])

    const viewProduct = async () => {
        const userid = await AsyncStorage.getItem('userid')

        console.log("userid in Cart", userid)

        
        /* if(props.itemcount.countItem == '0')
         {
             setid(false)
         }else if(props.itemcount.countItem == '1'){
             setid(true)
             await props.viewCart(userid)
             await props.countCart(userid)
         }*/

        if (userid == null) {
            setid(false)

        }
        else {
            setid(true)
            await props.viewCart(userid)
            await props.countCart(userid)

        }




    }


   

    return (
        <View style={styles.container}>
            <Header type="Cart" count={props.itemcount.countItem} />

            {
                showid == false || props.itemcount.countItem == '0' ?

                    <View style={{   backgroundColor: '#EFECF4',justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Text style={{fontWeight:'bold',fontSize:20}}>Cart is Empty</Text>
                    </View> :
                    <View style={{ flex: 1 }}>
                        {props.cartdata.isFetching ?
                            <View style={{ flex: 7, justifyContent: 'center' }}>
                                <ActivityIndicator size={20} color='black' />
                            </View>

                            : <View style={{ flex: 1 }}>
                                <CartList
                                    data={props.cartdata.viewCart.Data} />

                            </View>
                        }

                        {props.itemcount.countItem == '0'? null :<View style={{ margin: 10 }}>
                            <TouchableOpacity style={{ backgroundColor: '#0A3873', width: WIDTH / 1.06, borderRadius: 10, height: HEIGHT / 20,  justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => props.navigation.navigate('Checkout')}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Proceed to Checkout</Text>
                            </TouchableOpacity>
                        </View>}

                    </View>

            }

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
        quantity: state.quantityReducer,
        cartdata: state.viewcartReducer,
        itemcount: state.countCartReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        viewCart: (uid) => dispatch(fetchViewCart(uid)),
        addQuantity: () => dispatch({ type: 'ADD_QUANTITY' }),
        minusQuantity: () => dispatch({ type: 'MINUS_QUANTITY' }),
        countCart: (uid) => dispatch(fetchCountCart(uid)),
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);