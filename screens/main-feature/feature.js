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
            title: "Single",
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
            url: 'Reservation Screen',
            title: "Match",
            svg: "field"
        }
    ]

    function RenderActivity() {
        return data.map((item) => {
            return (
                    
                    // console.log(route.params.user)
                    <Card key={item.name} name={item.name} image={item.svg} onPress={()=> navigation.navigate(item.url, { sport: route.params.sport, user: route.params.user, title: item.title, address: address_user })} />
            )
        });
    }

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