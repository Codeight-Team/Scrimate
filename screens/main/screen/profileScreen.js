// In App.js in a new project

import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import SettingsImage from '../../../assets/icons/settings.svg'
import ProfilePicture from '../../../assets/bimay.jpg'
import GopaySVG from '../../../assets/icons/gopay-logo.svg'

function ProfileScreen({navigation}) {
  const [userInformation, setUser] = useState("Kampank Si Krinj");
  return (
    <View style={styles.container}>
        <View style={[styles.box,styles.containerProfile]}>
            <Image source={ProfilePicture} style={styles.profilePicture}/>
            <View style={styles.innerProfile}>
              <Text style={[styles.white,styles.fontMedium]}>{userInformation}</Text>
              <View style={{marginLeft: 0, margin: 7, width: 130, height: 35, backgroundColor: '#fff', borderRadius:50, alignItems: 'center',justifyContent:'center', padding:4, flexDirection: 'row'}}>
                <GopaySVG style={{marginRight:10}}/>
                <View>
                  <Text style={{fontSize: 11, fontWeight: 'bold', color: 'black'}}>gopay</Text>
                  <Text style={{fontSize: 10, color: '#BCBCBC'}}>Rp2.000.000</Text>
                </View>
              </View>
            </View>
            <View style={styles.containerSettings}>
              <TouchableOpacity onPress={() => navigation.navigate("Edit Profile")}>
                <View style={styles.btnSettings}>
                  <SettingsImage width={18} height={18} />
                </View>
              </TouchableOpacity>
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
          <TouchableOpacity onPress={() => navigation.navigate("Edit Profile")}>
            <Text>Update Profile</Text> 
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Message Button Pressed")}>
            <Text>Message Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Location Button Pressed")}>
            <Text>Location Settings</Text>
          </TouchableOpacity>
        </View>
    </View>
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
    padding: 5,
    height: '15%',
    width: '100%'
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