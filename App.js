import { StatusBar } from 'expo-status-bar';
import React, { useState, useReducer, useMemo, useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
// import Splashes from './screens/splash';
// import LoginScreen from './screens/login/screens/loginScreen';
// import OTPScreen from'./screens/register/screens/OTPScreen';
// import RegisterStack from'./routes/registerStack';
// import ForgotPasswordStack from './screens/forgot-password/forgotPasswordStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './component/context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Main from './routes/mainTabStack'
import Root from './routes/rootStack'

function App() {
  const Stack = createNativeStackNavigator();

  const initialLoginState = {
    accessToken: null,
    refreshToken: null,
    user_id: ''
  }

  const LoginReducer = (state, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...state,
          accessToken: action.token,
          refreshToken: action.refreshToken,
          user_id: action.user_id
        };
      case 'LOGIN':
        return {
          ...state,
          accessToken: action.token,
          refreshToken: action.refreshToken,
          user_id: action.user_id
        }
      case 'SIGN_OUT':
        return {
          ...state,
          accessToken: null,
          refreshToken: null,
          user_id: null
        }
        case 'FETCH_DATA':
        return {
          ...state,
          accessToken: action.token,
          refreshToken: action.refreshToken,
          user_id: action.user_id
        }
    }
  }

  const [loginState, dispatch] = useReducer(LoginReducer, initialLoginState)

  const auth = useMemo(() => ({
    login: async (data) => {
      let test = {}
        await axios.post('http://66.42.49.240/api/auth/login', data)
      .then(response => {
        test = response.data
      }
      ).catch((error) => {
        return error
      }
      )
      if(test){
        try {
          await AsyncStorage.setItem('AccessToken', test.accessToken)
          await AsyncStorage.setItem('RefreshToken', test.refreshToken)
          await AsyncStorage.setItem('user_id', test.user_id)
        } catch (error) {
          Alert.alert("Wrong Email or Password")
        }
      }
      else
        console.warn('null')
      dispatch({ type: 'LOGIN', token: test.accessToken, refreshToken: test.refreshToken, user_id: test.user_id })
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('AccessToken')
        await AsyncStorage.removeItem('RefreshToken')
        await AsyncStorage.removeItem('user_id')
      } catch (error) {
        Alert.alert('Try Again')
      }
      dispatch({type: 'SIGN_OUT'})
    }
  }))

  useEffect(()=>{
    setTimeout(async()=>{
      let accessToken = null
      let refreshToken = null
      let user_id = null
      try {
        accessToken = await AsyncStorage.getItem('AccessToken')
        refreshToken = await AsyncStorage.getItem('RefreshToken')
        user_id = await AsyncStorage.getItem('user_id')
      } catch (error) {
        Alert.alert('Sign in needed')
      }
      dispatch({type:'FETCH_DATA', token: accessToken, refreshToken: refreshToken, user_id: user_id })
    }, 1000)
  },[]);

  return (
    <AuthContext.Provider value={{state: loginState, dispatch:auth}}>
      <NavigationContainer>{loginState.accessToken? <Main/>:<Root/>}
        {/* <Stack.Navigator>
          <Stack.Screen name="Splash Screen" component={Splash}
            options={{
              headerShown: false,
            }} />
          <Stack.Screen name="Root Stack" component={RootStack}
            options={{
              headerShown: false,
            }} />
          <Stack.Screen name="Forgot Stack" component={ForgotPasswordStack} 
                          options={{
                            headerShown: false,
            }} />
          <Stack.Screen name="Register Stack" component={RegisterStack} 
                          options={{
                            headerShown: false,
            }} />
          <Stack.Screen name="Main Stack" component={MainStack}
            options={{
              headerShown: false,
            }} />
        </Stack.Navigator> */}
        <StatusBar style="auto" />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;