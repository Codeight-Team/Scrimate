import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../../../shared/button';
import api from '../../../services/api';

export default function OTPScreen({ navigation, route }) {

    const [firstSend, setSend] = useState(false)

    const confirmButtonHandler = async (pass) => {
        await api.post('/api/auth/sendOTP/' + route.params.id + '/' + route.params.email)
            .then(response => {
                Alert.alert("Success Verifying", `Verified ${route.params.email}`)
                // console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        // console.log(route.params.id, route.params.email);
        // const sendOTP = async () => {
        //     await api.post('/api/auth/sendOTP/'+ route.params.id + '/' + route.params.email)
        // .then(response=>{
        //     console.log(response.data);
        // })
        // .catch(err => {
        //     console.log(err);
        // })
        // }
        // sendOTP()
    }, [])

    const sendOTP = async () => {
        await api.post('/api/auth/sendOTP/'+ route.params.id + '/' + route.params.email)
        .then(response=>{
            console.log(response.data);
        })
        .catch(err => {
            console.log(err.message);
            setSend(true)
        })
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
                                <Text style={styles.title}>We have sent verification code to your email.</Text>
                                <View style={styles.headingContainer2}>
                                    <Text style={styles.heading2}>Enter the code that was sent through mail to {route.params?.email} </Text>
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
                            {!firstSend?
                                <TouchableOpacity style={styles.textcontainer} onPress={() => sendOTP()}>
                                    <Text style={styles.txt}>Send</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.textcontainer} onPress={() => console.log("Resend Button Pressed")}>
                                    <Text style={styles.txt}>Resend</Text>
                                </TouchableOpacity>
                            }
                            <View style={styles.buttonContainer}>
                                <View style={styles.button}>
                                    <FlatButton text='confirm' onPress={() =>
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
    headingContainer: {
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
    headingContainer2: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        paddingTop: 10
    }
})