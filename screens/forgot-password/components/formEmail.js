import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity } from 'react-native';
import {Formik} from 'formik';
import FlatButton from '../../../shared/button';

export default function formEmail(){
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.txt}>Enter your account email</Text>
                </View>
                <Formik
                    initialValues={{email: '', password: ''}}
                >
                    {(props) => (
                        <View>
                            <View style={styles.formUser}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Email'
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                />
                            </View>
                            <TouchableOpacity style={styles.center} onPress={() => console.log("Change method press")}>
                                <Text style={styles.purple}>change recovery method</Text>
                            </TouchableOpacity>
                            <View style={styles.buttonContainer}>
                                <View style={styles.button}>
                                    <FlatButton text='CONFIRM' onPress={() => console.log("Confirm Button Pressed")} backgroundColor={'#6C63FF'} width={150}/>
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
        marginBottom: 10,
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
    }
})