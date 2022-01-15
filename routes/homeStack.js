import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/screens/homeScreen';
import ReservationScreen from '../screens/reservation/reservationScreen';
import ForumStack from './forumStack';
import CreateMatch from '../screens/reservation/createMatch'

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
              <Stack.Screen name="Create Match" component={CreateMatch} />
              <Stack.Screen name="Forum Stack" component={ForumStack} 
                            options={{
                              headerShown: false,
              }}/>
            </Stack.Navigator>
    );
}

export default HomeStack;