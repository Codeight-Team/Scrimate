import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/main/screen/profileScreen';
import EditProfile from '../screens/user-profile/editProfile';
import CreateVenue from '../screens/venue-host/createVenue';
import CreateField from '../screens/venue-host/createField';
import ManageVenue from '../screens/venue-host/manageVenue';

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
        <Stack.Screen name="Create Venue Screen" component={CreateVenue}
        />
        <Stack.Screen name="Create Field Screen" component={CreateField}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default ProfileStack;