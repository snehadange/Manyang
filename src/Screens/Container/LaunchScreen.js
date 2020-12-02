import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, Image, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NetworkConnect from '../connection/NetworkConnect';




const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height


const LaunchScreen = (props) => {
    // const netInfo = useNetInfo();

    const isFocused = useIsFocused()
    useEffect(() => {
        initialDisplay()
    }, [isFocused])

    const initialDisplay = async () => {
  
        setTimeout(async () => {

            const initalRoute = await AsyncStorage.getItem('initialkey')
          
            NetInfo.fetch().then(state => {
                console.log("Connection type", state.type);
                console.log("Is connected?", state.isConnected);
                if (state.isConnected == false) {
                    props.navigation.navigate('NetworkConnect')
                } else {
                    if (initalRoute === null) {
                        props.navigation.navigate('GetStartSwiper')
                    } else {
                        props.navigation.navigate('Home')
                    }
                }
            });


        },4000)


    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content"
                // dark-content, light-content and default
                hidden={false}
                //To hide statusBar
                backgroundColor="black"
                //Background color of statusBar only works for Android
                translucent={false}
                //allowing light, but not detailed shapes
                networkActivityIndicatorVisible={true} />
            <Image source={require('../../../assets/splashimage.gif')} style={{ width: WIDTH, height: HEIGHT }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },

})
export default LaunchScreen;