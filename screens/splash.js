import React from 'react';
import { StyleSheet ,View, Text, Image } from 'react-native';
import FlatButton from '../shared/button';
import SVGImg from '../assets/soccer.svg';

export default function Splash(){
    return(
        <View style={styles.container}>
            <SVGImg width={500} height={500} />
            <FlatButton text='START' onPress={() => console.log("Start Button Pressed")}/>
        </View>  
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    img: {
        width: 250,
        height: 250,
        marginBottom: 100
    }
})