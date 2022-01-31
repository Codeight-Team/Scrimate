import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Match from '../assets/icons/multi.svg';
import Field from '../assets/icons/field.svg';
import Soccer from '../assets/soccer.svg';
import NotFound from '../assets/image-not-found.svg';

function Card({ name, image, type, description}) {
    function Large() {
        return (
            <View style={styles.menu}>
                <View style={{ padding: 20 }}>
                    <Svg />
                </View>
                <View style={{ padding: 20 }}><Text style={[styles.fontMenu, styles.bold]}>{name}</Text>
                </View>
            </View>
        )
    }
    function Small() {
        return (
            <View style={[styles.menu,{height:100, padding:0, borderWidth: 0}]}>
                <View style={{width:'36%', padding: 10, alignItems:'center', justifyContent: 'center' }}>
                    {
                        image?
                        <Image style={{height:85, width: 110, borderRadius:20}} source={{uri: image}}/>
                        :
                        <NotFound width={80} height={80} fill={'gray'}/>
                    }
                </View>
                <View style={{ width: '64%',padding: 5 }}>
                    <Text style={[styles.fontSmall, styles.bold]}>{name}</Text>
                    <Text style={styles.fontSmall}>{description}</Text>
                </View>
            </View>
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
        <View style={{width: '100%', alignItems: 'center', paddingVertical: 5}}>
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
        width: '95%',
        height: 210,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 20,
        elevation: 4,
        borderWidth: 2,
        borderColor: 'gray'
    },
    fontMenu: {
        fontSize: 20
    },
    bold:{
        fontWeight: 'bold',
    }
})

export default Card;