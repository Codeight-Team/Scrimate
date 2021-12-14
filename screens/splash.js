import React from 'react';
import { StyleSheet ,View, Text, Image } from 'react-native';
import FlatButton from '../shared/button';
import SVGImg from '../assets/soccer.svg';

export default function Splash(){
    return(
        <View style={styles.container}>
            <SVGImg width={417} height={227} />
            <Text style={styles.txt}> SCRIMATE</Text>
            <FlatButton text='START' onPress={() => console.log("Start Button Pressed")} backgroundColor={'#6C63FF'} width={150}/>
        </View>  
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F8FF'
    },
    txt: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 100,
        marginTop: 100

    }
})