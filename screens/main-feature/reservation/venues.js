import * as React from 'react';
import { StyleSheet, View, Text, RefreshControl, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Card from '../../../shared/card'
import { AntDesign } from '@expo/vector-icons';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import NoDataView from '../../../shared/noDataFound';
import { useFocusEffect } from '@react-navigation/native';


function ReservationScreen({ navigation, route }) {
    const [preferedAddress, setAddress] = useState("Kota Jakarta Barat")
    const address_user = route.params.address
    const locationFilterArray = ["Kota Jakarta Barat", "Kota Jakarta Utara", "Kota Jakarta Pusat", "Kota Jakarta Timur", "Kota Jakarta Selatan",]
    const [refreshing, setRefreshing] = useState(false);
    const [venues, setVenues] = useState([])

    const title = route.params.title
    const sport = route.params.sport

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => [fetchVenues(),setRefreshing(false)]);
    }, []);

    useEffect(() => {
        fetchVenues()
    },[preferedAddress]);

    const fetchVenues = async () => {
        await axios.post(`http://66.42.49.240/api/venue/get-venue/`, { sport_name: sport, address_region: preferedAddress }).then((response) => {
                setVenues(response.data)
        })
            .catch(error => {
                console.log(error)
            });
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

    function renderVenue() {
        return venues.map((item) => {
            return (
                <TouchableOpacity style={{ width: '100%' }} activeOpacity={.7} key={item.venue_id} onPress={() =>
                    navigation.navigate("Reserve Venue", { venue_id: item.venue_id, title: title })
                }>
                    <Card type='small' name={item.venue_name} image={item.image} description={item.address.address_region} />
                </TouchableOpacity>
            )
        });
    }
    function MainContent() {
        return (
            <>
                {
                    renderVenue()
                }
            </>
        )
    }


    return (
        <>
            <View style={styles.container}>
                <View style={{ width: '100%', flexDirection: 'row', backgroundColor: '#fff', padding: 10, elevation: 4 }}>
                    <View style={{ width: '50%', }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <Text style={[{ color: 'gray' }, { fontWeight: 'bold' }]}>{sport}, {title}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '50%', alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => top.value = dimensions.height / 2
                        } style={{ flexDirection: 'row' }}>
                            <View style={{ padding: 4 }}>
                                <AntDesign name="caretdown" size={10} color="black" />
                            </View>
                            <Text style={{ color: '#6C63FF', fontWeight: 'bold' }}>
                                {preferedAddress ? preferedAddress : "Kota Jakarta Barat"}
                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                    {venues.length ?
                        MainContent()
                        :
                        <NoDataView type={"Venue"}/>
                    }
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
                                        <Text style={[preferedAddress == item ? { color: '#6C63FF' } : { color: 'black' }, { fontWeight: 'bold' }]}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#F4F8FF",
        padding: 0,
        paddingTop: 0,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    filter: {
        backgroundColor: '#6C63FF',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    bgLight: {
        backgroundColor: '#847dff',
    },
    bgLighter: {
        backgroundColor: '#9c96ff',
    },
    fontMedium: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default ReservationScreen;