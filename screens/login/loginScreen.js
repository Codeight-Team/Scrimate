import React,  { useState, useContext } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../../shared/button';
import BasketSVG from '../../assets/basketball.svg'
import * as yup from 'yup';
import { AuthContext } from '../../component/context';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
    const [show, setShow] = useState(true);
    const context = useContext(AuthContext)
    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .required("Email Address Required"),
        password: yup
            .string()
            .required('Password is required'),
    })

    const handleSubmit = (props) =>{
        context.dispatch.login(props)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <BasketSVG></BasketSVG>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', height: '20%'}}>LOGIN</Text>
                    <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{ email: '', password: '' }}
                    >
                        {(props) => (
                            <View>
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Email'
                                        onChangeText={props.handleChange('email')}
                                        value={props.values.email}
                                        autoCapitalize='none'
                                        keyboardType='email-address'
                                    />
                                </View>
                                {(props.errors.email && props.touched.email) &&
                                    <Text style={styles.errorText}>{props.errors.email}</Text>
                                }
                                <View style={styles.formUser}>
                                    <TextInput
                                        secureTextEntry={show}
                                        style={[styles.input,styles.inputVisible]}
                                        placeholder='Password'
                                        onChangeText={props.handleChange('password')}
                                        value={props.values.password}
                                        autoCapitalize='none'
                                    />
                                    <TouchableOpacity style={styles.visibleBtn} onPress={() => setShow(!show)}>
                                            <MaterialIcons name={!show?"visibility":"visibility-off"} size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                                {(props.errors.password && props.touched.password) &&
                                    <Text style={styles.errorText}>{props.errors.password}</Text>
                                }
                                <View>
                                    <TouchableOpacity onPress={() => navigation.navigate('Forgot Stack')}>
                                        <Text style={styles.txt}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <View style={styles.button}>
                                        <FlatButton text='Sign In' 
                                        // disabled={!props.isValid} 
                                        onPress={() =>[handleSubmit(props.values)] } backgroundColor={'#6C63FF'} width={199} />
                                    </View>

                                </View>
                            </View>
                        )}

                    </Formik>
                </View>
                <View style={[styles.footer,styles.center]}>
                    <Text style={{color:'#CFCFCF'}}>
                            Don’t have an account?
                        </Text>
                    <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('Form Register')}>
                        <Text style={{color:'#6C63FF'}}>
                            Create new account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F8FF',
        width: '100%'
    },
    header: {
        height: '35%',
        backgroundColor: '#E1DFFF',
        width: '100%',
        borderBottomEndRadius: 66,
        borderBottomStartRadius: 66,
        padding: 20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    contentContainer: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer:{
        height: '15%',
    },
    center:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    formUser: {
        flexDirection: 'row',
        width: "70%"
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8EAF1',
        padding: 10,
        fontSize: 10,
        borderRadius: 100,
        marginBottom: 10,
        flex: 1,
        backgroundColor: 'white'
    },
    inputVisible:{
        borderRightWidth: 0,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    visibleBtn:{
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderColor: '#E8EAF1',
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        width: '15%',
        borderBottomRightRadius: 100,
        borderTopRightRadius: 100,
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
        color: '#CFCFCF',
        paddingLeft: 8,
        textAlign: 'right'
    },
    errorText: {
        marginLeft: 7,
        fontSize: 10,
        color: 'red',
    },
})