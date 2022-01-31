import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/main/screen/profileScreen';
import EditProfile from '../screens/user-profile/editProfile';
import CreateVenue from '../screens/venue-host/createVenue';
import CreateField from '../screens/venue-host/createField';
import ManageVenue from '../screens/venue-host/manageVenue';
import VenueDetail from '../screens/venue-host/venue';
import CreateOperational from '../screens/venue-host/createOperational';

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile Screen" component={ProfileScreen}
      />
      <Stack.Screen name="Edit Profile Screen" component={EditProfile}
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
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default ProfileStack;