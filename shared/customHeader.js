import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import api from '../services/api';
import {IMAGE_URL} from '@env';

const CustomHeader = ({ title, onPressBackButton, backButtonModel, type, currentUser, conversation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    type == 'message' && getFriend()
  }, [currentUser, conversation]);

  const getFriend = () =>{
    const friendId = conversation.members.find((m) => m !== currentUser);
    console.log(friendId);

    const getUser = async () => {
      await api.get("/api/users/" + friendId)
        .then(response => {
          setUser(response.data.userData);
        })
        .catch(err => {
          console.log(err)
        })
    };
    getUser();
  }



  return (
    <View style={{
      width: '100%', height: 100, alignItems: "center", justifyContent: "center", backgroundColor: '#6C63FF',
      elevation: 5, flexDirection: "row"
    }}>
      <TouchableOpacity style={{ top: 20, width: '15%', alignItems: "center" }} onPress={onPressBackButton}>
        <AntDesign name={backButtonModel} size={24} color="black" />
      </TouchableOpacity>
      <View style={[type == "message" ? { alignItems: "center", flexDirection: 'row' } : { alignItems: "center" }, { top: 20, width: '70%' }]}>
        {type && (
          <View style={{ width: '20%', height: '100%' }}>
            <Image source={{ uri: IMAGE_URL + user?.image }} style={{ backgroundColor: 'black', width: 45, height: 45, borderRadius: 50 }} />
          </View>
        )
        }
        <Text style={[{ fontSize: 20, fontWeight: "bold", color: 'white' }, type == 'message' && { fontSize: 17 }]}>
          {!type ? title : user?.first_name}
        </Text>
      </View>
      <View style={{ top: 20, width: '15%' }} />
    </View>
  )
}

export default CustomHeader;