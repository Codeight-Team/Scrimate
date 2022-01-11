import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Forum from './components/posts';
import MatchDetail from './screens/MatchDetail'

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