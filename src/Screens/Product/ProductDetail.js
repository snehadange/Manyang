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
    Image,
    Modal, TextInput
} from 'react-native';
import { Imagepath } from '../../index';


import { fetchProductDetails } from '../../redux/actions/productdetailsActions'
import { fetchAddToCart } from '../../redux/actions/addcartAction'

import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'

import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from '../../Component/Rating/StarRating';
import Details from '../../Component/Accordian/Details'
import AsyncStorage from '@react-native-community/async-storage';


import DescriptionModal from '../../Component/Modal/DescriptionModal';
import QuantityBadge from '../../Component/QuantityBadge';
import { fetchCountCart } from '../../redux/actions/countcartAction'
import Toast from '../../Component/Toast'

import AlertView from '../../Component/Modal/AlertView';
import ProductDetailsModal from '../../Component/Modal/ProductDetailsModal';

import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker'
import { addWish } from '../../Services/services'


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height

const HEADER_MAX_HEIGHT = HEIGHT / 1.5;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ratingObj = {
    ratings: 0,
    views: 0
}
class ProductDetail extends React.Component {


    constructor(props) {
        super(props);



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
            itemcount: '',
           selectedValue:''
        };
    }

    async componentDidMount() {


        this.setState({
            addcart: false
        })

        const userid = await AsyncStorage.getItem('userid')



        console.log("route parameter", this.props.route.params)

        this.props.fetch(this.props.route.params.pid, userid)
        this.props.countCart(userid)

        //console.log("productdetailsdata", this.props.product_Detail.productdetails.length)

        this.setState({
            visibleToast: false
        })


    }

    closeModal = () => {
        this.setState({
            modalopen: false
        })
    }
    closeproductdetailsmodal = () => {
        this.setState({
            productdetailsmodal: false
        })
    }

    closeAlert = () => {
        this.setState({
            alertopen: false
        })
        this.props.navigation.navigate('User')
    }

    handleItem = (id) => {

        switch (id) {
            case 1:
                this.setState({
                    productdetailsmodal: true
                })
                break;
            case 2:
                this.setState({
                    modalopen: true
                })
                break;
            case 3:
                console.log("Not found")
                break;
            default:
                Alert.alert("Error,Plese try again later")
        }
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
                <View style={{ backgroundColor: 'white', flexDirection: 'column', borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                        <Text style={styles.productName}>{this.props.route.params.title}</Text>
                        <View>
                            <StarRating ratingObj={ratingObj} />
                        </View>

                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                        <Text style={{
                            fontSize: 20, fontFamily: 'SpaceGrotesk-light', color: 'black'
                        }}>Price : ₹{this.props.route.params.price}</Text>
                        {/* <Text style={{
                            fontSize: 15, fontFamily: 'Poppins-SemiBold', color: 'black'
                        }}>(In Stock)</Text>*/}
                        {Object.values(this.props.product_Detail.productdetails).map((values, i) => {
                            return (
                                <TouchableOpacity key={i} onPress={() => this.setLike(i)} >

                                    <Image
                                        style={{
                                            width: Platform.isPad ?WIDTH /17:WIDTH / 12 , //WIDTH / 12,
                                            height: HEIGHT / 24,
                                        }}
                                        source={values.product_like == 'False' ? require('../../../assets/heart.png') : require('../../../assets/heart_red.png')} />
                                </TouchableOpacity>


                            )
                        })
                        }
                    </View>
                </View>



                {/*<View style={{ borderColor: 'black', borderWidth: 1, opacity: 0.2, marginTop: 10, }} />*/}

                {/*<View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: 20, borderRadius: 10,alignItems:'center'}}>
                    <Text style={{ fontSize: 20, fontFamily: 'Roboto-Medium', color: '#0A3873', textShadowOffset: { width: -1, height: 1 }, fontWeight: 'bold' }}>Quantity :</Text>
                    {/* <DropDownPicker
                            items={[
                                { label: '1', value: '1' },
                                { label: '2', value: '2' },
                                { label: '3', value: '3' },
                            ]}
                            defaultValue={this.state.itemcount}
                            containerStyle={{ height: 40, width: 150 }}
                            placeholder=" Quantity"
                            style={{ backgroundColor: '#fafafa', alignItems: 'center', justifyContent: 'center' ,position:'absolute'}}
                            itemStyle={{
                               justifyContent: 'flex-start'


                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa', alignItems: 'center', justifyContent: 'center',zIndex:10 }}
                            onChangeItem={item => this.setState({
                                itemcount: item.value
                            })}
                        />

                    <Picker
                      //  mode="dropdown"
                        selectedValue={this.state.selectedValue}
                        style={{ height:HEIGHT/14, width: WIDTH/2,justifyContent:'center',alignItems:'center'}}

                        onValueChange={(itemValue, itemIndex) => this.setState({selectedValue:itemValue})}
                    >
                        {/*<Picker.Item label="Select Quantity" value="0"  />
                        <Picker.Item label="1" value="1"  style={{justifyContent:'center',alignItems:'center',backgroundColor:'yellow'}}/>
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                    </Picker>
                </View>*/}

                {/* <View style={{ borderColor: 'black', borderWidth: 1, opacity: 0.2, marginTop: 20 }} />
                   <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 15 }}><Text style={{fontSize:20,fontWeight:'bold'}}>Availabilty :</Text> In Stock</Text>
                    </View>*/}

                <View style={{ height: HEIGHT / 2, marginTop: 20}}>
                    {this.renderAccordians()}
                </View>


            </View>
        );
    }

    setLike = async (id) => {

        let newArr = [...this.props.product_Detail.productdetails]

        newArr[id].product_like = 'True'
        this.setState({
            newArr
        })

        const userid = await AsyncStorage.getItem('userid')



        addWish(this.props.route.params.pid, this.props.route.params.title, this.props.route.params.price, userid).then((likeData) => {

            if (likeData.Status == '0') {
                Alert.alert(
                    //title
                    'Hi',
                    //body

                    "Please first log in your account",
                    [
                        {
                            text: 'ok', onPress: () => this.props.navigation.navigate('User')
                        },

                    ],
                    { cancelable: false },
                    //clicking out side of alert will not cancel
                );

            } else {
                this.setState({
                    visibleToast: true,
                    message: 'Add product in wishlist'
                })
            }
        }).catch((error) => {
            console.log("Error :", error)
        })


    }

    setdisLike = (id) => {

        let newArr = [...this.props.product_Detail.productdetails]

        newArr[id].product_like = 'False'
        this.setState({
            newArr
        })

        /* this.setState({
             visibleToast: false,
             message: 'remove product in wishlist'
         })*/

    }

    addtoCart = async () => {


        this.props.addquantity()

        const userid = await AsyncStorage.getItem('userid')
        this.props.countCart(userid)

        //console.log("userid in productdetails", userid)

        await AsyncStorage.setItem('ItemCount', JSON.stringify(this.props.itemcount.countItem))

        if (userid === null) {

            this.setState({
                alertopen: true
            })
        } else {
            this.setState({
                addcart: true
            })
        }

        //console.log("quantity of product", this.props.quantity)

        this.props.fetchaddcart(this.props.route.params.pid, this.props.route.params.title, this.props.quantity, this.props.route.params.price, userid)

        // console.log("count of cart", this.props.itemcount.countItem)


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
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const textOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp',
        });


        const titleScale = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0.8],
            extrapolate: 'clamp',
        });
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -8],
            extrapolate: 'clamp',
        });



        return (
            <View style={styles.fill}>

                <AlertView title="Error" message="Please first log in your account" alertopen={this.state.alertopen} closealert={() => this.closeAlert()}></AlertView>
                <ProductDetailsModal modalopen={this.state.productdetailsmodal} closeModal={() => this.closeproductdetailsmodal()} purity={this.props.route.params.purity}
                    weight={this.props.route.params.weight} name={this.props.route.params.title} />
                < DescriptionModal modalopen={this.state.modalopen} closeModal={() => this.closeModal()}
                    description={this.props.product_Detail}
                />

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


                    <Animated.Image
                        style={[
                            styles.backgroundImage,
                            {
                                opacity: imageOpacity,
                                transform: [{ translateY: imageTranslate }],
                            },
                        ]}
                        source={{ uri: "https://manyangjewellers.com/api/file/" + this.props.route.params.imageUrl }}
                    // source={this.props.route.params.imageUrl}
                    />


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
                            { marginTop: 10 },
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
                        <View style={{ position: 'absolute' }}>
                            <QuantityBadge count={this.props.itemcount.countItem} />
                        </View>
                    </View>

                </Animated.View>


                <View style={{ marginHorizontal: 10, marginVertical: 10 }} >
                    {this.state.addcart == false ?
                        <TouchableOpacity style={{ backgroundColor: '#0A3873', width: WIDTH / 1.06, borderRadius: 10, height: HEIGHT / 20,  justifyContent: 'center', alignItems: 'center' }} onPress={() => this.addtoCart()}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Add To Cart</Text>
                        </TouchableOpacity>
                        :
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity style={{ backgroundColor: '#0A3873', width: WIDTH / 2.5, borderRadius: 10, height: HEIGHT / 20,  justifyContent: 'center', alignItems: 'center' }} onPress={() => this.addtoCart()}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Add To Cart</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: '#0A3873', width: WIDTH / 3, borderRadius: 10, height: HEIGHT / 20,  justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Cart')}>
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
        backgroundColor: '#EFECF4'
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
        marginTop: Platform.OS === 'ios' ? 28 : 45,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: 'black',
        fontSize: 25,
        fontFamily: 'Poppins-Medium'
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
        marginHorizontal: 10,
        margin: 10,
        backgroundColor: '#EFECF4'
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

    },
    productName:{
        fontSize:Platform.OS === 'ios'?20:25,
        fontFamily: 'Poppins-Medium',
        color: 'purple',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5
    }
});


const mapStateToProps = state => {

    return {
        product_Detail: state.productdetailsReducer,
        addcart: state.addcartReducer,
        quantity: state.quantityReducer,
        itemcount: state.countCartReducer,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetch: (pid, uid) => dispatch(fetchProductDetails(pid, uid)),
        fetchaddcart: (pid, pname, pqnt, pamt, uid) => dispatch(fetchAddToCart(pid, pname, pqnt, pamt, uid)),
        addquantity: () => dispatch({ type: 'ADD_QUANTITY' }),
        countCart: (uid) => dispatch(fetchCountCart(uid)),

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
