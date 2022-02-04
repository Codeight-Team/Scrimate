import React from "react";
import { View, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function NoDataView(){
    return (
        <View style={{width: '100%', height: 200, alignItems: 'center', justifyContent: 'center'}}>
            <AntDesign name="table" size={40} color="#cecece" />
            <Text style={{fontWeight: 'bold', color: '#cecece', fontSize: 20}}>
                No Venue Found
            </Text>
        </View>
    )
}