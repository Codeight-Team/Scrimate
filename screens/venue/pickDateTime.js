import React, { useState, useEffect } from "react";
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image, Platform, Alert } from 'react-native'
import DatePicker from 'react-native-neat-date-picker'
import moment from "moment";
import { Entypo } from '@expo/vector-icons';
import FlatButton from "../../shared/button";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

const PickDateTime = ({ navigation, route }) => {
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState("Choose Time!")
    const [disabled, setDisabled] = useState(true);
    const [user_id, setUserId] = useState();
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [availableTime, setAvailableTime] = useState([])
    const [openTime, setOpen] = useState()
    const [order, setOrder] = useState({})

    const dateNow = new Date()
    const type = route.params.title

    const day = [
        { name: "Monday", id: 1 },
        { name: "Tuesday", id: 2 },
        { name: "Wednesday", id: 3 },
        { name: "Thursday", id: 4 },
        { name: "Friday", id: 5 },
        { name: "Saturday", id: 6 },
        { name: "Sunday", id: 7 }]

    const operationals = route.params.operationals
    const field = route.params.field

    const setTimeBtn = (item) => {
        setTime(item);
        setDisabled(false);
    }

    const openDatePicker = () => {
        setShowDatePicker(true)
    }

    const onCancel = () => {
        setShowDatePicker(false)
    }

    const onConfirm = async (date) => {
        setShowDatePicker(false)
        setTime("Choose Time!")
        setDate(date)
        let time = []
        day.map(item => {
            if (moment(date).format("dddd") == item.name) {
                operationals.map(operational => {
                    if (item.id == operational.operational_day) {
                        for (let i = moment(operational.operational_timeOpen, "HH:mm:ss").hours(); i < moment(operational.operational_timeClose, "HH:mm:ss").hours(); i++) {
                            time.push({ timeOpen: i, timeClose: i + 1 })
                        }
                    }
                })
            }
        })
        setAvailableTime(time)
    }

    useEffect(() => {
        const getUserId = async () => {
            try {
                let user_id = await AsyncStorage.getItem('user_id')
                setUserId(user_id)
            } catch (error) {
                Alert.alert('Sign in needed')
            }
        }
        getUserId()
    }, [])

    const parseOrder = (value) => {
        let newDate = moment(date).format("DD-MM-YYYY")
        let newTime = moment(value, "HH").format("HH:mm")
        setOrder({ date_of_match: newDate, order_type: type, time_of_match: newTime })
    }

    const sendOrderDetail = async () => {
        await axios.post(`http://scrimate.com/api/order/create-order/${user_id}/${field.field_id}`, order)
            .then(response => {
                navigation.navigate('Profile', { screen: 'Payment Method', params: { user_id: user_id, order_id: response.data.order_id } })
            })
            .catch(error =>
                console.warn(error)
            )
    }

    const RenderAvailableTime = () => {
        return availableTime.map((item, index) => {
            return (
                <View key={index} style={{ padding: 3, paddingHorizontal: 5, height: 50, width: "33%" }}>
                    <TouchableOpacity disabled={(moment(item.timeOpen, "HH").format("HH:mm") + " - " + moment(item.timeClose, "HH").format("HH:mm")) == time}
                        onPress={() => [setTimeBtn(moment(item.timeOpen, "HH").format("HH:mm") + " - " + moment(item.timeClose, "HH").format("HH:mm")), parseOrder(item.timeOpen)]} style={[
                            {
                                height: "100%",
                                width: "100%",
                                backgroundColor: "#FFFFFF",
                                elevation: 5,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center'
                            },
                            (moment(item.timeOpen, "HH").format("HH:mm") + " - " + moment(item.timeClose, "HH").format("HH:mm")) == time && { backgroundColor: 'gray', borderWidth: 1 }
                        ]}>
                        <Text style={{ fontWeight: 'bold' }}>{moment(item.timeOpen, "HH").format("HH:mm") + " - " + moment(item.timeClose, "HH").format("HH:mm")}</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        )
    }

    return (
        <View style={styles.container}>
            <View style={{ height: "16%", flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ margin: 5, height: 40, paddingLeft: 10, paddingRight: 10, backgroundColor: '#6C63FF', borderRadius: 18, elevation: 3, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontWeight: "bold", color: '#fff' }}>{type} Reservation</Text>
                </View>
                <View style={{ margin: 5, height: 40, paddingLeft: 10, paddingRight: 10, backgroundColor: '#6C63FF', borderRadius: 18, elevation: 3, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontWeight: "bold", color: '#fff' }}>{route.params.venue_name}</Text>
                </View>
                <View style={{ margin: 5, height: 40, paddingLeft: 10, paddingRight: 10, backgroundColor: '#6C63FF', borderRadius: 18, elevation: 3, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontWeight: "bold", color: '#fff', }}>{field.field_name}</Text>
                </View>
                <View style={{ margin: 5, height: 40, paddingLeft: 10, paddingRight: 10, backgroundColor: '#6C63FF', borderRadius: 18, elevation: 3, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontWeight: "bold", color: '#fff', }}>Rp {field.field_price}</Text>
                </View>
            </View>
            <View style={{ padding: 20, height: '34%', justifyContent: "center", alignItems: 'flex-start' }}>
                <View style={{ width: '100%', flexDirection: "row" }}>
                    <View style={{ width: "50%", paddingLeft: 20 }}>
                        <Text>{moment(date).format('dddd')}</Text>
                        <TouchableHighlight style={{ borderRadius: 30 }} activeOpacity={0.2} underlayColor="#6C63FF" onPress={openDatePicker}>
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
                            onPress={openDatePicker}
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
            <DatePicker
                isVisible={showDatePicker}
                mode={'single'}
                onCancel={onCancel}
                onConfirm={onConfirm}
                minDate={dateNow}
            />
            <View style={{ paddingVertical: 30, height: '50%', backgroundColor: '#6C63FF' }}>
                <View style={{ height: '81%', width: '100%' }}>
                    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                        <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: "center" }}>
                            {
                                RenderAvailableTime()
                            }
                        </View>
                    </ScrollView>
                </View>
                <View style={{ width: '100%', height: '30%', justifyContent: "center", alignItems: "center", backgroundColor: "#FFF", elevation: 3 }}>
                    <FlatButton
                        width={200}
                        backgroundColor={'#6C63FF'}
                        disabled={disabled}
                        text={'Pay'}
                        onPress={() =>
                            [,
                                Alert.alert('Ready to Pay?',
                                    'You will be directed to payment, double check your order', [
                                    {
                                        text: 'Cancel',
                                    },
                                    {
                                        text: 'OK',
                                        onPress: () => sendOrderDetail()
                                    },
                                ])
                            ]
                        } />
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F8FF",
    }
})

export default PickDateTime;