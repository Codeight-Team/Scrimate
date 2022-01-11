import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import {Formik} from 'formik';
import FlatButton from '../../shared/button';
import axios from 'axios';
import RadioButton from '../../shared/radio';

function CreateMatchScreen({ navigation }) {
    const [show, setShow] = useState(false)
    useEffect(() => {
        // axios.get(`https://jsonplaceholder.typicode.com/todos/1`).then((response) => {
        //     console.log(response.data);
        // });
    })

    const labeldata = [
        {
            label: 'choose venue now',
            value: 1
        },
        {
            label: 'choose later',
            value: 2
        },
    ]
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                    <Formik
                        initialValues={{email: '', password: ''}}
                    >
                        {(props) => (
                            <View style={{top:80}}>
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='sports'
                                        onChangeText={props.handleChange('password')}
                                        value={props.values.password}
                                    />
                                </View>   
                                
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='payment distribution'
                                        onChangeText={props.handleChange('email')}
                                        value={props.values.email}
                                    />
                                </View>
                                <RadioButton labeldata={labeldata} width={100} callback={(e) => e.value===1?setShow(true):setShow(false)}/>
                                {show && (
                                    <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='venue'
                                        onChangeText={props.handleChange('email')}
                                        value={props.values.email}
                                    />
                                    </View>
                                 )
                                }
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='date'
                                        onChangeText={props.handleChange('email')}
                                        value={props.values.email}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder='time'
                                        onChangeText={props.handleChange('email')}
                                        value={props.values.email}
                                    />
                                </View>
                                <View style={styles.formUser}>
                                    <TextInput
                                            style={{width: '100%', 
                                                maxHeight:100, 
                                                    backgroundColor: 'white',
                                                    borderWidth: 1,
                                                    borderColor: '#E8EAF1',
                                                    borderRadius: 40,
                                                    fontSize: 18,
                                                   }}
                                            multiline
                                            numberOfLines={10}
                                            placeholder='description'
                                            editable
                                            maxLength={100}
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
        borderRadius: 100,
        marginBottom: 10,
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
    }
});

export default CreateMatchScreen;