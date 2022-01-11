import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Match from '../../../assets/icons/multi.svg';
import Field from '../../../assets/icons/field.svg';
import Futsal from '../../../assets/icons/futsal.svg';
import Football from '../../../assets/soccer-ball.svg';
import Badminton from '../../../assets/icons/shuttlecock.svg';

function MenuComp({ name, image }) {
    function Svg(){
        if(image === "match"){
          return <Match width={50} height={50}/>
        } else if( image === "field"){
          return <Field />
        } else if( image === 'futsal'){
          return <Futsal width={50} height={50}/>
        } else if(image === 'shuttle'){
          return <Badminton marginBottom={5} marginRight={5}/>
        }else{
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