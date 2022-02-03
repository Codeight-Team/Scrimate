import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";

const MyOrder = () => {
    return(
        <View style={styles.container}>
            <View style={styles.inner}>
                <ScrollView>
                    <View style={{padding: 10, width: '100%'}}>
                        <View style={{padding: 20, borderRadius: 10, width: '100%', height: 200, backgroundColor: '#FFFFFF', marginVertical: 5, elevation: 4}}>
                            <Text style={{color: 'gray'}}>
                                Order ID: SCR/WDAIJAIDJWIJ9093882
                            </Text>
                        </View>
                        <View style={{padding: 20, borderRadius: 10, width: '100%', height: 200, backgroundColor: '#FFFFFF', marginVertical: 5, elevation: 4}}>
                            <Text style={{color: 'gray'}}>
                                Order ID: SCR/WDAIJAIDJWIJ9093882
                            </Text>
                        </View>
                        <View style={{padding: 20, borderRadius: 10, width: '100%', height: 200, backgroundColor: '#FFFFFF', marginVertical: 5, elevation: 4}}>
                            <Text style={{color: 'gray'}}>
                                Order ID: SCR/WDAIJAIDJWIJ9093882
                            </Text>
                        </View>
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
    }
})

export default MyOrder;