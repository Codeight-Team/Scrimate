import * as React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import FlatButton from '../../../../shared/button';
import moment from 'moment';
import Loading from '../../../../shared/loading';
import api from '../../../../services/api';
import { IMAGE_URL } from '@env'
import { Ionicons } from '@expo/vector-icons';

function MatchDetail({ navigation, route }) {
    const [matchDetail, setMatchDetail] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [creator_id, setCreatorId] = useState()
    const [finder_id, setFinderId] = useState()
    const [order_id, setOrderId] = useState()
    const match_id = route.params.match_id
    const user_id = route.params.user_id

    useEffect(() => {
        setTimeout(() => {
            fetchDetailMatch()
        }, 1000)
    }, [])

    const fetchDetailMatch = async () => {
        await api.get(`/api/match-making/match-detail/${match_id}`)
            .then(response => {
                setMatchDetail(response.data)
                setOrderId(response.data.order[response.data.order.length - 1].order_id)
                setCreatorId(response.data.creator_id)
                setFinderId(response.data.finder_id)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            {isLoading ?
                <Loading />
                :
                <View style={styles.container}>
                    <View style={styles.ImageContainer}>
                        <Image style={{ height: '100%', width: '100%', borderRadius: 20 }} source={{ uri: IMAGE_URL + matchDetail.field.image }}></Image>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <View style={styles.itemContainer}>
                            <View style={styles.detailContainer}>
                                <View style={{ height: '10%', width: '100%', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{matchDetail.field.field_name}
                                    </Text>
                                    <Text style={{ fontSize: 13, color: 'gray' }}>{matchDetail.field.venue.venue_name} </Text>

                                </View>
                                <View style={{ padding: 20, flexDirection: 'row' }}>
                                    <View style={{ paddingHorizontal: 10, width: '50%' }}>
                                        <View>
                                            <Text style={{ fontWeight: 'bold', color: 'black' }}>{moment(matchDetail.date_of_match).format('dddd')}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontWeight: 'bold', color: 'gray' }}>{moment(matchDetail.date_of_match).format('DD MMMM YYYY')}</Text>
                                        </View>
                                    </View>
                                    <View style={{ paddingHorizontal: 10, width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 20 }}>{moment(matchDetail.time_of_match, "HH:mm:ss").format("HH:mm")} - {moment(matchDetail.time_of_match, 'HH:mm:dd').add(1, "hours").format("HH:mm")}</Text>
                                    </View>
                                </View>
                                <View style={{ padding: 30, paddingTop: 10, height: '30%' }}>
                                    <View style={{ paddingVertical: 5 }}>
                                        <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 12 }}>
                                            Address Street
                                        </Text>
                                        <Text> {matchDetail.field.venue.address.address_street}, {matchDetail.field.venue.address.address_postalcode}</Text>
                                    </View>
                                    <View style={{ paddingVertical: 5 }}>
                                        <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 12 }}>
                                            Address Region
                                        </Text>
                                        <Text> {matchDetail.field.venue.address.address_region}</Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 30, height: '20%', flexDirection: 'row' }}>
                                    <View style={{ justifyContent: 'center', width: '60%' }}>
                                        <Text style={{ color: '#6C63FF', fontWeight: 'bold', fontSize: 12 }}>Match Creator</Text>
                                        <Text>
                                            {matchDetail.creator.first_name} {matchDetail.creator.last_name}
                                        </Text>
                                    </View>
                                    {
                                        finder_id &&
                                        <View style={{ justifyContent: 'center', width: '40%' }}>
                                            <Text style={{ color: '#6C63FF', fontWeight: 'bold', fontSize: 12 }}>Finder</Text>
                                            <Text>
                                                {matchDetail.finder.first_name} {matchDetail.finder.last_name}
                                            </Text>
                                        </View>
                                    }
                                </View>

                                <View style={{ height: '20%', justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center' }}>
                                        <Text style={{ width: '50%', fontWeight: 'bold', color: 'gray', fontSize: 12 }}>Field Price</Text>
                                        <Text style={{ width: '50%', textAlign: 'right', fontSize: 12 }}> Rp {matchDetail.field.field_price}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingHorizontal: 20, padding: 5, alignItems: 'center' }}>
                                        <Text style={{ width: '50%', fontWeight: 'bold', color: 'black', fontSize: 16 }}>Match Price</Text>
                                        <Text style={{ width: '50%', textAlign: 'right', fontWeight: 'bold', fontSize: 16 }}> Rp {matchDetail.field.field_price / 2}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                {(user_id != creator_id && user_id != finder_id) &&
                                    <FlatButton width={150} backgroundColor={'#6C63FF'} text={'Join'}
                                        onPress={() => Alert.alert('Join Match?',
                                            'You will be asked for payment if you accept this match', [
                                            {
                                                text: 'Cancel',
                                                onPress: () => console.log('Cancel Pressed'),
                                            },
                                            {
                                                text: 'OK',
                                                onPress: () => navigation.navigate("Profile", { screen: 'Payment Method', params: { user_id: creator_id, order_id: order_id, finder_id: user_id, match_id: match_id } })
                                            },
                                        ])} />
                                }
                                {finder_id && (finder_id == user_id || creator_id == user_id) ?
                                    <TouchableOpacity>
                                        <Ionicons name="md-chatbubble-ellipses" size={30} color="#6C63FF" />
                                    </TouchableOpacity>
                                    :
                                    <>
                                    </>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            }
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F8FF",
    },
    ImageContainer: {
        width: "100%",
        height: "30%",
        borderRadius: 40,
        padding: 10
    },
    descriptionContainer: {
        width: "100%",
        height: "70%",
        padding: 10
    },
    buttonContainer: {
        height: '20%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'gray',
        fontSize: 12
    },
    itemContainer: {
        backgroundColor: '#FFF',
        height: '100%',
        width: '100%',
        elevation: 4,
        borderRadius: 10
    },
    detailContainer: {
        height: '80%',
        width: '100%'
    }
});

export default MatchDetail;