import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';

const Payment = () => {
    return (
      <WebView 
        style={styles.container}
        source={{ uri: 'https://expo.dev' }}
      />
    );
  }

  const styles = StyleSheet.create({
    container: {
          flex: 1,
      }
  })

  export default Payment;