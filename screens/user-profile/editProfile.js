import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, Modal, ScrollView, Platform } from 'react-native';
import { useState } from 'react';
import Moment from 'moment';
import Pen from '../../assets/icons/pencil.svg'
import * as ImagePicker from 'expo-image-picker';
import FlatButton from '../../shared/button';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import api from '../../services/api';
import {IMAGE_URL} from '@env'

function EditProfile({ navigation, route }) {
    const [data, setData] = useState(route.params)
    const [image, setImage] = useState(null);
    const [modal, setModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [type, setType] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('image', {
            name: "_profile.jpg",
            uri: Platform.OS === "android" ? image : image.replace("file://", ""),
            type: 'image/jpg'
        })
        const config = {
            headers: {
                Accept: 'application/json',
                "Content-Type": "multipart/form-data",
            }
        }

        await api.put(`/api/users/${data.user_id}`, formData, config).then(() => {
            setSuccess(true)
            setTimeout(() => { navigation.navigate('Profile Screen') }, 1000)
        })
            .catch(error => {
                console.log(error)
            });
    }

    const updateForm = async (values) => {
        await api.put(`/api/users/${data.user_id}`, values).then(response => {
            setSuccess(true)
            setTimeout(() => { navigation.navigate('Profile Screen') }, 1000)
        })
            .catch(function (error) {
                console.log(error)
            });
    }


    function activateModal(type) {
        setType(type);
        setModal(true);
    }

    const ImageForm = () => (
        <View style={[styles.centeredView, { width: "100%", height: '80%' }]}>
            {image ? <Image source={{ uri: image }} style={styles.profilePicture} /> :
                <Image source={{ uri: IMAGE_URL+ data.image }} style={styles.profilePicture} />
                // <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={styles.profilePicture} />
            }
            <TouchableOpacity style={{ padding: 10 }} onPress={pickImage}>
                <Text style={{ color: '#6C63FF' }}>change</Text>
            </TouchableOpacity>
            <FlatButton text={"update"} backgroundColor={'#6C63FF'} width={100} onPress={() => uploadImage(image)} />
        </View>
    )

    const NameForm = () => (
        <View style={[styles.centeredView, { width: "100%", height: '80%' }]}>
            <Formik
                initialValues={{ first_name: '', last_name: '' }}
                onSubmit={values => updateForm(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <>
                        <View style={{ height: 100, width: 150 }}>
                            <TextInput
                                name="first_name"
                                placeholder="first name"
                                style={styles.input}
                                onChangeText={handleChange('first_name')}
                                onBlur={handleBlur('first_name')}
                                value={values.first_name}
                            //   keyboardType="email-address"
                            />
                            <TextInput
                                name="last_name"
                                placeholder="last name"
                                style={styles.input}
                                onChangeText={handleChange('last_name')}
                                onBlur={handleBlur('last_name')}
                                value={values.last_name}
                            />
                        </View>
                        <FlatButton text={"update"} backgroundColor={'#6C63FF'} width={100} onPress={handleSubmit} />
                    </>
                )}
            </Formik>
        </View>
    )

    const EmailForm = () => (
        <View style={[styles.centeredView, { width: "100%", height: '80%' }]}>
            <Formik
                initialValues={{ email: '' }}
                onSubmit={values => updateForm(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <>
                        <View style={{ height: 60, width: 190 }}>
                            <TextInput
                                name="email"
                                placeholder="email"
                                style={styles.input}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                                autoCapitalize='none'
                            />
                        </View>
                        <FlatButton text={"update"} backgroundColor={'#6C63FF'} width={100} onPress={handleSubmit} />
                    </>
                )}
            </Formik>
        </View>
    )

    const PhoneForm = () => (
        <View style={[styles.centeredView, { width: "100%", height: '80%' }]}>
            <Formik
                initialValues={{ phone_number: '' }}
                onSubmit={values => updateForm(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <>
                        <View style={{ height: 60, width: 190 }}>
                            <TextInput
                                name="phone"
                                placeholder="phone number"
                                style={styles.input}
                                onChangeText={handleChange('phone_number')}
                                onBlur={handleBlur('phone_number')}
                                value={values.phone_number}
                                keyboardType="phone-pad"
                            />
                        </View>
                        <FlatButton text={"update"} backgroundColor={'#6C63FF'} width={100} onPress={handleSubmit} />
                    </>
                )}
            </Formik>
        </View>
    )

    const ModalUpdate = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => {
                setModal(!modal);
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width: "100%", height: '10%', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { setModal(!modal); if (!success) setImage(null); else setSuccess(false) }}>
                                <AntDesign name="close" size={24} color="black" />
                            </TouchableOpacity>
                            <View style={{ width: '80%', alignItems: 'center' }}><Text style={{ fontSize: 16, fontWeight: 'bold' }}>{
                                type == 'picture' ? "Profile Picture"
                                    : type == 'name' ? "Update Name"
                                        : type == 'email' ? "Update Email"
                                            : type == 'phone' ? "Update Phone Number"
                                                : ""}</Text>
                            </View>
                        </View>

                        <View style={[styles.centeredView, { width: "100%", height: '80%' }]}>
                            {
                                success ?
                                    <View style={[styles.centeredView, { width: "100%" }]}>
                                        <Ionicons name="checkmark-circle-sharp" size={100} color="#6C63FF" />
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'grey' }}>Update Success</Text>
                                    </View>
                                    :
                                    type == 'picture' ? <ImageForm />
                                        : type == 'name' ? <NameForm />
                                            : type == 'email' ? <EmailForm /> : <PhoneForm />
                            }
                        </View>
                        <View style={{ width: "100%", height: '10%' }} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )

    return (
        <ScrollView style={{ flex: 1, width: '100%', backgroundColor: "#F4F8FF", }}>
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={{
                        height: '30%', width: '100%', backgroundColor: 'FFF', justifyContent: 'flex-end', borderRadius: 40, padding: 20,
                        alignItems: 'center'
                    }}>
                        {data.image && <Image source={{ uri: IMAGE_URL+ data.image }} style={styles.profilePicture} />}
                        <TouchableOpacity onPress={() => activateModal('picture')} style={{ width: 25, height: 25, backgroundColor: 'rgba(0,0,0, 0.2)', borderRadius: 50, alignItems: 'center', justifyContent: 'center', margin: 10, paddingBottom: 2 }}>
                            <Pen width={13} height={13} fill={"black"} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: '60%', width: '100%', padding: 20 }}>
                        <View style={{ paddingBottom: 15 }}>
                            <Text style={styles.fontTitle}>
                                First Name
                            </Text>
                            <Text style={[styles.fontLarge, styles.transformUpper]}>
                                {data.first_name} <TouchableOpacity onPress={() => activateModal('name')}><Pen width={13} height={13} fill={"#6C63FF"} /></TouchableOpacity>
                            </Text>
                        </View>
                        <View style={{ paddingBottom: 15 }}>
                            <Text style={styles.fontTitle}>
                                Last Name
                            </Text>
                            <Text style={[styles.fontLarge, styles.transformUpper]}>
                                {data.last_name} <TouchableOpacity onPress={() => activateModal('name')}><Pen width={13} height={13} fill={"#6C63FF"} /></TouchableOpacity>
                            </Text>
                        </View>
                        <View style={{ paddingBottom: 15 }}>
                            <Text style={styles.fontTitle}>
                                Gender
                            </Text>
                            <Text style={[styles.fontLarge, styles.transformUpper]}>
                                {data.gender}
                            </Text>
                        </View>
                        <View style={{ paddingBottom: 15 }}>
                            <Text style={styles.fontTitle}>
                                Birth Date
                            </Text>
                            <Text style={styles.fontLarge}>
                                {Moment(data.DOB).format('DD MM YYYY')}
                            </Text>
                        </View>
                        <View style={{ paddingBottom: 15 }}>
                            <Text style={styles.fontTitle}>
                                Email
                            </Text>
                            <Text style={styles.fontLarge}>
                                {data.email} <TouchableOpacity onPress={() => activateModal('email')}><Pen width={13} height={13} fill={"#6C63FF"} /></TouchableOpacity>
                            </Text>
                        </View>
                        <View style={{ paddingBottom: 15 }}>
                            <Text style={styles.fontTitle}>
                                Phone Number
                            </Text>
                            <Text style={styles.fontLarge}>
                                {data.phone_number} <TouchableOpacity onPress={() => activateModal('phone')}><Pen width={13} height={13} fill={"#6C63FF"} /></TouchableOpacity>
                            </Text>
                        </View>
                    </View>
                    <ModalUpdate />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: "#F4F8FF",
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '92%',
        height: '90%',
        backgroundColor: '#FFF',
        elevation: 4,
        bottom: '3%',
        borderRadius: 40,
        alignItems: 'center',
        padding: 20
    },
    profilePicture: {
        borderWidth: 0.5,
        borderColor: '#cecece',
        borderRadius: 50,
        width: 100,
        height: 100,
    },
    fontTitle: {
        fontWeight: 'bold',
        color: '#a6a6a6',
    },
    fontLarge: {
        fontSize: 17
    },
    transformUpper: {
        textTransform: 'capitalize'
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

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '92%',
        height: 350,
        backgroundColor: "white",
        borderRadius: 40,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default EditProfile;