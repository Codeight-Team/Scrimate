import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Splashes from './screens/splash';
import LoginScreen from './screens/login/screens/loginScreen';
import OTPScreen from'./screens/register/screens/OTPScreen';
import RegisterStack from'./screens/register/registerStack';
import ForgotPasswordStack from './screens/forgot-password/forgotPasswordStack';
import MainStack from './screens/main/mainTabStack';
import LoginStack from './screens/login/loginStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './screens/splash';

function App () {
  const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Splash Screen" component={Splash} 
                          options={{
                            headerShown: false,
            }} />
            <Stack.Screen name="Login Stack" component={LoginScreen} 
                          options={{
                            headerShown: false,
            }} />
            <Stack.Screen name="Forgot Stack" component={ForgotPasswordStack} 
                          options={{
                            headerShown: false,
            }} />
            <Stack.Screen name="Register Stack" component={RegisterStack} 
                          options={{
                            headerShown: false,
            }} />
            <Stack.Screen name="Main Stack" component={MainStack} 
                          options={{
                            headerShown: false,
            }} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
  );
}

export default App;