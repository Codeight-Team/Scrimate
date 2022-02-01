import React from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react/cjs/react.development";
import * as ImagePicker from 'expo-image-picker';
import { Formik } from "formik";
import FlatButton from "../../shared/button";
import axios from "axios";

const CreateField = ({ navigation, route }) => {
    const [image, setImage] = useState(null)

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

    const sendField = async (field) => {
        const venue_id = route.params.venue_id
        const formData = new FormData();

        formData.append('field_id', field.field_name)
        formData.append('field_type', field.field_type)
        formData.append('field_price', parseInt(field.price))
        formData.append('image', {
            name: '_field.jpg',
            uri: field.image,
            type: 'image/jpg'
        })

        const config = {
            headers: {
                "Content-Type": 'multipart/form-data',
                Accept: "application/json"
            }
        }

        await axios.post(`http://66.42.49.240/api/field/create-field/${venue_id}`, formData, config)
            .then((response) => {
                 navigation.goBack() 
                })
            .catch((err) => { console.warn(err) })
    }

    return (
        <View style={styles.container}>
            <View style={styles.fieldContainer}>
                <Formik
                    initialValues={{ field_name: '', image: null, field_type: '', price: '' }}
                    onSubmit={values => {
                        values.image = image
                        sendField(values)
                        // navigation.navigate('Manage Venue Screen', { venue: values })
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <>
                            <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                <View style={{ margin: 10, backgroundColor: 'white', padding: 10, borderRadius: 10 }} >
                                    {
                                        <TouchableOpacity style={{
                                            width: 200, height: 150, borderWidth: 1,
                                            borderColor: 'grey',
                                            borderRadius: 10,
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
                                </View>
                                <View>
                                    <Text style={{ paddingHorizontal: 15 }}>
                                        Field Name
                                    </Text>
                                    <TextInput style={[styles.textInput]}
                                        name="field_name"
                                        placeholder={"Field Name"}
                                        onChangeText={handleChange('field_name')}
                                        onBlur={handleBlur('field_name')}
                                        value={values.field_name} />
                                </View>
                                <View>
                                    <Text style={{ paddingHorizontal: 15 }}>
                                        Field Type
                                    </Text>
                                    <TextInput style={[styles.textInput]}
                                        name="field_type"
                                        placeholder={"Flooring/Field Type"}
                                        onChangeText={handleChange('field_type')}
                                        onBlur={handleBlur('field_type')}
                                        value={values.field_type} />
                                </View>
                                <View>
                                    <Text style={{ paddingHorizontal: 15 }}>
                                        Price / Hour
                                    </Text>
                                    <TextInput style={[styles.textInput]}
                                        name="price"
                                        placeholder={"Price (in Rp)"}
                                        onChangeText={handleChange('price')}
                                        onBlur={handleBlur('price')}
                                        keyboardType='numeric'
                                        value={values.price} />
                                </View>
                                <View style={{ alignItems: "center", padding: 20 }}>
                                    <FlatButton width={150} backgroundColor={'white'} text={'Submit'} textStyle={{ color: 'black' }} onPress={() => handleSubmit()} />
                                </View>
                            </View>
                        </>
                    )}
                </Formik>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#F4F8FF",
    },
    fieldContainer: {
        top: 40,
        padding: 20,
        width: '100%',
        height: '100%',
    },
    textInput: {
        height: 40,
        width: 180,
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    },
})

export default CreateField;