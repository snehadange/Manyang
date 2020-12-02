import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, PixelRatio, StatusBar } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../Component/Header';
import Slider from '../Component/Slider/Slider';
import Category from '../Component/Category'

import { fetchCategory } from '../redux/actions/categoryActions'
import { fetchCountCart } from '../redux/actions/countcartAction'

import { connect } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import ContentLoader from "react-native-easy-content-loader";




const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3


const scale = WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

const Home = (props) => {

  const isFocused = useIsFocused();

  useEffect(() => {
    props.fetchCategorylist()
    //console.log("_____________++++++++++", props.itemcount.countItem)
    fetchcount()

  }, [isFocused])

  const fetchcount = async () => {
    const userid = await AsyncStorage.getItem('userid')

    props.countCart(userid)
  }

  const gotoProductList = async (type, id) => {
    await AsyncStorage.setItem('producttype', type)
    await AsyncStorage.setItem('categoryid', id)
    props.navigation.navigate('ProductList', {
      productType: type,
      productId: id
    })

  }



  return (

    <View style={styles.container}>
      <StatusBar barStyle="dark-content"
        // dark-content, light-content and default
        hidden={false}
        //To hide statusBar
        backgroundColor="white"
        //Background color of statusBar only works for Android
        translucent={false}
        //allowing light, but not detailed shapes
        networkActivityIndicatorVisible={true} />

      <Header type="Home" handleCart={() => props.navigation.navigate('Cart')} count={props.itemcount.countItem} />

      <View style={{ flex: 1 }}>
        <ScrollView >
         <View style={styles.sliderStyle}>
            <Slider />
          </View>

          <View style={styles.categoryView}>
            <Text style={{ fontSize: normalize(20), fontFamily: 'Poppins-Medium' }}>Categories</Text>
            <TouchableOpacity>
              {/*  <Text style={{ fontSize: normalize(14) ,fontWeight:'bold'}}>Show all</Text>*/}
            </TouchableOpacity>

          </View>


          <View style={{ height: HEIGHT / 3, marginTop: 25 }}>
            <Category imgdata={props.randomCategory.category.Product_details} handleProduct={(type, id) => gotoProductList(type, id)} imagebaselink={props.randomCategory.category.baseUrlLink} />
          </View>

        </ScrollView>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'

  },
  sliderStyle: {
    backgroundColor: '#C0C0C0',
    height: BODY * 1.7
  },
  categoryView: {
    flex: 0.9,
    marginTop: HEIGHT / 20, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  categoryText: {
    fontSize: normalize(24), fontFamily: 'Peddana-Regular'
  }

})

const mapStateToProps = state => {

  return {
    randomCategory: state.categoryReducer,
    itemcount: state.countCartReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategorylist: () => dispatch(fetchCategory()),
    countCart: (uid) => dispatch(fetchCountCart(uid))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);