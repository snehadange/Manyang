import React from 'react'
import { StyleSheet, View, Text, Platform, Dimensions, Image, LogBox, Animated } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { slider } from '../../Services/services';




const BannerWidth = Dimensions.get('window').width;
const BannerHeight = Dimensions.get('window').height;

const HEADER_MAX_HEIGHT = BannerHeight / 1.5;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class ProductSlider extends React.Component {
  scrollRef = React.createRef();

  state = {
    scrollY: new Animated.Value(
      // iOS has negative initial scroll value because content inset...
      Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
    ),
    slideImages: [],
    selectedIndex: 0
  }

  componentDidMount() {

    slider().then((sliderData) => {
      //console.log("SilderData", sliderData)
      this.setState({
        slideImages: sliderData.Data
      })


    })

    setInterval(() => {
      this.setState(prev => ({
        selectedIndex: prev.selectedIndex === this.state.slideImages.length - 1 ? 0 : prev.selectedIndex + 1
      }),
        () => {
          this.scrollRef.current.scrollTo({
            animated: true,
            y: 0,
            x: BannerWidth * this.state.selectedIndex
          })
        })
    }, 3000)
  }

  setSelectedIndex = event => {
    const viewSize = event.nativeEvent.layoutMeasurement.width
    const contentOffset = event.nativeEvent.contentOffset.x; //get current position of scrollview

    const selectIndex = Math.floor(contentOffset / viewSize)
    this.setState({
      selectedIndex: selectIndex
    })
  }


  render() {
    //console.log("distance _______",HEADER_SCROLL_DISTANCE)
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE/2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
  });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE/2],
      outputRange: [1, 100],
      extrapolate: 'clamp',
  });

    return (
      <View style={{ height: '100%', width: '100%' }}>

        <ScrollView
          horizontal
          pagingEnabled
          onMomentumScrollEnd={this.setSelectedIndex}
          ref={this.scrollRef}
          showsHorizontalScrollIndicator={false}
        >

          {

            this.state.slideImages.map((item, index) => {
              let baseurl = "https://manyangjewellers.com/api/file/"

              return (
                <Animated.Image
                  key={index}
                  source={{ uri: baseurl + item.img }}
                  style={[
                   styles.slideImage,
                     {
                         opacity: this.props.opacity,
                         transform: [{ translateY: this.props.translate }],
                     },
                 ]}
                />)
            })

          }
        </ScrollView>
        <Animated.View style={[
                   styles.circleDev,
                     {
                         opacity: this.props.opacity,
                         transform: [{ translateY: this.props.translate }],
                     },
                 ]}>
          {this.state.slideImages.map((image, i) => {

            return (
              <View key={i} style={[styles.whiteCircle, {
                opacity: i === this.state.selectedIndex ? 0.5 : 1
              }]} />)
          })

          }
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slideImage: {
    height:'100%',
    width: BannerWidth,
    //resizeMode:'contain'
  },
  circleDev: {
    position: 'absolute',
    bottom: 15,
    height: 10,
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5, backgroundColor: "black"
  }
});
