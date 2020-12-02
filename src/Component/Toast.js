import React from 'react';
import { View, StyleSheet, ToastAndroid, Button } from "react-native";


const Toast = ({ visible, message }) => {
    if (visible) {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      return null;
    }
    return null;
  };

  export default Toast;