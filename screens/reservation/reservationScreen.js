import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect} from 'react';
import axios from 'axios';

function ReservationScreen({navigation, route}) {
    useEffect(() => {
        console.log(route.params)
        axios.get(`https://jsonplaceholder.typicode.com/todos/1`).then((response) => {
            console.log(response.data);
          });
    })
    const {sports} =route.params
    return(
        <View style={styles.container}>
            <Text>This is Futsal Reservation settings {sports}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      width: '100%',
      backgroundColor:"#F4F8FF",
      padding: 20,
      flexDirection: 'column',
      flexWrap: 'wrap'
    },
});

export default ReservationScreen;