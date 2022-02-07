import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Card from "../component/card";
import axios from "axios";

const MyOrder = ({ navigation, route }) => {
    const [active, setActive] = useState("progress")
    const [myOrder, setMyOrder] = useState([])
    const user_id = route.params.user_id


    useEffect(() => {
        fetchOrderList()
    }, [])

    const fetchOrderList = async () => {
        await axios.get(`http://scrimate.com/api/order/find-my-order/${user_id}`)
            .then(response => {
                console.log(response.data);
                setMyOrder(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <View style={styles.tabBar}>
                    <TouchableOpacity style={[styles.box, active == "progress" && { backgroundColor: '#cecece' }]} onPress={() => setActive("progress")}>
                        <Text style={[{ color: 'black' }, active != "progress" && { fontWeight: "bold" }]}>
                            Progress
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.box, active == "history" && { backgroundColor: '#cecece' }]} onPress={() => setActive("history")}>
                        <Text style={[{ color: 'black' }, active != "history" && { fontWeight: "bold" }]}>
                            Order History
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {active == "progress" &&
                        <>
                            {
                                myOrder.map(item => (
                                    <Card key={item.order_id}
                                        itemId={item.order_id}
                                        venue_name={item.field.venue.venue_name}
                                        field_name={item.field.field_name}
                                        image={item.field.image}
                                        status={item.order_status}
                                        date={item.date_of_match}
                                        time={item.time_of_match}
                                        price={item.bills[0].bill_amount}
                                        onPress={() => item.order_status == "Settlement" ||
                                            item.order_status == "Failed" ?
                                            navigation.navigate("Order Summary")
                                            :
                                            navigation.navigate("Payment Method", { order_id: item.order_id, user_id:user_id, type: item.order_type })} />
                                ))
                            }
                        </>

                    }
                    {active == "history" &&
                        <Card itemId={"WDAIJAIDJWIJ9093882"} item={"Lapangan 41"} status={'Success'} onPress={() => console.log("Go to Payment")} />
                    }
                    {active == "history" &&
                        <Card itemId={"WDAIJAIDJWIJ9093882"} item={"Lapangan 41"} status={'Failed'} onPress={() => console.log("Go to Payment")} />
                    }
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F4F8FF'
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        elevation: 4
    },
    box: {
        width: '50%',
        alignItems: "center",
        justifyContent: 'center',
        height: 40
    }
})

export default MyOrder;