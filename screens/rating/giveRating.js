import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import api from "../../services/api";
import FlatButton from "../../shared/button";
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Rating, AirbnbRating } from 'react-native-ratings';

const GiveRating = ({ navigation, route }) => {
    const [comment, setComment] = useState("");
    const [rating_num, setRatingNum] = useState(3);

    const submitRating = async () => {
        let body={ user_id: route.params.user_id, venue_id: route.params.venue_id, rating_num: rating_num, rating_comment: comment }
        await api.post('/api/users/give-rating', body)
            .then(res => {
                Alert.alert("Success", res.data, [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },])
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleChangeComment = (e) => {
        setComment(e)
    }

    function ratingCompleted(rating) {
        setRatingNum(rating)
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text>
                    Give Rating to Venue
                </Text>
                <Rating
                    onFinishRating={ratingCompleted}
                    style={{ paddingVertical: 20 }}
                    imageSize={30}
                    starContainerStyle={{backgroundColor: "#F4F8FF"}}
                />
                <TextInput multiline={true} numberOfLines={5} style={styles.commentBox} placeholder="Comment" onChangeText={handleChangeComment} value={comment} />
                <View style={{ paddingVertical: 20 }}>
                    <FlatButton text={'Submit'} backgroundColor={'#6C63FF'} onPress={() => submitRating()} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    box: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F4F8FF",
    },
    commentBox: {
        textAlign: "center",
        borderWidth: 1,
        borderColor: '#E8EAF1',
        padding: 10,
        fontSize: 14,
        borderRadius: 10,
        backgroundColor: 'white',
        width: 200
    }
})

export default GiveRating;