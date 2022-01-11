// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity } from 'react-native';
// import {Formik} from 'formik';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import SelectionMethod from './screen/selectionMethod';
// import FormEmail from './screen/formEmail';
// import RegisterScreen from '../register/screens/registerForm';

// const Stack = createNativeStackNavigator();

// export default function forgotPasswordStack(){
//     return(
//         // <View style={styles.container}>
//         //     <Heading/>
//         //     <View style={styles.contentContainer}>
//         //         <SelectionMethod />
//         //         {/* <FormEmail/> */}
//         //     </View>
//         //     <View style={styles.wtrContainer}>
//         //         <Text style={styles.txt}>Powered by </Text>
//         //         <Text style={styles.purple}>HARAFI</Text>
//         //     </View>
//         // </View>
//         <NavigationContainer>
//             <Stack.Screen name="Forgot Password" component={RegisterScreen} />
//             <StatusBar style="auto" />
//         </NavigationContainer>
//     )
// }

// const Heading = () => {
//     return <Text style={styles.heading}>Forgot your password?</Text>;
// } 

// const styles = StyleSheet.create({
    // container:{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#F4F8FF',
    //     width: '100%'
    // },
    // heading:{
    //     fontWeight: "700",
    //     fontSize: 24
    // },
    // purple:{
    //     color:'#6C63FF'
    // },
    // bold:{
    //     fontWeight: '700'
    // },
    // txt:{
    //     color: '#CFCFCF'
    // },
    // wtrContainer:{
    //     alignItems: 'center',
    //     justifyContent: 'flex-end'
    // },
    // contentContainer:{
    //     margin: 50
    // }
// })

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SelectionMethod from './screens/selectionMethod';
import FormEmail from './screens/formEmail';
import OTPScreen from '../register/screens/OTPScreen';
import SuccessScreen from './screens/success';

const Stack = createNativeStackNavigator();

function ForgotPasswordStack(){
    return (
          <Stack.Navigator>
            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            <Stack.Screen name="Selection Screen" component={SelectionMethod} 
                          options={{
                            headerShown: false,
            }} />
            <Stack.Screen name="Form Email" component={FormEmail} 
                          options={{
                          headerShown: false,
            }} />
            <Stack.Screen name="Success" component={SuccessScreen} 
                          options={{
                          headerShown: false,
            }} />
          </Stack.Navigator>
      );
}

export default ForgotPasswordStack;