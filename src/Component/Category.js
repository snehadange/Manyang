import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, FlatList, Image, ImagePickerIOS } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../Component/Header';





const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1

const Product_details= [
    {
        "cid": "5",
        "product_cat_name": "Rings",
        "product_cat_img": require('../../assets/Ring.png')
    },
    {
        "cid": "6",
        "product_cat_name": "Earrings",
        "product_cat_img": require('../../assets/Earring.jpg')
    },
    {
        "cid": "12",
        "product_cat_name": "Pendants",
        "product_cat_img": require('../../assets/pendant.jpg')
    }
]
const Category = (props) => {
   
   return (
        <View style={styles.container}>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={props.imgdata}
               // data={Product_details}
                renderItem={({ item, index }) => {
                   
                    return (
                        <View style={{margin:9}} key={index}>
                            <TouchableOpacity onPress={() => props.handleProduct(item.product_cat_name,item.cid)} >

                                {<Image 
                                source={{ uri: props.imagebaselink + item.product_cat_img }}
                               // source={item.product_cat_img }  
                                style={{ width: 120, height: 120, borderRadius: 10, backgroundColor: '#C0C0C0' }} />}
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: 'bold' }}>{item.product_cat_name}</Text>
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
        flex:0.8,
        backgroundColor: 'white'
    },

})

export default Category;

