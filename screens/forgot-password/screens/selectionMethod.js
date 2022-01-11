import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FlatButton from '../../../shared/button';
import RadioButton from '../../../shared/radio';

export default function selectionMethod({navigation}){
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
            return(
                <View style={styles.container}>
                    <Text style={styles.txt}>
                            Recover from
                    </Text>
                    <RadioButton labeldata={data} textStyle={[styles.txt,{ marginLeft: 5, fontSize: 11 }]} width={100} callback={(e) => radioHandler(e)}/>
                    <View style={styles.btnContainer}>
                        <FlatButton text='CONFIRM' onPress={() => navigation.navigate('Form Email')} backgroundColor={'#6C63FF'} width={150} disable={Object.keys(radioValue).length === 0?true:false}/>
                    </View> 
                    
                </View>
            )
        }


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F8FF',
        width: '100%',
    },
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