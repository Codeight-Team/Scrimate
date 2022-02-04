import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const ManageVenue = ({ navigation, route }) => {
    const [venue, setVenue] = useState([])
    const [isUpdate, setIsUpdate] = useState("Not Updated")


    const user_id = route.params.user_id

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true
            const fetchVenues = async () => {
                await axios.get(`http://66.42.49.240/api/venue/get-my-venue/${route.params.user_id}`).then((response) => {
                    setVenue(response.data)
                })
                    .catch(error => {
                        console.log(error)
                    });
            }
            fetchVenues()
            return () => { isActive = false }
        })
    ),[];



    const renderVenue = () => {
        return venue.map(item => (
            <View key={item.venue_id} style={{
                width: "100%",
                height: 120,
                padding: 5,
            }}>

                <TouchableOpacity onPress={() => navigation.navigate('Venue Detail Screen', { venue: item.venue_id, user_id: user_id })} style={{
                    flex: 1,
                    backgroundColor: '#ffffff',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    borderRadius: 10,
                    elevation: 4,
                    flexDirection: 'row'
                }}>
                    <View style={{ width: '70%', flexDirection: 'row' }} >
                        <View style={{
                            width: "50%",
                            padding: 5,
                            height: "100%",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Image style={{ height: '100%', width: '100%', borderRadius: 10 }} source={{ uri: 'http://66.42.49.240/' + item.image }} />
                        </View>
                        <View style={{ width: '60%', padding: 10 }}>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, width: '50%' }}>
                                        {item.venue_name}
                                    </Text>

                                </View>
                                <Text>
                                    {item.address.address_street}
                                </Text>
                                <Text>
                                    {item.address.address_region}
                                </Text>
                            </View>
                        </View>
                        <View style={{width: '35%', height: '100%', justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                            {!item.isOpen ?
                                <Text style={{ fontWeight: 'bold', color: 'red' }}>
                                    CLOSED
                                </Text>
                                :
                                <Text style={{ fontWeight: 'bold', color: '#6C63FF' }}>
                                    OPEN
                                </Text>
                            }
                        </View>
                    </View>

                </TouchableOpacity>

            </View>
        ))
    }

    return (
        <View style={styles.container}>
            <View style={styles.venueContainer}>
                <View style={{ height: '90%', width: '100%', paddingVertical: 20 }}>
                    {venue.length != 0 ?
                        <View style={{ height: '100%', width: '100%' }}>
                            <ScrollView>
                                <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                                    {
                                        renderVenue()
                                    }
                                </View>
                            </ScrollView>

                        </View>
                        :
                        <View style={{ width: '100%', alignItems: 'center', }}>
                            <Text style={{ color: "gray" }}>You have no venue</Text>
                        </View>
                    }
                </View>
                <View style={styles.addContainer}>
                    <TouchableOpacity style={{
                        marginHorizontal: 10,
                        width: '30%',
                        padding: 5,
                        backgroundColor: '#6C63FF',
                        elevation: 5,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }} onPress={() => navigation.navigate('Create Venue Screen', { user_id: user_id })}>
                        <Entypo name="circle-with-plus" size={24} color="white" />
                        <View style={{ padding: 5, paddingRight: 20, justifyContent: 'center', alignItems: 'center', width: 120 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                Add New Venue
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    venueContainer: {
        width: '100%',
        height: '100%'
    },
    addContainer: {
        width: "100%",
        height: '10%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    }
})

export default ManageVenue;