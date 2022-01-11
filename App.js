import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Splashes from './screens/splash';
import LoginScreen from './screens/loginScreen';
import OTPScreen from'./screens/register/screens/OTPScreen';
import RegisterStack from'./screens/register/registerStack';
import ForgotPasswordStack from './screens/forgot-password/forgotPasswordStack';
import MainStack from './screens/main/mainTabStack';
import axios from 'axios';

function App () {
  const [count, setCount] = useState(0);
    return (
      // <View style={styles.container}>
      // {/* <Splashes /> */}
        // <LoginScreen /> 
      // <RegisterScreen/>
      // <OTPScreen />
       <ForgotPasswordStack />
      // <HomeScreen></HomeScreen>
        // <MainStack />
        // <RegisterStack/>
        // <StatusBar style="auto" />
      // </View>
        // <View style={styles.container}>
        //     <Text>I've rendered {count} times!</Text>
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

export default App;