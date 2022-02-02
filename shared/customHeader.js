import React from 'react';
import {Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CustomHeader = ({title, onPressBackButton, backButtonModel}) => {
    return (
      <View style={{
        width: '100%', height: '15%', alignItems: "center", justifyContent: "center", backgroundColor: '#6C63FF',
        elevation: 5, flexDirection: "row"
      }}>
        <View style={{ top: 20, width: '15%', alignItems: "center" }}>
          <TouchableOpacity onPress={onPressBackButton}>
            <AntDesign name={backButtonModel} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ top: 20, width: '70%', alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: 'white' }}>
            {title}
          </Text>
        </View>
        <View style={{ top: 20, width: '15%' }}/>
      </View>
    )
  }

export default CustomHeader;