import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import {Formik} from 'formik';
import FlatButton from '../shared/button';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function RegisterScreen(){

    const buttonHandler = () =>{
        console.log("button sign up pressed")
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Formik
                    initialValues={{first_name: '', last_name: '',birth_date:'', email: '', phone_number: '', password: '', confirm_password:''}}
                >
                    {(props) => (
                        <View>
                            <View style={styles.headingBox}>
                                <Text style={styles.title}>Register</Text>
                            </View>
                            <ScrollView>
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='First Name'
                                        onChangeText={props.handleChange('first_name')}
                                        value={props.values.first_name}
                                    />
                                </View>
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Last Name'
                                        onChangeText={props.handleChange('last_name')}
                                        value={props.values.last_name}
                                    />
                                </View>
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Date of Birth'
                                        onChangeText={props.handleChange('birth_date')}
                                        value={props.values.birth_date}
                                    />
                                </View>
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
                                        placeholder='Phone'
                                        onChangeText={props.handleChange('phone')}
                                        value={props.values.phone_number}
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
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Confirm Password'
                                        onChangeText={props.handleChange('confirm_password')}
                                        value={props.values.confirm_password}
                                    />
                                </View>
                            </ScrollView>
                            <View style={styles.buttonContainer}>
                                <View style={styles.button}>
                                    <FlatButton text='Sign Up' onPress={() => buttonHandler()} backgroundColor={'#6C63FF'} width={150}/>
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
        width: '100%'
    },
    formUser: {
        flexDirection: 'row',
        width: 250,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8EAF1',
        padding: 10,
        paddingLeft: 25,
        borderRadius: 100,
        marginBottom: 15,
        flex: 1,
        fontSize: 11,
        backgroundColor: 'white'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    button: {
        marginRight: 10
    },
    txt: {
        fontSize: 13,
        color: 'grey',
        paddingLeft: 8

    },
    title: {
        fontSize: 20,
        color: 'black',
        fontWeight: "700",
        textTransform: "uppercase"
    },
    headingBox:{
        alignItems: 'center',
        padding: 23,
        paddingTop: 100
    }
})