import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../Component/Header';
import Details from '../../Component/Accordian/Details'
import AsyncStorage from '@react-native-community/async-storage';

import { logOut } from '../../Services/services'

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1

const MyAccount = (props) => {
    const [settingData, setData] = React.useState([
        {
            id: 1,
            title: 'Edit Account',


        },
        {
            id: 2,
            title: 'Password',


        },
        {
            id: 3,
            title: 'Address Book',


        },
    ])

    useEffect(() => {
        //initial configuration
        GoogleSignin.configure({
            //It is mandatory to call this method before attempting to call signIn()
            // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            // Repleace with your webClientId generated from Firebase console
            webClientId: '87538690451-445hfval4ubqll2riovofmlhon9b4ubn.apps.googleusercontent.com',
        });
    })
    const handleList = (id) => {
        console.log(id)
        switch (id) {
            case 1:
                props.navigation.navigate('EditAccount')
                break;
            case 2:
                props.navigation.navigate('ForgetPassword')
                break;
            case 3:
                props.navigation.navigate('AddressBook')
                break;
            default:
                Alert.alert("Error,Plese try again later")
        }

    }


    const renderAccordian = () => {
        const items = [];
        for (const item of settingData) {

            items.push(
                <Details
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    handlePress={(id) => handleList(id)}

                />
            );
        }
        return items;
    }

    const logout = async () => {

        const userid = await AsyncStorage.getItem('userid')
        logOut(userid).then((logoutData) => {
            console.log(logoutData, "logoutData")
            props.navigation.navigate('User')
        }).catch((error) => {
            console.log("error in logout", error)
        })
        await AsyncStorage.removeItem('username')
        await AsyncStorage.removeItem('userid')
        await AsyncStorage.removeItem('googleprofile')
        

        const isSignedIn = await GoogleSignin.isSignedIn();


        if (isSignedIn == true) {
            //Remove user session from the device.
            try {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
                props.navigation.navigate('User')
            } catch (error) {
                console.error("error in google", error);
            }
        } else {

        }


    }

    return (
        <View style={styles.container}>
            <Header type="MyAccount" handleBack={() => props.navigation.navigate('User')} />
            <View style={{ flex: 0.5, margin: 10 }}>
                {renderAccordian()}

                <TouchableOpacity style={{ padding: 10, borderBottomColor: 'black', borderBottomWidth: 0.2 }} onPress={() => logout()}>
                    <Text style={{
                        fontSize: 18,
                      //  fontFamily: 'sansregular',
                        color: 'black'
                    }}>Sign Out</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

})
export default MyAccount;
