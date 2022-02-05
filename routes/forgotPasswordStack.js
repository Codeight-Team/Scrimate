import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectionMethod from '../screens/forgot-password/screens/selectionMethod';
import FormEmail from '../screens/forgot-password/screens/formEmail';
import SuccessScreen from '../screens/forgot-password/screens/success';

const Stack = createNativeStackNavigator();

function ForgotPasswordStack(){
    return (
          <Stack.Navigator>
            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            <Stack.Screen name="Selection Screen" component={SelectionMethod} 
                          options={{
                            headerShown: false,
            }} />
            <Stack.Screen name="Form Email" component={FormEmail} 
                          options={{
                          headerShown: false,
            }} />
            <Stack.Screen name="Success" component={SuccessScreen} 
                          options={{
                          headerShown: false,
            }} />
          </Stack.Navigator>
      );
}

export default ForgotPasswordStack;