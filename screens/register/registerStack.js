import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/registerForm';
import OTPScreen from './screens/OTPScreen';

const Stack = createNativeStackNavigator();

function RegisterStack(){
    return (
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            <Stack.Screen name="Register" component={RegisterScreen} 
                          options={{
                            headerShown: false,
            }} />
            <Stack.Screen name="OTP" component={OTPScreen} 
                          options={{
                          headerShown: false,
            }} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      );
}

export default RegisterStack;