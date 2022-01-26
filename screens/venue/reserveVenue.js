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

    const schedule = [
        {
            day: 1,
            timeOpen: 9,
            timeClosed: 21
        }
    ]

    function propsView() {
        if (flag == 1) {
            return <View style={{ flexDirection: 'column'}}>
                <Text style={[styles.fontSmall,styles.red]}>Sunday</Text>
                <Text style={[,styles.fontSmall,]}>Monday</Text>
                <Text style={styles.fontSmall}>Tuesday</Text>
                <Text style={styles.fontSmall}>Wednesday</Text>
                <Text style={styles.fontSmall}>Thursday</Text>
                <Text style={styles.fontSmall}>Friday</Text>
                <Text style={styles.fontSmall}>Saturday</Text>
            </View>
        }
        if (flag == 2) {
            return <View>
                <Text>Address: </Text>
                <Text>{data.address.address_street}</Text>
                <Text>{data.address.address_region}</Text>
            </View>
        }
        if (flag == 3) {
            let rating = [];
            for (let i = 0; i < data.rating.value; i++) {
                rating.push(<Star key={i} fill={"#ffd700"} width={30} height={30} />)
            }
            return rating
        } 
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
                <View style={{ width: '100%', height: '50%', borderTopWidth: 0.3, borderColor: "#dedede", flexDirection: 'row', padding: 20, }}>
                    {
                        propsView()
                    }
                </View>
                <View style={[styles.descriptionContainer, { alignItems: 'center', justifyContent: 'center', height: '20%', backgroundColor: '' }]}>
                    <View>

                    </View>
                    <FlatButton text='choose'
                        // disabled={!props.isValid} 
                        onPress={() => navigation.navigate('Choose Field', {field: data.field, venue_name: data.name, venue_image: data.images})} backgroundColor={'#6C63FF'} width={199} />
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
    red:{
        color: 'red'
    }
});

export default ReserveVenue;