import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Splashes from './screens/splash';
import LoginScreen from './screens/loginScreen';
import OTPScreen from'./screens/OTPScreen';
import RegisterScreen from'./screens/registerScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Splashes /> */}
      {/* <LoginScreen /> */}
      <RegisterScreen />
      {/* <OTPScreen /> */}
      <StatusBar style="auto" />
    </View>
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
