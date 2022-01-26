import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

function ChooseField({navigation, route }) {

    function renderField() {
        return route.params.field.map((item) => {
            return (
                <TouchableOpacity key={item.id} style={styles.box} onPress={() => navigation.navigate('Pick Date Time', {data:route.params})}>
                    <View style={styles.inner}>
                        <Text>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        )
    }

    return (
        <View style={styles.container}>
            <View style={{width: '100%'}}>
                <Image style={{ height: '60%', width: '100%', borderRadius: 40 }} source={{uri:route.params.venue_image}}/>
                <View style={{width: '100%', alignItems: 'center', padding: 20}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>{route.params.venue_name}</Text>
                </View>
            </View>
            
            {renderField()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        backgroundColor:"#F4F8FF",

    },
    box: {
        width: '33.33%',
        height: 100,
        padding: 5,
    },
    inner: {
        flex: 1,
        padding: 5,
        backgroundColor: '#ffffff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 10,
        elevation: 4
    },
})

export default ChooseField;