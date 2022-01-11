import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/loginScreen';

const Stack = createNativeStackNavigator();

function LoginStack(){
    return (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} 
                          options={{
                            headerShown: false,
            }} />
          </Stack.Navigator>
      );
}

export default LoginStack;