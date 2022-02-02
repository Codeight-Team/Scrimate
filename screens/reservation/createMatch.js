import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import {Formik} from 'formik';
import FlatButton from '../../shared/button';
import axios from 'axios';

function CreateMatchScreen({ navigation, route}) {
    const [show, setShow] = useState(true)
    useEffect(() => {
        // axios.get(`https://jsonplaceholder.typicode.com/todos/1`).then((response) => {
        //     console.log(response.data);
        // });
    })

    const payment_distribution = [
        {
            label: '30/70',
            value: 2
        },
        {
            label: '40/60',
            value: 1
        },
        {
            label: '50/50',
            value: 2
        },
        {
            label: '60/40',
            value: 1
        },
        {
            label: '70/30',
            value: 1
        },
    ]
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                    <Formik
                        initialValues={{sports: route.params.title, date: '', time: '', payment_distribution: '50/50'}}
                    >
                        {(props) => (
                            <View style={{top:80}}>
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='sports'
                                        onChangeText={props.handleChange('sports')}
                                        value={props.values.sports}
                                        editable= {false}
                                    />
                                </View>   
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='date'
                                        onChangeText={props.handleChange('time')}
                                        value={props.values.email}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder='time'
                                        onChangeText={props.handleChange('email')}
                                        value={props.values.email}
                                    />
                                </View>
                                    {/* <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='venue'
                                        onChangeText={props.handleChange('time')}
                                        value={props.values.email}
                                    />
                                    </View> */}
                                <View style={styles.formUser}>
                                    <FlatButton 
                                    text='Choose Venue' 
                                    backgroundColor={show==true?'#6C63FF':'#ececed'}
                                    layoutStyle={{borderRadius:20}}
                                    width={250}/>
                                </View>
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='payment distribution'
                                        onChangeText={props.handleChange('payment_dis')}
                                        value={props.values.payment_distribution}
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <View style={styles.button}>
                                        <FlatButton text='Create' onPress={() => [console.log("Submit Button Pressed"), console.log("some f")]} backgroundColor={'#6C63FF'} width={150}/>
                                    </View>
                                </View>
                            </View>
                        )}
                        
                    </Formik>
                </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F4F8FF',
        width: '100%',
    },
    formUser: {
        flexDirection: 'row',
        width: 250
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8EAF1',
        padding: 10,
        fontSize: 18,
        borderRadius: 20,
        marginBottom: 10,
        margin: 5,
        flex: 1,
        backgroundColor: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50
    },
    button: {
        marginRight: 10
    },
    txt: {
        fontSize: 13,
        color: 'grey',
        paddingLeft: 8
    },
});

export default CreateMatchScreen;