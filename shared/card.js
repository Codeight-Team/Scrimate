import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Match from '../assets/icons/multi.svg';
import Field from '../assets/icons/field.svg';
import Soccer from '../assets/soccer.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Card({ name, image, type, description, png, onPress }) {
    function Large() {
        return (
            <TouchableOpacity onPress={onPress} style={styles.menu}>
                <View style={{ padding: 20 }}>
                    <Svg />
                </View>
                <View style={{ padding: 20 }}>
                    <View style={{width: 200}}>
                        <Text style={[styles.fontMenu, styles.bold]}>{name}</Text>
                    </View>
                    <Text style={[styles.fontDescription, styles.bold]}>{description}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    function Small() {
        return (
            <TouchableOpacity style={[styles.menu, { height: 100, padding: 5, borderRadius: 10 }]} onPress={onPress}>
                <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                    {
                        image ?
                            <Image style={{ height: '100%', backgroundColor: 'black', width: '100%', borderRadius: 10 }} source={png ? png : { uri: "http://66.42.49.240/"+ image }} />
                            :
                            png ?
                                <Image style={{ height: '100%', backgroundColor: '#FFF', width: '100%', borderRadius: 10 }} source={png} />
                                :
                                <View style={{ height: '100%', backgroundColor: 'gray', width: '100%', borderRadius: 10 }}>
                                </View>
                    }
                </View>
                <View style={{ width: '70%', padding: 15 }}>
                    <Text style={[styles.fontSmall, styles.bold]}>{name}</Text>
                    <Text style={styles.fontSmall}>{description}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    function Svg() {
        if (image === "match") {
            return <Match width={100} height={100} />
        } else if (image === "field") {
            return <Field width={100} height={100} />
        } else if (image === "soccer") {
            return <Soccer width={100} height={100} />
        }
    }
    return (
        <View style={{ width: '100%', alignItems: 'center', paddingVertical: 5 }}>
            {type === 'small' ?
                <Small />
                :
                <Large />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
        height: 210,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 5,
        elevation: 4,
        marginHorizontal: 10
    },
    fontMenu: {
        fontSize: 20
    },
    bold: {
        fontWeight: 'bold',
    },
    fontDescription: {

    }
})

export default Card;