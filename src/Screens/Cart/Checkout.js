import React from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../Component/Header';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
//import { TextInput } from 'react-native-paper'

import { placeOrder } from '../../Services/services'
import AsyncStorage from '@react-native-community/async-storage';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1

const Checkout = (props) => {

    const [email, setEmail] = React.useState('')
    const [fname, setFname] = React.useState('')
    const [lname, setLname] = React.useState('')
    const [number, setNumber] = React.useState('')
    const [city, setCity] = React.useState('')
    const [country, setCountry] = React.useState('')
    const [address, setAddress] = React.useState('')


    const submit = async () => {
        const userid = await AsyncStorage.getItem('userid')

        if (email == '') {
            Alert.alert("Please enter your email")
        } else if (number == '') {
            Alert.alert("Please enter contact number")
        } else if (city == '') {
            Alert.alert("Please enter your city")
        } else if (address == '') {
            Alert.alert("Please enter your country")
        }
        else {
             placeOrder(userid,address).then((orderData) => {
                console.log("orderData in checkout", orderData)
                Alert.alert(
                 //title
                 'Hello',
                 //body
 
                 "Sucessfully placed order",
                 [
                     {
                         text: 'ok', onPress: () => props.navigation.navigate('Cart')
                     },
 
                 ],
                 { cancelable: false },
                 //clicking out side of alert will not cancel
             );
                setEmail('')
                setNumber('')
                setCity('')
                setAddress('')
              }).catch((error)=>{
                  console.log("error for placeorder",error)
              })
             
        }
    }



    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} enabled keyboardVerticalOffset={100}>
            <View style={{ backgroundColor: 'white', height: BODY / 3, elevation: 5 }}>

                <View style={{ flex: 0.8, marginTop: HEIGHT / 24, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, alignItems: 'center', width: WIDTH / 1.8 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
                        <Ionicons name="chevron-back" size={30} color="black" />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: 16, fontFamily: 'Poppins-SemiBold' }}>Checkout</Text>
                    </View>
                </View>
            </View>

            <View style={{ marginTop: 30, marginHorizontal: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Billing Details:-</Text>
            </View>


            <View style={{ marginHorizontal: 5, flexDirection: 'column', justifyContent: 'space-between', height: 350, marginVertical: 10 }}>


                <TextInput
                    style={{
                        borderWidth: 2, borderRadius: 10, padding: 10,
                        borderColor: '#C0C0C0'

                    }}
                    placeholder='Your Email-id*'
                    placeholderTextColor='grey'
                    keyboardType="email-address"
                    returnKeyType='next'
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={email}

                    onChangeText={(email) => setEmail(email)}
                />



                <TextInput
                    style={{
                        borderWidth: 2, borderRadius: 10, padding: 10,
                        borderColor: '#C0C0C0'

                    }}
                    placeholder='Your contact number*'
                    placeholderTextColor='grey'
                    value={number}
                    keyboardType="number-pad"
                    maxLength={10}

                    onChangeText={(number) => setNumber(number)}
                />




                <TextInput
                    style={{
                        borderWidth: 2, borderRadius: 10, padding: 10,
                        borderColor: '#C0C0C0'

                    }}
                    placeholder='City*'
                    value={city}
                    placeholderTextColor='grey'
                    onChangeText={(city) => setCity(city)}
                />
                <TextInput
                    style={{
                        borderWidth: 2, borderRadius: 10, padding: 10,
                        borderColor: '#C0C0C0'

                    }}
                    placeholder='state address*'
                    value={address}
                    placeholderTextColor='grey'
                    onChangeText={(address) => setAddress(address)}
                />






                <TouchableOpacity style={{ backgroundColor: '#0A3873', height: HEIGHT / 15, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}
                    onPress={() => submit()}>
                    <Text style={{ color: 'white', fontWeight: 'bold', justifyContent: 'center', fontSize: 20 }}>Place Order</Text>
                </TouchableOpacity>


            </View>






        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

})
export default Checkout;