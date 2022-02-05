import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";

const MyOrder = () => {
    const [active, setActive] = useState("progress")
    return(
        <View style={styles.container}>
            <View style={styles.inner}>
                <View style={styles.tabBar}>
                    <TouchableOpacity style={[styles.box , active=="progress"&&{backgroundColor: '#cecece'}]} onPress={()=> setActive("progress")}>
                        <Text style={[{color: 'black'},active!="progress"&&{ fontWeight: "bold"}]}>
                            Progress
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.box , active=="history"&&{backgroundColor: '#cecece'}]} onPress={()=> setActive("history")}>
                        <Text style={[{color: 'black'},active!="history"&&{ fontWeight: "bold"}]}>
                            Order History
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={{padding: 10, width: '100%'}}>
                        <View style={{padding: 20, borderRadius: 10, width: '100%', height: 200, backgroundColor: '#FFFFFF', marginVertical: 5, elevation: 4}}>
                            <Text style={{color: 'gray'}}>
                                Order ID: SCR/WDAIJAIDJWIJ9093882
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner:{
        width: '100%',
        height: '100%',
        backgroundColor: '#F4F8FF'
    },
    tabBar:{
        flexDirection: 'row',
        backgroundColor: '#FFF',
        elevation: 4
    },
    box:{
        width: '50%',
        alignItems: "center",
        justifyContent: 'center',
        height: 40
    }
})

export default MyOrder;