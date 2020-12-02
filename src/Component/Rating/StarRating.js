import React from 'react';
import { View, StyleSheet, Text, Dimensions, Alert, Button, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../Component/Header';
import { Imagepath } from '../../index';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1

const StarRating = (props) => {

    let stars = []
    let ratingObj = props.ratingObj;

    for (var i = 1; i <= 5; i++) {
        // set the path to filled stars
        let path = Imagepath.starFillIcon

        if (i > ratingObj.ratings)   // If ratings is lower, set the path to unfilled stars
        {
            path = Imagepath.starUnfillIcon
        }
        stars.push((<Image key={i} source={path} style={{ width: 20, height: 20 }} />))
    }
    return (
        <View style={styles.container}>
            {stars}
                <View>
                    <Text>({ratingObj.views})</Text>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginTop: 6,
    },

})
export default StarRating;