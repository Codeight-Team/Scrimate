import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, RefreshControl } from "react-native";
import CustomHeader from "../../shared/customHeader";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BCA from '../../assets/bca-logo.png'
import * as Clipboard from 'expo-clipboard';
import { FontAwesome5 } from '@expo/vector-icons';
import CountDown from 'react-native-countdown-component';
import moment from "moment";
import Loading from "../../shared/loading";
import api from "../../services/api";

const Payment = ({ navigation, route }) => {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [finder, setFinder] = useState({})
    const [creator, setCreator] = useState({})
    const [dateTime, setDateTime] = useState({})
    const [field, setField] = useState({})
    const [expire, setExpire] = useState(0)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        let isMounted = true;
        setTimeout(() => {
            const getBillData = async () => {
                await api.get(`/api/order/find-a-order/${route.params.user_id}/${route.params.order_id}`)
                    .then((response) => {
                        if (isMounted) {
                            setData(response.data.data.bills)
                            setCreator(response.data.data.creator)
                            setFinder(response.data.data.finder)
                            setDateTime({ time_of_match: response.data.data.time_of_match, date_of_match: response.data.data.date_of_match })
                            setField(response.data.data.field)
                            setTimer(response.data.expire)
                            setIsLoading(false)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            getBillData();
        }, 1000)
        return () => {
            isMounted = false;
        };
    }, [refresh])

    const setTimer = (value) => {
        let now = new Date().getTime();
        if (value) {
            const newTime = new Date(value).getTime();
            let s = newTime - now;
            let seconds = Math.floor((s % (1000 * 60 * 60)) / (1000 * 60) * 60)
            if (seconds > 0)
                setExpire(seconds)
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <CustomHeader title={"Payment Summary"} onPressBackButton={() => navigation.navigate("My Order", { user_id: route.params.user_id })} backButtonModel={"close"} />
                {isLoading ?
                    <Loading />
                    :
                    <View style={{ backgroundColor: '#dbe8ff', width: '100%' }}>
                        <View style={{ width: '100%', height: '30%', padding: 10 }}>
                            <View style={{ width: '100%', height: '100%', backgroundColor: '#FFF', padding: 20, borderRadius: 20, elevation: 5 }}>
                                <View style={{ borderRadius: 10, padding: 5, flexDirection: 'row', borderBottomWidth: 1, borderColor: 'gray' }}>
                                    <Text style={{ fontSize: 20, width: '80%', fontWeight: 'bold', color: 'black', textTransform: 'capitalize' }}>
                                        Payment {data.bill_status}
                                    </Text>
                                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                        {data.bill_status == "pending" ?
                                            <MaterialCommunityIcons name={"timer-outline"} size={24} color="#ffa500" />
                                            : data.bill_status == "expire" ?
                                                <MaterialCommunityIcons name="clock-alert-outline" size={24} color="red" />
                                                :
                                                <MaterialCommunityIcons name="alarm-check" size={24} color="green" />
                                        }
                                    </View>
                                </View>
                                <View style={{ padding: 5, flexDirection: 'row' }}>
                                    <Text style={{ color: 'gray', width: '30%' }}>
                                        Order ID :
                                    </Text>
                                    <View style={{ width: '70%', alignItems: 'flex-end' }}>
                                        <Text style={{ color: 'gray' }}>
                                            {data.bill_id.toUpperCase().substring(0, 28)}
                                        </Text>
                                    </View>
                                </View>
                                {data.bill_status == "pending" ?
                                    <View style={{ width: '100%', height: '30%', backgroundColor: '#e6e6e6', borderRadius: 5, flexDirection: 'row', borderWidth: 2, borderColor: '#e6e6e6' }}>
                                        <View style={{ width: '20%', height: '100%', borderRadius: 5, justifyContent: "center", backgroundColor: '#FFFFFF' }}>
                                            <Image style={{ height: '90%', width: '90%' }} source={BCA} />
                                        </View>
                                        <View style={{ marginLeft: '1%', width: '79%', paddingHorizontal: 20, backgroundColor: '#f2f2f2', borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontWeight: "bold", width: '80%', fontSize: 15 }}>{data.bill_va_num}</Text>
                                            <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                                <TouchableOpacity onPress={() => Clipboard.setString(data.bill_va_num)}>
                                                    <Text style={{ color: '#6C63FF' }}>copy</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    <View style={{ width: '100%', height: '30%', backgroundColor: '#FFF', borderRadius: 5, flexDirection: 'row', borderWidth: 2, borderColor: '#e6e6e6', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'gray' }}>{data.bill_status == 'expire' ? "Expired" : "Success"}</Text>
                                    </View>
                                }
                                <View style={{ height: '30%', alignItems: "center", flexDirection: "row" }}>
                                    <TouchableOpacity style={{ width: '50%', paddingVertical: 10 }}>
                                        <View >
                                            <Text style={{ color: '#6C63FF', fontSize: 11 }}>Payment Guide</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {data.bill_status != "settlement" && (
                                        <View style={{ width: '50%', flexDirection: "row", alignItems: "center", justifyContent: 'flex-end' }}>
                                            <View style={{ marginRight: 10 }}>
                                                <Text style={{ color: 'gray', fontSize: 11 }}>Expired In</Text>
                                            </View>
                                            <CountDown
                                                until={expire}
                                                onFinish={() => setRefresh(true)}
                                                size={9}
                                                timeLabels={{ m: null, s: null }}
                                                digitStyle={{ backgroundColor: 'black' }}
                                                digitTxtStyle={{ color: '#ffa500' }}
                                            />
                                        </View>
                                    )
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={{ width: '100%', top: '5%', height: '60%', backgroundColor: "#FFFFFF", padding: 20, paddingBottom: 10, elevation: 5 }}>
                            <View style={{ height: '90%' }}>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <Text style={{ width: '50%', fontSize: 17, fontWeight: 'bold', color: 'black' }}>
                                        Match Detail
                                    </Text>
                                    <View style={{ width: '50%', alignItems: 'flex-end' }}>
                                        <FontAwesome5 name="question-circle" size={24} color="#6C63FF" />
                                    </View>
                                </View>
                                <View style={{ paddingVertical: 5 }}>
                                    <Text style={{ color: '#a6a6a6', fontSize: 12 }}>
                                        User Name
                                    </Text>
                                    <Text>
                                        {!finder.user_id ? creator.first_name + " " + creator.last_name : finder.first_name + " " + finder.last_name}
                                    </Text>
                                </View>
                                {
                                    finder.user_id &&
                                    <View style={{ paddingVertical: 5 }}>
                                        <Text style={{ color: '#a6a6a6', fontSize: 12 }}>
                                            Playing with
                                        </Text>
                                        <Text>
                                            {creator.first_name + " " + creator.last_name}
                                        </Text>
                                    </View>
                                }
                                <View>
                                    <Text style={{ color: '#a6a6a6', fontSize: 12 }}>
                                        Match Date & Time
                                    </Text>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {moment(dateTime.time_of_match, 'HH:mm:ss').format("HH:mm") + " - " + moment(moment(dateTime.time_of_match, 'HH:mm:ss').hours() + 1, "HH").format("HH:mm")}
                                    </Text>
                                    <Text>
                                        {moment(dateTime.date_of_match).format("dddd DD MMMM YYYY")}
                                    </Text>
                                </View>
                                <View style={{ paddingVertical: 5 }}>
                                    <Text style={{ color: '#a6a6a6', fontSize: 12 }}>
                                        Venue
                                    </Text>
                                    <Text>
                                        {field.venue.venue_name}
                                    </Text>
                                </View>
                                <View style={{ paddingVertical: 5 }}>
                                    <Text style={{ color: '#a6a6a6' }}>
                                        Field
                                    </Text>
                                    <Text>
                                        {field.field_name}
                                    </Text>
                                </View>

                            </View>
                            <View style={{ height: '10%', flexDirection: "row", borderTopWidth: 1, alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', width: '50%', color: '#a6a6a6' }}>
                                    Total Payment
                                </Text>
                                <View style={{ width: '50%', alignItems: "flex-end" }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                        Rp. {data.bill_amount}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        width: '100%',
        height: '100%',
    }
})

export default Payment;