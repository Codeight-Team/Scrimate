import * as React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Star from '../../assets/icons/star.svg'
import NotFound from '../../assets/image-not-found.svg';
import FlatButton from '../../shared/button';


function ReserveVenue({ navigation, route }) {
    const [flag, setFlag] = useState(1);

    const data = route.params.item;

    const tabData = [{ name: 'Time Open', id: 1 }, { name: 'Location', id: 2 }, { name: 'Rating', id: 3 }];

    const day = [
        {
            id: 1,
            name: 'Monday'
        },
        {
            id: 2,
            name: 'Tuesday'
        },
        {
            id: 3,
            name: 'Wednesday'
        },
        {
            id: 4,
            name: 'Thursday'
        },
        {
            id: 5,
            name: 'Friday'
        },
        {
            id: 6,
            name: 'Saturday'
        },
        {
            id: 7,
            name: 'Minggu'
        }
    ]

    const timeOpen = [
        {
            operational_day: 1,
            operational_timeOpen: '09:00',
            operational_timeClosed: '21:00'
        },
        {
            operational_day: 2,
            operational_timeOpen: '09:00',
            operational_timeClosed: '21:00'
        },
        {
            operational_day: 3,
            operational_timeOpen: '09:00',
            operational_timeClosed: '21:00'
        },
        {
            operational_day: 4,
            operational_timeOpen: '09:00',
            operational_timeClosed: '21:00'
        },
        {
            operational_day: 5,
            operational_timeOpen: '09:00',
            operational_timeClosed: '21:00'
        },
        {
            operational_day: 7,
            operational_timeOpen: '09:00',
            operational_timeClosed: '21:00'
        }
    ]

    const renderTimeOpen = () => {
        return day.map((item, index) => {
            return (
                <View style={{ flexDirection: 'row' }} key={item.id}>
                    <View style={{ width: 150 }}>
                        <Text style={[!timeOpen[index]?{color: 'red'}:{ color: 'black'}, {fontWeight: 'bold' }]}>
                            {
                                item.name
                            }
                        </Text>
                    </View>
                    {timeOpen[index] ?
                        <Text style={{ color: '#6C63FF' }}>
                            {timeOpen[index].operational_timeOpen} - {timeOpen[index].operational_timeClosed}
                        </Text>
                        :
                        <View style={{width: 80, alignItems: 'center'}}>
                            <Text style={{color: 'red'}}>
                                Closed
                            </Text>
                        </View>
                    }

                </View>
            )
        }
        )
    }

    const propsView = () => {
        return (
            <View>
                {flag == 1 ?
                    <View style={{ flexDirection: 'column' }}>
                        {
                            renderTimeOpen()
                        }
                    </View>
                    : flag == 2 ?
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Address: </Text>
                            <Text>Tes{data.address.address_street}</Text>
                            <Text>{data.address.address_region}</Text>
                        </View>
                        :
                        <Text>Empty</Text>
                }
            </View>



        )
        // let rating = [];
        // for (let i = 0; i < data.rating.value; i++) {
        //     rating.push(<Star key={i} fill={"#ffd700"} width={30} height={30} />)
        // }
        // return rating
    }

    return (
        <View style={styles.container}>
            <View style={styles.ImageContainer}
            >{data.images ?
                <Image style={{ height: '100%', width: '100%' }} source={{ uri: data.images }} />
                :
                <NotFound width={"90%"} height={"90%"} fill={'gray'} />
                }</View>
            <View style={[styles.descriptionContainer, { alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'white' }]}>
                <View style={{ height: '10%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{data.name}</Text>
                </View>
                <View style={{ width: '100%', height: '9%', flexDirection: 'row' }}>
                    {
                        tabData.map((item) => (
                            <TouchableOpacity key={item.id} onPress={() => setFlag(item.id)} style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text>{item.name}</Text>
                                <View style={flag == item.id ? { backgroundColor: '#6C63FF', height: '10%', width: '100%', borderRadius: 40 } : { height: '10%', width: '50%' }}></View>
                            </TouchableOpacity>
                        )
                        )
                    }
                    {/* <Text>Facility</Text>
                    <Text>{route.params.item.address.address_region}</Text>
                    <Text>{route.params.item.address.address_city}</Text> */}
                </View>
                <View style={{ width: '100%', height: '50%', borderTopWidth: 0.3, borderColor: "#dedede", flexDirection: 'row', padding: 20, justifyContent: 'center' }}>
                    {
                        propsView()
                    }
                </View>
                <View style={[styles.descriptionContainer, { alignItems: 'center', justifyContent: 'center', height: '20%', backgroundColor: '' }]}>
                    <View>

                    </View>
                    <FlatButton text='choose'
                        // disabled={!props.isValid} 
                        onPress={() => navigation.navigate('Choose Field', { field: data.field, venue_name: data.name, venue_image: data.images, address: data.address })} backgroundColor={'#6C63FF'} width={199} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#eaeaea",
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    ImageContainer: {
        width: "100%",
        height: "30%",
        backgroundColor: '#eaeaea',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'

    },
    descriptionContainer: {
        width: "100%",
        height: "70%",
        elevation: 4,
    },
    fontSmall: {
        fontSize: 14,
        padding: 5,
        color: '#6C63FF',
        fontWeight: 'bold'
    },
    red: {
        color: 'red'
    }
});

export default ReserveVenue;