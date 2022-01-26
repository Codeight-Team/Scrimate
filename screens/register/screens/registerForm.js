import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Formik, Field, Form } from 'formik';
import FlatButton from '../../../shared/button';
import DatePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import Moment from 'moment';
import DropDown from 'react-native-modal-dropdown';
import RadioButtonRN from "radio-buttons-react-native";

export default function RegisterScreen({ navigation }) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date());
    const url_country = `https://dev.farizdotid.com`
    const [province, setProvince] = useState([]); state
    const [state, setState] = useState([]);

    const gender = [
        {
            label: 'Male'
        },
        {
            label: 'Female'
        }
    ]

    useEffect(() => {
        let isMounted = true;
        axios.get(`${url_country}/api/daerahindonesia/provinsi`)
            .then((response) => {
                const res = response.data.provinsi
                if(isMounted)
                setProvince(res)
            })
            .catch(function (error) {
                console.warn(error);
            });
            return () => { isMounted = false };
        
    })

    function getProvince(){
        
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setDatePickerVisibility(false);
    };

    const HandleData = (index, value) => {
        let pos = province.map(function (e) {
            return e.nama;
        }).indexOf(value);
        axios.get(`${url_country}/api/daerahindonesia/kota?id_provinsi=${province[pos].id}`)
            .then((response) => {
                setState(response.data.kota_kabupaten)
            })
            .catch(function (error) {
                console.warn(error);
            });
    }

    const HandleSelect = (index, value) => {
        console.log(value)
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    function DropdownCountries(defaultValue, onSelect, options, disabled) {
        return <DropDown defaultValue={defaultValue} onSelect={onSelect} showsVerticalScrollIndicator={false} isFullWidth={false} options={options} disabled={disabled} />
    }

    const regisValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Enter Valid Email")
            .required("Email Address Required"),
        password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
        first_name: yup
            .string()
            .required('First Name is required'),
        last_name: yup
            .string()
            .required('Last Name is required'),
        phone_number: yup
            .string()
            .required('Phone number is required'),
        confirm_password: yup
            .string()
            .required('Confirm Password is required')
            .oneOf([yup.ref('password')], 'Passwords does not match'),
    })
    const sendData = (values) => {
        values.BOD = date;
        console.log('test')
        axios.post('http://66.42.49.240/api/auth/register', values)
            .then((response) => {
                console.log(response.data)
                // navigation.navigate('OTP');
            })
            .catch(function (error) {
                console.warn(error);
            });

    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.headingBox}>
                    <Text style={styles.title}>Register</Text>
                </View>
                <ScrollView>
                    <Formik
                        validationSchema={regisValidationSchema}
                        initialValues={{
                            first_name: '', last_name: '', email: '', phone_number: '',
                            password: '', confirm_password: '', BOD: new Date(),
                            address: {
                                address_city: '',
                                address_country: '',
                                address_postalcode: '',
                                address_street: ''
                            },
                            gender:''
                        }}
                        onSubmit={values =>
                            sendData(values)
                        }
                    >
                        {(props) => (
                            <View>
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='First Name'
                                        onChangeText={props.handleChange('first_name')}
                                        onBlur={props.handleBlur('first_name')}
                                        value={props.values.first_name}
                                    />
                                </View>
                                {(props.errors.first_name && props.touched.first_name) &&
                                    <Text style={styles.errorText}>{props.errors.first_name}</Text>
                                }
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Last Name'
                                        onChangeText={props.handleChange('last_name')}
                                        onBlur={props.handleBlur('last_name')}
                                        value={props.values.last_name}
                                    />
                                </View>
                                {(props.errors.last_name && props.touched.last_name) &&
                                    <Text style={styles.errorText}>{props.errors.last_name}</Text>
                                }
                                <RadioButtonRN 
                                    box={false} 
                                    boxStyle={{marginLeft:10,width:70}}
                                    data={gender} 
                                    circleSize={10} 
                                    textStyle={{marginLeft:5,fontSize: 11} } 
                                    activeColor={'#6C63FF'}
                                    style={{flexDirection:'row'}}
                                    selectedBtn={(e) => props.values.gender = e.label} />
                                <TouchableOpacity onPress={showDatePicker}>
                                    <View style={styles.formUser}>
                                        <View style={styles.input}>
                                            <Text>{Moment(date).format('DD-MM-YYYY')}</Text>
                                        </View>
                                        {/* <TextInput
                                        style={styles.input}
                                        placeholder='Date of Birth'
                                        onChangeText={props.handleChange('birth_date')}
                                        value={props.values.birth_date}
                                    /> */}
                                    </View>
                                </TouchableOpacity>
                                {isDatePickerVisible && (
                                    <DatePicker
                                        // isVisible={isDatePickerVisible}
                                        value={date}
                                        mode="date"
                                        // onConfirm={handleConfirm}
                                        // onCancel={hideDatePicker}
                                        onChange={onChange}
                                    />)
                                }
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Email'
                                        onChangeText={props.handleChange('email')}
                                        onBlur={props.handleBlur('email')}
                                        value={props.values.email}
                                    />
                                </View>
                                {(props.errors.email && props.touched.email) &&
                                    <Text style={styles.errorText}>{props.errors.email}</Text>
                                }
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType='phone-pad'
                                        placeholder='Phone'
                                        onChangeText={props.handleChange('phone_number')}
                                        onBlur={props.handleBlur('phone_number')}
                                        value={props.values.phone_number}
                                    />
                                </View>
                                {(props.errors.phone_number && props.touched.phone_number) &&
                                    <Text style={styles.errorText}>{props.errors.phone_number}</Text>
                                }
                                <View style={styles.formUser}>
                                    <View style={styles.input}>
                                        {
                                            DropdownCountries("City", HandleData, province.map((e) => {
                                                return e.nama
                                            }))
                                        }
                                    </View>
                                    <View style={styles.input}>
                                        {
                                            DropdownCountries("State", HandleSelect, state.map((e) => {
                                                return e.nama
                                            }))
                                        }
                                    </View>
                                </View>
                                <View style={styles.formUser}>
                                    <TextInput
                                        style={styles.input}
                                        secureTextEntry={true}
                                        placeholder='Password'
                                        onChangeText={props.handleChange('password')}
                                        onBlur={props.handleBlur('password')}
                                        value={props.values.password}
                                    />
                                </View>
                                {(props.errors.password && props.touched.password) &&
                                    <Text style={styles.errorText}>{props.errors.password}</Text>
                                }
                                <View style={styles.formUser} removeClippedSubviews={true}>
                                    <TextInput
                                        style={styles.input}
                                        secureTextEntry={true}
                                        contextMenuHidden={true}
                                        placeholder='Confirm Password'
                                        onChangeText={props.handleChange('confirm_password')}
                                        onBlur={props.handleBlur('confirm_password')}
                                        value={props.values.confirm_password}
                                    />
                                </View>
                                {(props.errors.confirm_password && props.touched.confirm_password) &&
                                    <Text style={styles.errorText}>{props.errors.confirm_password}</Text>
                                }
                                {/* <Field as="select" name="color">
                                    <option value="red">Red</option>
                                    <option value="green">Green</option>
                                    <option value="blue">Blue</option>
                                </Field> */}
                                <View style={styles.buttonContainer}>
                                    <View style={styles.button}>
                                        <FlatButton disabled={!props.isValid} onPress={props.handleSubmit} text="Sign Up" backgroundColor={'#6C63FF'} width={150} />
                                    </View>
                                </View>
                            </View>

                        )}

                    </Formik>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}

const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F4F8FF',
        width: WIDTH
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
        marginTop: 15,
        flex: 1,
        fontSize: 11,
        backgroundColor: 'white'
    },
    buttonContainer: {
        marginTop: 20,
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
    headingBox: {
        alignItems: 'center',
        padding: 23,
        paddingTop: 100
    },
    errorText: {
        marginLeft: 7,
        fontSize: 10,
        color: 'red',
    },
})