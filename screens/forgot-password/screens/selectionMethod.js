import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FlatButton from '../../../shared/button';
import RadioButton from '../../../shared/radio';
import Cloud from '../../../assets/cloud.svg'

export default function selectionMethod({ navigation }) {
    // useEffect(() => 
    //     console.log("Test")
    // )
    const [radioValue, setRadioValue] = useState({})
    const radioHandler = (value) => {
        setRadioValue(value)
    }

    const data = [
        {
            label: 'Email ',
            flag: 0
        }
    ]
    return (
        <View style={styles.container}>
            <View style={{height: '40%', width: '100%', padding:20, alignItems: 'center',justifyContent:'flex-end'}}>
                <Cloud/>
            </View>
            <View style={styles.body}>
                <Text style={styles.heading}>Forgot your password?</Text>
                <View style={{ padding: 20 }}>
                    <Text style={styles.txt}>
                        Recover from
                    </Text>
                    <RadioButton
                        labeldata={data}
                        textStyle={{
                            color: '#CFCFCF',
                            fontWeight: 'bold', 
                            marginLeft: 5, 
                            fontSize: 11
                        }} width={100} callback={(e) => radioHandler(e)} />
                </View>
            </View>
            <View style={styles.btnContainer}>
                <FlatButton text='CONFIRM' onPress={() => navigation.navigate('Form Email')} backgroundColor={'#6C63FF'} width={150} disable={Object.keys(radioValue).length === 0 ? true : false} />
            </View>
            <Text style={styles.txt}>project <Text style={{color:'#6C63FF', textTransform: 'uppercase'}}> Scrimate</Text></Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F8FF',
        width: '100%',
    },
    body:{
        height: '30%',
    },
    box: {
        width: 200,
    },
    heading: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold'
    },
    txt: {
        color: '#CFCFCF',
        fontWeight: 'bold'
    },
    btnContainer: {
        height: '20%',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
})