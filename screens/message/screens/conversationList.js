import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import api from '../../../services/api';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage'
import io from 'socket.io-client';
import UserFriend from '../components/userChat';
import NoDataView from '../../../shared/noDataFound';
import { useFocusEffect } from '@react-navigation/native';
import { SocketContext } from '../../../component/socket'

function ConversationList({ navigation }) {
    const [myChat, setMyChat] = useState()
    const [user, setUser] = useState('')
    const [conversation, setConversation] = useState([]);
    const socket = useContext(SocketContext);

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true
            const fetchUser = async () => {
                let user
                try {
                    user = await AsyncStorage.getItem('user_id')
                } catch (error) {
                    Alert.alert('Sign in needed')
                }
                if (isActive) {
                    fetchListConversation(user)
                    setUser(user)
                    socket.emit('addUser', user)
                    // socket.on('getUsers', users => {
                    //     console.log(users);
                    // })
                }
                // set
            }
            fetchUser()
            return () => { isActive = false }
        }, [])
    );

    //   useEffect(() => {
    //     socket.current.emit("addUser", user);
    //     socket.current.on("getUsers", (users) => {
    //       setOnlineUsers(
    //         user.followings.filter((f) => users.some((u) => u.userId === f))
    //       );
    //     });
    //   }, [user]);

    const fetchListConversation = async (user) => {
        await api.get('/api/messanger/get-conversation/' + user)
            .then(response => {
                setConversation(response.data)
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                {
                    conversation.length > 0 ?
                        conversation.map(item => (
                            <UserFriend conversation={item} currentUser={user} key={item._id} onPress={() => navigation.navigate('Message Focus', { user: user, conversation: item })} />
                        ))
                        :
                        <NoDataView message={'No Conversation'} />
                }
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