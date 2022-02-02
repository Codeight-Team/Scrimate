import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import axios from "axios";
import Card from "../../shared/card";
import BCA from "../../assets/bca-logo.png";
import BRI from "../../assets/bri-logo.png";
import BNI from "../../assets/bni-logo.png";
import CustomHeader from "../../shared/customHeader";


const PaymentMethod = ({ navigation, route }) => {
  const [message, setMessage] = useState()
  const [token, setToken] = useState()
  const [user, setUser] = useState({})
  const [match, setMatch] = useState()

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

  const client_key = 'SB-Mid-client-sfxcXpvK6KWmD3ck'
  
  useEffect(() => {
    const fetchUserData = async () => {
      await axios.get(`http://66.42.49.240/api/users/${route.params.data.user_id}`).then((response) => {
        setUser(response.data.userData)
      })
        .catch(error => {
          console.log(error)
        });
    }
    fetchUserData()
  }, [])

  

  const data = route.params
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <CustomHeader title={"Choose Payment Method"} onPressBackButton={()=> navigation.goBack()} backButtonModel={"left"} />
        <View style={{ width: '100%', height: '50%', backgroundColor: "#FFF" }}>
          <View style={{ padding: 10, elevation: 5, backgroundColor: "#FFF" }}>
            <Text style={{ fontWeight: "bold", }}>Payment Method</Text>
          </View>
          <ScrollView style={{ backgroundColor: "#F4F8FF" }}>
            <View style={{ padding: 10, paddingBottom: 0 }}>
              {payment_method.map(item => (
                <View key={item.name}>
                    <Card type="small" name={item.name} png={item.image} description={item.description} onPress={()=> navigation.navigate("Payment Screen")}/>
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
              Rp {data.data.field_price}
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={{ width: '100%', backgroundColor: '#FFF' }}>
          {!match && (
              <View style={[styles.red, { margin: '3%',borderRadius: 10, elevation: 8, padding: 20 }]}>
                <View style={{ paddingBottom: 10}}>
                  <Text style={{ fontWeight: "bold", color: 'white' }}>
                    Match Creator
                  </Text>
                </View>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                      <Text style={{ color: 'black', fontWeight: 'normal' }}>By</Text> {user.first_name} {user.last_name}
                    </Text>
                  </View>
                  {/* <View style={{ padding: 10, flexDirection: 'row' }}>
                    <Text style={{ width: "30%" }}>
                      Description
                    </Text>
                    <Text style={{ fontWeight: "bold", width: "5%" }}>
                      :
                    </Text>
                    <Text style={{ width: "65%" }}>
                      Teadawa qwt q qwd qqw qwd q w qwd qdq  qw wd wdq qw qd
                    </Text>
                  </View> */}
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
                      {match ? 'Match' : 'Regular'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                    {user.first_name} {user.last_name}
                  </Text>
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
                      {data.data.venue_name}
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
                      {data.data.field_name}
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
                      {data.data.address.address_street},{" "}
                      {data.data.address.address_region}
                    </Text>
                  </View>
                </View>
                <View style={{ width: '100%', paddingVertical: 5, flexDirection: 'row' }}>
                  <Text style={{ color: '#FFF', width: '33%', fontWeight: "bold" }}>{data.data.day}</Text>
                  <Text style={{ color: '#FFF', width: '37%', fontWeight: "bold" }}>{data.data.date}</Text>
                  <Text style={{ color: '#FFF', width: '30%', fontWeight: "bold" }}>{data.data.time}</Text>
                </View>
              </View>
              <View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
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