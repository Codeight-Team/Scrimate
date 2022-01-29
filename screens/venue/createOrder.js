import React from "react";
import { StyleSheet, View, Text } from "react-native";
import FlatButton from "../../shared/button";
import axios from "axios";

const CreateOrder = ({ navigation, route }) => {
    const data = route.params.data;
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={{ height: "10%" }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        Order
                    </Text>
                </View>
                <View style={{ height: "60%", justifyContent: "center"}}>
                    <View style={styles.itemContainer}>
                        <View style={{ width: 100 }}>
                            <Text>
                                Venue
                            </Text>
                        </View>
                        <Text>
                            {data.venue_name}
                        </Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={{ width: 100 }}>
                            <Text>
                                Address
                            </Text>
                        </View>
                        <View>
                            <Text>{data.address.address_street}</Text>
                            <Text>{data.address.address_region}</Text>
                        </View>
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={{ width: 100 }}>
                            <Text>
                                Field
                            </Text>
                        </View>
                        <Text>
                            {data.field_name}
                        </Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={{ width: 100 }}>
                            <Text>
                                Day
                            </Text>
                        </View>
                        <Text>
                            {data.day}
                        </Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={{ width: 100 }}>
                            <Text>
                                Date
                            </Text>
                        </View>
                        <Text>
                            {data.date}
                        </Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={{ width: 100 }}>
                            <Text>
                                Time
                            </Text>
                        </View>
                        <Text>
                            {data.time}
                        </Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={{ width: 100 }}>
                            <Text style={{fontWeight: 'bold'}}>
                                Total Price
                            </Text>
                        </View>
                        <Text>
                            Rp. {data.field_price}
                        </Text>
                    </View>
                </View>
                <View style={{ height: '30%', justifyContent: 'center' }}>
                    <FlatButton text={'Pay'} backgroundColor={'#6C63FF'} width={150} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
    },
    box: {
        padding: 20,
        backgroundColor: 'white',
        height: '70%',
        width: '90%',
        alignItems: "center",
        borderRadius: 40,
        elevation: 4
    },
    itemContainer: {
        flexDirection: 'row',
        marginVertical: 2
    }
})

export default CreateOrder;