import React from 'react';
import RadioButtonRN from "radio-buttons-react-native";
import {StyleSheet} from 'react-native';

export default function RadioButton({labeldata,callback, width, textStyle}) {
    return (
        <RadioButtonRN
            box={false}
            boxStyle={{ marginLeft: 10, width: width}}
            data={labeldata}
            circleSize={10}
            textStyle={textStyle}
            activeColor={'#6C63FF'}
            style={{ flexDirection: 'row' }}
            selectedBtn={callback} />
    )
}
