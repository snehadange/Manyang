import React from "react";
import { View, StyleSheet, Text ,TouchableOpacity,Image,Dimensions,FlatList} from 'react-native';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height
const BODY = HEIGHT * 0.3
const FOOTER = HEIGHT * 0.1

const Filterlist = (props) => {
   
    const showResult=(id,name)=>{
        props.handleRadioButton(id,name)
    
      
    }
    return (
        <View style={styles.container}>
           
          <FlatList
                data={props.data}
                renderItem={({ item, index }) => {
                    
                    return (
                        <View 
                        style={{ flexDirection: 'column', width: WIDTH / 3, height: HEIGHT / 20 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() =>showResult(item.id,item.name)}>
                                <Image source={props.value !== item.id ? require('../../../assets/UncheckedRadio.png') : require('../../../assets/selectRadioimg.png')} style={{ width: 20, height: 20 }} />
                                <Text style={{ marginHorizontal: 10 }}>{item.name}</Text>
                            </TouchableOpacity>

                        </View>

                    )

                }}
                keyExtractor={(item, index) => {
                    return index.toString();
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
         //backgroundColor: 'red'
    }
})

export default Filterlist