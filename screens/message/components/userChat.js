import React, { useEffect, useState } from "react";
import { IMAGE_URL } from '@env';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import api from "../../../services/api";

const UserChat = ({ conversation, currentUser, onPress }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);

        const getUser = async () => {
            await api.get("/api/users/" + friendId)
                .then(response => {
                    setUser(response.data.userData);
                    // console.log(response.data.userData);
                })
                .catch(err => {
                    console.log(err)
                })
        };
        getUser();
    }, [currentUser, conversation]);

    return (
        <TouchableOpacity style={{ width: '100%', height: 70, borderBottomWidth: 1, borderColor: '#cccccc', flexDirection: 'row' }} onPress={onPress}>
            <View style={{ width: '25%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: 60, height: 60, backgroundColor: 'black', borderRadius: 50 }} source={{ uri: IMAGE_URL + user?.image }} />
            </View>
            <View style={{ width: '55%', height: '100%', paddingVertical: 10, justifyContent: 'center' }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                    {user?.first_name} {user?.last_name}
                </Text>
            </View>
            <View style={{ width: '15%', height: '100%', paddingVertical: 10, alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 12, color: 'gray' }}>
                    {/* {moment(new Date()).format('HH:mm')} */}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default UserChat;