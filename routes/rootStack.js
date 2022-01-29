import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/loginScreen';
import RegisterStack from './registerStack';
import ForgotPasswordStack from './forgotPasswordStack';
import Splash from '../screens/splash';
import FormRegister from '../screens/register/screens/formRegister';

const Stack = createNativeStackNavigator();

function RootStack(){
    return (
          <Stack.Navigator>
            <Stack.Screen name="Splash" component={Splash} 
                          options={{
                            headerShown: false,
            }} />
            <Stack.Screen name="Login" component={LoginScreen} 
                          options={{
                            headerShown: false,
            }} />
            <Stack.Screen name="Register" component={RegisterStack} 
                          options={{
                            headerShown: false,
            }} />
             <Stack.Screen name="Forgot Stack" component={ForgotPasswordStack} 
                          options={{
                            headerShown: false,
            }} />
            <Stack.Screen name="Form Register" component={FormRegister} 
                          options={{
                            headerShown: false,
            }} />
          </Stack.Navigator>
      );
}

export default RootStack;