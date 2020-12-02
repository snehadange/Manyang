import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager, Dimensions, Alert } from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialIcons";

const WIDTH = Dimensions.get('window').width

export default class Details extends Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {

        return (
            <View >
                <TouchableOpacity ref={this.accordian} style={styles.row} onPress={() => this.props.handlePress(this.props.id)}>


                    <Text style={[styles.title, styles.font]}>{this.props.title}</Text>


                    <Icon name='keyboard-arrow-right' size={30} color='black' />

                </TouchableOpacity>

                {/* <View style={styles.parentHr}/>
            { //: 'keyboard-arrow-right'
                this.state.expanded &&
                <View style={styles.child}>
                    <Text>{this.props.data}</Text>
                </View>
                */}

            </View>
        )
    }

    toggleExpand = (id) => {
        {
            id === 1 ? this.props.navigation.navigate('User') : null
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    }

}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        //fontFamily: 'sansregular',
        color: 'black',
        margin: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        //paddingLeft:25,
        paddingRight: 11,
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
        borderRadius:10
    },
    parentHr: {
        height: 1,
        color: 'white',
        width: '100%'
    },
    child: {
        // padding:16,
        fontFamily: 'NotoSansJP-Medium'
    }

});
