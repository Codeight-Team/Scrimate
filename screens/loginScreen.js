import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity } from 'react-native';
import {Formik} from 'formik';
import FlatButton from '../shared/button';

export default function LoginScreen(){
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
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
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Password'
                                        onChangeText={props.handleChange('password')}
                                        value={props.values.password}
                                    />
                                </View>
                                <View>
                                    {/* <Button
                                    onPress={() => console.log("Forgot Password Button Pressed")}
                                    title='Forgot password?'
                                    color={'transparent'}
                                    
                                    /> */}
                                    <TouchableOpacity onPress={() => console.log("Forgot Password Button Pressed")}>
                                        <Text style={styles.txt}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <View style={styles.button}>
                                        <FlatButton text='Sign In' onPress={() => console.log("Login Button Pressed")} backgroundColor={'#6C63FF'} width={150}/>
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
        width: 250
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8EAF1',
        padding: 10,
        fontSize: 18,
        borderRadius: 100,
        marginBottom: 10,
        flex: 1,
        fontSize: 20,
        backgroundColor: 'white'
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

    }
})