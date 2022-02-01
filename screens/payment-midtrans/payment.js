import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const Payment = ({navigation, route}) => {
    const [bill, setBill] = useState({});

    useEffect(()=>{
        const getBillData = async() => {
             console.log('Data BILL')
        }
        getBillData();
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <View style={{
                    width: '100%', height: '15%', alignItems: "center", justifyContent: "center", backgroundColor: '#6C63FF',
                    elevation: 5, flexDirection: "row"
                }}>
                    <View style={{ top: 20, width: '20%', alignItems: "center" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ top: 20, width: '80%' }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: 'white' }}>
                            Finish Your Payment
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    inner: {
        padding: 20
    }
})

export default Payment;