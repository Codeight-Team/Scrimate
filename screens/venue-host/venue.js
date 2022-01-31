import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Entypo } from '@expo/vector-icons';
import FlatButton from "../../shared/button";

const VenueDetail = ({ navigation, route }) => {
    const data = route.params
    return (
        <View style={styles.container}>
            <View style={{ padding: 20, width: '100%', height: '100%' }}>
                <View style={{ height: '30%', width: '100%' }}>
                    <Image source={{ uri: 'http://66.42.49.240/'+data.venue.image }} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
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
                                    {data.venue.venue_name}
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
                                    {data.venue.venue_description}
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
                                {data.venue.venue_facility.map((item, index) => (
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
                                    Address
                                </Text>
                            </View>
                            <View style={{ width: '70%' }}>
                                <Text>
                                    {data.venue.address.address_street}
                                </Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'column', paddingVertical: 10 }}>
                            <View style={{ width: '100%', alignItems: 'center', padding: 5 }}>
                                <Text style={{ fontWeight: "bold" }}>
                                    Operation Hour
                                </Text>
                            </View>
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                {route.params.venue.operational ?
                                    <View style={{ width: '70%', flexDirection: 'row' }}>
                                        <View style={{ width: '50%' }}>
                                            <Text>
                                                Monday
                                            </Text>
                                        </View>
                                        <View style={{ width: '50%', alignItems: "center" }}>
                                            <Text>
                                                09:00 - 21:00
                                            </Text>
                                        </View>
                                    </View>
                                    :
                                    <View>
                                        <Text>
                                            You Have Not Created Operational Hour
                                        </Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.addContainer}>
                    <TouchableOpacity style={{
                        marginHorizontal: 5,
                        width: 120,
                        padding: 5,
                        backgroundColor: '#6C63FF',
                        elevation: 5,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }} onPress={() => navigation.navigate('Create Field Screen', { user_id: route.params.user_id })}>
                        <Entypo name="circle-with-plus" size={24} color="white" />
                        <View style={{ padding: 5, paddingRight: 20, justifyContent: 'center', alignItems: 'center', width: 120 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                Add New Field
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {route.params.venue.operational ?
                        <TouchableOpacity style={{
                            marginHorizontal: 5,
                            width: 140,
                            padding: 5,
                            backgroundColor: '#6C63FF',
                            elevation: 5,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }} onPress={() => navigation.navigate('Create Operational Screen', { user_id: route.params.user_id })}>
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
                        }} onPress={() => navigation.navigate('Create Operational Screen', { user_id: route.params.user_id })}>
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