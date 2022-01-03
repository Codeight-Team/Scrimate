// In App.js in a new project

import * as React from 'react';
import { StyleSheet, View, Text, Button, useWindowDimensions, TouchableOpacity, Image, SafeAreaView, StatusBar, TouchableOpacityComponent} from 'react-native';
import { useEffect } from 'react';
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import Animated, {useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring,} from 'react-native-reanimated';
import pp from '../../../assets/bimay.jpg'
import GopaySVG from '../../../assets/icons/gopay-logo.svg'
import TrophySVG from '../../../assets//icons/trophy.svg'


function HomeScreen({navigation}) {
  useEffect(() => {
    top.value  = 750
  });
  const dimensions = useWindowDimensions();
  const top = useSharedValue(
    dimensions.height
  );
  const style = useAnimatedStyle(()=>{
    return{
      top: withSpring(top.value, SPRING_CONFIG),
    };
  });
  const SPRING_CONFIG = {
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 1000,
  }
  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context){
      context.startTop = top.value;
    },
    onActive(event, context){
      top.value = context.startTop + event.translationY;
    },
    onEnd(){
      if(top.value > dimensions.height / 2 + 200) {
        top.value = dimensions.height;
      } else {
        top.value = dimensions.height / 2
      }
    }
  });
  const MenuComp = ( {title, }) =>{
    return <TouchableOpacity onPress={() => navigation.navigate('Reservation Screen',{sports:title})}>
      <View style={styles.cmenu}>
        <Text style={styles.ctitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  }
  const Highlights = () =>{
    return <SafeAreaView style={styles.container}>
      <Text>Test</Text>
      <ScrollView style={styles.chighlights} contentContainerStyle={{ flexGrow: 1 }}>
        <Text>cincingmaning</Text>
        

        </ScrollView>
      </SafeAreaView>
  }
  const UserBubble = ({userName}) =>{
      return <View style={styles.bubbleContainer}>
        <Image
        style={styles.profilePicture}
        source={pp}
      />
        <View>
          <Text style={styles.userText}>Hi, {userName}!</Text>
          <Text style={{fontSize: 10, color: '#BCBCBC'}}>What sports you will choose today?</Text>
          <TouchableOpacity>
            <View style={{marginLeft: 0, margin: 7, width: 120, height: 35, backgroundColor: '#fff', borderRadius:50, alignItems: 'center',justifyContent:'center', padding:4, flexDirection: 'row'}}>
              <GopaySVG style={{marginRight:10}}/>
              <View>
                <Text style={{fontSize: 11, fontWeight: 'bold', color: 'black'}}>gopay</Text>
                <Text style={{fontSize: 10, color: '#BCBCBC'}}>Rp2.000.000</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{marginLeft: 0, margin: 7, width: 120, height: 35, backgroundColor: '#fff', borderRadius:50, alignItems: 'center', justifyContent:'flex-end', padding:4, flexDirection: 'row'}}>
              <View width='27%'><TrophySVG /></View>
              <View style={{width: '65%',}}>
                <Text style={{fontSize: 11, fontWeight: 'bold', color: 'black'}}>Trophy</Text>
                <Text style={{fontSize: 10, color: '#BCBCBC'}}>47</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    }
   
  return (
    <>
      <View style={{flex:1, alignItems: 'center', justifyContent: 'flex-start', top: 145,}}>
        <SafeAreaView style={{margin: 50}}>
        <UserBubble backgroundColor='#6C63FF' userName={'Kampank'}/>
        </SafeAreaView>
        {/* <View style={{flex:0.2, alignItems: 'center', justifyContent: 'center',}}>
          <Highlights/>

        </View> */}
        {/* <PanGestureHandler>
          <Animated.View 
            >
                <View style={styles.csheet}>
                  <MenuComp title="Futsal"/>
                  <MenuComp title="Sepak bola"/>
                  <MenuComp title="Badminton"/>
                </View>
          </Animated.View>
        </PanGestureHandler> */}
        <Button title='Cinccong' 
          onPress={()=>{
            if(top.value > dimensions.height / 2){
              top.value = withSpring(
                dimensions.height / 2,
                SPRING_CONFIG 
            )} else {
              top.value = dimensions.height / 1.2
            }
          }}/>
      </View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View 
          style={[{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: dimensions.height,
            backgroundColor: '#C4C4C4',
            borderTopLeftRadius:40,
            borderTopRightRadius: 40,
            shadowColor: '#000',
            shadowOffset:{
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 20,
            justifyContent: 'flex-start',
            alignItems: 'center',
            }, 
            style
            ]}>
              <View style={styles.csheet}>
                <MenuComp title="Futsal"/>
                <MenuComp title="Football" />
                <MenuComp title="Badminton" />
              </View>
        </Animated.View>
      </PanGestureHandler>
    </>
    
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    maxHeight: 1000
  },
  cmenu:{
    width: 100,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 5,
    margin: 10,
  },
  ctitle:{
    fontSize: 10,
    fontWeight: 'bold'
  },
  csheet:{
    flexDirection: 'row'
  },
  chighlights:{
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10
  },
  bubbleContainer:{
    flexDirection:'row',
    width: 300,
    height: 168,
    backgroundColor: '#6C63FF',
    borderRadius: 40,
    padding: 20
  },
  userText:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize:18,
    lineHeight: 21
  },
  profilePicture:{
    width:72,
    height:72,
    borderRadius: 50,
    marginRight: 10
  }
})