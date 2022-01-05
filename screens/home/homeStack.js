import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/homeScreen';
import ReservationScreen from '../reservation/reservationScreen';

const Stack = createNativeStackNavigator();

function HomeStack(){
    return(
            <Stack.Navigator>
              <Stack.Screen name="Home Screen" component={HomeScreen} 
                            options={{
                              headerShown: false,
              }} />
              {/* <Stack.Screen name="Profile" component={OTPScreen} 
                            options={{
                            headerShown: false,
              }} /> */}
              <Stack.Screen name="Reservation Screen" component={ReservationScreen} />
            </Stack.Navigator>
    );
}

export default HomeStack;