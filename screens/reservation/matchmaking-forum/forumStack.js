import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Forum from './screens/forum';

const Stack = createNativeStackNavigator();

function ForumStack(){
    return(
            <Stack.Navigator>
              <Stack.Screen name="Forum" component={Forum} 
                            options={{
                              headerShown: false,
              }} />
              <Stack.Screen name="Post Detail" component={ReservationScreen} />
            </Stack.Navigator>
    );
}

export default ForumStack;