import React, { useEffect } from "react";
import { View, TextInput, Text, TouchableWithoutFeedback, Keyboard, StyleSheet, Image, Platform } from 'react-native'
// import CustomDateTimePicker from "../../shared/CustomDateTimePicker";
import DateTime from '@react-native-community/datetimepicker'
import { useState } from "react/cjs/react.development";
import moment from "moment";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from '@expo/vector-icons';
import FlatButton from "../../../shared/button";
import * as yup from 'yup';
import axios from 'axios';
import { Formik } from "formik";
import RadioButtonRN from "radio-buttons-react-native"
import { Picker } from '@react-native-picker/picker'

const FormRegister = ({ navigation }) => {
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)
    const [province, setProvince] = useState({ id: 31, nama: 'DKI Jakarta' });
    const [region, setRegion] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState({});
    const [selectedRegion, setSelectedRegion] = useState();

    const onChange = (e, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
    }

    const showDatePicker = () => {
        setShow(true)
    }

    const gender = [
        {
            label: 'Male'
        },
        {
            label: 'Female'
        }
    ]

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

    const getProvince = async () => {
        let isMounted = true;
        await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/provinsi`)
            .then((response) => {
                const res = response.data.provinsi
                if (isMounted)
                    setProvince(res)
            })
            .catch(function (error) {
                console.warn(error);
            });
        return () => { isMounted = false };
    }

    const handleProvinceChange = async (value) => {
        // let pos = province.map(function (e) {
        //     return e.nama;
        // }).indexOf(value);
        setSelectedProvince(value)
        await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${value.id}`)
            .then((response) => {
                    setRegion(response.data.kota_kabupaten)
            })
            .catch(err => {
                console.warn(err.message)
            });
    }

    const createUser = async (values) => {
        await axios.post('http://66.42.49.240/api/auth/register', values)
            .then(() => {
                navigation.navigate('Login');
            })
            .catch(function (error) {
                console.warn(error.message);
            });

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={{ top: 50 }}>
                    <View style={{ padding: 20, alignItems: "center" }}>
                        <Text style={styles.title}>
                            Register
                        </Text>
                    </View>
                    <ScrollView>
                        <Formik
                            validationSchema={regisValidationSchema}
                            initialValues={{
                                first_name: '', last_name: '', email: '', phone_number: '',
                                password: '', confirm_password: '', DOB: new Date(),
                                address: {
                                    address_city: '',
                                    address_region: '',
                                    address_postalcode: '',
                                    address_street: ''
                                },
                                gender: ''
                            }}
                            onSubmit={values => {
                                values.address.address_city = selectedProvince.nama
                                values.address.address_region = selectedRegion
                                values.DOB = date
                                createUser(values)
                            }
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
                                    <View style={{ paddingBottom: 10, paddingLeft: 10 }}>
                                        <RadioButtonRN
                                            box={false}
                                            boxStyle={{ marginLeft: 10, width: 70 }}
                                            data={gender}
                                            circleSize={10}
                                            textStyle={{ marginLeft: 5, fontSize: 11 }}
                                            activeColor={'#6C63FF'}
                                            style={{ flexDirection: 'row' }}
                                            selectedBtn={(e) => props.values.gender = e.label} />
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Picker
                                            style={{ margin: 5, borderRadius: 30, width: 120 }}
                                            itemStyle={{ fontSize: 5 }}
                                            selectedValue={selectedProvince}
                                            onValueChange={handleProvinceChange
                                                
                                            }>
                                            <Picker.Item label="City" value="0" />
                                            <Picker.Item label={province.nama} value={province} />
                                            
                                        </Picker>
                                        <Picker
                                            style={{ margin: 5, borderRadius: 30, width: 120 }}
                                            itemStyle={{ fontSize: 5 }}
                                            selectedValue={selectedRegion}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setSelectedRegion(itemValue)
                                            }>
                                            <Picker.Item label="Region" value="0" />
                                            {
                                                region.map((item) => (
                                                    <Picker.Item key={item.id} label={item.nama} value={item.nama} />
                                                ))
                                            }
                                        </Picker>
                                    </View>
                                    <View style={styles.formUser}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Postal Code'
                                            onChangeText={props.handleChange('address.address_postalcode')}
                                            onBlur={props.handleBlur('address.address_postalcode')}
                                            value={props.values.address.address_postalcode}
                                        />
                                    </View>
                                    <View style={styles.formUser}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Street'
                                            onChangeText={props.handleChange('address.address_street')}
                                            onBlur={props.handleBlur('address.address_street')}
                                            value={props.values.address.address_street}
                                        />
                                    </View>

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
                                        <TouchableOpacity style={{
                                            backgroundColor: '#FFF',
                                            borderWidth: 1,
                                            borderColor: '#E8EAF1',
                                            padding: 14,
                                            paddingLeft: 25,
                                            borderRadius: 30,
                                            margin: 5,
                                            width: 240
                                        }}
                                            onPress={() => showDatePicker()}>
                                            <Text>{moment(date).format('DD MMMM yyyy')}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
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
                                    {/* <View style={styles.formUser}>
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
                                </View> */}
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
                                            <FlatButton
                                                // disabled={!props.isValid}
                                                onPress={props.handleSubmit}
                                                text="Sign Up"
                                                backgroundColor={'#6C63FF'} width={150} />
                                        </View>
                                    </View>
                                </View>

                            )}

                        </Formik>
                    </ScrollView>

                </View>
                {
                    show && (
                        <DateTime timeZoneOffsetInMinutes={0}
                            value={new Date(date)}
                            mode="date"
                            maximumDate={new Date(moment().format("YYYY-MM-DD"))}
                            onChange={onChange}
                        />
                    )

                }
            </View >
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F4F8FF",
        width: '100%',
        alignItems: "center",
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
        borderRadius: 30,
        margin: 5,
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
        fontSize: 8,
        color: 'red',
    },
})

export default FormRegister;