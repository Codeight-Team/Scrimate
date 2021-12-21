import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Splashes from './screens/splash';
import LoginScreen from './screens/loginScreen';
import OTPScreen from'./screens/register/screens/OTPScreen';
import RegisterStack from'./screens/register/registerStack';
import ForgotPassword from './screens/forgot-password/index';

export default function App() {
  return (
      // <View style={styles.container}>
      // {/* <Splashes /> */}
      // {/* <LoginScreen /> */}
      // {/* <RegisterStack /> */}
      // <RegisterScreen/>
      // {/* <OTPScreen /> */}
      // {/* <ForgotPassword /> */}
        <RegisterStack/>
      // <StatusBar style="auto" />
      // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
