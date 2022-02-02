import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import Card from '../../shared/card';
import axios from 'axios';

function ActivityScreen({ navigation, route }) {
    const [address_user, setAddress] = useState()
    const data = [
        {
            name: "Reservation",
            url: 'Reservation Screen',
            title: "Reserve",
            svg: "soccer"
        },
        {
            name: "Find Match",
            url: 'Match',
            title: "Forum",
            svg: "match"
        },
        {
            name: "Create Match",
            url: 'Create Match',
            title: "Create",
            svg: "field"
        }
    ]

    function RenderActivity() {
        return data.map((item) => {
            return (
                    
                    // console.log(route.params.user)
                    <Card key={item.name} name={item.name} image={item.svg} onPress={()=> navigation.navigate(item.url, { sport: route.params.sport, user: route.params.user, address: address_user })} />
            )
        });
    }

    useEffect(() => {
        const getAddress = async () => {
            await axios.get(`http://66.42.49.240/api/address/${route.params.user.address_id}`).then((response) => {
                console.log(response.data)
            })
                .catch(error => {
                    console.log(error)
                });
        }
        getAddress()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ color: 'gray', fontWeight: 'bold' }}>{route.params.sport}</Text>
            </View>
                <View style={{width: '100%'}}>
                    {
                        RenderActivity()
                    }
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#F4F8FF",
        padding: 0,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    titleContainer: {
        width: '100%',
        height: '6%',
        paddingHorizontal: '3%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'flex-start',
        elevation: 4
    }
});

export default ActivityScreen;