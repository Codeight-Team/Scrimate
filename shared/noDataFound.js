import React from "react";
import { View, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function NoDataView({ type, message }) {
    return (
        <View style={{ width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' }}>
            <AntDesign name="table" size={40} color="#cecece" />
            {
                !message ?
                    <Text style={{ fontWeight: 'bold', color: '#cecece', fontSize: 20 }}>
                        No <Text>{type}</Text> Found
                    </Text>
                    :
                    <Text style={{ fontWeight: 'bold', color: '#cecece', fontSize: 20 }}>
                        {message}
                    </Text>
            }

        </View>
    )
}