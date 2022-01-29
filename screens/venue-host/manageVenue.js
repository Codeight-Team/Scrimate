import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const ManageVenue = ({ navigation }) => {
    const [venue, setVenue] = useState([])

    const renderVenue = () => {
        return venue.map(item => (
            <View key={item} style={{
                width: '100%',
                height: 200,
                padding: 10,
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                    padding: 5,
                    backgroundColor: '#ffffff',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    borderRadius: 10,
                    elevation: 4
                }}>
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
                                {
                                    renderVenue()
                                }
                            </ScrollView>

                        </View>
                        :
                        <View style={{ width: '100%', alignItems: 'center', }}>
                            <Text style={{ color: "gray" }}>You have no venue</Text>
                        </View>
                    }
                </View>
                <View style={styles.addContainer}>
                    <TouchableOpacity style={{ marginHorizontal: 10, width: '30%', padding: 5, backgroundColor: '#6C63FF', elevation: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('Create Venue Screen')}>
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