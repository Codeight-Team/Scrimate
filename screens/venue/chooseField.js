import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'

function ChooseField({ navigation, route }) {
    function renderField() {
        return route.params.field.map((item) => {
            return (
                <View key={item.id} style={styles.box}>
                    <TouchableOpacity style={styles.inner} onPress={() => navigation.navigate('Pick Date Time', { field_name: item.name, venue_name: route.params.venue_name })}>

                        <Image style={{ height: '60%', width: '100%', borderRadius: 10, }} source={{ uri: route.params.venue_image }} />
                        <View style={{ width: '100%', alignItems: "center", backgroundColor: '#FFFFFF', borderRadius: 5, marginVertical: 4 }}>
                            <Text style={{color:'#6C63FF', fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                        </View>
                        <View style={{ width: '100%', alignItems: "center", backgroundColor: '#FFFFFF', borderRadius: 5 }}>
                            <Text >Price/Hour: <Text style={{ fontWeight: 'bold' }}>{'Rp.' + item.price}</Text></Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: '10%', padding: 10 }}>
                <View style={{ width: '40%', padding: 10, backgroundColor: 'white', elevation: 4, borderRadius: 23, alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Venue: {route.params.venue_name}</Text>
                </View>
            </View>
            <View style={{ width: '100%', height: '20%', alignItems: "center", justifyContent: 'center' }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    Choose Field
                </Text>
            </View>
            <View style={{ width: '100%', height: '70%', backgroundColor: "#6C63FF", borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: 40 }}>
                <ScrollView>
                    <View style={{ width: '100%', height: '50%', flexWrap: 'wrap', flexDirection: "row", justifyContent: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
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
        width: '40%',
        height: 200,
        padding: 5,
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