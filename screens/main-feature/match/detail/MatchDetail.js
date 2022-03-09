import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect } from 'react';
import FlatButton from '../../../../shared/button';
import moment from 'moment';
import Loading from '../../../../shared/loading';
import api from '../../../../services/api';
import { IMAGE_URL } from '@env'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

function MatchDetail({ navigation, route }) {
    const [matchDetail, setMatchDetail] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [creator_id, setCreatorId] = useState()
    const [finder_id, setFinderId] = useState()
    const [order, setOrderId] = useState()
    const [transaction_id, setTransaction_id] = useState('')
    const [refund_reason, setRefundReason] = useState('')
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
                setTransaction_id(response.data.order[response.data.order.length - 1].bills[0].transaction.transaction_id);
                setMatchDetail(response.data)
                setOrderId(response.data.order[response.data.order.length - 1])
                setCreatorId(response.data.creator_id)
                setFinderId(response.data.finder_id)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const requestRefund = async () => {
        await api.post('/api/payment/refund/' + user_id + '/' + transaction_id, { refund_reason: refund_reason })
            .then(response => {
                Alert.alert('Refund Request Success', 'Refund Takes Time, Check Your Bank Account Frequently', [{
                    text: 'OK',
                    onPress: () => navigation.goBack()
                }]
                )
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleChange = (e) => {
        setRefundReason(e);
    }


    return (
        <>
            {isLoading ?
                <Loading />
                :
                <View style={styles.container}>
                    <View style={styles.head}>
                        <View style={styles.ImageContainer}>
                            <Image style={{ height: '100%', width: '100%', borderRadius: 20 }} source={{ uri: IMAGE_URL + matchDetail.field.image }}></Image>
                        </View>
                        <ScrollView>

                            <View style={styles.descriptionContainer}>
                                <View style={styles.itemContainer}>
                                    <View style={styles.detailContainer}>
                                        <View style={{ height: 30, width: '100%', alignItems: 'center' }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{matchDetail.field.field_name}
                                            </Text>
                                            <Text style={{ fontSize: 13, color: 'gray' }}>{matchDetail.field.venue.venue_name} </Text>

                                        </View>
                                        <View style={{ padding: 20, flexDirection: 'row' }}>
                                            <View style={{ paddingHorizontal: 10, paddingTop: 15, width: '50%' }}>
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
                                        <View style={{ padding: 30, paddingVertical: 10 }}>
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
                                        <View style={{ paddingHorizontal: 30, flexDirection: 'row' }}>
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

                                        <View style={{ justifyContent: 'center', paddingVertical: 10, paddingTop: 30 }}>
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
                                                        onPress: () => navigation.navigate("Profile", { screen: 'Payment Method', params: { user_id: creator_id, order_id: order.order_id, finder_id: user_id, match_id: match_id } })
                                                    },
                                                ])} />
                                        }
                                        {finder_id && (finder_id == user_id || creator_id == user_id) ?
                                            <TouchableOpacity style={{ width: 50, alignItems: 'center' }}>
                                                <Ionicons name="md-chatbubble-ellipses" size={30} color="#6C63FF" />
                                            </TouchableOpacity>
                                            :
                                            <>
                                            </>
                                        }
                                        {order.order_status == 'Invalid' &&
                                            <KeyboardAvoidingView behavior={null} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ paddingHorizontal: 10, borderWidth: 1, borderRadius: 10, marginRight: 5 }}>
                                                    <TextInput
                                                        placeholder='Refund Reason'
                                                        style={{ width: 150 }}
                                                        multiline={true}
                                                        onChangeText={handleChange}
                                                        value={refund_reason} />
                                                </View>
                                                <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#6C63FF', padding: 5, borderRadius: 10 }}
                                                    onPress={() => requestRefund()}>
                                                    <Text style={{ color: '#FFF' }}>Refund</Text>
                                                    <View style={{ width: 25, alignItems: 'flex-end' }}>
                                                        <MaterialCommunityIcons name="cash-refund" size={20} color="#FFF" />
                                                    </View>
                                                </TouchableOpacity>
                                            </KeyboardAvoidingView>
                                        }


                                    </View>

                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            }
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        flex: 1,
        backgroundColor: "#F4F8FF",
    },
    ImageContainer: {
        width: "100%",
        // height: "30%",
        height: 200,
        borderRadius: 40,
        padding: 10
    },
    descriptionContainer: {
        width: "100%",
        padding: 10
    },
    buttonContainer: {
        paddingVertical: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        color: 'gray',
        fontSize: 12
    },
    itemContainer: {
        backgroundColor: '#FFF',
        width: '100%',
        elevation: 4,
        borderRadius: 10
    },
    detailContainer: {
        width: '100%'
    }
});

export default MatchDetail;