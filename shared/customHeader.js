import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CustomHeader = ({ title, onPressBackButton, backButtonModel, type }) => {
  return (
    <View style={{
      width: '100%', height: 100, alignItems: "center", justifyContent: "center", backgroundColor: '#6C63FF',
      elevation: 5, flexDirection: "row"
    }}>
      <TouchableOpacity style={{ top: 20, width: '15%', alignItems: "center" }} onPress={onPressBackButton}>
        <AntDesign name={backButtonModel} size={24} color="black" />
      </TouchableOpacity>
      <View style={[type == "message" ? { alignItems: "center", flexDirection: 'row'  } : { alignItems: "center" }, { top: 20, width: '70%'}]}>
        {type &&(
          <View style={{width: '20%', height: '100%'}}>
            <Image source={{uri:'https://reactnative.dev/img/tiny_logo.png'}} style={{backgroundColor: 'black', width: 45, height: 45, borderRadius: 50}} />
          </View>
          )
        }
        <Text style={[{fontSize: 20, fontWeight: "bold", color: 'white' }, type=='message'&&{fontSize: 17}]}>
          {title}
        </Text>
      </View>
      <View style={{ top: 20, width: '15%' }} />
    </View>
  )
}

export default CustomHeader;