import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import NoDataView from '../../../shared/noDataFound';
import api from '../../../services/api';
import Post from './components/post';



function MatchPost({ navigation, route }) {
    const [address_user, setAddress] = useState("Kota Jakarta Barat") //route.params.address
    const [myMatch, setMyMatch] = useState(false)
    const [matchList, setMatchList] = useState([])
    const locationFilterArray = ["Kota Jakarta Barat", "Kota Jakarta Utara", "Kota Jakarta Pusat", "Kota Jakarta Timur", "Kota Jakarta Selatan",]

    const user_id = route.params.user.user_id
    const address = route.params.user.address.address_region
    const title = route.params.title
    const sport = route.params.sport

    useEffect(() => {
        fetchMatchList()
    }, [address_user, myMatch])

    const fetchMatchList = async () => {
        await api.post(`/api/match-making/list-match/${user_id}`, { sport_name: sport, address_region: "Kota Jakarta Barat" })
            .then(res => {
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



    function RenderPost() {
        return matchList.map((item) => {
            return <Post
                key={item.match_id}
                user_id={user_id}
                item={item}
                onPress={() => navigation.navigate("Match Detail", { user_id: user_id, match_id: item.match_id })} />
        });
    }

    return (
        <>
            <View style={styles.container}>
                <View style={{ width: '100%', flexDirection: 'row', backgroundColor: '#fff', padding: 10, elevation: 4 }}>
                    <View style={{ width: '50%', }}>
                        <Text style={[myMatch ? { color: '#6C63FF' } : { color: 'gray' }, { fontWeight: 'bold' }]}>Join Match</Text>
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
                                matchList.length < 1?
                                    <NoDataView type={"Match"} />
                                    :
                                    RenderPost()
                            }
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    onPress={() => navigation.navigate('My Match', { user_id: user_id })}
                    style={{ width: '100%', height: "10%", backgroundColor: '#6C63FF', alignItems: 'center', justifyContent: 'center', elevation: 4 }}>
                    <View>
                        <Text style={{ fontSize: 17, color: '#fff' }}>Go to My Match</Text>
                    </View>
                </TouchableOpacity>
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