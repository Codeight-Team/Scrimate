import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function FlatButton({ text, onPress, backgroundColor, width }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.button, { backgroundColor, width }]}>
                <Text style={styles.textButton} > {text} </Text>
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
    }
})