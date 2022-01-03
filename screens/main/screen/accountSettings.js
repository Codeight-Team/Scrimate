import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';

function AccountSettings() {
    return(
        <View style={styles.container}>
            <Text>This is account settings</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      width: '100%',
      backgroundColor:"#F4F8FF",
      padding: 20,
      flexDirection: 'column',
      flexWrap: 'wrap'
    },
    submenuText:{
      fontSize: 16,
      fontWeight:'700'
    },
    box:{
      borderRadius: 10,
      backgroundColor:'white',
      marginTop: 5,
      padding: 5,
      height: '15%',
      width: '100%'
    },
    profilePicture:{
      borderRadius: 50,
      width: 90,
      height:90,
      backgroundColor: 'grey',
      marginRight: 20
    },
    containerProfile:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: '#847dff',
      height: '20%',
      padding: 20
    },
    white:{
      color: 'white'
    },
    fontMedium:{
      fontSize: 18,
      fontWeight: 'bold'
    },
    componentProfile:{
      borderRadius: 50,
      width: 100,
      height: '35%',
      backgroundColor:'#FFF',
      marginTop: 5
    },
    innerProfile:{
      flexDirection: 'column',
      justifyContent: 'center'
    },
    btnSettings:{
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 5,
      width: 25,
      height: 25,
      backgroundColor: 'white'
    },
    containerSettings:{
      flex: 1,
      alignItems: 'flex-end'
    }
  })
  
  export default AccountSettings;