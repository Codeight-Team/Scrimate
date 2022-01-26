import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Badminton from '../../../../assets/icons/shuttlecock.svg';
import Futsal from '../../../../assets/icons/futsal.svg';
import Football from '../../../../assets/soccer-ball.svg';
import Dummy from '../../../../assets/lapangan-dummy.png';
import CustomHeader from '../../../../shared/customHeader';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';



function Posts({ navigation, route }) {
    const [currLocation, setFilter] = useState(route.params.user_address)
    const [show, setShow] = useState(false)
    const [data, setData] = useState(postArray)

    const postArray = [
        {
            id: 1,
            matchname: 'Cupu Lu Semua',
            venue: { name: "Champions", address: { street: "Jl. Andara Raya", country: "Jakarta Selatan" }, rating: "5" },
            name: 'Bocah Satu',
            sports: {
                name: 'badminton'
            },
            schedule: {
                date: '25-1-2022',
                time: '07.00 WIB'
            }
        },
        {
            id: 2,
            matchname: 'Main bola',
            venue: { name: "La Futsal", address: { street: "Jl. Andara Raya", country: "Jakarta Selatan" }, rating: "5" },
            name: 'Krinj Dek',
            sports: {
                name: 'futsal'
            },
            schedule: {
                date: '25-1-2022',
                time: '07.00 WIB'
            }
        },
        {
            id: 3,
            venue: "",
            matchname: 'bersama main',
            name: 'Angel Bos',
            sports: {
                name: 'badminton'
            },
            schedule: {
                date: '25-1-2022',
                time: '07.00 WIB'
            }
        },
        {
            id: 12,
            matchname: 'Cupu Lu Semua',
            venue: { name: "Lapangan Si Boy", address: { street: "Jl. Andara Raya", country: "Jakarta Selatan" }, rating: "5" },
            name: 'Para men',
            sports: {
                name: 'badminton'
            },
            schedule: {
                date: '25-1-2022',
                time: '07.00 WIB'
            }
        },
        {
            id: 43,
            matchname: 'Cupu Lu Semua',
            venue: { name: "Lapangan Banteng", address: { street: "Jl. Andara Raya", country: "Jakarta Selatan" }, rating: "5" },
            name: 'hei5',
            sports: {
                name: 'football'
            },
            schedule: {
                date: '25-1-2022',
                time: '07.00 WIB'
            }
        },
        {
            id: 5,
            venue: { name: "Lapangan Si Boy", address: { street: "Jl. Andara Raya", country: "Jakarta Selatan" }, rating: "5" },
            matchname: 'Cupu Lu Semua',
            name: 'hei6',
            sports: {
                name: 'badminton'
            },
            schedule: {
                date: '25-1-2022',
                time: '07.00 WIB'
            }
        },{
            id: 23,
            matchname: 'Cupu Lu Semua',
            venue: { name: "Lapangan Banteng", address: { street: "Jl. Andara Raya", country: "Jakarta Selatan" }, rating: "5" },
            name: 'hei5',
            sports: {
                name: 'football'
            },
            schedule: {
                date: '25-1-2022',
                time: '07.00 WIB'
            }
        },
        {
            id: 11,
            venue: { name: "Lapangan Si Boy", address: { street: "Jl. Andara Raya", country: "Jakarta Selatan" }, rating: "5" },
            matchname: 'Cupu Lu Semua',
            name: 'hei6',
            sports: {
                name: 'badminton'
            },
            schedule: {
                date: '25-1-2022',
                time: '07.00 WIB'
            }
        },
    ]

    const locationFilterArray = ["DKI Jakarta", "Jakarta Barat", "Jakarta Utara", "Jakarta Pusat", "Jakarta Timur", "Jakarta Selatan",]

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
        overshootClamping: true,
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

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
                <CustomHeader props={props} title={"Match"} />
            ),
            headerStyle: {
                backgroundColor: '#6C63FF', //Set Header color
            },
        });
    }, [navigation]);

    function Svg(sports) {
        if (sports === 'badminton')
            return <Badminton width={20} height={20} />
        else if (sports === 'futsal')
            return <Futsal width={20} height={20} />
        else if (sports === 'football')
            return <Football width={20} height={20} />
    }

    function RenderPost() {
        return postArray.map((item) => {
            return (
                <TouchableOpacity key={item.id} onPress={() => {
                    navigation.navigate("Match Detail", { data: item })
                    console.log(route.params)
                }

                }>
                    <View style={styles.box}>
                        <View style={styles.inner}>

                            {/* <View style={{
                                width: '100%',
                                height: '30%', alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#D2D1D1',
                                borderRadius: 10,

                            }}> */}
                            <Image style={{ width: "100%", height: "40%", borderRadius: 10 }}
                                source={Dummy}></Image>
                            {/* <Dummy color={'black'} width= {100}  height= {100}></Dummy> */}
                            {/* </View> */}
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
                                <View style={{ flexDirection: 'row', padding: 4, paddingLeft: 0 }}>{Svg(item.sports.name)}
                                    <Text style={{ marginLeft: 10, textTransform: 'capitalize', fontWeight: 'bold' }}>
                                        {item.sports.name}
                                    </Text>
                                </View>
                                <Text style={styles.fontDetail}>
                                    {item.schedule.date}
                                </Text>
                                <Text style={styles.fontDetail}>
                                    {item.schedule.time}
                                </Text>
                                <Text style={styles.fontDetail}>
                                    Venue:
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {item.venue ? ' ' + item.venue.name : " TBD"}
                                    </Text>
                                </Text>
                                <Text style={styles.fontDetail}>
                                    {item.venue ? item.venue.address.street : ""}
                                </Text>
                                <Text style={styles.fontDetail}>
                                    {item.venue ? item.venue.address.country : ""}
                                </Text>
                                <Text style={[styles.fontDetail, { fontWeight: 'bold' }]}>
                                    by <Text style={{ color: '#6C63FF', fontWeight: 'bold' }}>{item.name}</Text>
                                </Text>
                            </View>

                        </View>
                    </View>
                </TouchableOpacity>
            );
        });
    }

    const noData = () => {
        <Text style={{ color: 'black', fontSize: 20 }}>No Data</Text>
    }

    return (
        <>
            <View>
                <View style={{ width: '100%', backgroundColor: '#fff', padding: 10, elevation:4}}>
                    <TouchableOpacity  onPress={() => top.value = dimensions.height / 2
                } style={{ flexDirection: 'row' }}>
                        <Text style={{ color: '#6C63FF', fontWeight: 'bold' }}>
                            {/* {route.params.user_address} */}
                            {route.params.user_address}
                        </Text>
                        <View style={{ padding: 3 }}>
                            {
                                <AntDesign name="caretdown" size={10} color="black" />
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                <       ScrollView>
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
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                        style
                    ]}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center', flexDirection: 'column',
                        flexWrap: 'nowrap'
                    }}>
                        <Text style={{ color: 'grey', fontWeight: 'bold' }}>Location</Text>
                        {
                            locationFilterArray.map((item) =>
                                <TouchableOpacity key={item} onPress={() => [setFilter(item), navigation.navigate('Forum Stack', { user_address: item })]}>
                                    <Text style={currLocation == item ? { color: '#6C63FF' } : { color: 'black' }}>{item}</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        width: '100%',
        height: '85%',
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#F4F8FF',
        marginBottom: 90
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

export default Posts;