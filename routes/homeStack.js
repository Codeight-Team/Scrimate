import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/homeScreen';
import ReservationScreen from '../screens/main-feature/reservation/venues';
import ActivityScreen from '../screens/main-feature/feature';
import ReserveVenue from '../screens/main-feature/reservation/child/venueDetail';
import Match from '../screens/main-feature/match/matchPost';
import MatchDetail from '../screens/main-feature/match/detail/MatchDetail';
import MyMatchList from '../screens/main-feature/match/match-owned/myMatch';
import ChooseField from '../screens/main-feature/reservation/child/fields';
import PickDateTime from '../screens/venue/pickDateTime';
// import CreateOrder from '../screens/venue/createOrder';
import PaymentMethod from '../screens/payment-midtrans/paymentMethod';
import Payment from '../screens/payment-midtrans/payment';

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
        <Stack.Screen name="My Match" component={MyMatchList} options={{ title: "Owned Match" }} />
        <Stack.Screen name="Reserve Venue" component={ReserveVenue} options={{ title: 'Venue' }} />
      </Stack.Group>
      <Stack.Screen name="Choose Field" component={ChooseField} options={{ title: 'Field' }} />
      <Stack.Screen name="Pick Date Time" component={PickDateTime} />
      <Stack.Screen name="Payment Method Screen" component={PaymentMethod}  options={{ headerShown: false }}/>
      <Stack.Screen name="Payment Screen" component={Payment}  options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default HomeStack;