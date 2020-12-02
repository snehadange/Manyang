import React from 'react';
import { View,Text ,StyleSheet} from 'react-native';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { TouchableOpacity } from 'react-native-gesture-handler';



const AppleRegister =(props)=> {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={()=>props.handleAppleRegister()}>
            <Text style={{color:'#1E90FF',fontSize:15,fontFamily:'Poppins-Bold'}}>Sign in with Apple</Text>
        </TouchableOpacity>
    </View>
     
   
  );
}

const styles=StyleSheet.create({
   
})


export default AppleRegister;