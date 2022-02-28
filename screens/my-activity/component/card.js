import moment from "moment";
import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, Image } from "react-native";
import Dummy from '../../../assets/lapangan-dummy.png'

const Card = ({ itemId, venue_name, onPress, status, time, date, field_name, image, price }) => {

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.inner}>
                    <Text style={{ color: 'gray', borderBottomWidth: 1, borderColor: '#cecece' }}>
                        Order ID: SCR/<Text style={{textTransform: 'uppercase'}}>{itemId.substring(0, 30)}</Text>
                    </Text>
                    <View style={styles.item}>
                        <Text style={{ fontWeight: 'bold' }}>
                            {venue_name}, {field_name}
                        </Text>
                        <View style={{ width: '100%', flexDirection: "row", paddingVertical: 10 }}>
                            <View style={{ width: "30%", height: 60, }}>
                                <Image source={{uri: 'http://scrimate.com/'+ image}} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                            </View>
                            <View style={{ width: "70%", padding: 10, paddingRight: 0, justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                                <View style={{ width: 120, justifyContent: "flex-start", }}>
                                    <Text style={{ color: "gray", fontSize: 11 }}>
                                        {moment(date).format("DD MMM YYYY")}
                                    </Text>
                                    <Text style={{ color: "black" }}>
                                        {moment(time, 'HH:mm:ss').format('HH:mm')} - { moment((moment(time, "HH:mm:ss").hours()+1),"HH").format('HH:mm')} WIB
                                    </Text>
                                </View>
                                <View style={{width: "50%", alignItems: 'flex-end'}}>
                                    <View style={[styles.statusbar, status == "Finish" ? styles.settle : status == "On Going" ? styles.onGoing : status == "Failed" ? styles.failure:status=="Refund"&& styles.refund]}>
                                        <Text style={[{fontWeight: 'bold'},status == "Finish" ? styles.green : status == "On Going" ? styles.orange : status == "Failed" ? styles.red:status=="Refund"&& styles.blue]}>
                                            {status}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '50%', fontSize: 12 }}>
                            Total Price
                        </Text>
                        <Text style={{ width: '50%', textAlign: 'right', fontWeight: "bold" }}>
                            Rp {price}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        width: '100%'
    },
    inner: {
        padding: 20,
        borderRadius: 10,
        width: '100%',
        height: 200,
        backgroundColor: '#FFFFFF',
        marginVertical: 5,
        elevation: 4
    },
    item: {
        marginVertical: 10,
    },
    statusbar: {
        borderRadius: 20,
        padding: 5,
        borderRadius: 5,
        borderWidth: 1
    },
    settle: {
        backgroundColor: "#d4f8d4", borderColor: '#19a119'
    },
    onGoing: {
        backgroundColor: "#ffeac4", borderColor: '#d88c00'
    },
    failure: {
        backgroundColor: "#ffc4c4", borderColor: '#b10000'
    },
    refund: {
        backgroundColor: "#d2edfd", borderColor: '#29a8f6'
    },
    green: {
        color: '#19a119'
    },
    orange: {
        color: '#d88c00'
    },
    red: {
        color: '#b10000'
    },
    blue:{
        color: '#29a8f6'
    }

})

export default Card;