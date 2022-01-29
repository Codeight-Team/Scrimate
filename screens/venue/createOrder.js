import React from "react";
import { StyleSheet, View, Text } from "react-native";
import FlatButton from "../../shared/button";
import axios from "axios";

const CreateOrder = ({ navigation, route }) => {
    const data = route.params.data;
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={{height: "20%"}}>
                    <Text style={{fontSize: 20}}>
                        Order
                    </Text>
                </View>
                <View style={{height: "50%",}}>
                    <Text>
                        Venue: {data.venue_name}
                    </Text>
                    <Text>
                        Field: {data.field_name}
                    </Text>
                    <Text>
                        Day: {data.day}
                    </Text>
                    <Text>
                        Match Day: {data.date}
                    </Text>
                    <Text>
                        Match Time: {data.time}
                    </Text>
                </View>
                <View style={{height: '30%', justifyContent: 'center'}}>
                    <FlatButton text={'Pay'} backgroundColor={'#6C63FF'} width={150} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
    },
    box: {
        padding: 20,
        backgroundColor: 'white', 
        height: '70%', 
        width: '90%', 
        alignItems: "center",
        borderRadius: 40,
        elevation: 4
    }
})

export default CreateOrder;