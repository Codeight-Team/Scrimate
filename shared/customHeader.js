import React from 'react';
import {Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CustomHeader = ({props, title, content, onPress}) => (
    <View>
        <Text
            {...props}
            style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
            {title}
        </Text>
        {content?
            <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {/* {route.params.user_address} */}
                    {content}
                </Text>
                <View style={{ padding: 3 }}>
                    <AntDesign name="caretdown" size={10} color="black" />
                </View>
            </TouchableOpacity>
            :
            null
        }
    </View>
)

export default CustomHeader;