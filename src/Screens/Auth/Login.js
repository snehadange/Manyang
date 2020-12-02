import React from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, KeyboardAvoidingView, TouchableHighlight, TouchableOpacity, Platform } from 'react-native';



import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'

import { TextInput } from 'react-native-paper'
import Toast from '../../Component/Toast'

import { loginUser } from '../../Services/services';
import AsyncStorage from '@react-native-community/async-storage';
import GoogleRegister from './GoogleRegister';
import AppleRegister from './AppleRegister';

import { appleAuth } from '@invertase/react-native-apple-authentication';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1

const Login = (props) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [eye, setIcon] = React.useState('visibility-off')
    const [pass, showPassword] = React.useState(true)
    const [alertmessage, setToastmessage] = React.useState('')
    const [visibleToast, setToast] = React.useState(false)

    const validation = () => {
        let email_pattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/


        let valid = false;

        if (email.length === 0) {
            Alert.alert("Please enter email")
        }

        if (password.length === 0) {
            Alert.alert("Please enter password")
        }

        if (email.length > 0 && password.length > 0) {
            if (email_pattern.test(email)) {
                valid = true;

            } else {
                console.log("Please enter valid email")
            }
        }
        return valid;
    }

   const onAppleButtonPress=async()=> {
        // performs login request
        if(appleAuth.isSupported)
        {
            console.log("=====")
        }else{
            console.log("not supported")
        }
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        }).then((appleAuthRequestResponse)=>{
            let {identityToken,email} = appleAuthRequestResponse
            console.log("Apple registration",identityToken,email)
        });
      
        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
      
        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
          // user is authenticated
        }
    }

    const handleLogin = () => {


        if (email === '') {
            Alert.alert('please enter email address')
        } else if (password === '') {
            Alert.alert('please enter password')
        } else {
            if (validation()) {
                loginUser(email, password).then(async (loginData) => {
                    console.log("LoginData", loginData)

                    if (loginData.Status == '0') {
                        if (Platform.OS === 'android') {
                            setToast(true)
                            setToastmessage(loginData.Msg)
                        } else {
                            Alert.alert("Login failed!!! please try again")
                        }


                    } else {

                        await AsyncStorage.setItem('username', loginData.User)
                        await AsyncStorage.setItem('userid', loginData.uid)
                        await AsyncStorage.setItem('googleprofile', loginData.img)


                        Alert.alert(
                            "Hi",
                            "Login Successfull",
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
                    setEmail('')
                    setPassword('')
                    //props.navigation.navigate('User')
                }).catch((error) => {
                    console.log("errror in register", error)
                })

            } else {
                Alert.alert("Please checked enter fields")
            }

        }
    }

    const handlePassword = () => {

        if (pass) {
            setIcon('visibility')
            showPassword(false)
            setPassword(password)
        } else {
            setIcon('visibility-off')
            showPassword(true)
            setPassword(password)
        }
    }

    return (


        <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: '#e6e6e6' }} >

            <View style={{ backgroundColor: 'white', height: BODY / 3, elevation: 5 }}>

                <View style={{ flex: 0.8, marginTop: HEIGHT / 24, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, alignItems: 'center', width: WIDTH / 2 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('User')}>
                        <Entypo name="cross" size={30} color="black" />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: 16, fontFamily: 'Poppins-SemiBold' }}>Login</Text>
                    </View>
                </View>
            </View>

            <View style={{ margin: 10, flexDirection: 'column', justifyContent: 'space-between', height: BODY / 1.2, marginVertical: HEIGHT / 20 }}>
                <TextInput
                    label='Your Email/Mobile Number*'
                    mode='outlined'
                    value={email}
                    returnKeyType='next'
                    autoCorrect={false}
                    autoCapitalize='none'

                    theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: 'transparent', background: 'white' } }}
                    onChangeText={(email) => setEmail(email)}
                />

                <View style={{ justifyContent: 'center', position: 'relative' }}>
                    <TextInput

                        label='Your password*'
                        mode='outlined'
                        value={password}
                        secureTextEntry
                        theme={{ colors: { placeholder: 'black', text: 'black', primary: 'black', underlineColor: 'transparent', background: 'white' } }}
                        onChangeText={(password) => setPassword(password)}
                    />
                    {/* <View style={{ position: 'absolute',left:300 }}>
                        <TouchableHighlight onPress={() => handlePassword()} >
                            <MaterialIcons name={eye} size={20} color="black" />
                        </TouchableHighlight>
                     </View>*/}
                </View>




                <TouchableOpacity style={{ backgroundColor: '#0A3873', height: HEIGHT / 15, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}
                    onPress={() => handleLogin()}>
                    <Text style={{ color: 'white', fontWeight: 'bold', justifyContent: 'center', fontSize: 20 }}>Sign in</Text>
                </TouchableOpacity>

            </View>

            <View style={{ height: BODY }}>
                <View style={{ margin: 10, flex: 0.9, flexDirection: 'column' }}>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => props.navigation.navigate('ForgetPassword')}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Forget password?</Text>
                    </TouchableOpacity>

                    <View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Roboto-MediumItalic' }}>or</Text>
                    </View>

                    <View style={{ flex: 0.3 }}>
                        <GoogleRegister
                            handleRegister={() => props.navigation.navigate('User')} />
                    </View>
                    <View style={{ flex: 0.3,margin:20 }}>
                        {Platform.OS == 'ios' && appleAuth.isSupported ?<AppleRegister handleAppleRegister={()=>onAppleButtonPress()}/>:null}
                    </View>
                    <Toast visible={visibleToast} message={alertmessage} />
                </View>

            </View>


            <View >
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: HEIGHT / 10, flexDirection: 'column', justifyContent: 'space-between', height: HEIGHT / 12 }}>

                    <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>Don't have an account</Text>

                    <TouchableOpacity style={{ borderWidth: 2, borderColor: 'black', width: WIDTH / 1.1, height: HEIGHT / 23, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => props.navigation.navigate('Register')}>
                        <Text style={{ fontSize: 15, textTransform: 'uppercase', fontWeight: 'bold' }}>Register</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    inputContainer:
    {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'yellow',

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
export default Login;
