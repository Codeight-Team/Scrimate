import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomHeader from '../../../shared/customHeader';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

function MessageFocus({ navigation, route }) {
    const [conversation, setConversation] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        // const getConversation = async () => {
        //     await axios.get('/conversation/'+ user.user_id)
        //     .then(()=>{
        //         console.log(response.data)
        //         setConversation(response.data)
        //     }).catch(err=>{
        //         console.log(err)
        //     })
        // }
        // getConversation()
    }, [])
    const Message = ({ own , chat}) => {
        return (
            <View style={{ display: 'flex' }}>
                <View style={[{ paddingHorizontal: 15, paddingVertical: 5, flexDirection: 'row' }, own && styles.messageOwn]}>
                    {own &&
                        <Text style={{ fontSize: 8, paddingHorizontal: 5, color: 'gray' }}>{moment(new Date()).format("HH:mm")}</Text>
                    }
                    <Text style={[{ padding: 5, paddingHorizontal: 10, color: 'black', maxWidth: 250, display: 'flex', borderRadius: 10 },
                    own ? { borderBottomRightRadius: 0, backgroundColor: '#b4b0ff' } : { borderBottomLeftRadius: 0, backgroundColor: '#cecece' }]}>
                        {chat}
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
            <CustomHeader title={"Name"} backButtonModel={"arrowleft"} type={"message"} onPressBackButton={() => navigation.goBack()} />
            <View style={{ flex: 1, }}>
                <ScrollView >
                    <View>
                        <Message chat={"hai"}/>
                        <Message chat={"hei"} own={true} />
                    </View>
                </ScrollView>
                <View style={{padding: 10}}>
                    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                        <TextInput
                        style={{paddingHorizontal: 20, width: '80%', borderRadius: 20, backgroundColor: "#FFF", borderWidth: 1, borderColor: '#cecece'}}
                            multiline={true}
                            placeholder='Write something...'
                            onChangeText={(text) => this.setState({ text })}
                            />
                        <TouchableOpacity style={{width: 40, height: 40, borderRadius: 10, backgroundColor: '#6C63FF', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>
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