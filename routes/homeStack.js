import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/screens/homeScreen';
import ReservationScreen from '../screens/reservation/reservationScreen';
import ActivityScreen from '../screens/reservation/activityScreen';
import CreateMatch from '../screens/reservation/createMatch';
import ReserveVenue from '../screens/venue/reserveVenue';
import Match from '../screens/reservation/matchmaking-forum/components/posts';
import MatchDetail from '../screens/reservation/matchmaking-forum/screens/MatchDetail';
import ChooseField from '../screens/venue/chooseField';
import PickDateTime from '../screens/venue/pickDateTime';
import CreateOrder from '../screens/venue/createOrder';

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
              <Stack.Screen name="Activity Screen" component={ActivityScreen} options={{title: 'Choose Feature'}} />
              <Stack.Screen name="Reservation Screen" component={ReservationScreen} />
              <Stack.Screen name="Reserve Venue" component={ReserveVenue} />
              <Stack.Screen name="Choose Field" component={ChooseField} />
              <Stack.Screen name="Pick Date Time" component={PickDateTime} />
              <Stack.Screen name="Order Screen" component={CreateOrder} />
              <Stack.Group>
                <Stack.Screen name="Forum Stack" component={Match} />
                <Stack.Screen name="Match Detail" component={MatchDetail} />
              </Stack.Group>
              <Stack.Screen name="Create Match" component={CreateMatch} />
            </Stack.Navigator>
    );
}

export default HomeStack;