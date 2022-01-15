import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Forum from '../screens/reservation/matchmaking-forum/components/posts';
import MatchDetail from '../screens/reservation/matchmaking-forum/screens/MatchDetail';

const Stack = createNativeStackNavigator();

function ForumStack(){
    return(
            <Stack.Navigator>
              <Stack.Screen name="Match" component={Forum} />
              {/* <Stack.Screen name="Post Detail" component={ReservationScreen} /> */}
              <Stack.Screen name="Match Detail" component={MatchDetail} />
            </Stack.Navigator>
    );
}

export default ForumStack;