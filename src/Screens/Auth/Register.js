import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Header from '../../Component/Header';

import * as firebase from "firebase";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TextInput } from 'react-native-paper'
import { registerUser } from '../../Services/services'
import AsyncStorage from '@react-native-community/async-storage';
import { appleAuth } from '@invertase/react-native-apple-authentication';



import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import GoogleRegister from './GoogleRegister';
import AppleRegister from './AppleRegister';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1

const Register = (props) => {
    const [name, setName] = React.useState('')
    const [mobile, setNumber] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [eye, setIcon] = React.useState('eye-slash')
    const [pass, showPassword] = React.useState(true)
    const [userInfo, setInfo] = React.useState(null)
    const [gettingLoginStatus, setLoginstatus] = React.useState(null)







    const handlePassword = () => {

        if (pass) {
            setIcon('eye')
            showPassword(false)
            setPassword(password)
        } else {
            setIcon('eye-slash')
            showPassword(true)
            setPassword(password)
        }
    }


    const validation = () => {
        let email_pattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        let mobile_pattern = /^([0-9\(\)\/\+ \-]*)$/

        let valid = false;

        if (email.length === 0) {
            Alert.alert("Please enter email")
        }

        if (password.length === 0) {
            Alert.alert("Please enter password")
        }

        if (email.length > 0 && password.length > 0 && mobile.length == 10) {
            if (email_pattern.test(email)) {
                valid = true;

            } else {
                console.log("Please enter valid email")
            }
        }
        return valid;
    }


    const onAppleButtonPress = async () => {
        // performs login request

        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        }).then((appleAuthRequestResponse) => {
            let { identityToken, email } = appleAuthRequestResponse
            console.log("Apple registration", identityToken, email)
        });

        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
            // user is authenticated
        }
    }

    const handleRegister = async () => {
        console.log(name, email, mobile, password)



        if (name === '') {
            Alert.alert('Please enter username')
        } else if (email === '') {
            Alert.alert('Please enter email-id ')
        } else if (mobile === '') {
            Alert.alert('Please enter contact number ')
        } else if (password === '') {
            Alert.alert('Please enter password')
        } else {

            if (validation()) {
                registerUser(name, password, email, mobile).then(async (registerData) => {
                    console.log('registerData', registerData)

                    if (registerData.Status == '0') {
                        Alert.alert(
                            //title
                            'Hello',
                            //body

                            registerData.Msg,
                            [
                                {
                                    text: 'ok', onPress: () => props.navigation.navigate('User')
                                },

                            ],
                            { cancelable: false },
                            //clicking out side of alert will not cancel
                        );
                    }
                    else {

                        await AsyncStorage.setItem('username', name)
                        await AsyncStorage.setItem('userid', JSON.stringify(registerData.uid))
                        await AsyncStorage.setItem('googleprofile', "https://manyangjewellers.com//api/user.png")

                        Alert.alert(
                            "Hi",
                            registerData.Msg,
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                { text: "OK", onPress: () => props.navigation.navigate('User') }
                            ],
                            { cancelable: false }
                        );
                    }





                    setName('')
                    setNumber('')
                    setEmail('')
                    setPassword('')


                }).catch((error) => {
                    console.log("Error in registration", error)
                })
            } else {
                Alert.alert("please check enter fields")
            }


        }



    }

    return (


        <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: '#e6e6e6' }} >
            <View style={{ backgroundColor: 'white', height: BODY / 3, elevation: 5 }}>

                <View style={{ flex: 0.8, marginTop: HEIGHT / 24, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, alignItems: 'center', width: WIDTH / 2 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('User')}>
                        <Ionicons name="chevron-back" size={30} color="black" />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: 16, fontFamily: 'Poppins-SemiBold' }}>Register</Text>
                    </View>
                </View>
            </View>

            <View style={{ height: BODY / 0.55 }}>
                <View style={{ margin: 10, justifyContent: 'space-between', flexDirection: 'column', height: HEIGHT / 2.3 }}>

                    <TextInput
                        style={styles.inputText}
                        label=' Your Name*'
                        mode='outlined'
                        value={name}
                        theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: 'transparent', background: 'white' } }}
                        onChangeText={(name) => setName(name)}
                    />




                    <TextInput

                        label='Your Email*'
                        mode='outlined'
                        value={email}
                        returnKeyType='next'
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType="email-address"
                        theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: 'transparent', background: 'white' } }}

                        onChangeText={(email) => setEmail(email)}
                    />

                    <TextInput

                        label='Your contact number*'
                        mode='outlined'
                        value={mobile}
                        maxLength={10}
                        keyboardType="number-pad"
                        theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: 'transparent', background: 'white' } }}

                        onChangeText={(mobile) => setNumber(mobile)}
                    />

                    <TextInput

                        label='Your password*'
                        mode='outlined'
                        secureTextEntry
                        value={password}
                        theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: 'transparent', background: 'white' } }}
                        onChangeText={(password) => setPassword(password)}
                    />




                    <TouchableOpacity style={{ backgroundColor: '#0A3873', height: HEIGHT / 15, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}
                        onPress={() => handleRegister()}>
                        <Text style={{ color: 'white', fontWeight: 'bold', justifyContent: 'center', fontSize: 20 }}>Sign up</Text>
                    </TouchableOpacity>



                </View>

            </View>

            <View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontFamily: 'Roboto-MediumItalic' }}>or</Text>
            </View>


            <View style={{ marginTop: HEIGHT / 24 }}>
                <GoogleRegister handleRegister={() => props.navigation.navigate('User')} />
            </View>

            <View style={{ marginTop: HEIGHT / 24 }}>
                {Platform.OS == 'ios' && appleAuth.isSupported ? <AppleRegister handleAppleRegister={() => onAppleButtonPress()} /> : null}
            </View>







        </KeyboardAvoidingView >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    inputContainer:
    {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'yellow',

    },


    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: HEIGHT / 15,
        width: '100%',
        backgroundColor: '#0A3873',
        marginTop: 10,
        borderRadius: 10
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    foot: {
        padding: 40
    }
})
export default Register;