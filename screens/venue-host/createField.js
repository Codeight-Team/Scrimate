import React from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react/cjs/react.development";
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from "formik";
import FlatButton from "../../shared/button";

const CreateField = ({ route }) => {
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

    return (
        <View style={styles.container}>
            <View style={styles.fieldContainer}>
                <Formik
                    initialValues={{ name: '', image: null, type: '', price: '' }}
                    onSubmit={values => {
                        image = values.image
                        navigation.navigate('Create Field Screen', { venue: values })
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <>
                            <View style={{ flexDirection: "column" , alignItems: 'center'  }}>
                                <View style={{ margin: 10}}>
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
                                <View style={{ flexDirection: "row" }}>
                                    <TextInput style={[styles.textInput]}
                                        placeholder={"Field Name"}
                                        onChange={handleChange('name')}
                                        value={values.name} />
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <TextInput style={[styles.textInput]}
                                        placeholder={"Field Type"}
                                        onChange={handleChange('type')}
                                        value={values.type} />
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <TextInput style={[styles.textInput]}
                                        placeholder={"Price Hour (in Rp)"}
                                        onChange={handleChange('price')}
                                        keyboardType='numeric'
                                        value={values.price} />
                                </View>
                                <View style={{alignItems:"center", padding: 20}}>
                                    <FlatButton width={150} backgroundColor={'white'} text={'Submit'} textStyle={{ color: 'black' }} />
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
        backgroundColor: 'white'
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

export default CreateField