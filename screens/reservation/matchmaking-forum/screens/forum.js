import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Posts from '../components/posts';

function Forum({navigation}) {
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/todos/1`).then((response) => {
            console.log(response.data);
          });
    })
    return(
        <View style={styles.container}>
            <Posts/>
            {/* <Button
        title="Press me"
        onPress={() => navigation.navigate("Match Detail")}
      /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
    },
});

export default Forum;