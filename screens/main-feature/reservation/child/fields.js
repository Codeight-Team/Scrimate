import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import FlatButton from "../../../../shared/button";
import moment from "moment";
import api from "../../../../services/api";

function ChooseField({ navigation, route }) {
    const [fields, setFields] = useState([]);
    const venue_id = route.params.venue_id
    const venue_name = route.params.venue_name
    const title = route.params.title

    useEffect(() => {
        const fetchFields = async () => {
            await api.get(`/api/field/get-fields/${venue_id}`)
                .then(response => {
                    setFields(response.data)
                })
        }
        fetchFields()
    }, [])

    const [state, setState] = useState({})

    function renderField() {
        return fields.map((item) => {
            return (
                <View key={item.field_id} style={styles.box}>
                    <TouchableWithoutFeedback onPress={() => setState(item)}>
                        <View style={[styles.inner,
                        state && state.field_id == item.field_id && { borderWidth: 1, backgroundColor: 'grey' }
                        ]}
                        >

                            <View style={{ width: '100%', alignItems: "center", marginVertical: 4 }}>
                                <Text style={[{ fontSize: 16, fontWeight: 'bold' },
                                state.field_id == item.field_id ? { color: 'black' } :
                                    { color: '#6C63FF' }]}>{item.field_name}</Text>
                            </View>
                            <View style={{ width: '100%', alignItems: "center" }}>
                                <Text >Flooring Type </Text>
                                <View style={{ width: '100%', alignItems: "center" }}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.field_type}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', alignItems: "center", marginVertical: 5 }}>
                                <Text >Price/Hour <Text style={{ fontWeight: 'bold' }}>{'Rp.' + item.field_price}</Text></Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        }
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: '10%', padding: 10 }}>
                <View style={{ margin: 5, height: 40, paddingLeft: 10, paddingRight: 10, backgroundColor: '#FFFFFF', borderRadius: 20, elevation: 3, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontWeight: "bold", color: 'black' }}> Venue: {venue_name}</Text>
                </View>
            </View>
            <View style={{ width: '100%', height: '5%', alignItems: "center", justifyContent: 'center' }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    Choose Field
                </Text>
            </View>
            <View style={{ width: '100%', height: '50%', alignItems: "center" }}>
                {
                    Object.entries(state).length == 0 ?
                        <View style={{
                            height: '60%',
                            width: '70%',
                            borderRadius: 10,
                            margin: 20,
                            justifyContent: 'center',
                            alignItems: "center",
                            backgroundColor: '#cecece',
                        }}>
                            <Text style={{ color: 'gray' }}>
                                choose field
                            </Text>
                        </View>
                        :
                        <Image style={{ height: '60%', width: '70%', borderRadius: 10, margin: 20 }} source={{ uri: "http://scrimate.com/" + state.image }} />
                }

                <View style={{ width: '100%', height: '20%', justifyContent: "center", alignItems: "center" }}>
                    <FlatButton
                        width={200}
                        backgroundColor={'#FFFFFF'}
                        disabled={Object.entries(state).length == 0}
                        textStyle={{ color: 'black' }}
                        text={'Choose'}
                        onPress={() =>
                            navigation.navigate('Pick Date Time', {
                                field: state,
                                venue_name: venue_name,
                                address: route.params.address,
                                operationals: route.params.operationals,
                                title: title
                            })
                        } />
                </View>
            </View>
            <View style={{ width: '100%', height: '35%', backgroundColor: "#6C63FF", justifyContent: "center", elevation: 4 }}>
                <ScrollView horizontal={true} style={{ paddingVertical: 40 }}>
                    <View style={{ width: '100%', height: '100%', flexWrap: 'wrap', flexDirection: "row", justifyContent: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                        {
                            renderField()
                        }
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: "#F4F8FF",

    },
    box: {
        width: 127,
        margin: 5,
    },
    inner: {
        flex: 1,
        padding: 5,
        backgroundColor: '#FFFFFF',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 10,
        elevation: 4
    },
})

export default ChooseField;