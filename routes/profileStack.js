import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/main/screen/profileScreen';
import EditProfile from '../screens/user-profile/editProfile';
import CreateVenue from '../screens/venue-host/createVenue';
import CreateField from '../screens/venue-host/createField';
import ManageVenue from '../screens/venue-host/manageVenue';
import VenueDetail from '../screens/venue-host/venue';
import CreateOperational from '../screens/venue-host/createOperational';
import PaymentMethod from '../screens/payment-midtrans/paymentMethod';
import Payment from '../screens/payment-midtrans/payment';
import MyOrder from '../screens/my-activity/my-order/myOrder';
import EditAddress from '../screens/user-profile/editLocation';

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile Screen" component={ProfileScreen}
      />
      <Stack.Screen name="Edit Profile Screen" component={EditProfile}
      />
      <Stack.Screen name="Edit Location Screen" component={EditAddress}
      />
      <Stack.Group>
        <Stack.Screen name="Manage Venue Screen" component={ManageVenue}
        />
        <Stack.Screen name="Venue Detail Screen" component={VenueDetail}
        />
        <Stack.Screen name="Create Venue Screen" component={CreateVenue}
        />
        <Stack.Screen name="Create Field Screen" component={CreateField}
        />
        <Stack.Screen name="Create Operational Screen" component={CreateOperational}
        />
        <Stack.Screen name="My Order" component={MyOrder}
        />
        <Stack.Screen name="Payment Method" component={PaymentMethod}
        />
        <Stack.Screen name="Payment" component={Payment}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default ProfileStack;