import React, { useState } from 'react';
import RadioButtonRN from "radio-buttons-react-native";
import { StyleSheet, Text, View } from 'react-native';
import FlatButton from '../../../shared/button';
import { isEmptyArray } from 'formik';


export default function selectionMethod(){

    const [radioValue, setRadioValue] = useState({})
    const [user_email] = useState('0812381832')
    const [user_phone] = useState('user@mail.com')
    const radioHandler = (value) => {
        setRadioValue(value)
    }
    const buttonHandler = () => {
            if(radioValue.flag === 0)
                console.log("email")
            else if(radioValue.flag === 1)
                console.log("phone")
    }

    const data = [
        {
          label: 'email '+ user_email,
          flag: 0
         },
         {
          label: 'phone '+ user_phone,
          flag: 1
         }
        ];
        
    return(
        <View>
            <Text style={styles.txt}>
                    Recover from
            </Text>
            <RadioButtonRN boxStyle={styles.box}
                                box={false}
                                textStyle={styles.txt}
                                data={data}
                                circleSize={10}
                                activeColor={'#C4C4C4'}
                                selectedBtn={(e) => radioHandler(e)}/>
            <View style={styles.btnContainer}>
                <FlatButton text='CONFIRM' onPress={() => buttonHandler()} backgroundColor={'#6C63FF'} width={150} isDisable={Object.keys(radioValue).length === 0?true:false}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box:{
        width: 200,
    },
    txt:{
        color: '#CFCFCF',
        fontWeight: 'bold'
    },
    btnContainer: {
        margin:10,
        alignItems: 'center',
        justifyContent: 'center'
    },
})