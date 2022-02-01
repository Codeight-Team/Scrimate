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
import Payment from '../screens/payment-midtrans/paymentMethod';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home Screen" component={HomeScreen}
        options={{
          headerShown: false,
        }} />
      <Stack.Group screenOptions={{
        headerTitleStyle: {
          color: '#fff',
        },
        headerStyle: {
          backgroundColor: '#6C63FF',
        },
      }}>
        <Stack.Screen name="Activity Screen" component={ActivityScreen} options={{ title: 'Feature' }} />
        <Stack.Screen name="Reservation Screen" component={ReservationScreen} options={{
          title: 'Choose Venue',
          headerStyle: {
            backgroundColor: '#6C63FF', //Set Header color
          },
        }} />
        <Stack.Screen name="Match" component={Match} options={{ title: "Match" }} />
        <Stack.Screen name="Match Detail" component={MatchDetail} />
        <Stack.Screen name="Reserve Venue" component={ReserveVenue} options={{ title: 'Venue' }} />
        <Stack.Screen name="Create Match" component={CreateMatch} />
      </Stack.Group>

      <Stack.Screen name="Choose Field" component={ChooseField} options={{ title: 'Field' }} />
      <Stack.Screen name="Pick Date Time" component={PickDateTime} />
      <Stack.Screen name="Order Screen" component={CreateOrder} />

      <Stack.Screen name="Payment Screen" component={Payment}  options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default HomeStack;