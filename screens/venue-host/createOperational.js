import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import FlatButton from "../../shared/button";
import axios from "axios";
import moment from "moment";
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from "react/cjs/react.development";
import SelectDropdown from 'react-native-select-dropdown'

const CreateOperational = ({ route, navigation }) => {
    const venue = route.params.venue
    const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const [time, setTime] = useState(
        [
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
            }
        ]
    )

    const [operational, setOperational] = useState()
    const [open, setOpen] = useState([true, true, true, true, true, true, true])
    const timeAvailable = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']

    const sendOperational = async(values) => {
        await axios.post("http://66.42.49.240/api/venue/create-operationalhour/"+ venue, values)
        .then(()=>{
            Alert.alert(
                'Operational Hour',
                'Create Success',
                [
                    { text: 'OK', onPress: () => { navigation.goBack() } },
    
                ],
                { cancelable: false }
            )
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const handleSubmit = () =>{
        const newArr = open.map((item, index)=>{
            if((time[index].operational_day == (index+1))&&item==true){
                return time[index]
            }
        })
        sendOperational(newArr)
    }

    const handleOpen = (index) => {
        const newArr = open.map((item, i) => {
            if (index == i) {
                return !item
            }
            return item;
        });
        setOpen(newArr)
    }

    const handleSelectClose = (values, initial) => {
        const newItems = time.map((item, i) => {
            if (initial == item.operational_day) {
                return { ...item, operational_day: item.operational_day, operational_timeOpen: item.operational_timeOpen, operational_timeClose: values }
            }
            return item;
        });
        setTime(newItems)
        console.log(newItems);
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center' }}><Text style={{ fontSize: 18, fontWeight: 'bold' }}>Set Venue Operational Time Hour</Text></View>
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
                                <View key={index} style={{ flexDirection: "row", padding: 10, height: 60 }}>
                                    <View style={{ width: '10%', justifyContent: "center" }}>
                                        {
                                            open[index] ?
                                                <TouchableOpacity onPress={() => handleOpen(index)}>
                                                    <AntDesign name="checkcircleo" size={21} color="green" />
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity onPress={() => handleOpen(index)}>
                                                    <AntDesign name="closecircleo" size={21} color="red" />
                                                </TouchableOpacity>
                                        }
                                    </View>
                                    <View style={{ width: '30%', justifyContent: "center" }}>
                                        <Text>
                                            {day[index]}
                                        </Text>
                                    </View>
                                    {open[index] ?
                                        <View style={{ width: '60%', height: '100%', flexDirection: 'row' }}>
                                            <View style={{ width: '49%', height: '100%', alignItems: "center" }}>
                                                <SelectDropdown
                                                    data={timeAvailable}
                                                    buttonTextStyle={{ fontSize: 15 }}
                                                    defaultButtonText={item.operational_timeOpen}
                                                    buttonStyle={[styles.datePickForm]}
                                                    onSelect={(selectedItem) => {
                                                        handleSelectClose(selectedItem, item.operational_day)
                                                    }}
                                                    buttonTextAfterSelection={(selectedItem, index) => {
                                                        // text represented after item is selected
                                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                                        return selectedItem
                                                    }}
                                                    rowTextForSelection={(item, index) => {
                                                        // text represented for each item in dropdown
                                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                                        return item
                                                    }}
                                                />
                                            </View>
                                            <View style={{justifyContent: "center"}}>
                                                <Text>-</Text>
                                            </View>
                                            <View style={{ width: '49%', height: '100%', alignItems: "center" }}>
                                                <View>
                                                    <SelectDropdown
                                                        data={timeAvailable}
                                                        buttonTextStyle={{ fontSize: 15 }}
                                                        defaultButtonText={item.operational_timeClose}
                                                        buttonStyle={[styles.datePickForm]}
                                                        onSelect={(selectedItem) => {
                                                            handleSelectClose(selectedItem, item.operational_day)
                                                        }}
                                                        buttonTextAfterSelection={(selectedItem, index) => {
                                                            // text represented after item is selected
                                                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                                                            return selectedItem
                                                        }}
                                                        rowTextForSelection={(item, index) => {
                                                            // text represented for each item in dropdown
                                                            // if data array is an array of objects then return item.property to represent item in dropdown
                                                            return item
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        <View style={{ width: '60%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>CLOSED</Text>
                                        </View>
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            <View style={{ width: '100%', alignItems: "center" }}>
                <FlatButton width={150} text={'submit'} backgroundColor={'#6C63FF'} onPress={handleSubmit} />
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
        height: 40,
        width: 80,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    },
    title: {
        color: '#6C63FF',
        fontWeight: 'bold',
        textTransform: "uppercase"
    }
})

export default CreateOperational;
