import { StatusBar } from 'expo-status-bar';
import React, { useState, useReducer, useMemo, useEffect, useRef } from 'react';
import { Alert, AppState, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './component/context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Main from './routes/mainTabStack'
import Root from './routes/rootStack'
import Loading from './shared/loading';
import api from './services/api';
import { SocketContext, socket } from './component/socket'
import { TouchableOpacity } from 'react-native-gesture-handler';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const appState = useRef(AppState.currentState);

  const initialLoginState = {
    accessToken: null,
    refreshToken: null,
    user_id: '',
    role: [],
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
          user_id: action.user_id,
          role: action.role,
        }
      case 'SIGN_OUT':
        return {
          ...state,
          accessToken: null,
          refreshToken: null,
          user_id: null,
          role: null
        }
      case 'FETCH_DATA':
        return {
          ...state,
          accessToken: action.token,
          refreshToken: action.refreshToken,
          user_id: action.user_id,
          role: action.role,
        }
    }
  }

  const [loginState, dispatch] = useReducer(LoginReducer, initialLoginState)

  const auth = useMemo(() => ({
    login: async (data) => {
      let user = {}
      await api.post('/api/auth/login', data)
        .then(response => {
          user = response.data
        }
        ).catch((error) => {
          return error
        }
        )
      if (user) {
        try {
          await AsyncStorage.setItem('AccessToken', user.accessToken)
          await AsyncStorage.setItem('RefreshToken', user.refreshToken)
          await AsyncStorage.setItem('user_id', user.user_id)
          await AsyncStorage.setItem('role', JSON.stringify(user.role))
        } catch (error) {
          Alert.alert("Wrong Email or Password")
        }
      }
      else
        console.warn('null')
      dispatch({ type: 'LOGIN', token: user.accessToken, refreshToken: user.refreshToken, user_id: user.user_id, role: user.role })
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('AccessToken')
        await AsyncStorage.removeItem('RefreshToken')
        await AsyncStorage.removeItem('user_id')
        await AsyncStorage.removeItem('role')
      } catch (error) {
        Alert.alert('Try Again')
      }
      dispatch({ type: 'SIGN_OUT' })
    }
  }))

  var isFirst = true;

  const _handleAppStateChange = (nextAppState) => {
    // appState.current.match(/inactive|background/) &&
    if ( (appState.current.match(/inactive|background/) || isFirst == true ) &&
      nextAppState === "active"){
        if(isFirst == true){
          isFirst= false
        }
        socket.connect()
       console.log("This is fore"); 
      }else{
       console.log("This is back"); 
        socket.disconnect();
      }
    
      // console.log('connection background ', socket.connected)
    appState.current = nextAppState;
    // console.log("AppState", appState.current);
}  

  useEffect(() => {
    setTimeout(async () => {
      let accessToken = null
      let refreshToken = null
      let user_id = null
      let role = null
      try {
        accessToken = await AsyncStorage.getItem('AccessToken')
        refreshToken = await AsyncStorage.getItem('RefreshToken')
        user_id = await AsyncStorage.getItem('user_id')
        role = await AsyncStorage.getItem('role')

        setIsLoading(false)
      } catch (error) {
        Alert.alert('Sign in needed')
      }
      dispatch({ type: 'FETCH_DATA', token: accessToken, refreshToken: refreshToken, user_id: user_id, role: JSON.parse(role) })
    }, 1000)
  }, []);

  useEffect(()=>{
    AppState.addEventListener("change", _handleAppStateChange);
  },[])

  return (
    <AuthContext.Provider value={{ state: loginState, dispatch: auth }}>
      {isLoading ?
        <Loading />
        :
        <NavigationContainer>{loginState.accessToken ?
          <SocketContext.Provider value={socket}>
            <Main />
          </SocketContext.Provider>
          :
          <Root />
          }
          <StatusBar style="auto" />
        </NavigationContainer>
      }
    </AuthContext.Provider>
  );
}

export default App;