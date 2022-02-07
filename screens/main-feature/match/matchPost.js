import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Badminton from '../../../assets/icons/shuttlecock.svg';
import Futsal from '../../../assets/icons/futsal.svg';
import Football from '../../../assets/soccer-ball.svg';
import Dummy from '../../../assets/lapangan-dummy.png';
import axios from 'axios';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { set, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, } from 'react-native-reanimated';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import moment from 'moment';



function MatchPost({ navigation, route }) {
    const [address_user, setAddress] = useState("Kota Jakarta Barat") //route.params.address
    const [myMatch, setMyMatch] = useState(false)
    const [data, setData] = useState(postArray)
    const [matchList, setMatchList] = useState([])
    const locationFilterArray = ["Kota Jakarta Barat", "Kota Jakarta Utara", "Kota Jakarta Pusat", "Kota Jakarta Timur", "Kota Jakarta Selatan",]

    const user_id = route.params.user.user_id
    const address = route.params.user.address.address_region
    const title = route.params.title
    const sport = route.params.sport

    const postArray = [
        {
            id: 2,
            venue: { name: "La Futsal", address: { street: "Jl. Andara Raya", country: "Jakarta Selatan" }, rating: "5" },
            name: 'Cool FC',
            sports: {
                name: 'futsal'
            },
            schedule: {
                date: '05-2-2022',
                timeStart: '07.00 WIB',
                timeEnd: '08.00 WIB'
            }
        },
        {
            id: 3,
            venue: { name: "La Futsal", address: { street: "Jl. Andara Raya", country: "Jakarta Selatan" }, rating: "5" },
            name: 'Scar FC',
            sports: {
                name: 'futsal'
            },
            schedule: {
                date: '28-2-2022',
                timeStart: '15.00 WIB',
                timeEnd: '16.00 WIB'
            }
        },
    ]
    const [count, setCount] = useState(0);

    useEffect(() => {
        fethMatchList()
    }, [address_user, myMatch])

    const fethMatchList = async () => {
        await axios.post(`http://scrimate.com/api/match-making/list-match/${user_id}`, { sport_name: sport, address_region: "Kota Jakarta Barat" })
            .then(res => {
                console.log(res.data)
                setMatchList(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const dimensions = useWindowDimensions();
    const top = useSharedValue(
        dimensions.height
    );
    const style = useAnimatedStyle(() => {
        return {
            top: withSpring(top.value, SPRING_CONFIG),
        };
    });

    const SPRING_CONFIG = {
        damping: 80,
        overshootClamping: false,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
        stiffness: 1000,
    }
    const gestureHandler = useAnimatedGestureHandler({
        onStart(_, context) {
            context.startTop = top.value;
        },
        onActive(event, context) {
            top.value = context.startTop + event.translationY;
        },
        onEnd() {
            if (top.value > dimensions.height / 2 + 200) {
                top.value = dimensions.height;
            } else {
                top.value = dimensions.height / 2
            }
        }
    });

    function Svg(sports) {
        if (sports === 'Badminton')
            return <Badminton width={20} height={20} />
        else if (sports === 'Futsal')
            return <Futsal width={20} height={20} />
        else if (sports === 'Football')
            return <Football width={20} height={20} />
    }

    function RenderPost() {
        return matchList.map((item) => {
            return (
                <TouchableOpacity key={item.match_id} onPress={() => {
                    navigation.navigate("Match Detail", { user_id: user_id, match_id: item.match_id})
                }

                }>
                    <View style={styles.box}>
                        <View style={styles.inner}>
                            <Image style={{ width: "100%", height: "40%", borderRadius: 10 }}
                                source={{ uri: "http://scrimate.com/" + item.field.image }}></Image>
                            <View style={{
                                width: '100%',
                                height: '60%',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                marginBottom: 5,
                                borderRadius: 10,
                                borderTopRightRadius: 0,
                                borderTopLeftRadius: 0,
                                padding: 10,
                                paddingTop: 0
                            }}>
                                <View style={{ flexDirection: 'row', padding: 4, paddingLeft: 0 }}>{Svg(sport)}
                                    <Text style={{ marginLeft: 10, textTransform: 'capitalize', fontWeight: 'bold' }}>
                                        {sport}
                                    </Text>
                                </View>
                                <Text style={[styles.fontDetail,  { fontWeight: 'bold' }]}>
                                    {moment(item.date_of_match).format("dddd")}
                                </Text>
                                <Text style={styles.fontDetail}>
                                    {moment(item.date_of_match).format("ddd DD MMMM YYYY")}
                                </Text>
                                <Text style={styles.fontDetail}>
                                    {moment(item.time_of_match, "HH:mm:ss").format("HH:mm")} - {moment(item.time_of_match, 'HH:mm:dd').add(1, "hours").format("HH:mm")}
                                </Text>
                                <Text style={styles.fontDetail}>
                                    
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {item.field.venue.venue_name}
                                    </Text>
                                </Text>
                                <Text style={styles.fontDetail}>
                                    {item.field.venue.address.address_street}
                                </Text>
                                <Text style={styles.fontDetail}>
                                    {item.field.venue.address.address_region}
                                </Text>
                                <Text style={[styles.fontDetail, { fontWeight: 'bold' }]}>
                                    {/* by <Text style={{ color: '#6C63FF', fontWeight: 'bold' }}>{item.name}</Text> */}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        });
    }

    return (
        <>
            <View style={styles.container}>
                <View style={{ width: '100%', flexDirection: 'row', backgroundColor: '#fff', padding: 10, elevation: 4 }}>
                    <View style={{ width: '50%', }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setMyMatch(!myMatch)}>
                            <Text style={[myMatch ? { color: '#6C63FF' } : { color: 'gray' }, { fontWeight: 'bold' }]}>My Match</Text>
                            <View style={{ marginHorizontal: 4 }}>
                                {
                                    myMatch ?
                                        <Ionicons name="checkmark-circle" size={20} color="green" />
                                        :
                                        <Ionicons name="close-circle-sharp" size={20} color="gray" />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '50%', alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => top.value = dimensions.height / 2
                        } style={{ flexDirection: 'row' }}>
                            <View style={{ padding: 4 }}>
                                <AntDesign name="caretdown" size={10} color="black" />
                            </View>
                            <Text style={{ color: '#6C63FF', fontWeight: 'bold' }}>
                                {address_user ? address_user : "DKI Jakarta"}
                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView contentContainerStyle={{
                    backgroundColor: '#F4F8FF',
                }}>
                    <View style={styles.container}>
                        <View style={styles.subContainer}>
                            {
                                postArray.length != 0 ?
                                    RenderPost()
                                    :
                                    <Text>No Data</Text>
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View
                    style={[{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: dimensions.height,
                        backgroundColor: '#FFF',
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        padding: 20,
                        borderWidth: 1,
                        borderColor: '#6C63FF',
                        borderBottomWidth: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                        style
                    ]}>
                    <View style={{
                        flexWrap: 'wrap'
                    }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'grey' }}>Location</Text>
                            {
                                locationFilterArray.map((item) =>
                                    <TouchableOpacity key={item} onPress={() => [setAddress(item)]}>
                                        <Text style={[address_user == item ? { color: '#6C63FF' } : { color: 'black' }, { fontWeight: 'bold' }]}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F8FF'
    },
    subContainer: {
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 44
    },
    box: {
        width: 200,
        height: 330,
        padding: 5,
    },
    inner: {
        flex: 1,
        padding: 5,
        backgroundColor: '#ffffff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 10,
        elevation: 4
    },
    font: {
        color: "white",
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    fontDetail: {
        fontSize: 11,
        paddingBottom: 5,
    }
});

export default MatchPost;