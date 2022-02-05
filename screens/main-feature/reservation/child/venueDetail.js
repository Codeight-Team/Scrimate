import * as React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NotFound from '../../../../assets/image-not-found.svg';
import FlatButton from '../../../../shared/button';
import { FontAwesome } from '@expo/vector-icons';
import Loading from '../../../../shared/loading';
import moment from 'moment';


function ReserveVenue({ navigation, route }) {
    const [flag, setFlag] = useState(1);
    const [venue, setVenue] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const venue_id = route.params.venue_id;

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

    useEffect(() => {
        fetchVenueDetail()
    }, [])

    const fetchVenueDetail = async () => {
        await axios.get(`http://66.42.49.240/api/venue/venue-detail/${venue_id}`)
            .then(response => {
                setVenue(response.data)
                console.log(response.data);
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const renderTimeOpen = () => {
        return day.map((item, index) => {
            return (
                <View style={{ flexDirection: 'row' }} key={item.id}>
                    <View style={{ width: 150 }}>
                        <Text style={[!venue.operationals[index] ? { color: '#a50000' } : { color: 'black' }, { fontWeight: 'bold' }]}>
                            {
                                item.name
                            }
                        </Text>
                    </View>
                    {venue.operationals[index] ?
                        <Text style={{ color: 'black' }}>
                            {moment(venue.operationals[index].operational_timeOpen, "HH:mm:ss").format("HH:mm") + " - "}

                            {moment(venue.operationals[index].operational_timeClose, "HH:mm:ss").format("HH:mm")}
                        </Text>
                        :
                        <View style={{ width: 80, alignItems: 'center' }}>
                            <Text style={{ color: '#8b0000' }}>
                                Closed
                            </Text>
                        </View>
                    }

                </View>
            )
        }
        )
    }

    const renderRating = (values, size) => {
        const rating = [];
        for (let i = 0; i < values; i++) {
            rating.push(<FontAwesome key={i} name="star" size={size} color="orange" />)
        }
        for (let i = 0; i < (5 - values); i++) {
            rating.push(<FontAwesome key={i + 10} name="star-o" size={size} color="orange" />)
        }
        return rating;
    }

    const propsView = () => {
        return (
            <View style={{ width: '100%' }}>
                {flag == 1 &&
                    <View style={{ flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                        {
                            renderTimeOpen()
                        }
                    </View>
                }
                {
                    flag == 2 &&
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Address: </Text>
                        <Text>{venue.address.address_street}</Text>
                        <Text>{venue.address.address_region}</Text>
                    </View>
                }
                {/* venue.venue_rating.length  */}

                {flag == 3 && (venue.venue_rating.length ?
                    <ScrollView style={{ width: '100%' }}>
                        <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                            <Text style={{ paddingEnd: 20, fontWeight: 'bold' }}>
                                Rating
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    renderRating(4, 20)
                                }
                            </View>
                            <Text style={{ paddingHorizontal: 5 }}>(15)</Text>
                        </View>
                        <View style={{ paddingVertical: 5, }}>
                            <Text style={{ color: 'gray' }}>Review</Text>
                        </View>
                        {
                        venue.venue_rating.map(item => (
                            <View style={{ paddingVertical: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {
                                        renderRating(4, 14)
                                    }
                                </View>
                                <Text style={{ paddingRight: 10, fontSize: 12, fontWeight: 'bold' }}>Juki</Text>
                                <Text>yeakyeakyeakyeakjwandunawduwqnidqwwndqiwuwndiqjndiqnduwqndiqundiqudniqwudnqiuwdniqudniqwuwndqiudnqiudniqwudniw</Text>
                            </View>
                        ))
                        }
                    </ScrollView>
                    :
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={{ color: "gray" }}>
                            No Ratings Yet
                        </Text>
                    </View>
                )
                }
            </View>



        )
    }

    return (
        <View style={styles.container}>
            {isLoading ?
                <Loading />
                :
                <>
                    <View style={styles.ImageContainer}
                    // { uri: data.images }
                    >{venue.image ?
                        <Image style={{ height: '100%', width: '100%' }} source={{ uri: "http://66.42.49.240/" + venue.image }} />
                        :
                        <NotFound width={"90%"} height={"90%"} fill={'gray'} />
                        }</View>
                    <View style={[styles.descriptionContainer, { alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'white' }]}>
                        <View style={{ height: '10%' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{venue.venue_name}</Text>
                        </View>
                        <View style={{ width: '100%', height: '9%', flexDirection: 'row', }}>
                            {
                                tabData.map((item) => (
                                    <TouchableOpacity key={item.id} onPress={() => setFlag(item.id)} style={{ width: '33%', alignItems: 'center', justifyContent: 'center', }}>
                                        <Text>{item.name}</Text>
                                        <View style={[flag == item.id ? { backgroundColor: '#6C63FF', height: '10%', width: '100%', borderRadius: 40 } : { height: '10%', width: '100%', borderBottomWidth: 1, borderColor: "#dedede" }]}></View>
                                    </TouchableOpacity>
                                )
                                )
                            }
                            {/* <Text>Facility</Text>
                    <Text>{route.params.item.address.address_region}</Text>
                    <Text>{route.params.item.address.address_city}</Text> */}
                        </View>
                        <View style={[{ width: '100%', height: '40%', flexDirection: 'row', padding: 20 }, flag == 1 && { justifyContent: 'center' }]}>
                            {
                                propsView()
                            }
                        </View>
                        <View style={{ width: '100%', padding: 20, height: '21%', borderTopWidth: 0.5, borderColor: '#cecece' }}>
                            <Text style={{ fontWeight: 'bold' }}>Description</Text>
                            <Text>Description</Text>
                        </View>
                        <View style={[styles.descriptionContainer, { alignItems: 'center', justifyContent: 'center', height: '21%' }]}>
                            <FlatButton text='choose'
                                // disabled={!props.isValid} 
                                onPress={() => navigation.navigate('Choose Field', { field: data.field, venue_name: data.name, venue_image: data.images, address: data.address })} backgroundColor={'#6C63FF'} width={199} />
                        </View>
                    </View>
                </>
            }
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