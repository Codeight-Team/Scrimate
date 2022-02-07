import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Entypo } from '@expo/vector-icons';
import axios from "axios";

const ManageFields = ({ navigation, route }) => {

    const [fields, setFields] = useState([])
    const venue_id = route.params.venue_id

    useEffect(() => {
        const fetchFieldList = async () => {
            await axios.get(`http://scrimate.com/api/field/get-fields/${venue_id}`)
                .then(response => {
                    setFields(response.data)
                })
                .catch(err => {
                    console.warn(err)
                })
        }
        fetchFieldList()
    }, [])

    const renderFields = () => {
        return (
            fields.map(item => {
                return (
                    <View key={item.field_id} style={{ padding: 10, width: "50%", height: 200 }}>
                        <TouchableOpacity style={{ width: '100%', height: '100%', backgroundColor: "#FFF", elevation: 4, borderRadius: 15 }}
                            onPress={() => navigation.navigate("Manage Schedule Screen")}
                        >
                            <View style={{ width: "100%", padding: 5, height: '50%' }}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 15 }} source={{ uri: 'http://scrimate.com/' + item.image }} />
                            </View>
                            <View style={{ width: "100%", padding: 10, height: '50%', justifyContent: 'center' }}>
                                <Text style={styles.title}>
                                    Name: <Text style={styles.values}>{item.field_name}</Text>
                                </Text>
                                <Text style={styles.title}>
                                    Type: <Text style={styles.values}> {item.field_type}</Text>
                                </Text>
                                <Text style={styles.title}>
                                    Price/ Hour: <Text style={styles.values}> Rp {item.field_price}</Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            })
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                {fields.length!=0?
                    <View style={{ flexWrap: 'wrap', flexDirection: "row" }}>
                    {
                        renderFields()
                    }
                </View>
                :
                <View style={{ flexDirection: "row", justifyContent: "center", padding: 20 }}>
                    <Text style={{fontWeight: "bold", color: "gray"}}>No Fields</Text>
                </View>
                }
            </ScrollView>
            <View style={{ paddingVertical: 8 }}>
                {<TouchableOpacity style={{
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
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        color: 'gray'
    },
    values: {
        color: 'black',
        fontWeight: 'bold'
    }
})

export default ManageFields;