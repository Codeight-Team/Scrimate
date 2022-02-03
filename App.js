import { StatusBar } from 'expo-status-bar';
import React, { useState, useReducer, useMemo, useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './component/context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Main from './routes/mainTabStack'
import Root from './routes/rootStack'
import Loading from './shared/loading';
import axios from 'axios'

function App() {
  const [isLoading, setIsLoading] = useState(true);

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
      let user = {}
        await axios.post('http://66.42.49.240/api/auth/login', data)
      .then(response => {
        console.log(response.data)
        user = response.data
      }
      ).catch((error) => {
        return error
      }
      )
      if(user){
        try {
          await AsyncStorage.setItem('AccessToken', user.accessToken)
          await AsyncStorage.setItem('RefreshToken', user.refreshToken)
          await AsyncStorage.setItem('user_id', user.user_id)
        } catch (error) {
          Alert.alert("Wrong Email or Password")
        }
      }
      else
        console.warn('null')
      dispatch({ type: 'LOGIN', token: user.accessToken, refreshToken: user.refreshToken, user_id: user.user_id })
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
        setIsLoading(false)
      } catch (error) {
        Alert.alert('Sign in needed')
      }
      dispatch({type:'FETCH_DATA', token: accessToken, refreshToken: refreshToken, user_id: user_id })
    }, 1000)
  },[]);

  return (
    <AuthContext.Provider value={{state: loginState, dispatch:auth}}>
      {isLoading?
      <Loading/>
        :
      <NavigationContainer>{loginState.accessToken? 
        <Main/>
          :
        <Root/>}
        <StatusBar style="auto" />
      </NavigationContainer>
    }
    </AuthContext.Provider>
  );
}

export default App;