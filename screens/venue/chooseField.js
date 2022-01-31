import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { useEffect } from "react/cjs/react.development";
import FlatButton from "../../shared/button";

function ChooseField({ navigation, route }) {
    const [data, setData] = useState({});
    const field = [
        {
            id: 1,
            name: 'Field 1',
            type: 'Wood',
            price: 110000,
            image: route.params.venue_image
        },
        {
            id: 2,
            name: 'Field 2',
            type: 'Vinyl',
            price: 150000,
            image: route.params.venue_image
        },
        {
            id: 3,
            name: 'Field 3',
            type: 'Wood',
            price: 110000,
            image: route.params.venue_image
        },
        {
            id: 4,
            name: 'Field 4',
            type: 'Vinyl',
            price: 150000,
            image: route.params.venue_image
        }
    ]

    const [state, setState] = useState(field[0])

    function renderField() {
        return field.map((item) => {
            return (
                <View key={item.id} style={styles.box}>
                    <TouchableWithoutFeedback onPress={() => setState(item)}>
                        <View style={[styles.inner, state.id == item.id && { borderWidth: 1, backgroundColor: 'grey' }]} onPress={() => [setState(item)]}>

                            <View style={{ width: '100%', alignItems: "center", marginVertical: 4 }}>
                                <Text style={[{ fontSize: 16, fontWeight: 'bold' }, state.id == item.id ? { color: 'black' } : { color: '#6C63FF' }]}>{item.name}</Text>
                            </View>
                            <View style={{ width: '100%', alignItems: "center" }}>
                                <Text >Flooring Type </Text>
                                <View style={{ width: '100%', alignItems: "center" }}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.type}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', alignItems: "center", marginVertical: 5 }}>
                                <Text >Price/Hour <Text style={{ fontWeight: 'bold' }}>{'Rp.' + item.price}</Text></Text>
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
                    <Text style={{ fontWeight: "bold", color: 'black' }}> Venue: {route.params.venue_name}</Text>
                </View>
            </View>
            <View style={{ width: '100%', height: '5%', alignItems: "center", justifyContent: 'center' }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    Choose Field
                </Text>
            </View>
            <View style={{ width: '100%', height: '50%', alignItems: "center" }}>
                <Image style={{ height: '60%', width: '70%', borderRadius: 10, margin: 20 }} source={{ uri: state.image }} />
                <View style={{ width: '100%', height: '20%', justifyContent: "center", alignItems: "center" }}>
                    <FlatButton
                        width={200}
                        backgroundColor={'#FFFFFF'}
                        // disabled={disabled}
                        textStyle={{ color: 'black' }}
                        text={'Choose'}
                        onPress={() => 
                            navigation.navigate('Pick Date Time', {
                            field: state,
                            venue_name: route.params.venue_name,
                            address: route.params.address,
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