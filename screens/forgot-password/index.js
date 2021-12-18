import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity } from 'react-native';
import {Formik} from 'formik';
import SelectionMethod from './components/selectionMethod';
import FormEmail from './components/formEmail'

export default function forgotPasswordScreen(){
    return(
        <View style={styles.container}>
            <Heading/>
            <View style={styles.contentContainer}>
                <SelectionMethod />
                {/* <FormEmail/> */}
            </View>
            <View style={styles.wtrContainer}>
                <Text style={styles.txt}>Powered by </Text>
                <Text style={styles.purple}>HARAFI</Text>
            </View>
        </View>
    )
}

const Heading = () => {
    return <Text style={styles.heading}>Forgot your password?</Text>;
} 

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F8FF',
        width: '100%'
    },
    heading:{
        fontWeight: "700",
        fontSize: 24
    },
    purple:{
        color:'#6C63FF'
    },
    bold:{
        fontWeight: '700'
    },
    txt:{
        color: '#CFCFCF'
    },
    wtrContainer:{
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    contentContainer:{
        margin: 50
    }
})