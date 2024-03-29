import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import Card from "../../shared/card";
import BCA from "../../assets/bca-logo.png";
import BRI from "../../assets/bri-logo.png";
import BNI from "../../assets/bni-logo.png";
import CustomHeader from "../../shared/customHeader";
import Loading from "../../shared/loading";
import moment from "moment";
import api from "../../services/api";


const PaymentMethod = ({ navigation, route }) => {
  const [creator, setCreator] = useState({})
  const [match, setMatch] = useState()
  const [isLoading, setLoading] = useState(true)
  const [bills, setBills] = useState({})
  const [field, setField] = useState({})
  const [matchTime, setMatchTime] = useState({})

  const user_id = route.params.user_id
  const order_id = route.params.order_id
  const finder_id = route.params.finder_id
  const match_id = route.params.match_id

  const payment_method = [
    {
      name: 'BCA',
      image: BCA,
      description: 'Virtual Account'
    },
    {
      name: 'BRI',
      image: BRI,
      description: 'Payment with VA'
    },
    {
      name: 'BNI',
      image: BNI,
      description: 'Payment with VA'
    }
  ]

  useEffect(() => {
    const fetchOrderDetail = async () => {
      await api.get(`/api/order/find-a-order/${user_id}/${order_id}`).then((response) => {
        setMatch(response.data.data.order_type);
        setCreator(response.data.data.creator);
        setBills(response.data.data.bills)
        setField(response.data.data.field)
        setMatchTime({ date_of_match: response.data.data.date_of_match, time_of_match: response.data.data.time_of_match })
        if (response.data.data.bills.bill_status == null || finder_id) {
          setLoading(false)
        } else if (response.data.data.bills.bill_status) {
          navigation.navigate("Payment", { user_id: user_id, order_id: order_id })
        }
      })
        .catch(error => {
          console.log(error)
        });
    }
    fetchOrderDetail()
  }, [])

  const sendPaymentMethod = (value) => {
    api.post(`/api/payment/process-order/${user_id}/${bills.bill_id}`, {
      payment_method: value
    })
      .then(response => {
        navigation.navigate("Payment", { user_id: user_id, order_id: order_id })
      })
      .catch(err => {
        console.log(err);
      })
  }

  const checkUserType = (payment_method) => {
    if (finder_id) {
      sendFinderToMatch(payment_method)
    } else {
      sendPaymentMethod(payment_method)
    }
  }

  const sendFinderToMatch = async (payment_method) => {
    await api.put(`/api/match-making/join/${finder_id}/${match_id}`, {payment_method: payment_method})
      .then(res => {
        Alert.alert('Success',
          res.data.message, [
          {
            text: 'OK',
            onPress: () => navigation.navigate("Payment", { user_id: finder_id, order_id: order_id })
          },
        ])
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <>
      {isLoading ? <Loading />
        :
        <View style={styles.container}>
          <View style={styles.inner}>
            <CustomHeader title={"Choose Payment Method"} onPressBackButton={() => navigation.navigate("My Order", { user_id: user_id })} backButtonModel={"left"} />
            <View style={{ width: '100%', height: '50%', backgroundColor: "#FFF" }}>
              <View style={{ padding: 10, elevation: 5, backgroundColor: "#FFF" }}>
                <Text style={{ fontWeight: "bold", }}>Payment Method</Text>
              </View>
              <ScrollView style={{ backgroundColor: "#F4F8FF" }}>
                <View style={{ padding: 10, paddingBottom: 0 }}>
                  {payment_method.map(item => (
                    <View key={item.name}>
                      <Card type="small" name={item.name} png={item.image} description={item.description} onPress={() => checkUserType(item.name.toLowerCase())} />
                    </View>
                  ))
                  }
                </View>
              </ScrollView>
            </View>
            <View style={{ width: '100%', height: '5%', backgroundColor: "#6C63FF", elevation: 1, justifyContent: "center", paddingHorizontal: 15, flexDirection: "row" }}>
              <View style={{ width: '50%', justifyContent: 'center' }}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
                  Total Price :
                </Text>
              </View>
              <View style={{ color: "#FFF", width: '50%', alignItems: "flex-end", justifyContent: 'center' }}>
                <Text style={{ color: "#FFF", width: '50%', fontWeight: 'bold', fontSize: 17 }}>
                  Rp {bills.bill_amount}
                </Text>
              </View>
            </View>
            <ScrollView>
              <View style={{ width: '100%', backgroundColor: '#FFF' }}>
                {match == "Match" && (
                  <View style={[styles.red, { margin: '3%', borderRadius: 10, elevation: 8, padding: 20 }]}>
                    <View style={{ paddingBottom: 10 }}>
                      <Text style={{ fontWeight: "bold", color: 'white' }}>
                        Match Creator
                      </Text>
                    </View>
                    <View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                          <Text style={{ color: 'black', fontWeight: 'normal' }}>By</Text> {creator.first_name} {creator.last_name}
                        </Text>
                      </View>
                    </View>
                    <View>
                    </View>
                  </View>)
                }
                <View style={[{ backgroundColor: "#6C63FF" }, { margin: '3%', height: 215, borderRadius: 10, elevation: 8 }]}>
                  <View style={{ padding: 20, paddingBottom: 10, flexDirection: 'row' }}>
                    <Text style={{ fontWeight: "bold", color: 'white', width: '75%' }}>
                      User & Match Information
                    </Text>
                    <View style={{ alignItems: 'center', width: "25%" }}>
                      <View style={{ borderRadius: 10, paddingHorizontal: 5, backgroundColor: '#FFF', }}>
                        <Text style={{ fontWeight: "bold", color: 'black', fontSize: 12 }}>
                          {match == 'Match' ? 'Match' : 'Single'}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: "row" }}>
                      {
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                          {creator.first_name} {creator.last_name}
                        </Text>
                      }
                    </View>
                    <View style={{ padding: 10 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: "30%" }}>
                          Venue
                        </Text>
                        <Text style={{ fontWeight: "bold", width: "5%" }}>
                          :
                        </Text>
                        <Text style={{ fontWeight: "bold", width: "65%" }}>
                          {field.venue.venue_name}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: "30%" }}>
                          Field
                        </Text>
                        <Text style={{ fontWeight: "bold", width: "5%" }}>
                          :
                        </Text>
                        <Text style={{ fontWeight: "bold", width: "65%" }}>
                          {field.field_name}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: "30%" }}>
                          Address
                        </Text>
                        <Text style={{ fontWeight: "bold", width: "5%" }}>
                          :
                        </Text>
                        <Text style={{ fontWeight: "bold", width: "65%" }}>
                          {field.venue.address.address_street},{" "}
                          {field.venue.address.address_region}
                        </Text>
                      </View>
                    </View>
                    <View style={{ width: '100%', paddingVertical: 5, flexDirection: 'row' }}>
                      <Text style={{ color: '#FFF', width: '27%', fontWeight: "bold" }}>{moment(matchTime.date_of_match).format("dddd")}</Text>
                      <Text style={{ color: '#FFF', width: '40%', fontWeight: "bold" }}>{moment(matchTime.date_of_match).format("DD MMMM YYYY")}</Text>
                      <Text style={{ color: '#FFF', width: '33%', fontWeight: "bold", textAlign: 'right' }}>
                        {moment(matchTime.time_of_match, 'HH:mm:ss').format("HH:mm") + " - " + moment(moment(matchTime.time_of_match, 'HH:mm:ss').hours() + 1, "HH").format("HH:mm")}
                      </Text>
                    </View>
                  </View>
                  <View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      }
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    width: '100%',
    height: '100%',
  },
  red: {
    backgroundColor: '#e35259',
  },
})

export default PaymentMethod;