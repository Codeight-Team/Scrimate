import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import CustomHeader from "../../shared/customHeader";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BCA from '../../assets/bca-logo.png'
import * as Clipboard from 'expo-clipboard';
import { FontAwesome5 } from '@expo/vector-icons';
import CountDown from 'react-native-countdown-component';

const Payment = ({ navigation, route }) => {
    const [bill, setBill] = useState({ status: 'pending' });

    useEffect(() => {
        const getBillData = async () => {
            console.log('Data BILL')
        }
        getBillData();
    }, [bill])

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <CustomHeader title={"Payment Summary"} onPressBackButton={() => navigation.goBack()} backButtonModel={"close"} />
                <View style={{ backgroundColor: '#dbe8ff', width: '100%', height: '85%' }}>
                    <View style={{ width: '100%', height: '30%', padding: 10 }}>
                        <View style={{ width: '100%', height: '100%', backgroundColor: '#FFF', padding: 20, borderRadius: 20, elevation: 5 }}>
                            <View style={{ borderRadius: 10, padding: 5, flexDirection: 'row', borderBottomWidth: 1, borderColor: 'gray' }}>
                                <Text style={{ fontSize: 20, width: '80%', fontWeight: 'bold', color: 'black', textTransform: 'capitalize' }}>
                                    Payment {bill.status}
                                </Text>
                                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                    {bill.status == "pending" ?
                                        <MaterialCommunityIcons name={"timer-outline"} size={24} color="#ffa500" />
                                        : bill.status == "settlement" ?
                                            <MaterialCommunityIcons name="alarm-check" size={24} color="green" />
                                            :
                                            <MaterialCommunityIcons name="clock-alert-outline" size={24} color="red" />
                                    }
                                </View>
                            </View>
                            <View style={{ padding: 5, flexDirection: 'row' }}>
                                <Text style={{ color: 'gray', width: '30%' }}>
                                    Order ID :
                                </Text>
                                <View style={{ width: '70%', alignItems: 'flex-end' }}>
                                    <Text style={{ color: 'gray' }}>
                                        {bill.bill_id} ADU/T/12/312388237UASD
                                    </Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', height: '30%', backgroundColor: '#e6e6e6', borderRadius: 5, flexDirection: 'row', borderWidth: 2, borderColor: '#e6e6e6' }}>
                                <View style={{ width: '20%', height: '100%', borderRadius: 5, justifyContent: "center", backgroundColor: '#FFFFFF' }}>
                                    <Image style={{ height: '90%', width: '90%' }} source={BCA} />
                                </View>
                                <View style={{ marginLeft: '1%', width: '79%', paddingHorizontal: 20, backgroundColor: '#f2f2f2', borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: "bold", width: '80%', fontSize: 15 }}>{bill.va_number}73278281991</Text>
                                    <View style={{ width: '20%', alignItems: 'flex-end' }}>
                                        <TouchableOpacity onPress={() => Clipboard.setString('hello world')}>
                                            <Text style={{ color: '#6C63FF' }}>copy</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: '30%', alignItems: "center", flexDirection: "row" }}>
                                <TouchableOpacity style={{ width: '50%', paddingVertical: 10 }}>
                                    <View >
                                        <Text style={{ color: '#6C63FF', fontSize: 11 }}>Payment Guide</Text>
                                    </View>
                                </TouchableOpacity>
                                {bill.status!="settlement"&&(
                                    <View style={{ width: '50%', flexDirection: "row", alignItems: "center", justifyContent: 'flex-end' }}>
                                        <View style={{ marginRight: 10 }}>
                                            <Text style={{ color: 'gray', fontSize: 11 }}>Expired In</Text>
                                        </View>
                                        <CountDown
                                            until={10}
                                            onFinish={() => console.log('finished')}
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
                                    Firhan Reynaldo
                                </Text>
                            </View>
                            <View style={{ paddingVertical: 5 }}>
                                <Text style={{ color: '#a6a6a6', fontSize: 12 }}>
                                    Playing with
                                </Text>
                                <Text>
                                    Babi Hutan
                                </Text>
                            </View>
                            <View>
                                <Text style={{ color: '#a6a6a6', fontSize: 12 }}>
                                    Match Date & Time
                                </Text>
                                <Text>
                                    Test
                                </Text>
                            </View>
                            <View style={{ paddingVertical: 5 }}>
                                <Text style={{ color: '#a6a6a6', fontSize: 12 }}>
                                    Venue
                                </Text>
                                <Text>
                                    Test
                                </Text>
                            </View>
                            <View style={{ paddingVertical: 5 }}>
                                <Text style={{ color: '#a6a6a6' }}>
                                    Field
                                </Text>
                                <Text>
                                    Test
                                </Text>
                            </View>

                        </View>
                        <View style={{ height: '10%', flexDirection: "row", borderTopWidth: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', width: '50%', color: '#a6a6a6' }}>
                                Total Payment
                            </Text>
                            <View style={{ width: '50%', alignItems: "flex-end" }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                    Rp. 100000
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
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