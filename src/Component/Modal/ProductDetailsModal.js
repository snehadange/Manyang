import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, Modal, TouchableOpacity, TouchableHighlight } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useIsFocused } from '@react-navigation/native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height



const ProductDetailsModal = (props) => {

    const Focused = useIsFocused()
    const [DataHeader, setHeader] = React.useState(['Collection', 'Feature'])
    const [DataTable, setDatatable] = React.useState([
        ['Metal purity', props.purity],
        ['Weight', props.weight],
        ['Product Name', props.name]
    ]

    )

    useEffect(() => {

    }, [Focused])



    return (

        <Modal visible={props.modalopen}>
            <View style={{ flex: 0.2, elevation: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, width: WIDTH / 1.6, margin: 10 }}>
                    <TouchableHighlight onPress={() => props.closeModal()} >
                        <Entypo name="cross" size={20} />
                    </TouchableHighlight>
                    <Text style={{ textTransform: 'uppercase', fontSize: 16, fontFamily: 'Poppins-SemiBold' }}>Product Details</Text>
                </View>
            </View>


            <View style={{ marginTop: HEIGHT / 15, flexDirection: 'column', justifyContent: 'space-between', margin: 20 }}>

                <Table borderStyle={{ borderWidth: 1, borderColor: '#D4AF37' }}>
                    <Row data={DataHeader} style={styles.head} textStyle={styles.text} />
                    <Rows data={DataTable} textStyle={styles.TableText} />
                </Table>

            </View>




        </Modal>


    )
}

const styles = StyleSheet.create({

    TableText: {
        margin: 25,
        fontSize: 15,
        fontFamily: 'Roboto-MediumItalic'
    },
    head: { height: 40, backgroundColor: '#F9A602' },
    text: {margin:25,fontSize: 20,
        fontFamily: 'Poppins-Regular'}
});



export default ProductDetailsModal;