import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useState } from 'react/cjs/react.development';

export default function FlatButton({ text, onPress, backgroundColor, width, disabled, layoutStyle, textStyle }) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View style={[styles.button, {width}, disabled?styles.btnDisabled:{ backgroundColor}, layoutStyle]}>
                <Text style={[styles.textButton, disabled?{color:'#c0c0c0'}:textStyle]} > {text} </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        elevation: 8,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    },
    btnDisabled:{
        backgroundColor: 'gray'
    }
})