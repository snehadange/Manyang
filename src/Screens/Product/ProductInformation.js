import React from 'react';
import {
    Animated,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    RefreshControl,
    TouchableOpacity,
    Dimensions,
    Alert,
    Modal, TextInput
} from 'react-native';
import { Imagepath } from '../../index';





import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from '../../Component/Rating/StarRating';
import Details from '../../Component/Accordian/Details'
import AsyncStorage from '@react-native-community/async-storage';


//import DescriptionModal from '../../Component/Modal/DescriptionModall';
//import QuantityBadge from '../../Component/QuantityBadge';
//import { fetchCountCart } from '../../redux/actions/countcartAction'
import Toast from '../../Component/Toast'
import Slider from '../../Component/Slider/Slider';

import ProductSlider from '../../Component/Slider/ProductSlider';


//import { addWish, productDescription } from '../../Services/services'
//import { fetchproductInfo } from '../../redux/actions/productInfoAction';
//import AlertView from '../../Component/Modal/AlertView';
//import ProductDetailsModal from '../../Component/Modal/ProductDetailsModal';



const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height

const HEADER_MAX_HEIGHT = HEIGHT / 1.5;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ratingObj = {
    ratings: 0,
    views: 0
}
class ProductInformation extends React.Component {

    constructor(props) {
        super(props);

       console.log( HEIGHT )

        this.state = {
            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            refreshing: false,
            menu: [
                {
                    id: 1,
                    title: 'Product Details',

                },
                {
                    id: 2,
                    title: 'Product Description',

                },
                {
                    id: 3,
                    title: 'Reviews',
                }
            ],
            addcart: false,
            modalopen: false,
            productdetailsmodal: false,
            alertopen: false,
            visibleToast: false,
            message: '',


        };
    }





    renderAccordians = () => {
        const items = [];
        for (const item of this.state.menu) {

            items.push(
                <Details
                    key={item.id}
                    // id={item.id}
                    title={item.title}
                    data={item.data}
                    handlePress={() => this.handleItem(item.id)}
                />
            );
        }
        return items;
    }

    _renderScrollViewContent() {

        return (
            <View style={styles.scrollViewContent}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Gold</Text>
                    <View>
                        <StarRating ratingObj={ratingObj} />
                    </View>

                </View>
                <View >
                    <Text style={{ fontSize: 25, fontFamily: 'Poppins-Medium' }}>{this.props.route.params.title}</Text>
                    <Text style={{ fontSize: 20, fontFamily: 'Roboto-Medium' }}>₹{this.props.route.params.price}</Text>

                    {/*<View style={{borderColor:'black',borderWidth:0.3,marginTop:10}}/>
                    <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 15 }}><Text style={{fontSize:20,fontWeight:'bold'}}>Availabilty :</Text> In Stock</Text>
        </View>*/}

                    <View style={{ height: HEIGHT / 2, marginTop: 50 }}>
                        {this.renderAccordians()}
                    </View>
                </View>

            </View>
        );
    }





    render() {
        // Because of content inset the scroll value will be negative on iOS so bring
        // it back to 0.
        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
        );
        const headerTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });

        const imageOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE /2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });

        const textOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 1, 1],
            extrapolate: 'clamp',
        });

        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const titleScale = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 1],
            extrapolate: 'clamp',
        });
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -8],
            extrapolate: 'clamp',
        });



        return (
            <View style={styles.fill}>

                {/*   <AlertView title="Error" message="Please first log in your account" alertopen={this.state.alertopen} closealert={() => this.closeAlert()}></AlertView>
                <ProductDetailsModal modalopen={this.state.productdetailsmodal} closeModal={() => this.closeproductdetailsmodal()} purity={this.props.route.params.purity}
                    weight={this.props.route.params.weight} name={this.props.route.params.title} />
                < DescriptionModal modalopen={this.state.modalopen} closeModal={() => this.closeModal()}
                    description={this.props.product_Detail}
        />*/}
                <StatusBar
                    translucent
                    barStyle="light-content"
                    backgroundColor="rgba(0, 0, 0, 0.251)"
                />
                <Animated.ScrollView
                    style={styles.fill}
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        { useNativeDriver: true },
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({ refreshing: true });
                                setTimeout(() => this.setState({ refreshing: false }), 1000);
                            }}
                            // Android offset for RefreshControl
                            progressViewOffset={HEADER_MAX_HEIGHT}
                        />
                    }
                    // iOS offset for RefreshControl
                    contentInset={{
                        top: HEADER_MAX_HEIGHT,
                    }}
                    contentOffset={{
                        y: -HEADER_MAX_HEIGHT,
                    }}
                >

                    {this._renderScrollViewContent()}

                </Animated.ScrollView>
                <Animated.View
                    //pointerEvents="none"
                    style={[
                        styles.header,
                        { transform: [{ translateY: headerTranslate }] },
                    ]}
                >



                  {/*  <Animated.Image
                        style={[
                            styles.backgroundImage,
                            {
                                opacity: imageOpacity,
                                transform: [{ translateY: imageTranslate }],
                            },
                        ]}
                        source={{ uri: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" }}

                    />*/}
                  
                         <ProductSlider  opacity={imageOpacity} translate={imageTranslate}/>
                    
                  

                    <Toast visible={this.state.visibleToast} message={this.state.message} />



                </Animated.View>

                <Animated.View
                    style={[
                        styles.bar,
                        {
                            //opacity: textOpacity,
                            transform: [
                                { scale: titleScale },
                                { translateY: titleTranslate },
                            ],
                        },
                    ]}
                >
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductList')}>
                        <Ionicons name="chevron-back" size={30} color="black" />
                    </TouchableOpacity>
                    <Animated.View
                       style={[
                       // styles.bar,
                        {
                            opacity: textOpacity,
                            transform: [
                                { scale: titleScale },
                                { translateY: titleTranslate },
                            ],
                        },
                    ]} >
                           <Text style={styles.title}>{this.props.route.params.title}</Text>
                    </Animated.View>
                 
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
                            <Ionicons name="cart" size={35} color="black" />
                        </TouchableOpacity>
                        {/*<View style={{ position: 'absolute' }}>
                            <QuantityBadge count={this.props.itemcount.countItem} />
                    </View>*/}
                    </View>

                </Animated.View>



                <View style={{ marginHorizontal: 10, marginVertical: 10 }} >
                    {this.state.addcart == false ?
                        <TouchableOpacity style={{ backgroundColor: '#0A3873', width: WIDTH / 1.06, borderRadius: 10, height: HEIGHT / 20, padding: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.addtoCart()}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Add To Cart</Text>
                        </TouchableOpacity>
                        :
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity style={{ backgroundColor: '#0A3873', width: WIDTH / 2.5, borderRadius: 10, height: HEIGHT / 20, padding: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.addtoCart()}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Add To Cart</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: '#0A3873', width: WIDTH / 3, borderRadius: 10, height: HEIGHT / 20, padding: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Cart')}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>View Cart</Text>
                            </TouchableOpacity>
                        </View>}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: 'white'

    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
      
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 28 : 38,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    title: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
       
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
        marginHorizontal: 10,
        margin: 20,
        backgroundColor: 'white'
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    likebackgroundImage: {

        // margin: 10,
        marginHorizontal: 5,
        marginTop: HEIGHT / 1.7,
        width: WIDTH / 12,
        height: HEIGHT / 24,
        resizeMode: 'cover',

    }
});




export default ProductInformation;
