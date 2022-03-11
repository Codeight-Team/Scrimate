// In App.js in a new project

import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useState, useContext } from 'react';
import { AuthContext } from '../../component/context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import TrophySVG from '../../assets/icons/trophy.svg';
import Loading from '../../shared/loading'
import api from '../../services/api';
import { AntDesign } from '@expo/vector-icons';
import { IMAGE_URL } from '@env'

function ProfileScreen({ navigation }) {
  const [data, setData] = useState([]);
  const context = useContext(AuthContext)
  const [role, setRole] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true
      const fetchUser = async () => {
        let user
        let role
        try {
          user = await AsyncStorage.getItem('user_id')
          role = await AsyncStorage.getItem('role')
          setRole(JSON.parse(role))
        } catch (error) {
          Alert.alert('Sign in needed')
        }
        fetchUserData(user, isActive)
      }
      fetchUser()
      return () => { isActive = false }
    }, [])
  );

  const fetchUserData = async (user, isActive) => {
    await api.get(`/api/users/${user}`).then(response => {
      if (isActive)
        setData(response.data.userData)
    })
      .catch(function (error) {
        console.log(error)
      });
  }

  const handleSignOut = () => {
    context.dispatch.signOut()
  }

  return (
    <>
      <View style={styles.container}>
        <View style={[styles.box, styles.containerProfile]}>
          <Image source={{ uri: IMAGE_URL + data.image }} style={styles.profilePicture} />
          <View style={styles.innerProfile}>
            <Text style={[styles.white, styles.fontMedium, { textTransform: 'capitalize' }]}>{data.first_name} {data.last_name}</Text>
            <View style={{ marginLeft: 0, margin: 7, width: 150, height: 35, backgroundColor: '#fff', borderRadius: 50, alignItems: 'center', justifyContent: 'center', padding: 4, flexDirection: 'row' }}>
              <TrophySVG />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: 'black' }}>Match Played</Text>
                <Text style={{ fontSize: 10, color: '#BCBCBC' }}>{data.Match_Played ? data.Match_Played : '0'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* {
          !data?.isVerif &&
          <View style={[styles.box, { backgroundColor: '#ffb2b2' }]}>
            <Text style={styles.submenuText}> <AntDesign name="warning" size={15} color="black" /> Your Account is Not Verified </Text>
            <TouchableOpacity onPress={() => navigation.navigate('OTP', { email: data.email, id:data.user_id })}>
              <Text style={{color: 'blue'}}>Verify Account</Text>
            </TouchableOpacity>
          </View>
        } */}

        <View style={styles.box}>
          <Text style={styles.submenuText}>Activity</Text>
          <TouchableOpacity onPress={() => navigation.navigate('My Order', { user_id: data.user_id, type: "Order" })}>
            <Text>Order History</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <Text style={styles.submenuText}>Settings</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Edit Profile Screen", data)}>
            <Text>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Edit Location Screen', { data: data })}>
            <Text>Location / Address Settings</Text>
          </TouchableOpacity>
        </View>
        {role.find(e => e == "ROLE_HOST") ?
          <View style={styles.box}>
            <Text style={styles.submenuText}>Host</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Manage Venue Screen", { user_id: data.user_id })}>
              <Text>Manage My Venue</Text>
            </TouchableOpacity>
          </View>
          :
          <View />
        }
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
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: "#F4F8FF",
    padding: 20,
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  submenuText: {
    fontSize: 16,
    fontWeight: '700'
  },
  box: {
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 5,
    padding: 10,
    width: '100%',
    elevation: 3
  },
  profilePicture: {
    borderRadius: 50,
    width: 90,
    height: 90,
    marginRight: 20
  },
  containerProfile: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#6C63FF',
    height: '20%',
    padding: 20
  },
  white: {
    color: 'white'
  },
  fontMedium: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  componentProfile: {
    borderRadius: 50,
    width: 100,
    height: '35%',
    backgroundColor: '#FFF',
    marginTop: 5
  },
  innerProfile: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  btnSettings: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 25,
    height: 25,
    backgroundColor: 'white'
  },
  containerSettings: {
    flex: 1,
    alignItems: 'flex-end'
  }
})

export default ProfileScreen;