import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, KeyboardAvoidingView,TouchableOpacity,TextInput } from 'react-native';

import Header from '../../Component/Header';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {forgetPass} from '../../Services/services'
import * as api from '../../Constants/contants';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1

const ForgetPassword = (props) => {
    const [email,setEmail]=React.useState('')
    
    const handleSubmit=()=>{
        forgetPass(email).then((forgetData)=>{
            console.log("forgetData",forgetData)
            setEmail('')
            Alert.alert(
                //title
                'Hello',
                //body
      
                forgetData.Msg,
                [
                  { text: 'ok', onPress: () => console.log("ResetData")
                   },
      
                ],
                { cancelable: false },
                //clicking out side of alert will not cancel
              );
        })
      
    }
   
    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'white', height: BODY/3, elevation: 5 }}>

                <View style={{ flex: 0.8, marginTop: HEIGHT / 24, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, alignItems: 'center', width: WIDTH/1.5 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('User')}>
                        <Entypo name="cross" size={30} color="black" />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: 16, fontFamily: 'Poppins-SemiBold' }}>Forget Password</Text>
                    </View>
                </View>
            </View>

            <View style={{height:BODY,margin:10}}>
                <Text style={{fontSize:17,color:'#C0C0C0',fontFamily: 'Poppins-Medium'}}>Enter your Account email address and we'll send instructions on how to reset your password</Text>

                <View style={{ justifyContent: 'center',marginTop:'4%' }}>
                    <TextInput
                        style={styles.inputText}
                        placeholder='Enter your Email*' placeholderTextColor='#C0C0C0'
                        value={email}
                        textContentType={"emailAddress"}
                        onChangeText={(email) => setEmail(email)}
                    />
                    <View style={{ position: 'absolute', left: 20 }}>
                        <MaterialCommunityIcons name="email" size={20} color="black" />
                    </View>
                </View>

                <View style={{ justifyContent: 'center',marginTop:'4%' }}>
                  <TouchableOpacity style={{backgroundColor:'#0A3873',justifyContent:'center',alignItems:'center',height:HEIGHT/16,borderRadius:10}}  onPress={()=>handleSubmit()}>
                      <Text style={{color:'white',fontSize:20,fontWeight:'bold',textTransform:'uppercase'}}>Submit</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    inputText:
    {
        height: 55,
        fontFamily: 'SourceSansPro-SemiBold',
        borderWidth: 2,
        width: '100%',
        borderRadius: 10,
        paddingLeft: 60, paddingRight: 50,
        borderColor: '#e1e1e1', fontSize: 18,
        color: 'black'

    },
})
export default ForgetPassword;