import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessageFocus from '../screens/message/screens/messageFocus'
import MessageMainScreen from '../screens/message/screens/messageMainScreen'

const Stack = createNativeStackNavigator();

function MessageStack(){
    return(
            <Stack.Navigator>
              <Stack.Screen name="Message Main" component={MessageMainScreen} 
                            options={{
                              title: 'Message',
              }} />
              {/* <Stack.Screen name="Profile" component={OTPScreen} 
                            options={{
                            headerShown: false,
              }} /> */}
              <Stack.Screen name="Message Focus" component={MessageFocus} />
            </Stack.Navigator>
    );
}

export default MessageStack;