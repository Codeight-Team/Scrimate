import React,  { useState, useContext } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../../shared/button';
import BasketSVG from '../../assets/basketball.svg'
import axios from 'axios';
import * as yup from 'yup';
import { AuthContext } from '../../component/context';

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
        // axios.post('http://66.42.49.240/api/auth/login', props)
        // .then(async response => {
        //     // console.log(response.data.user_id);
        //     var token = response.data.user_id
        //     try {
        //         await AsyncStorage.setItem('@user_Token', token)
        //       } catch (e) {
        //         console.warn('Not Saved')
        //       }
            
        // })
        // .catch(function (error) {
        //     console.log(error)
        //     if(error.message === 'Request failed with status code 401' )
        //         Alert.alert("Wrong password")
        //     else if(error.message==='Request failed with status code 404')
        //         Alert.alert("User not found")
        // });
        context.dispatch.login(props)
        // navigation.navigate('Main Stack')
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

                                    </TouchableOpacity>
                                </View>
                                {(props.errors.password && props.touched.password) &&
                                    <Text style={styles.errorText}>{props.errors.password}</Text>
                                }
                                <View>
                                    {/* <Button
                                    onPress={() => console.log("Forgot Password Button Pressed")}
                                    title='Forgot password?'
                                    color={'transparent'}
                                    
                                    /> */}
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
                    <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('Register')}>
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