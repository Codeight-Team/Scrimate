import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DatePicker from 'react-native-neat-date-picker'
import FlatButton from "../../shared/button";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
import api from "../../services/api";

const FieldSchedule = ({ route }) => {
    const [date, setDate] = useState(new Date)
    const [newDate, setNewDate] = useState(new Date)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [unavailable, setUnavailable] = useState([])
    const [available, setAvailable] = useState([])
    const [picked, setPicked] = useState()

    const operationals = route.params.operationals;

    const openDatePicker = () => {
        setShowDatePicker(true)
    }

    const onCancel = () => {
        setShowDatePicker(false)
    }

    const fetchTimeOpen = async (date) => {
        console.log(route.params.field_id);
        await api.post('/api/field/field-schedule/' + route.params.field_id, { date_choose: date })
            .then(res => {
                // checkTimeOpen(res.data.times)
                setUnavailable(res.data.times)
                checkTimeOpen(res.data.times)
            })
            .catch(err => console.log(err))
    }

    const onConfirm = async (date) => {
        let newDate = new Date(date)
        newDate.setDate(newDate.getDate() + 1)
        setDate(date)
        setNewDate(newDate)
        setShowDatePicker(false)
    }

    useEffect(() => {
        fetchTimeOpen(newDate)
    }, [newDate])

    const day = [
        { name: "Monday", id: 1 },
        { name: "Tuesday", id: 2 },
        { name: "Wednesday", id: 3 },
        { name: "Thursday", id: 4 },
        { name: "Friday", id: 5 },
        { name: "Saturday", id: 6 },
        { name: "Sunday", id: 7 }]

    const checkTimeOpen = (times) => {
        let time = []
        day.map(item => {
            if (moment(newDate).format("dddd") == item.name) {
                operationals.map(operational => {
                    if (item.id == operational.operational_day) {
                        for (let i = moment(operational.operational_timeOpen, "HH:mm:ss").hours(); i < moment(operational.operational_timeClose, "HH:mm:ss").hours(); i++) {
                            if (times.length != 0) {
                                if (times.indexOf(moment(i, "HH").format("HH:mm:ss")) == -1) {
                                    time.push({ timeOpen: i, timeClose: i + 1 })
                                }
                            } else {
                                time.push({ timeOpen: i, timeClose: i + 1 })
                            }

                        }
                    }
                })
            }
        })
        setAvailable(time)
        console.log(time);
    }

    // const bookedSchedule = async () =>{
    //     // await api.post('')
    //     // .then(res=>{

    //     // })
    //     // .catch(err=>{

    //     // })
    // }


    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <View style={styles.dateBox}>
                        <Text style={{ fontWeight: "bold" }}>{moment(date).format('dddd')} {moment(date).format('DD MMMM yyyy')}</Text>
                    </View>
                    <FlatButton text={"choose"} backgroundColor={"#6C63FF"} onPress={() => openDatePicker()} />
                </View>
                <View>
                    <View style={styles.dateBox}>
                        <Text>Unavailable Time</Text>
                        <View style={styles.wrapBox}>
                            {unavailable.map((item, index) => (
                                <View key={index} style={{ padding: 5 }}>
                                    <TouchableOpacity disabled={true}
                                        style={[
                                            {
                                                padding: 5,
                                                backgroundColor: "gray",
                                                elevation: 5,
                                                borderRadius: 10,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            },
                                        ]}>
                                        <Text style={{ fontWeight: 'bold' }}>{moment(item, 'HH:mm:ss').format('HH:mm')}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                            }
                        </View>
                    </View>
                    <View style={styles.dateBox}>
                        <Text>Available Time</Text>
                        <View style={styles.wrapBox}>
                            {available.map((item, index) => (
                                <View key={index} style={{ padding: 5 }}>
                                    <TouchableOpacity
                                        onPress={()=>setPicked(item.timeOpen)}
                                        style={[
                                            {
                                                padding: 5,
                                                backgroundColor: "#cecece",
                                                elevation: 5,
                                                borderRadius: 10,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            },
                                            picked==item.timeOpen&&{backgroundColor:'gray'}
                                        ]}>
                                        <Text style={{ fontWeight: 'bold' }}>{
                                            moment(item.timeOpen, 'HH').format('HH:mm')
                                        }</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                            }
                        </View>
                    </View>
                </View>
                <View style={styles.dateBox}>
                    <FlatButton text={"Submit"} width={200} backgroundColor={"#6C63FF"} onPress={() => bookedSchedule()} />
                </View>
                <DatePicker
                    isVisible={showDatePicker}
                    mode={'single'}
                    onCancel={onCancel}
                    onConfirm={onConfirm}
                // minDate={new Date()}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dateBox: {
        alignItems: "center",
        padding: 20
    },
    wrapBox: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
})

export default FieldSchedule