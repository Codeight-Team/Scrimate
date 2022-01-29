import React from "react";
import { View, Text, TextInput, Image, StyleSheet, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Modal } from 'react-native'
import { Formik } from "formik";
import axios from "axios";
import FlatButton from "../../shared/button";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useState } from "react/cjs/react.development";
import * as ImagePicker from 'expo-image-picker';
import SelectDropdown from 'react-native-select-dropdown'


const CreateVenue = ({ navigation }) => {
    const countries = ["Jakarta Barat", "Jakarta Timur", "Jakarta Pusat", "Jakarta Utara", 'Jakarta Selatan']
    const [facility, setFacility] = useState([''])
    const [image, setImage] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const addFacility = () => {
        setFacility([...facility, '']);
    };
    const handleRemoveItem = (index) => {
        setFacility((facility) => facility.filter((value, i) => i !== index))
    };

    const handleArrayChange = (event, index) => {
        const newItems = facility.map((item, i) => {
            if (index == i) {
                return event
            }
            return item;
        });
        setFacility(newItems);
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled)
            setImage(result.uri)
        // setField(newItems);
        // if (!result.cancelled) 
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#6C63FF', padding: 20, }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Venue Has Been Added</Text>
                            </View>
                        </View>
                    </Modal>
                    <View style={{ width: '100%', alignItems: "center", padding: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' }}>Register Venue</Text>
                    </View>
                    <ScrollView style={{ width: '100%' }}>
                        <View style={{ alignItems: "center" }}>
                            <Formik
                                initialValues={{ venue_name: '', venue_facility: [], venue_description: '', image: '', address_region: '', address_street: '', postal: '', address_city: '', sport_name: '' }}
                                onSubmit={values => {
                                    values.venue_facility = facility
                                    console.log(values.address_region);
                                    // setModalVisible(true)
                                    // setTimeout(() => [setModalVisible(false), navigation.navigate('Manage Venue Screen')], 1200)
                                }}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values }) => (
                                    <>
                                        {
                                            <TouchableOpacity style={{
                                                width: 200, height: 150, borderWidth: 1,
                                                borderColor: 'grey',
                                                borderRadius: 10,
                                                backgroundColor: '#b2b2b2'
                                            }} onPress={pickImage}>
                                                {image ?
                                                    <Image source={{ uri: image }} style={{
                                                        width: '100%', height: '100%', borderWidth: 1,
                                                        borderColor: 'grey',
                                                        borderRadius: 10,
                                                    }} />
                                                    :
                                                    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ fontSize: 10, color: 'gray' }}>
                                                            choose image
                                                        </Text>
                                                    </View>
                                                }
                                            </TouchableOpacity>
                                        }
                                        <TextInput
                                            name="venue_name"
                                            placeholder="Venue Name"
                                            style={styles.textInput}
                                            onChangeText={handleChange('venue_name')}
                                            onBlur={handleBlur('venue_name')}
                                            value={values.venue_name}
                                        />
                                        <TextInput
                                            name="venue_description"
                                            placeholder="Venue Description"
                                            style={styles.textInput}
                                            onChangeText={handleChange('venue_description')}
                                            onBlur={handleBlur('venue_description')}
                                            value={values.venue_description}
                                        />
                                        {
                                            facility.map((item, index) => (
                                                <View key={index} style={{ width: 270, flexDirection: 'row' }}>
                                                    <TextInput
                                                        name="venue_facility"
                                                        placeholder={"Venue Facility " + (index + 1)}
                                                        style={[styles.textInput, { width: 120, }]}
                                                        onChangeText={(e) => handleArrayChange(e, index)}
                                                        // onBlur={handleBlur()}
                                                        value={facility[index]}
                                                    />
                                                    {index == (facility.length - 1) ?
                                                        <View style={{ width: 40, justifyContent: 'center' }}>
                                                            <TouchableOpacity onPress={() => addFacility()}>
                                                                <Entypo name="circle-with-plus" size={24} color="white" />
                                                            </TouchableOpacity>
                                                        </View>
                                                        :
                                                        <View />
                                                    }

                                                    {
                                                        index == (facility.length - 1) && index != 0 ?
                                                            <View style={{ width: 40, justifyContent: 'center' }}>
                                                                <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                                                                    <MaterialIcons name="delete" size={24} color="red" />
                                                                </TouchableOpacity>
                                                            </View>
                                                            :
                                                            <View />
                                                    }
                                                </View>
                                            ))
                                        }
                                        <SelectDropdown
                                            data={countries}
                                            buttonTextStyle={{ fontSize: 15 }}
                                            defaultButtonText={'Select Region'}
                                            buttonStyle={[styles.textInput, { justifyContent: 'flex-start' }]}
                                            onSelect={(selectedItem, index) => {
                                                values.address_region = selectedItem
                                                console.log(selectedItem, index)
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                // text represented after item is selected
                                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                // text represented for each item in dropdown
                                                // if data array is an array of objects then return item.property to represent item in dropdown
                                                return item
                                            }}
                                        />
                                        <TextInput
                                            name="address_street"
                                            placeholder="Street"
                                            style={styles.textInput}
                                            onChangeText={handleChange('address_street')}
                                            onBlur={handleBlur('address_street')}
                                            value={values.address_street}
                                        />
                                        <View style={styles.btnContainer}>
                                            <FlatButton text={'submit'} onPress={handleSubmit} width={150} textStyle={{ color: 'black' }} backgroundColor={'#ffffff'} />
                                        </View>
                                    </>
                                )}
                            </Formik>
                        </View>
                    </ScrollView>

                </View>

            </View>

        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 10,
        backgroundColor: '#e6e6e6',
        justifyContent: "center",
        alignItems: "center"
    },
    textInput: {
        height: 40,
        width: 250,
        margin: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    },
    btnContainer: {
        width: '100%',
        alignItems: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        height: 400,
        width: 400,
        margin: 20,
        borderRadius: 20,
        padding: 35,
        backgroundColor: '#FFF',
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center"
    }
})

export default CreateVenue;