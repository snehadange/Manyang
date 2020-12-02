import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, Modal, TouchableOpacity, TouchableHighlight } from 'react-native';
import { productDescription } from '../../Services/services'


import Entypo from 'react-native-vector-icons/Entypo';

import Header from '../../Component/Header';
import { connect } from 'react-redux';
import { fetchproductInfo } from '../../redux/actions/productInfoAction';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';
//import  Header  from '../Component/Header';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1


const DescriptionModal = (props) => {

    const Focused = useIsFocused()

    useEffect(() => {

        //showInfo()


    }, [Focused])



    return (

        <Modal visible={props.modalopen}>
            <View style={{flex:0.2,elevation:5}}>
                <View style={{  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginTop:20,width:WIDTH/1.6,margin:10 }}>
                    <TouchableHighlight onPress={() => props.closeModal()} >
                        <Entypo name="cross" size={20} />
                    </TouchableHighlight>
                    <Text style={{ textTransform: 'uppercase', fontSize: 16, fontFamily: 'Poppins-SemiBold' }}>Description</Text>
                </View>
            </View>


           



        </Modal>


    )
}



const mapStateToProps = state => {
    //console.log("state of DescriptionModal", state.productInfoReducer.productInfot.Carat.name)
    return {

        productinformation: state.productInfoReducer,
    }
}

const mapDispatchToProps = dispatch => {
    return {

        showproductInfo: (uid) => dispatch(fetchproductInfo(uid)),

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionModal);