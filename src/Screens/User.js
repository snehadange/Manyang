import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused, useLinkProps } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, Image ,Platform} from 'react-native';

import { fetchCountCart } from '../redux/actions/countcartAction'
import { connect } from 'react-redux'

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Details from '../Component/Accordian/Details';
import Header from '../Component/Header';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { GoogleSignin } from '@react-native-community/google-signin';
import { ActivityIndicator } from 'react-native-paper';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.2
const FOOTER = HEIGHT * 0.1

const User = (props) => {
    const [settingData, setData] = React.useState([
        {
            id: 1,
            title: 'App Settings',

            data: 'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
        },
        {
            id: 2,
            title: 'Services',

            data: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.'
        },
        {
            id: 3,
            title: 'Contact',

            data: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.'
        },
    ])
    const [othersData, setOthers] = React.useState([
        {
            id: 1,
            title: 'Contact us',
        },
        {
            id: 2,
            title: 'Help center',
        },
        {
            id: 3,
            title: 'Terms & Conditions',
        },
        {
            id: 4,
            title: 'Privacy Policy'
        }
    ])
    const [username, setUname] = React.useState(null)
    const [profile, setProfile] = React.useState(null)
    const [loaded, setLoaded] = React.useState(true)

    const isFocused = useIsFocused();

    useEffect(() => {

        loadData()

       

        setTimeout(() => {
            setLoaded(false)
           // console.log(loaded)

        }, 3000)
        setLoaded(true)
    }, [isFocused])

    const loadData = async () => {

        const isSignedIn = await GoogleSignin.isSignedIn();
        const uname = await AsyncStorage.getItem('username')

        const userid = await AsyncStorage.getItem('userid')
        const userprofile = await AsyncStorage.getItem('googleprofile')

      //  const loginprofile = await AsyncStorage.getItem('loginprofile')
          setUname(uname)
         setProfile(userprofile)
    }



    const handleSetting = (id) => {

        switch (id) {
            case 1:
                // this.props.navigation.navigate('ProductDescription')

                console.log("App Settings")

                break;
            case 2:
                console.log("Services")
                break;
            case 3:
                console.log("Contact")
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
                    data={item.data}
                    handlePress={() => handleSetting(item.id)}
                />
            );
        }
        return items;
    }

    const gotoLogin = () => {
        props.navigation.navigate('Login')
    }
    const gotoRegister = () => {
        props.navigation.navigate('Register')
    }
    const gotoAccount = () => {
        props.navigation.navigate('MyAccount')
    }

    return (
        <View style={styles.container}>
            <Header type="Me" handleBack={() => props.navigation.navigate('Home')} handleCart={() => props.navigation.navigate('Cart')} count={props.itemcount.countItem} />

            {username === null ?
                <View style={{ flex: 0.3 }}>


                    {loaded  ?
                    <View style={{justifyContent:'center',marginTop:30}}>
                          <ActivityIndicator size={20} color="black" />
                    </View>
                   :
                        <View style={styles.signview}>
                            <TouchableOpacity style={styles.createbtn}
                                onPress={() => gotoRegister()}>
                                <Text style={styles.btnText}>Create account</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.signinbtn}
                                onPress={() => gotoLogin()}>
                                <Text style={styles.btnText}>Sign in</Text>
                            </TouchableOpacity>

                        </View>
                    }



                </View> :

                <View style={styles.detailsview}>
                    {loaded ? <ActivityIndicator size={20} color="black" /> :
                        <TouchableOpacity style={styles.detailsViewbtn} onPress={() => gotoAccount()}>
                            <View style={styles.profileViewimg}>
                                <Image source={{ uri: profile}} style={styles.profileimg} />

                            </View>
                            <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium' }}>Hello,{username}</Text>
                        </TouchableOpacity>}
                </View>}





        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    signview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 40,
        margin: 10
    },
    createbtn: {
        backgroundColor: '#0A3873',
        borderRadius: 10,
        width: WIDTH / 2,
        justifyContent: 'center',
        alignItems: 'center',
        height: HEIGHT / 15
    },
    btnText: {
        fontSize: Platform.OS === 'ios' ?14:18,
        color: 'white',
        //fontFamily:'Peddana-Regular',
        textTransform: 'uppercase'
    },
    signinbtn: {
        backgroundColor: '#0A3873',
        borderRadius: 10,
        width: WIDTH / 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        height: HEIGHT / 15
    },
    detailsview: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailsViewbtn: {
        margin: 20,
        flex: 1,
        marginVertical: 40,
        backgroundColor: '#A9A9A9',
        width: WIDTH / 1.1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 2
    },
    profileViewimg: {
        width: 45,
        height: 45,
        borderRadius: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileimg: {
        width: 45,
        height: 45,
        borderRadius: 100
    }

})
const mapStateToProps = state => {

    return {

        itemcount: state.countCartReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {

        countCart: (uid) => dispatch(fetchCountCart(uid))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(User);
