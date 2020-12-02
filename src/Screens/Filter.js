import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, Image, PixelRatio } from 'react-native';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

import { fetchFilter } from '../redux/actions/filterAction'
import Filterlist from '../Component/Filter/Filterlist';
import Header from '../Component/Header'
import { fetchWeight, fetchpurity, fetchmetaltype, fetchdiscount, fetchsizelist, fetchproductType, fetchFilterData } from '../Services/services';

import * as api from '../Constants/contants';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1
const scale = WIDTH / 320;

export function normalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

const Filter = (props) => {

    const [itemIndex, setIndex] = React.useState(0)

    const [value, setvalue] = React.useState(0)


    const [productTypes, setProductTypes] = React.useState([])
    const [weight, setWeight] = React.useState([])

    const [purity, setpurity] = React.useState([
        {
            id:0,
            name:'18kt'
        },
        {
            id:1,
            name:'19kt'
        }
    ])

    const [metaltype, setMetalType] = React.useState([])
    const [Discount, setDiscount] = React.useState([])
    const [size, setMetalSize] = React.useState([])

    const [filterData, setFilterData] = React.useState([
        {
            id: 0,
            name: 'Product Type',
            value: ''
        },
        {
            id: 1,
            name: 'Weight',
            value: ''
        },
        {
            id: 2,
            name: 'Metal Purity',
            value: ''
        },
        {
            id: 3,
            name: 'Metal Type',
            value: ''
        },
        {
            id: 4,
            name: 'Discount',
            value: ''
        },
        {
            id: 5,
            name: 'Size',
            value: ''
        }
    ])

    useEffect(() => {
       fetchproductType().then((producttypeResponse) => {

            setProductTypes(producttypeResponse.Data)
      })
        fetchWeight().then((weightResponse) => {

            setWeight(weightResponse.Data)
        })
        fetchpurity().then((purityResponse) => {

            setpurity(purityResponse.Data)
        })
        fetchmetaltype().then((metaltypeResponse) => {

            setMetalType(metaltypeResponse.Data)
        })
        fetchdiscount().then((discountResponse) => {

            setDiscount(discountResponse.Data)
        })
        fetchsizelist().then((sizeResponse) => {

            setMetalSize(sizeResponse.Data)
        })
    }, [])
    const checkRadioButton = (id, name) => {
        console.log("name of radio button", name)
        const arr = [...filterData]

        switch (itemIndex) {
            case 0:
                arr[0].value = name
                setFilterData(arr)
                break;
            case 1:
                arr[1].value = name
                setFilterData(arr)
                break;
            case 2:
                arr[2].value = name
                setFilterData(arr)
                break;
            case 3:
                arr[3].value = name
                setFilterData(arr)
                break;
            case 4:
                arr[4].value = name
                setFilterData(arr)
                break;
            case 5:
                arr[5].value = name
                setFilterData(arr)
                break;
            default:
                return console.log("nothing is selecting")
        }

        setvalue(id)

    }

    const showFlatlist = (id) => {
        switch (id) {
            case 0:
                return (
                    <Filterlist data={productTypes} handleRadioButton={(id, name) => checkRadioButton(id, name)} value={value} typeref={id} />
                )
                break;
            case 1:
                return (
                    <Filterlist data={weight} handleRadioButton={(id, name) => checkRadioButton(id, name)} value={value} />
                )

                break;
            case 2:
                return (
                    <Filterlist data={purity} handleRadioButton={(id, name) => checkRadioButton(id, name)} value={value} />
                )
                break;
            case 3:
                return (
                    <Filterlist data={metaltype} handleRadioButton={(id, name) => checkRadioButton(id, name)} value={value} />
                )
                break;
            case 4:
                return (
                    <Filterlist data={Discount} handleRadioButton={(id, name) => checkRadioButton(id, name)} value={value} />
                )
                break;
            case 5:
                return (
                    <Filterlist data={size} handleRadioButton={(id, name) => checkRadioButton(id, name)} value={value} />
                )
            default:
                return null;

        }
    }

    const apply = async () => {

        const product_type = await AsyncStorage.getItem('producttype')
        const categoryid = await AsyncStorage.getItem('categoryid')


        const selectedValue = {
            type: filterData[0].value,
            weight: filterData[1].value,
            purity: filterData[2].value,
            metaltype: filterData[3].value,
            discount: filterData[4].value,
            size: filterData[5].value
        }


        props.filterDataResponse(categoryid, selectedValue.type, selectedValue.weight, selectedValue.purity, selectedValue.metaltype, selectedValue.discount, selectedValue.size)



      
        props.navigation.navigate('ProductList',
            {
                productType: product_type,
                radiodata: selectedValue
            }
        )
    }

    return (
        <View style={styles.container}>
            <Header type="Filter" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <View >
                    <FlatList
                        data={filterData}
                        extraData={itemIndex}
                        renderItem={({ item, index }) => {

                            return (
                                <View style={{ flexDirection: 'column', width: WIDTH / 3 }}>


                                    <TouchableOpacity style={itemIndex === item.id ? styles.listitem : styles.selectedlistItem}
                                        onPress={() => setIndex(item.id)}>
                                        <Text style={{ fontSize: normalize(15), color: 'white', fontWeight: 'bold' }}>{item.name}</Text>
                                    </TouchableOpacity>

                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => {
                            return index.toString();
                        }}
                    />
                </View>
                <View style={{ width: WIDTH, margin: 10 }}>
                    {showFlatlist(itemIndex)}


                </View>
            </View>
            <View style={styles.applyView} >
                <TouchableHighlight style={styles.applybtn} onPress={() => apply()}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Apply</Text>
                </TouchableHighlight>



            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFECF4'
    },
    listitem: {
        height: HEIGHT / 9,
        margin: 10,
        padding: 5,
        borderRadius: 10,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedlistItem: {
        height: HEIGHT / 7,
        //  margin: 10,
        padding: 5,
        // borderRadius: 10,
        backgroundColor: '#0A3873',
        justifyContent: 'center',
        alignItems: 'center'
    },
    applybtn: {
        backgroundColor: '#0A3873',
        width: WIDTH / 1.2,
        borderRadius: 5,
        height: HEIGHT / 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    applyView: {
        width: WIDTH / 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: HEIGHT / 20, margin: 10
    }
})

const mapStateToProps = state => {

    return {

        filterdata: state.filterReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {

        filterDataResponse: (cid, type, weight, purity, metaltype, discount, size) => dispatch(fetchFilter(cid, type, weight, purity, metaltype, discount, size))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);



