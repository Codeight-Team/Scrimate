import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Match from '../assets/icons/multi.svg';
import Field from '../assets/icons/field.svg';
import Futsal from '../assets/icons/futsal.svg';
import Football from '../assets/soccer-ball.svg';
import Badminton from '../assets/icons/shuttlecock.svg';
import Soccer from '../assets/soccer.svg';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function MenuComp({ name, image }) {
    function Svg(){
        if( image === 'futsal'){
          return <Futsal width={50} height={50}/>
        } else if(image === 'shuttle'){
          return <MaterialCommunityIcons name="badminton" size={40} color="#6C63FF" />
        } else if(image == 'basket'){
            return <Ionicons name="basketball-sharp" size={40} color="#6C63FF" />
        } else{
          return <Football width={35} height={35} marginBottom={5}/>
        }
      }
    return (
        <View style={styles.cmenu}>
            <Svg/>
            <Text style={styles.ctitle}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cmenu:{
        width: 100,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 5,
        margin: 10,
      },
      ctitle:{
        fontSize: 10,
        fontWeight: 'bold',
        color: 'black'
      },
})

export default MenuComp;