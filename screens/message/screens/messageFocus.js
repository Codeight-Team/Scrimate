import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import CustomHeader from '../../../shared/customHeader';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import api from '../../../services/api';

function MessageFocus({ navigation, route }) {
    const [user, setUser] = useState(route.params.user);
    const [currentChat, setCurrentChat] = useState(route.params.conversation)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        console.log(currentChat._id);
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        const getMessages = async () => {
            await api.get("/api/messanger/get-message/" + currentChat?._id)
                .then(response => {
                    setMessages(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
        };
        getMessages();
    }, [currentChat]);

    const sendNewMessage = async (e) => {
        e.preventDefault();
        const message = {
            sender: user,
            text: newMessage,
            conversation_id: currentChat._id
        }
        // const receiverId = currentChat.members.find(
        //     (member) => member !== user._id
        // );

        // console.log(user);

        // socket.current.emit("sendMessage", 
        // {
        //     sender_id: user,
        //     receiver_id: receiverId,
        //     text: newMessage,
        // }, ()=> console.log('Message Sent'));

        await api.post("/api/messanger/add-message", message)
        .then(res=>{
            setMessages([...messages, res.data]);
            setNewMessage("");
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
        // console.log(newMessage);
    }

    useEffect(()=>{
        scrollRef.current?.scrollToEnd({animated: true});
    },[messages])

    const Message = ({ own, chat }) => {
        return (
            <View style={{ display: 'flex' }}>
                <View style={[{ paddingHorizontal: 15, paddingVertical: 5, flexDirection: 'row' }, own && styles.messageOwn]}>
                    {own &&
                        <Text style={{ fontSize: 8, paddingHorizontal: 5, color: 'gray' }}>{moment(new Date()).format("HH:mm")}</Text>
                    }
                    <Text style={[{ padding: 5, paddingHorizontal: 10, color: 'black', maxWidth: 250, display: 'flex', borderRadius: 10 },
                    own ? { borderBottomRightRadius: 0, backgroundColor: '#b4b0ff' } : { borderBottomLeftRadius: 0, backgroundColor: '#cecece' }]}>
                        {chat.text}
                    </Text>
                    {!own &&
                        <Text style={{ fontSize: 8, paddingHorizontal: 5, color: 'gray' }}>{moment(new Date()).format("HH:mm")}</Text>
                    }
                </View>

            </View>
        )
    }

    return (
        <View style={styles.container}>
            <CustomHeader
                title={"Name"}
                backButtonModel={"arrowleft"}
                type={"message"}
                currentUser={route.params.user}
                conversation={route.params.conversation}
                onPressBackButton={() => navigation.goBack()} />
            <View style={{ flex: 1, }}>
                <ScrollView ref={scrollRef}>
                    <View>
                        {
                            messages.map((m, index)=> (
                                <View key={index}>
                                    <Message chat={m} own={m.sender === user} />
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                        <TextInput
                            style={{ paddingHorizontal: 20, width: '80%', borderRadius: 20, backgroundColor: "#FFF", borderWidth: 1, borderColor: '#cecece' }}
                            multiline={true}
                            placeholder='Write something...'
                            onChangeText={(e) => setNewMessage(e)}
                            value={newMessage}
                        />
                        <TouchableOpacity
                            onPress={sendNewMessage}
                            style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#6C63FF', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
                            <Ionicons name="paper-plane" size={23} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F8FF",
        flexDirection: 'column',
    },
    messageOwn: {
        justifyContent: 'flex-end'
    }
});

export default MessageFocus;