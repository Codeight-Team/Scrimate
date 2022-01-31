import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import FlatButton from "../../shared/button";
import axios from "axios";
import moment from "moment";
import { AntDesign } from '@expo/vector-icons';

const CreateOperational = () => {

    const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const [time, setTime] = useState([
        {
            operational_day: 1,
            operational_timeOpen: '09:00',
            operational_timeClose: '21:00'
        },
        {
            operational_day: 2,
            operational_timeOpen: '09:00',
            operational_timeClose: '21:00'
        },
        {
            operational_day: 3,
            operational_timeOpen: '09:00',
            operational_timeClose: '21:00'
        },
        {
            operational_day: 4,
            operational_timeOpen: '09:00',
            operational_timeClose: '21:00'
        },
        {
            operational_day: 5,
            operational_timeOpen: '09:00',
            operational_timeClose: '21:00'
        },
        {
            operational_day: 6,
            operational_timeOpen: '09:00',
            operational_timeClose: '21:00'
        },
        {
            operational_day: 7,
            operational_timeOpen: '09:00',
            operational_timeClose: '21:00'
        },
    ])

    return (
        <View style={styles.container}>
            <View style={{width: '100%', alignItems: 'center'}}><Text style={{fontSize: 18, fontWeight: 'bold'}}>Set Venue Operational Time Hour</Text></View>
            <View style={{ padding: 20, alignItems: "center", width: '100%' }}>
                <View style={{ width: '100%', justifyContent: 'center' }}>
                    <View style={{ flexDirection: "row", width: '100%', padding: 10 }}>
                        <View style={{ width: '40%' }}>
                            <Text style={styles.title}>
                                day open
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", width: '60%' }}>
                            <View style={{ width: '50%', alignItems: "center" }}>
                                <Text style={styles.title}>
                                    open time
                                </Text>
                            </View>
                            <View style={{ width: '50%', alignItems: "center" }}>
                                <Text style={styles.title}>
                                    closed time
                                </Text>
                            </View>
                        </View>
                    </View>
                    {
                        time.map((item, index) => {
                            return (
                                <View key={item.operational_day} style={{ flexDirection: "row", padding: 10, height: 50 }}>
                                    <View style={{ width: '10%' }}>
                                        <TouchableOpacity>
                                            <AntDesign name="closecircleo" size={21} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '30%' }}>
                                        <Text>
                                            {day[index]}
                                        </Text>
                                    </View>
                                    {
                                        <View style={{ width: '60%', height: '100%', flexDirection: 'row' }}>
                                            <View style={{ width: '49%', height: '100%', alignItems: "center" }}>
                                                <TouchableOpacity style={styles.datePickForm}>
                                                    <Text>
                                                        {item.operational_timeOpen}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Text>-</Text>
                                            <View style={{ width: '49%', height: '100%', alignItems: "center" }}>
                                                <TouchableOpacity style={styles.datePickForm}>
                                                    <Text>
                                                        {item.operational_timeClose}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            <View style={{ width: '100%', alignItems: "center" }}>
                <FlatButton width={150} text={'submit'} backgroundColor={'#6C63FF'} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: "#F4F8FF",
    },
    datePickForm: {
        width: 80,
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 3,
        backgroundColor: '#FFFFFF',
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: '#6C63FF',
        fontWeight: 'bold',
        textTransform: "uppercase"
    }
})

export default CreateOperational;
