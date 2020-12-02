import React, { useEffect } from 'react';
import {View,StyleSheet,Text, Dimensions,Alert, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const NetworkConnect=(props)=>{
    const focused=useIsFocused()
    useEffect(()=>{

    },[focused])
    
    const checkInternet=async()=>{
        const two = await AsyncStorage.getItem('initialkey')

        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if(state.isConnected == false)
            {
                props.navigation.navigate('NetworkConnect')  
            }else{
                if (two === null) {
                    props.navigation.navigate('GetStartSwiper') 
                   } else {
                    props.navigation.navigate('Home') 
                }
            }
          });
    }
    return(
        <View style={styles.container}>
          <Text style={{fontSize:25,fontWeight:'bold'}}>No internet Connection</Text>
          <Text>Please check your internet Connection </Text>
          <Text>and try again</Text>
          <TouchableOpacity style={{backgroundColor:'black',marginVertical:10,width:WIDTH/2,height:HEIGHT/16,justifyContent:'center',alignItems:'center'}} onPress={()=>checkInternet()}>
              <Text style={{color:'white',fontWeight:'bold'}}>Try again</Text>
          </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
       flex:1,
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:'white'
    },
  
})
export default NetworkConnect;