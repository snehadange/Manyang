import React from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, Modal, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1

const AlertView = ({ title, message, closealert,alertopen }) => {
    return (
        <View style={styles.container}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={alertopen}
            >
                <View style={styles.centerView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{title}</Text>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: 'black', marginVertical: 15 }} />
                         <Text style={styles.textStyle}>{message}</Text>
                         <TouchableHighlight style={{...styles.openButton,backgroundColor:'white'}} onPress={()=>closealert()}>
                            <Text style={styles.okStyle}>Ok</Text>
                         </TouchableHighlight>
                    </View>
                   
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    centerView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1
    },
    modalView: {
        width: '80%',
        
        margin: 10, backgroundColor: 'white',
        borderRadius: 10, padding: 15,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0, height: 2
        }, shadowOpacity: 0.25,
        shadowRadius: 3.85, elevation: 5
    },
    textStyle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20
    },
    openButton:{
       backgroundColor:'white',
       borderRadius:5,
       padding:2,
       width:'100%',
       marginTop:40
    }, 
    okStyle: {
        color: 'green',
        textAlign: 'center',
        fontSize: 20
    },
    modalText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 34, shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84, elevation: 5,
        color: 'red'
    }

})
export default AlertView;