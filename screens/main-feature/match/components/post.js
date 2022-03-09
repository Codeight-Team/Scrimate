import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import Svg from './svg';
import { Ionicons } from '@expo/vector-icons';

const Post = ({ item, user_id, onPress }) => {
    const date = new Date();

    const invalid = moment(moment(date).format('YYYY-MM-DD')).isAfter(moment(item.date_of_match).format('YYYY-MM-DD'))

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.box}>
                <View style={[styles.inner, invalid
                    && { borderWidth: 1, borderColor: 'red', backgroundColor: '#cecece' }]}>
                    <View style={{ width: "100%", height: "40%" }}>
                        <Image style={{ width: "100%", height: "100%", borderRadius: 10, backgroundColor: 'black'}}
                            source={{ uri: "http://scrimate.com/" + item.field.image }}></Image>
                        {
                            invalid &&
                            <View style={{ borderRadius: 10, position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'black', opacity: 0.6}}>
                                <Ionicons name="md-warning" size={20} color="#8b0000" />
                                <Text style={{fontWeight: 'bold', color: '#8b0000'}}>
                                    DUE DATE
                                </Text>
                            </View>
                        }
                    </View>
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
                        <View style={{ flexDirection: 'row', padding: 4, paddingLeft: 0 }}>{Svg(item.field.venue.sport.sport_name)}
                            <Text style={{ marginLeft: 10, textTransform: 'capitalize', fontWeight: 'bold' }}>
                                {item.field.venue.sport.sport_name}
                            </Text>
                        </View>
                        <Text style={[styles.fontDetail, { fontWeight: 'bold' }]}>
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
                        {
                            item.creator ?
                                <Text style={[styles.fontDetail, { fontWeight: 'bold' }]}>
                                    Creator: <Text style={{ color: '#6C63FF', fontWeight: 'bold' }}>{
                                        item.creator_id == user_id ? "You" : item.creator.first_name
                                    }</Text>
                                </Text>
                                :
                                <>
                                </>
                        }
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
    fontDetail: {
        fontSize: 11,
        paddingBottom: 5,
    },
})

export default Post;