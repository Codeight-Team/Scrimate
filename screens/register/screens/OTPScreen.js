import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../../../shared/button';
import axios from 'axios';

export default function OTPScreen({navigation}) {
    const confirmButtonHandler = (pass) =>{
        console.log(pass.values)
        axios.get(`https://jsonplaceholder.typicode.com/todos/1`).then((response) => {
            console.log(response.data);
          });
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Formik
                    initialValues={{ passkey: '' }}
                >
                    {(props) => (
                        <View>
                            <View style={styles.headingContainer}>
                                <Text style={styles.title}>We have sent verification code to your phone!!</Text>
                                <View  style={styles.headingContainer2}>
                                    <Text style={styles.heading2}>Enter the code that was sent through SMS to 08xxxxxxxxxx  </Text>
                                </View>
                            </View>
                            <View style={styles.formUser}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='* * * *'
                                    onChangeText={props.handleChange('passkey')}
                                    value={props.values.passkey}
                                    keyboardType='number-pad'
                                    maxLength={4}
                                    textAlign='center'
                                />
                            </View>
                            <TouchableOpacity style={styles.textcontainer} onPress={() => console.log("Resend Button Pressed")}>
                                    <Text style={styles.txt}>Resend</Text>
                            </TouchableOpacity>
                            <View style={styles.buttonContainer}>
                                <View style={styles.button}>
                                    <FlatButton text='confirm' onPress={() => 
                                        // navigation.navigate('Register')
                                        confirmButtonHandler(props)
                                        } backgroundColor={'#6C63FF'} width={150} />
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F8FF',
        width: '100%'
    },
    formUser: {
        flexDirection: 'row',
        width: 250,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8EAF1',
        padding: 5,
        marginBottom: 10,
        marginLeft: 130,
        flex: 1,
        fontSize: 30,
        backgroundColor: 'white',    
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50
    },
    button: {
        marginTop: 100,
        marginRight: 10,
    },
    textcontainer: {
        alignItems: 'center'
    },
    txt: {
        fontSize: 13,
        color: '#6C63FF',
        fontWeight: "700",
        marginRight: 20
    },
    headingContainer:{
        marginLeft: 50,
        marginRight: 50
    },
    title: {
        fontSize: 18,
        color: '#B7B7B7',
    },
    heading2: {
        fontSize: 12,
        color: '#B7B7B7',
    },
    headingContainer2:{
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        paddingTop: 10
    }
})