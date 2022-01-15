import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/loginScreen';
import HomeScreen from '../home/screens/homeScreen';

const Stack = createNativeStackNavigator();

function LoginStack(){
    return (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} 
                          options={{
                            headerShown: false,
            }} />
            <Stack.Screen name="Test" component={HomeScreen} 
                          options={{
                            headerShown: false,
            }} />
          </Stack.Navigator>
      );
}

export default LoginStack;