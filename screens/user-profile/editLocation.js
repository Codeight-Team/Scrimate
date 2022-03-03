import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import api from "../../services/api";

const EditAddress = ({route}) => {
    const [selectedRegion, setSelectedRegion] = useState('Kota Jakarta Barat')
    const region = ['Kota Jakarta Barat','Kota Jakarta Utara','Kota Jakarta Timur','Kota Jakarta Selatan','Kota Jakarta Pusat']
    const [data, setData] = useState({})

    useEffect(()=>{
        const fetchAddress = async () => {
            await api.get('/api/address/'+route.params.data.address_id)
            .then(res=>{
                setData(res.data)
            })
            .catch(err=> console.log(err))
        }
        fetchAddress()
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <View style={styles.box}>
                    <Text style={styles.textTitle}>
                        Your Address
                    </Text>
                    <Text>
                        {data.address_street} Street, {data.address_region}
                    </Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textTitle}>
                        Prefered Location
                    </Text>
                    <View>
                        <SelectDropdown
                            data={region}
                            buttonTextStyle={{ fontSize: 15 }}
                            defaultButtonText={selectedRegion}
                            buttonStyle={[styles.textInput, { justifyContent: 'flex-start' }]}
                            onSelect={(selectedItem, index) => {
                                setSelectedRegion(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }} />
                    </View>
                </View>
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
        padding: 10,
        backgroundColor: '#F4F8FF'
    },
    box: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#FFF',
        elevation: 5,
        borderRadius: 10,
    },
    textTitle: {
        fontWeight: "bold"
    },
    textInput:{
        backgroundColor: '#cecece',
        elevation: 5,
        borderRadius: 20,
        borderWidth: 0.5,
        height: 30,
        width: 180
    }
})

export default EditAddress;