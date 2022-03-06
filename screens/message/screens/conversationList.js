import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView, Image, Pressable } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import api from '../../../services/api';
import moment from 'moment';
import io from 'socket.io-client';

function ConversationList({ navigation }) {
    const [myChat, setMyChat] = useState()
    const ENDPOINT = 'ws://66.42.49.240:8900';

    useEffect(() => {
        const socket = io(ENDPOINT, {transport:['websocket'], jsonp: false})
        socket.connect();
        socket.on('connect', ()=> console.log('socket connected..'))
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <TouchableOpacity style={{ width: '100%', height: 70, borderBottomWidth: 1, borderColor: '#cccccc', flexDirection: 'row' }} onPress={()=> navigation.navigate('Message Focus')}>
                    <View style={{ width: '25%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ width: 60, height: 60, backgroundColor: 'black', borderRadius: 50 }} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                    </View>
                    <View style={{ width: '55%', height: '100%', paddingVertical: 10 , justifyContent: 'center'}}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                            Rafi
                        </Text>
                    </View>
                    <View style={{ width: '15%', height: '100%', paddingVertical: 10, alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 12, color: 'gray' }}>
                            {moment(new Date()).format('HH:mm')}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F8FF",
    },
    inner: {
        width: '100%',
        flexDirection: 'column',
        flexWrap: 'wrap',
    }
});

export default ConversationList;