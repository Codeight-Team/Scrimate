// In App.js in a new project

import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../component/context';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import axios from'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TrophySVG from '../../../assets/icons/trophy.svg';
import Loading from '../../../shared/loading'

function ProfileScreen({navigation}) {
  const [data, setData] = useState([]);
  const [user_id, setUserId] = useState('');
  const context = useContext(AuthContext)
  // const [user, setUser] = useState("Default");
  // const [userName, setUser] = useState("Default");
  // const [userName, setUser] = useState("Default");
  // useEffect(() => {
  //       axios.get(`https://jsonplaceholder.typicode.com/todos/1`).then((response) => {
  //           console.log(response.data);
  //         });
  // })
  useEffect(() => {
    setTimeout(async () =>{
      let user
      try {
        user = await AsyncStorage.getItem('user_id')
      } catch (error) {
        Alert.alert('Sign in needed')
      }
      setUserId(user)
    },3000)

    fetchUserData()
  }, []);

  const fetchUserData = async () => {
    let isMounted = true
    await axios.get(`http://66.42.49.240/api/users/${user_id}`).then(response => {
      let data = response.data[0]
      if(isMounted)
      setData(data)
    })
    .catch(function (error) {
        console.log(error)
    });
    return() => {isMounted = false }
  }


  const handleSignOut = () =>{
    context.dispatch.signOut()
  }
  
  return (
    <>
    <View style={styles.container}>
        <View style={[styles.box,styles.containerProfile]}>
            <Image source={{uri:'https://reactnative.dev/img/tiny_logo.png'}} style={styles.profilePicture}/>
            <View style={styles.innerProfile}>
              <Text style={[styles.white,styles.fontMedium, {textTransform:'capitalize'}]}>{data.first_name} {data.last_name}</Text>
              <View style={{marginLeft: 0, margin: 7, width: 150, height: 35, backgroundColor: '#fff', borderRadius:50, alignItems: 'center',justifyContent:'center', padding:4, flexDirection: 'row'}}>
                <TrophySVG />
                <View style={{marginLeft: 10}}>
                  <Text style={{fontSize: 11, fontWeight: 'bold', color: 'black'}}>Match Played</Text>
                  <Text style={{fontSize: 10, color: '#BCBCBC'}}>{data.Match_Player?'Data':'0'}</Text>
                </View>
              </View>
            </View>
        </View>
        
        <View style={styles.box}>
          <Text style={styles.submenuText}>Activity</Text>
          <TouchableOpacity onPress={() => console.log("Forgot Password Button Pressed")}>
            <Text>Match History</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <Text style={styles.submenuText}>Settings</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Edit Profile Screen", data)}>
            <Text>Update Profile</Text> 
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Location Button Pressed")}>
            <Text>Location / Address Settings</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <Text style={styles.submenuText}>Host</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Manage Venue Screen", user_id)}>
            <Text>Manage Venue</Text> 
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <Text style={styles.submenuText}>Account</Text>
          <TouchableOpacity onPress={() => handleSignOut()}>
            <Text>Sign out</Text> 
          </TouchableOpacity>
        </View>
    </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: '100%',
    backgroundColor:"#F4F8FF",
    padding: 20,
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  submenuText:{
    fontSize: 16,
    fontWeight:'700'
  },
  box:{
    borderRadius: 10,
    backgroundColor:'white',
    marginTop: 5,
    padding: 10,
    width: '100%',
    elevation: 3
  },
  profilePicture:{
    borderRadius: 50,
    width: 90,
    height:90,
    marginRight: 20
  },
  containerProfile:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#6C63FF',
    height: '20%',
    padding: 20
  },
  white:{
    color: 'white'
  },
  fontMedium:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  componentProfile:{
    borderRadius: 50,
    width: 100,
    height: '35%',
    backgroundColor:'#FFF',
    marginTop: 5
  },
  innerProfile:{
    flexDirection: 'column',
    justifyContent: 'center'
  },
  btnSettings:{
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 5,
    width: 25,
    height: 25,
    backgroundColor: 'white'
  },
  containerSettings:{
    flex: 1,
    alignItems: 'flex-end'
  }
})

export default ProfileScreen;