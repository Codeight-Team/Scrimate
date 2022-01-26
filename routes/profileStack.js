import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/main/screen/profileScreen';
import EditProfile from '../screens/user-profile/editProfile';

const Stack = createNativeStackNavigator();

function ProfileStack(){
    return (
          <Stack.Navigator>
            <Stack.Screen name="Profile Screen" component={ProfileScreen} 
                           />
            <Stack.Screen name="Edit Profile Screen" component={EditProfile} 
                            />
          </Stack.Navigator>
      );
}

export default ProfileStack;