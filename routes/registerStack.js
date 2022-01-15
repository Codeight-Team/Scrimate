import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './screens/registerForm';
import OTPScreen from './screens/OTPScreen';

const Stack = createNativeStackNavigator();

function RegisterStack(){
    return (
          <Stack.Navigator>
            <Stack.Screen name="Register" component={RegisterScreen} 
                          options={{
                            headerShown: false,
            }} />
            <Stack.Screen name="OTP" component={OTPScreen} 
                          options={{
                          headerShown: false,
            }} />
          </Stack.Navigator>
      );
}

export default RegisterStack;