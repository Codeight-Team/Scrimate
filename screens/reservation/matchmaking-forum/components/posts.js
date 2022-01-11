import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-web';
import Badminton from '../../../../assets/icons/shuttlecock.svg';
import Futsal from '../../../../assets/icons/futsal.svg';
import Football from '../../../../assets/soccer-ball.svg';
import Dummy from '../../../../assets/lapangan-dummy.png';

function Posts({navigation}) {
    const postArray = [
        {
            id: 1,
            matchname: 'Cupu Lu Semua',
            venue: { name: "Lapangan Si Boy", address: { street: "Jl. Andara Raya", country: "Jakarta Selatan" }, rating: "5" },
            name: 'Bocah Satu',
            sports: {
                name: 'badminton'
            },
            schedule:{
                date:'25-1-2022',
                time: '07.00 WIB'
            }
        },
        {
            id: 2,
            matchname: 'Main bola',
            venue: { name: "Lapangan Si Boy", address: { street: "Jl. Andara Raya", country: "Jakarta Selatan" }, rating: "5" },
            name: 'Krinj Dek',
            sports: {
                name: 'futsal'
            },
            schedule:{
                date:'25-1-2022',
                time: '07.00 WIB'
            }
        },
        {
            id: 3,
            venue: { name: "Lapangan Si Boy", address: { street: "Jl. Andara Raya", country: "Jakarta Selatan" }, rating: "5" },
            matchname: 'bersama main',
            name: 'Angel Bos',
            sports: {
                name: 'badminton'
            },
            schedule:{
                date:'25-1-2022',
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
            schedule:{
                date:'25-1-2022',
                time: '07.00 WIB'
            }
        },
        {
            id: 43,
            matchname: 'Cupu Lu Semua',
            venue: { name: "Lapangan Si Boy", address: { street: "Jl. Andara Raya", country: "Jakarta Selatan" }, rating: "5" },
            name: 'hei5',
            sports: {
                name: 'football'
            },
            schedule:{
                date:'25-1-2022',
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
            schedule:{
                date:'25-1-2022',
                time: '07.00 WIB'
            }
        },
    ]
    function Svg(sports) {
        if (sports === 'badminton')
            return <Badminton width={20} height={20} />
        else if (sports === 'futsal')
            return <Futsal width={20} height={20} />
        else if (sports === 'football')
            return <Football width={20} height={20}/>
    }

    function RenderPost() {
        return postArray.map((item) => {
            return (
                <TouchableOpacity key={item.id} onPress={() => 
                // console.log('pressed')
                navigation.navigate("Match Detail", {match_id: item.id})
                }>
                    <View style={styles.box}>
                        <View style={styles.inner}>
                            <View style={{
                                width: '100%',
                                height: '15%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#6C63FF',
                                borderRadius: 10,
                                borderBottomRightRadius: 0,
                                borderBottomLeftRadius: 0,
                            }}>
                                <Text style={styles.font}>
                                    {item.matchname}
                                </Text>
                            </View>
                            {/* <View style={{
                                width: '100%',
                                height: '30%', alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#D2D1D1',
                                borderRadius: 10,

                            }}> */}
                                <Image style={{width: "100%", height:"30%"}}
                                    source={Dummy}></Image>
                            {/* </View> */}
                            <View style={{
                                width: '100%',
                                height: '55%',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                backgroundColor: '#b5b1ff',
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
                                    {item.venue.name}
                                </Text>
                                <Text style={styles.fontDetail}>
                                    {item.venue.address.street}
                                </Text>
                                <Text style={styles.fontDetail}>
                                    {item.venue.address.country}
                                </Text>
                                <Text style={styles.fontDetail}>
                                    By <Text style={{ color: '#6C63FF', fontWeight: 'bold' }}>{item.name}</Text>
                                </Text>
                            </View>

                        </View>
                    </View>
                </TouchableOpacity>
            );
        });
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    {
                        RenderPost()
                    }
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
      },
    subContainer: {
        width: '100%',
        height: '85%',
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#F4F8FF',
        marginBottom: 50
    },
    box: {
        width: 200,
        height: 350,
        padding: 5,
    },
    inner: {
        flex: 1,
        padding: 5,
        backgroundColor: '#ffffff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 10,
    },
    font: {
        color: "white",
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    fontDetail: {
        fontSize: 11
    }
});

export default Posts;