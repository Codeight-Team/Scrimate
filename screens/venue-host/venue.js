import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { Entypo } from '@expo/vector-icons';
import FlatButton from "../../shared/button";
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import Loading from "../../shared/loading";
import moment from "moment";

const VenueDetail = ({ navigation, route }) => {
    const venue_id = route.params.venue
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true
            const fetchVenues = async () => {
                await axios.get(`http://66.42.49.240/api/venue/venue-detail/${venue_id}`).then((response) => {
                    if (isActive) {
                        setData(response.data)
                    }
                    setLoading(false)
                })
                    .catch(error => {
                        console.log(error)
                    });
            }
            fetchVenues()
            return () => { isActive = false }
        }, [])
    );

    const day = [
        { id: 1, name: 'Monday' },
        { id: 2, name: 'Tuesday' },
        { id: 3, name: 'Wednesday' },
        { id: 4, name: 'Thursday' },
        { id: 5, name: 'Friday' },
        { id: 6, name: 'Saturday' },
        { id: 7, name: 'Sunday' }
    ]

    const updateVenueStatus = async () => {
        await axios.put(`http://66.42.49.240/api/venue/update-status/${venue_id}`, {
            isOpen: !data.isOpen
        }).then((response) => {
            console.log(response.data)
            Alert.alert("Venue Status",
                (response.data.message),
                [
                    {
                        text: "OK",
                        onPress: () => setTimeout(() => { navigation.navigate('Manage Venue Screen', { user_id: route.params.user_id }) }, 500),
                        style: "cancel",
                    },
                ]
            );
        })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <View style={styles.container}>
            {isLoading ? <Loading />
                :
                <View style={{ padding: 20, width: '100%', height: '100%' }}>
                    <View style={{ height: '30%', width: '100%' }}>
                        <Image source={{ uri: 'http://66.42.49.240/' + data.image }} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
                    </View>
                    <View style={{ height: '60%', width: '100%', padding: 20, backgroundColor: '#FFFFFF', borderRadius: 20, marginVertical: 10 }}>

                        <View style={{ width: '100%', padding: 10 }}>
                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                <View style={{ width: '35%' }}>
                                    <Text style={styles.title}>
                                        Name
                                    </Text>
                                </View>
                                <View style={{ width: '70%' }}>
                                    <Text>
                                        {data.venue_name}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                <View style={{ width: '35%' }}>
                                    <Text style={styles.title}>
                                        Description
                                    </Text>
                                </View>
                                <View style={{ width: '70%' }}>
                                    <Text>
                                        {data.venue_description}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                <View style={{ width: '35%' }}>
                                    <Text style={styles.title}>
                                        Facility
                                    </Text>
                                </View>
                                <View style={{ width: '70%', flexDirection: 'row' }}>
                                    {data.venue_facility.map((item, index) => (
                                        <Text key={index}>
                                            {item}
                                        </Text>
                                    ))
                                    }
                                </View>
                            </View>

                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                <View style={{ width: '35%' }}>
                                    <Text style={styles.title}>
                                        Street
                                    </Text>
                                </View>
                                <View style={{ width: '70%' }}>
                                    <Text>
                                        {data.address.address_street}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                <View style={{ width: '35%' }}>
                                    <Text style={styles.title}>
                                        City
                                    </Text>
                                </View>
                                <View style={{ width: '70%' }}>
                                    <Text>
                                        {data.address.address_region}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'column', paddingVertical: 10, height: '60%' }}>
                                <View style={{ width: '100%', alignItems: 'center', padding: 5 }}>
                                    <Text style={{ fontWeight: "bold" }}>
                                        Operation Hour
                                    </Text>
                                </View>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    {data.operationals.length != 0 ?
                                        day.map((item, index) => (
                                            <View key={item.id} style={{ width: '80%', flexDirection: 'row' }}>
                                                <View style={{ width: '40%' }}>
                                                    <Text>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                                <View style={{ width: '60%', alignItems: "center" }}>
                                                    <Text>
                                                        {data.operationals[index] ?
                                                            moment(data.operationals[index].operational_timeOpen, "HH:mm:ss").format("hh:mm")
                                                            + " - "
                                                            + moment(data.operationals[index].operational_timeClose, "HH:mm:ss").format("HH:mm") : 'Closed'}
                                                    </Text>
                                                </View>
                                            </View>
                                        ))
                                        :
                                        <View>
                                            <Text style={{ color: "#cecece" }}>
                                                You Have Not Created Operational Hour
                                            </Text>
                                        </View>
                                    }
                                </View>
                            </View>
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                {data.operationals!=0&&
                                    <TouchableOpacity
                                        style={[{ padding: 10, borderRadius: 20, backgroundColor: 'green', elevation: 2 }, data.isOpen && { backgroundColor: "#8b0000" }]}
                                        onPress={() => updateVenueStatus()}
                                    >
                                        {data.isOpen ?
                                            <Text style={{ color: "#FFF" }}>
                                                CLOSE VENUE
                                            </Text>
                                            :
                                            <Text style={{ color: "#FFF" }}>
                                                OPEN VENUE
                                            </Text>
                                        }

                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={styles.addContainer}>
                        {data.operationals != 0 && <TouchableOpacity style={{
                            marginHorizontal: 5,
                            width: 120,
                            padding: 5,
                            backgroundColor: '#6C63FF',
                            elevation: 5,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }} onPress={() => navigation.navigate('Create Field Screen', { venue_id: venue_id })}>
                            <Entypo name="circle-with-plus" size={24} color="white" />
                            <View style={{ padding: 5, paddingRight: 20, justifyContent: 'center', alignItems: 'center', width: 120 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    Manage Fields
                                </Text>
                            </View>
                        </TouchableOpacity>}
                        {data.operationals != 0 && <TouchableOpacity style={{
                            marginHorizontal: 5,
                            width: 120,
                            padding: 5,
                            backgroundColor: '#6C63FF',
                            elevation: 5,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }} onPress={() => navigation.navigate('Create Field Screen', { venue_id: venue_id })}>
                            <Entypo name="circle-with-plus" size={24} color="white" />
                            <View style={{ padding: 5, paddingRight: 20, justifyContent: 'center', alignItems: 'center', width: 120 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    Add New Field
                                </Text>
                            </View>
                        </TouchableOpacity>}
                        {data.operationals != 0 ?
                            <TouchableOpacity style={{
                                marginHorizontal: 5,
                                width: 140,
                                padding: 5,
                                backgroundColor: '#6C63FF',
                                elevation: 5,
                                borderRadius: 10,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }} onPress={() => navigation.navigate('Create Operational Screen', { venue_id: venue_id })}>
                                <Entypo name="circle-with-plus" size={24} color="white" />
                                <View style={{ padding: 5, paddingRight: 20, justifyContent: 'center', alignItems: 'center', width: 130 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                        Edit Operation Hour
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={{
                                marginHorizontal: 5,
                                width: 140,
                                padding: 5,
                                backgroundColor: '#6C63FF',
                                elevation: 5,
                                borderRadius: 10,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }} onPress={() => navigation.navigate('Create Operational Screen', { venue: venue_id })}>
                                <Entypo name="circle-with-plus" size={24} color="white" />
                                <View style={{ padding: 5, paddingRight: 20, justifyContent: 'center', alignItems: 'center', width: 130 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                        Set Operation Hour
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    title: {
        fontWeight: "bold"
    },
    addContainer: {
        width: "100%",
        height: '10%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row'
    }
})

export default VenueDetail;