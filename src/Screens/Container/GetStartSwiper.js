
import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, StatusBar } from 'react-native';



import { TouchableOpacity } from 'react-native-gesture-handler'
import Slider from '../../Component/Slider/Slider';
import StartSlider from '../../Component/Slider/StartSlider';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1

const GetStartSwiper = (props) => {
    const [initialRoute, setRoute] = React.useState(true)

    const gotoHome = async () => {
        props.navigation.navigate('Home')
        const value = await AsyncStorage.setItem('initialkey', 'true')

    }



    return (
        <View style={styles.container}>

            {/* <View style={{ flex: 3, margin: 40, backgroundColor: 'red' }}>
                <StartSlider />
            </View>*/}
            <View style={{ flex: 1, backgroundColor: 'red'}}>
              <StartSlider/>
            </View>
            <View style={{ height: FOOTER, flex: 0.1 }}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => gotoHome()}>
                    <Text style={styles.btnText}>Get Started</Text>
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
    buttonContainer: {
        backgroundColor: '#0A3873',
        width: WIDTH / 1.2,
        borderRadius: 10, alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
        height: HEIGHT / 20,
        marginVertical: 20
    },
    btnText: {
        fontWeight: 'bold', fontSize: 20, color: 'white', textTransform: 'uppercase'
    }
})
export default GetStartSwiper;