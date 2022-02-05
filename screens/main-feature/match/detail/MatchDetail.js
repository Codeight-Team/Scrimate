import * as React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dummy from '../../../../assets/lapangan-dummy.png'
import FlatButton from '../../../../shared/button';

function MatchDetail({ navigation, route }) {
    const data = route.params.data
    const a = [
        {
            id: 1,
            start: 9,
            end: 10
        },
        {
            id: 2,
            start: 10,
            end: 11
        },
        {
            id: 3,
            start: 11,
            end: 12
        },
        {
            id: 4,
            start: 12,
            end: 13
        },
        {
            id: 5,
            start: 14,
            end: 15
        },
    ];

    function renderDay() {
        a.map(item => {
            <Text>{item}</Text>
        }
        )
    }

    const fetchDetailMatch = async() => {
        await axios.get('Detail')
        .then(response=> {

        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.ImageContainer}>
                <Image style={{ height: '100%', width: '100%', borderRadius: 40 }} source={Dummy}></Image>
            </View>
            <View style={[styles.descriptionContainer, { alignItems: 'center', justifyContent: 'center' }]}>
                <View style={{ height: '20%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{data.venue.name}</Text>
                </View>
                <View style={{ width: '100%', height: '80%', padding: 20 }}>
                    <Text>Date: {data.schedule.date}</Text>
                    <Text>Time: {data.schedule.time}</Text>
                    <Text>Address: {data.venue.address.street}</Text>
                    <Text>Region: {data.venue.address.country}</Text>
                    <Text>Created by: {data.name}</Text>
                    <Text>Price/Hour: Rp 100000</Text>
                    {
                        renderDay()
                    }
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <FlatButton width={150} backgroundColor={'#6C63FF'} text={'Accept'}
                    onPress={() => Alert.alert('Accept Match?',
                        'You will be asked for payment if you accept this match',[
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                            },
                            {
                              text: 'OK', 
                              onPress: () => console.log('OK Pressed')
                            },
                          ],)} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#F4F8FF",
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    ImageContainer: {
        width: "100%",
        height: "28%",
        backgroundColor: 'white',
        borderRadius: 40,
        marginBottom: 20
    },
    descriptionContainer: {
        width: "100%",
        height: "40%",
        backgroundColor: "white",
        borderRadius: 40,
        elevation: 4,
    },
    buttonContainer: {
        height: '30%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MatchDetail;