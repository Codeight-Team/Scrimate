import React from "react";
import { View, Text, TouchableHighlight, StyleSheet, Image, Platform } from 'react-native'
// import CustomDateTimePicker from "../../shared/CustomDateTimePicker";
import DateTime from '@react-native-community/datetimepicker'
import { useState } from "react/cjs/react.development";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from '@expo/vector-icons';
import FlatButton from "../../shared/button";

const PickDateTime = ({ navigation, route }) => {
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)
    const [time, setTime] = useState("Choose Time!")
    const [disabled, setDisabled] = useState(true);

    const onChange = (e, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
        setTime("Choose Time!")
        setDisabled(true)
    }

    const setTimeBtn = (item) => {
        setTime(item);
        setDisabled(false);
    }

    const showDatePicker = () => {
        setShow(true)
    }

    const timeArr = [
        {
            time: '09:00 - 10:00',
        },
        {
            time: '10:00 - 11:00'
        },
        {
            time: '11:00 - 12:00'
        },
        {
            time: '12:00 - 13:00'
        },
    ]

    const RenderAvailableTime = () => {
        return timeArr.map((item) => {
            return (
                <View key={item.time} style={{ height: 50, width: "33%" }}>
                        <TouchableOpacity onPress={() => setTimeBtn(item.time)} style={
                            {
                                height: "90%",
                                width: "90%",
                                backgroundColor: "#FFFFFF",
                                elevation: 5,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }
                        }>
                            <Text style={{ fontWeight: 'bold' }}>{item.time}</Text>
                        </TouchableOpacity>
                    </View>
            )
        }

        )
    }


    return (
        <View style={styles.container}>
            <View style={{ padding: 20, height: '50%', justifyContent: "center", alignItems: 'flex-start' }}>
                {/* <CustomDateTimePicker textStyle={{paddingVertical: 15, paddingHorizontal: 10, borderColor: 'gray', borderWidth: 1}}/> */}
                <View style={{ width: '100%', flexDirection: "row" }}>
                    <View style={{ width: "50%", paddingLeft: 20 }}>
                        <Text>{moment(date).format('dddd')}</Text>
                        <TouchableHighlight style={{ borderRadius: 30 }} activeOpacity={0.2} underlayColor="#6C63FF" onPress={() => showDatePicker()}>
                            <Text style={
                                {
                                    fontWeight: 'bold',
                                    fontSize: 18
                                }
                            }>{moment(date).format('DD MMMM yyyy')}
                            </Text>
                        </TouchableHighlight>
                        <Text>
                            {time}
                        </Text>
                    </View>
                    <View style={{ width: '50%', height: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => showDatePicker()}
                            style={
                                {
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 50,
                                    height: 50,
                                    borderRadius: 20,
                                    backgroundColor: "#FFFFFF",
                                    elevation: 5,
                                    borderWidth: 1
                                }
                            }>
                            <Entypo name="back-in-time" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {show && (
                <DateTime timeZoneOffsetInMinutes={0}
                    value={new Date(date)}
                    mode="date"
                    minimumDate={new Date(moment().format("YYYY-MM-DD"))}
                    onChange={onChange}
                />
            )

            }
            <View style={{ padding: 30, height: '50%', borderRadius: 20, backgroundColor: '#6C63FF' }}>
                <View style={{ height: '70%', width: '100%', flexWrap: 'wrap', flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                    {
                        RenderAvailableTime()
                    }
                </View>
                <View style={{ width: '95%', height: '20%', justifyContent: "center", alignItems: "center" }}>
                    <FlatButton width={200} backgroundColor={'#FFFFFF'} disabled={disabled} textStyle={{ color: 'black' }} text={'Choose'} onPress={() => navigation.navigate("Home Screen")} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F8FF",
    }
})

export default PickDateTime;