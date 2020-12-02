import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  ActivityIndicator,

} from 'react-native';

import { getGoogleToken } from '../../Services/services'

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class GoogleRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: null,
      gettingLoginStatus: true,

    };
  }

  componentDidMount() {
    //initial configuration
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      webClientId: '87538690451-445hfval4ubqll2riovofmlhon9b4ubn.apps.googleusercontent.com',
    });
    //Check if user is already signed in
    this._isSignedIn();


  }

  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in google');
      //Get the User details as user is already signed in

      this._getCurrentUserInfo();
    } else {
      //alert("Please Login");
      console.log('Please Login');

    }
    this.setState({ gettingLoginStatus: false });
  };

  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();

      console.log('User Info --> ', userInfo);



      getGoogleToken(userInfo.user.email, userInfo.idToken, userInfo.user.name).then(async (googleRegisterData) => {
        console.log("googleRegisterData", googleRegisterData)
        if (googleRegisterData.Status == '0') {
          Alert.alert(
            //title
            'Hello',
            //body

            googleRegisterData.Msg,
            [
              {
                text: 'ok', onPress: () => console.log("google")//this.props.handleRegister()
              },

            ],
            { cancelable: false },
            //clicking out side of alert will not cancel
          );

        } else {

          this.setState({ userInfo: userInfo });
          
          await AsyncStorage.setItem("userToken", JSON.stringify(userInfo));
          await AsyncStorage.setItem('googleprofile',userInfo.user.photo)
          await AsyncStorage.setItem('username', userInfo.user.name)
          await AsyncStorage.setItem('userid', JSON.stringify(googleRegisterData.uid))
          this.props.handleRegister()
        }
      }).catch((error) => {
        console.log("error is", error)
      })

    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  _signOut = async () => {
    //Remove user session from the device.

    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null });
      await AsyncStorage.removeItem('userid')// Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  render() {

    //returning Loader untill we check for the already signed in user
    if (this.state.gettingLoginStatus) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      if (this.state.userInfo != null) {


        //Showing the User detail
        return (
          <View style={styles.container}>
            {/*<Image
              source={{ uri: this.state.userInfo.user.photo }}
              style={styles.imageStyle}
            />
            <Text style={styles.text}>
              Name: {this.state.userInfo.user.name}{' '}
            </Text>
            <Text style={styles.text}>
              Email: {this.state.userInfo.user.email}
            </Text>*/}
            <TouchableOpacity style={styles.button} onPress={()=>this._signOut()}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        //For login showing the Signin button
        return (
          <View style={styles.container}>
            <GoogleSigninButton
              style={{ width:Platform.OS === 'ios'?250:312, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this._signIn}
            />
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
});
