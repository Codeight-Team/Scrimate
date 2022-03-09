import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/user-profile/profileScreen';
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
import ManageFields from '../screens/venue-host/manageFields';
import MyMatch from '../screens/my-activity/my-match/my-match';
import ManageSchedule from '../screens/venue-host/manageSchedule';
import OTPScreen from '../screens/register/screens/OTPScreen';
import GiveRating from '../screens/rating/giveRating';

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
        <Stack.Screen name="Manage Field Screen" component={ManageFields}
        />
        <Stack.Screen name="Create Field Screen" component={CreateField}
        />
        <Stack.Screen name="Create Operational Screen" component={CreateOperational}
        />
        <Stack.Screen name="Manage Schedule Screen" component={ManageSchedule}
        />
        <Stack.Screen name="My Order" component={MyOrder}
        />
        <Stack.Screen name="My Match" component={MyMatch}
        />
        <Stack.Screen name="Payment Method" component={PaymentMethod} options={
          {
            headerShown: false
          }
        }
        />
        <Stack.Screen name="Payment" component={Payment} options={
          {
            headerShown: false
          }
        }
        />
        <Stack.Screen name="OTP" component={OTPScreen}
        />
        
      </Stack.Group>
      <Stack.Screen name="Give Rating" component={GiveRating} options={
          {
            headerShown: false
          }
        }
        />
    </Stack.Navigator>
  );
}

export default ProfileStack;