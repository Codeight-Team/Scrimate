import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/register/screens/registerForm';
import OTPScreen from '../screens/register/screens/OTPScreen';

const Stack = createNativeStackNavigator();

function RegisterStack(){
    return (
          <Stack.Navigator>
            <Stack.Screen name="Register Form" component={RegisterScreen} 
                          options={{
                            headerShown: false,
            }} />
            <Stack.Screen name="OTP Screen" component={OTPScreen} 
                          options={{
                          headerShown: false,
            }} />
          </Stack.Navigator>
      );
}

export default RegisterStack;