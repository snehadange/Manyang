import React from 'react';
import {View,StyleSheet,Text, Dimensions,Alert, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import  Header  from '../../Component/Header';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1

const EditAccount=()=>{
    return(
        <View style={styles.container}>
         <Header/>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
       flex:1,
       backgroundColor:'white'
    },
  
})
export default EditAccount;