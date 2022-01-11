import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity } from 'react-native';
import {Formik} from 'formik';
import FlatButton from '../../../shared/button';
import * as yup from 'yup';
import { useState } from 'react';

const validationSchema = yup.object({
    email: yup.string()
    .email("Please enter valid email")
    .required(),
})

export default function formEmail({navigation}){
    const buttonHandler = (props) => {
        // axios.post('http://66.42.49.240/api/auth/register', props)
        //     .then(() => {
        //         navigation.navigate('OTP');
        //     })
        //     .catch(function (error) {
        //         console.warn(error);
        //     });
        console.warn('check button handler');
        navigation.navigate('Success')
    }
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.txt}>Enter your account email</Text>
                </View>
                <Formik
                    initialValues={{email: ''}}
                    validationSchema={validationSchema}
                >
                    {(props) => (
                        <View>
                            <View style={styles.formUser}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Email'
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    onBlur={props.handleBlur('email')}
                                />
                            </View>
                            {(props.touched.email && props.errors.email) &&
                            <Text style={styles.error}>{props.touched.email && props.errors.email} </Text>}
                            <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('Selection Screen')}>
                                <Text style={styles.purple}>change recovery method</Text>
                            </TouchableOpacity>
                            <View style={styles.buttonContainer}>
                                <View style={styles.button}>
                                    <FlatButton isDisable={true} text='CONFIRM' onPress={() => buttonHandler(props)} backgroundColor={'#6C63FF'} width={150} disabled={!props.isValid}/>
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
        justifyContent: 'center',
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
        paddingLeft: 20,
        fontSize: 14,
        borderRadius: 100,
        flex: 1,
        backgroundColor: 'white'
    },
    buttonContainer: {
        margin:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginRight: 10
    },
    txt: {
        fontSize: 13,  
        paddingLeft: 8,
        color:"#CFCFCF"
    },
    purple:{
        fontSize: 13, 
        color:'#6C63FF'
    },
    center:{
        alignItems:'center'
    },
    infoContainer:{
        padding: 10,
        alignItems: 'flex-start'
    },
    error:{
        color: 'red',
        fontSize: 10,
        textAlign: 'center'
    }
})