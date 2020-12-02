import React from 'react'
import { StyleSheet, View, Text, Platform, Dimensions, Image ,LogBox} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';





const BannerWidth = Dimensions.get('window').width;
const BannerHeight =  Dimensions.get('window').height;

/*const images = ["https://image.freepik.com/free-photo/woman-with-shopping-bags-studio-yellow-background-isolated_1303-14294.jpg",
   "https://as2.ftcdn.net/jpg/00/80/86/99/500_F_80869993_H8DhJ0MjgvckBFICpqtbniLzzGDxDbJK.jpg",
   "https://img.freepik.com/free-vector/vector-smiling-girl-shopper_1441-15.jpg?size=338&ext=jpg&ga=GA1.2.1421634149.1599242271",
   
];*/

const images=[ 
   "https://i.pinimg.com/originals/a2/f4/f0/a2f4f0d97548dcfd81f6d594eb2f2cd4.jpg",
   "https://i.pinimg.com/originals/08/61/a6/0861a6292d6ecc668837bb7ae5c01c3a.jpg",
   "https://i.pinimg.com/564x/e3/00/06/e30006f36aa7aef98bf704aed41c9806.jpg"
]

export default class StartSlider extends React.Component {
  scrollRef=React.createRef();

  state = {
    slideImages:[],
    selectedIndex:0
  }

  componentDidMount() {
  

       setInterval(()=>{
         this.setState(prev=>({
           // selectedIndex:prev.selectedIndex === this.state.slideImages.length -1?0:prev.selectedIndex+1
           selectedIndex:prev.selectedIndex === images.length -1?0:prev.selectedIndex+1
         }),
         ()=>{
            this.scrollRef.current.scrollTo({
              animated:true,
              y:0,
              x:BannerWidth*this.state.selectedIndex
            })
         })
       },3000)
   }
  
   setSelectedIndex=event=>{
       const viewSize=event.nativeEvent.layoutMeasurement.width
       const contentOffset=event.nativeEvent.contentOffset.x; //get current position of scrollview
  
       const selectIndex=Math.floor(contentOffset/viewSize)
       this.setState({
          selectedIndex:selectIndex
       })
   }

  
  render() {
  
    return (
      <View style={{height:'100%',width:'100%',backgroundColor:'#C0C0C0'}}> 
    
        <ScrollView
         horizontal
          pagingEnabled 
          onMomentumScrollEnd={this.setSelectedIndex}
          ref={this.scrollRef}
          showsHorizontalScrollIndicator={false}
          >
       
           {
              
             images.map((item,index)=>{  
           
               return(
               <Image
                 key={index}
                 //source={{uri:"https://demo.suprjewels.app/consumerapp_api/file/"+item.img}}
                 source={{uri:item}}
                 style={styles.slideImage}
               />   )
             })
          
           }
        </ScrollView>
        <View style={styles.circleDev}>
         {images.map((image,i)=>{
            
           return(
            <View key={image} style={[styles.whiteCircle,{
              opacity:i === this.state.selectedIndex ?0.5:1
            }]}/>)
         })

         }
        </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
 slideImage:{
    height:BannerHeight,
    width:BannerWidth,
    resizeMode:'cover',
    
 },
 circleDev:{
    position:'absolute',
    bottom:15,
    height:10,
    width:'100%',
    display:"flex",
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
 },
 whiteCircle:{
   width:6,
   height:6,
   borderRadius:3,
   margin:5,backgroundColor:"red"
 }
});
