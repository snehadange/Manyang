import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, FlatList, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../Component/Header';
import { Imagepath } from '../../index';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { fetchProductlist } from '../../redux/actions/productlistActions'
import { fetchCountCart } from '../../redux/actions/countcartAction'

import { connect } from 'react-redux'

import StarRating from '../../Component/Rating/StarRating';
import QuantityBadge from '../../Component/QuantityBadge';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { fetchFilter } from '../../redux/actions/filterAction';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1



const numColumns = 2

const ProductList = (props) => {
    const Focused = useIsFocused()
    const [ListType, setList] = React.useState('Grid')


    const ratingObj = {
        ratings: 0,
        views: 0
    }

    useEffect(() => {
        // setindicator(true)
        const product_id = props.route.params.productId
        props.fetch(product_id)
        console.log("data of productlist",  props.filterdata.filterdata.Product_details)
        if (props.route.params.radiodata !== undefined) {
            console.log("___________fetching Data", props.filterdata.filterdata.Product_details)
        }

        fetchcount()

    }, [Focused])

    const fetchcount = async () => {
        const userid = await AsyncStorage.getItem('userid')
        props.countCart(userid)
    }

    const goToBack = () => {
        props.navigation.navigate('Home')
    }

    const setLike = (index) => {

        const newLike = [...ListData]

        if (newLike[index].like == false) {
            newLike[index].like = true
            setData(newLike)
        } else {
            newLike[index].like = false
            setData(newLike)
        }
    }

    return (
        <View style={styles.container}>

            <Header type="ProductList" goBack={() => goToBack} productType={props.route.params.productType} handleCart={() => props.navigation.navigate('Cart')} count={props.itemcount.countItem} />
            <View style={{ flex: 1 }}>
                {props.randomProduct.isFetching || props.filterdata.isFetching?


                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: HEIGHT / 10 }}>
                        <ActivityIndicator size="small" color='black' />
                    </View> :
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', height: HEIGHT / 15, alignItems: 'center', marginHorizontal: 10, justifyContent: 'space-between' }}>
                            <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('Filter')}>
                                    <Image source={Imagepath.refineIcon} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: '700', marginLeft: 5 }}>Refine</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => setList('Grid')}>
                                    <Ionicons name="grid-outline" size={20} color={ListType === 'Grid'?'#C0C0C0':'black'}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => setList('Solid')}>
                                    <Ionicons name="square-outline" size={20} color={ListType === 'Solid'?'#C0C0C0':'black'}/>
                                </TouchableOpacity>

                            </View>


                        </View>




                        <View style={{ flex: 1 }}>

                            {ListType === 'Grid' ?

                                <FlatList
                                    data={props.route.params.radiodata !== undefined ? props.filterdata.filterdata.Product_details : props.randomProduct.productlist.Product_details}
                                  // data={Product_details}
                                   renderItem={({ item, index }) => {
                                        console.log("grid in productlist",item.product_img)
                                        return (
                                            <View style={{ backgroundColor: 'white', margin: 10 }}>
                                                <View>
                                                    <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetail', {
                                                        pid: item.pid,
                                                        imageUrl: item.product_img,
                                                        title: item.product_name,
                                                        price: item.product_amt,
                                                        purity:item.metal_purity,
                                                        weight:item.weight
                                                    })}>
                                                        <Image
                                                        //source={item.product_img}
                                                        source={{ uri: props.randomProduct.productlist.baseUrlLink + item.product_img }}
                                                        style={{ width: WIDTH / 2 - 20, height: HEIGHT / 2.5 }} />
                                                    </TouchableOpacity>

                                                    <View style={{ position: 'absolute', height: HEIGHT / 2.5, justifyContent: 'space-between', marginLeft: '83%' }}>

                                                        <View >
                                                            {/*Like*/}
                                                        </View>
                                                        <View >
                                                            {/*<TouchableOpacity >
                                                                <FontAwesome name="plus-square" size={30} color="black" key={index} />
                                                            </TouchableOpacity>*/}

                                                        </View>

                                                    </View>

                                                </View>

                                                <View style={{ width: WIDTH / 2 - 20 }}>
                                                    <Text style={{ color: '#808080', fontFamily: 'Poppins-Bold' }}>{item.product_name}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular' }}>{item.metal_purity} |</Text>
                                                    <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular' }}> {item.weight} </Text>
                                                </View>

                                                <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium' }}>₹{item.product_amt}</Text>
                                                <View >
                                                    <StarRating key={index} ratingObj={ratingObj} />
                                                </View>
                                            </View>
                                        )
                                    }}
                                    keyExtractor={(item, index) => {
                                        return index.toString();
                                    }}
                                    numColumns={numColumns}
                                /> : null}



                            {ListType === 'Solid' ?
                                <FlatList
                                    data={props.route.params.radiodata !== undefined ? props.filterdata.filterdata.Product_details : props.randomProduct.productlist.Product_details}
                                    renderItem={({ item, index }) => {

                                        return (
                                            <View style={{ backgroundColor: '#fff', margin: 7 }}>

                                                <View>
                                                    <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetail', {
                                                      pid: item.pid,
                                                      imageUrl: item.product_img,
                                                      title: item.product_name,
                                                      price: item.product_amt,
                                                      purity:item.metal_purity,
                                                      weight:item.weight
                                                    })}>
                                                        <Image source={{ uri: props.randomProduct.productlist.baseUrlLink + item.product_img }} style={{ width: WIDTH / 1 - 14, height: HEIGHT / 2.5 }} />
                                                    </TouchableOpacity>

                                                    <View style={{ position: 'absolute', marginLeft: 370 }}>

                                                        {item.like == false ? <TouchableOpacity onPress={() => setLike(index)}>
                                                            <Ionicons name="heart" size={25} color="#808080" />
                                                        </TouchableOpacity> : null}
                                                        {item.like == true ? <TouchableOpacity onPress={() => setLike(index)}>
                                                            <Ionicons name="heart" size={25} color="red" />
                                                        </TouchableOpacity> : null}

                                                        <View style={{ marginTop: HEIGHT / 2.8 }}>
                                                           {/* <TouchableOpacity >
                                                                <FontAwesome name="plus-square" size={30} color="black" />
                                                           </TouchableOpacity>*/}

                                                        </View>
                                                    </View>
                                                </View>


                                                <View style={{
                                                    flexDirection: 'column', marginVertical: 10, justifyContent: 'space-between'
                                                }}>
                                                    <Text style={{ color: '#808080', fontFamily: 'Poppins-Bold' }}>{item.product_name}</Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular' }}>{item.metal_purity} |</Text>
                                                        <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular' }}> {item.weight} </Text>
                                                    </View>
                                                    <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium', fontWeight: 'bold' }}>₹{item.product_amt}</Text>

                                                    <StarRating key={index} ratingObj={ratingObj} />

                                                </View>
                                            </View>
                                        )
                                    }}
                                    keyExtractor={(item, index) => {
                                        return index.toString();
                                    }}

                                /> : null}
                        </View>
                    </View>
                }

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        // backgroundColor: '#EFECF4'
        backgroundColor: 'white'
    },
    itemStyle: {
        backgroundColor: 'red',
        // flex: 1,
        //margin: 15,
        marginVertical: 30

    },
    itemText: {
        color: 'white',
        fontSize: 13,
        top: -10,

    }
})

const mapStateToProps = state => {

    return {
        randomProduct: state.productlistReducer,
        itemcount: state.countCartReducer,
        filterdata: state.filterReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetch: (id) => dispatch(fetchProductlist(id)),
        countCart: (uid) => dispatch(fetchCountCart(uid)),
        filterDataResponse: (cid, type, weight, purity, metaltype, discount, size) => dispatch(fetchFilter(cid, type, weight, purity, metaltype, discount, size))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
