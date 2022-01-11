import React from 'react';
import { View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import ProfileScreen from './screen/profileScreen';
import EditProfile from './screen/accountSettings';
import MessageStack from '../message/messageStack';
import ReservationScreen from '../reservation/reservationScreen';
import HomeIconActive from '../../assets/icons/home-active.svg';
import HomeIcon from '../../assets/icons/home.svg';
import UserIcon from '../../assets/icons/user-icon.svg';
import UserIconActive from '../../assets/icons/user-icon-active.svg';
import ChatIcon from '../../assets/icons/rocket-chat.svg';
import ChatIconActive from '../../assets/icons/rocket-chat-active.svg';
import axios from 'axios';
import HomeStack from '../home/homeStack';
import HomeScreen from '../home/screens/homeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabStack = () =>{
    return (
      //   <NavigationContainer>
      //     <Stack.Navigator>
      //       <Stack.Screen name="Home Child" component={HomeTab} 
      //                     options={{
      //                       headerShown: false,
      //       }} />
      //       {/* <Stack.Screen name="Profile" component={OTPScreen} 
      //                     options={{
      //                     headerShown: false,
      //       }} /> */}
      //       <Stack.Screen name="Edit Profile" component={EditProfile} />
      //       <Stack.Screen name="Reservation Screen" component={ReservationScreen} />
      //     </Stack.Navigator>
      //   </NavigationContainer>
        <Tab.Navigator screenOptions={{
          tabBarShowLabel:false,
          headerShown: false,
          tabBarStyle: { position: 'absolute' },
          tabBarHideOnKeyboard: true,
        }}>
              <Tab.Screen name="Home" component={HomeStack} options={{
                title:"Home",
                headerTitleAlign: 'center',
                tabBarIcon: ({focused}) => {
                  if(focused)
                    return <View><HomeIconActive/></View>
                  return <View><HomeIcon/></View>
                },
              }} />
              <Tab.Screen name="Chat" component={MessageStack} options={{
                title:"Chat",
                headerTitleAlign: 'center',
                tabBarIcon: ({focused}) => {
                  if(focused)
                    return <View><ChatIconActive/></View>
                  return <View><ChatIcon/></View>
                },
              }} />
              <Tab.Screen name="Profile" component={ProfileScreen} options={{
                title:"Profile",
                headerTintColor:"black",
                headerShadowVisible: true ,
                headerShown: true,
                headerTitleStyle:{
                  fontSize: 20
                },
                headerStyle:{
                  // backgroundColor:"#F4F8FF",
                },
                tabBarIcon: ({focused}) => {
                  if(focused)
                    return <View><UserIconActive/></View>
                  return <View><UserIcon/></View>
                }
              }}/>
        </Tab.Navigator>
      );
}

export default MainTabStack;

// export function HomeTab(){
//       return(
//         <Tab.Navigator screenOptions={{
//           tabBarShowLabel:false,
//           headerShown: false,
//           tabBarStyle: { position: 'absolute' },
//         }}>
//               <Tab.Screen name="Home" component={HomeScreen} options={{
//                 title:"Home",
//                 headerTitleAlign: 'center',
//                 tabBarIcon: ({focused}) => {
//                   if(focused)
//                     return <View><HomeIconActive/></View>
//                   return <View><HomeIcon/></View>
//                 }
//               }} />
//               <Tab.Screen name="Chat" component={ChatScreen} options={{
//                 title:"Chat",
//                 headerTitleAlign: 'center',
//                 tabBarIcon: ({focused}) => {
//                   if(focused)
//                     return <View><ChatIconActive/></View>
//                   return <View><ChatIcon/></View>
//                 }
//               }} />
//               <Tab.Screen name="Profile" component={ProfileScreen} options={{
//                 title:"Profile",
//                 headerTintColor:"black",
//                 headerShadowVisible: true ,
//                 headerShown: true,
//                 headerTitleStyle:{
//                   fontSize: 20
//                 },
//                 headerStyle:{
//                   // backgroundColor:"#F4F8FF",
//                 },
//                 tabBarIcon: ({focused}) => {
//                   if(focused)
//                     return <View><UserIconActive/></View>
//                   return <View><UserIcon/></View>
//                 }
//               }}/>
//         </Tab.Navigator>
//       );
// }