import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Posts from '../components/posts';

function Forum({navigation, route}) {
    useEffect(() => {
        // axios.get(`https://jsonplaceholder.typicode.com/todos/1`).then((response) => {
        //     console.log(response.data);
        //   });
        console.log(route.params)
    })
    return(
        <View style={styles.container}>
            <Posts props={route.params}/>
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