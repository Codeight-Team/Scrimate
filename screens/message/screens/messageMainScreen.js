import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView, Image, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TouchableHighlight } from 'react-native-gesture-handler';
import moment from 'moment';

function MessageFocus({ navigation }) {
    const [myChat, setMyChat] = useState()
    useEffect(() => {
        // axios.get(`https://jsonplaceholder.typicode.com/todos/1`).then((response) => {
        //     console.log(response.data);
        //   });
    })
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <TouchableOpacity style={{ width: '100%', height: 70, borderBottomWidth: 1, borderColor: '#cccccc', flexDirection: 'row' }} onPress={()=> navigation.navigate('Message Focus')}>
                    <View style={{ width: '25%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ width: 60, height: 60, backgroundColor: 'black', borderRadius: 50 }} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                    </View>
                    <View style={{ width: '55%', height: '100%', paddingVertical: 10 }}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                            Rafi
                        </Text>
                        <Text style={{ fontSize: 13, color: 'gray' }}>
                            hai
                        </Text>
                    </View>
                    <View style={{ width: '15%', height: '100%', paddingVertical: 10, alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 12, color: 'gray' }}>
                            {moment(new Date()).format('HH:mm')}
                        </Text>
                    </View>
                </TouchableOpacity>
                {/* <Pressable style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'red' : '#F4F8FF',
                    }, { width: '100%', height: 70, borderBottomWidth: 1, borderColor: '#cccccc', justifyContent: 'center' }
                ]} onPress={() => console.log('yeah')}>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ width: '25%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: 60, height: 60, backgroundColor: 'black', borderRadius: 50 }} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                        </View>
                        <View style={{ width: '75%', height: '100%', paddingVertical: 10 }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                                Rafi
                            </Text>
                            <Text style={{ fontSize: 13, color: 'gray' }}>
                                wew
                            </Text>
                        </View>
                    </View>
                </Pressable> */}
                {/* {!myChat ?
                    <TouchableOpacity style={{ width: '100%', height: 70, borderBottomWidth: 1, borderColor: '#cccccc', flexDirection: 'row' }}>
                        <View style={{ width: '25%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: 60, height: 60, backgroundColor: 'black', borderRadius: 50 }} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                        </View>
                        <View style={{ width: '75%', height: '100%', paddingVertical: 10 }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                                Rafi
                            </Text>
                            <Text style={{ fontSize: 13, color: 'gray' }}>
                                wew
                            </Text>
                        </View>
                    </TouchableOpacity>

                    :
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={{ color: 'gray' }}>
                            You Have No Message...
                        </Text>
                    </View>
                } */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F8FF",
    },
    inner: {
        width: '100%',
        flexDirection: 'column',
        flexWrap: 'wrap',
    }
});

export default MessageFocus;