import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import Card from '../../shared/card';
import axios from 'axios';

function ActivityScreen({ navigation , route}) {
    useEffect(() => {
        // axios.get(`https://jsonplaceholder.typicode.com/todos/1`).then((response) => {
        //     console.log(response.data);
        // });
    })

    const data = [
        {
            name:"Reservation",
            url:'Reservation Screen',
            title:"Reserve",
            svg:"soccer"
          },
          {
            name:"Find Match",
            url:'Forum Stack',
            title:"Forum",
            svg:"match"
          },
          {
              name:"Create Match", 
              url:'Create Match', 
              title:"Create",
              svg:"field"
          }
    ]

    function RenderSports() {
        return data.map((item) => {
            return (
                <TouchableOpacity style={{width:'100%'}} key={item.title} onPress={() =>
                    navigation.navigate(item.url, {title: route.params.title, user_address: 'Jakarta Barat'})
                }>
                    <Card name={item.name} image={item.svg}/>
                </TouchableOpacity>
            )
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{color: 'white', fontWeight:'bold'}}>{route.params.title}</Text>
            </View>
            <ScrollView>
            <View>
            {
            RenderSports()
            }   
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#F4F8FF",
        padding: 0,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    titleContainer:{
        width: '100%',
        height: '5%',
        backgroundColor: '#6C63FF',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ActivityScreen;