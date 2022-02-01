import * as React from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../shared/card'
import { AntDesign, Ionicons } from '@expo/vector-icons';

function ReservationScreen({ navigation, route }) {
    useEffect(() => {
        let isActive = true
        const fetchVenues = async () =>{
            await axios.get(`http://66.42.49.240/api/venue/`).then((response) => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error)
            });
        }
        fetchVenues()
        return () =>{isActive = false} 
    },[])

    const data = [
        {
            id: '123213',
            name: 'La Liga',
            sports: {
                name: 'futsal'
            },
            address: {
                address_city: 'Jakarta',
                address_region: 'Jakarta Barat',
                address_street: '101 Balong Mount St. '
            },
            field:[
                {
                    id: 1,
                    name: 'Field 1',
                    price: 100000
                },
                {
                    id: 2,
                    name: 'Field 2',
                    price: 100000
                },
                {
                    id: 3,
                    name: 'Field 3',
                    price: 100000
                },
                {
                    id: 4,
                    name: 'Field 4',
                    price: 100000
                }
            ],
            images: 'https://reactnative.dev/img/tiny_logo.png',
            rating: {
                id: 1,
                value: 5
            }
        },
        {
            id: '1298398',
            name: 'Happy Futsal',
            sports: {
                name: 'futsal'
            },
            address: {
                address_city: 'Jakarta',
                address_region: 'Jakarta Selatan',
                address_street: '5 Pangkalan Jati St.'
            },
            field:[
                {
                    id: 1,
                    name: 'Field 1'
                },
                {
                    id: 2,
                    name: 'Field 2'
                }
            ],
            images: '',
            rating: {
                id: 2,
                value: 4
            }
        }
    ]
    function renderVenue() {
        return data.map((item) => {
            return (
                <TouchableOpacity style={{ width: '100%' }} activeOpacity={.7} key={item.name} onPress={() =>
                    navigation.navigate("Reserve Venue", { item: item })
                }>
                    <Card type='small' name={item.name} image={item.images} description={item.address.address_region} />
                </TouchableOpacity>
            )
        });
    }
    function MainContent() {
        return (
                <>
                {
                    renderVenue()
                }
                </>
        )
    }
    function NoDataView(){
        return <Text>no Data</Text>
    }
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', flexDirection: 'row', backgroundColor: '#fff', padding: 10, elevation: 4 }}>
                    <View style={{ width: '50%', alignItems: 'flex-start' }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#6C63FF', fontWeight: 'bold' }}>
                                {route.params.user_address}
                            </Text>
                            <View style={{ padding: 4 }}>
                                <AntDesign name="caretdown" size={10} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            <View>
                {data?
                    MainContent()
                    :
                    NoDataView()
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
        paddingTop: 0,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    filter: {
        backgroundColor: '#6C63FF',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    bgLight:{
        backgroundColor: '#847dff',
    },
    bgLighter:{
        backgroundColor: '#9c96ff',
    },
    fontMedium: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default ReservationScreen;