// In App.js in a new project

import * as React from 'react';
import { StyleSheet, View, Text, Button, useWindowDimensions, TouchableOpacity, Image, SafeAreaView, StatusBar, TouchableOpacityComponent} from 'react-native';
import { useEffect, useState} from 'react';
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import Animated, {useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring,} from 'react-native-reanimated';
import pp from '../../../assets/bimay.jpg';
import GopaySVG from '../../../assets/icons/gopay-logo.svg';
import TrophySVG from '../../../assets/icons/trophy.svg';
import Match from '../../../assets/icons/multi.svg';
import Field from '../../../assets/icons/field.svg';
import Futsal from '../../../assets/icons/futsal.svg';
import Football from '../../../assets/soccer-ball.svg';
import Badminton from '../../../assets/icons/shuttlecock.svg';
import Swiper from 'react-native-swiper';

function HomeScreen({navigation}) {
  const [userName, setName] = useState("Rafi");
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

  function Svg({name}){
    if(name === "match"){
      return <Match width={50} height={50}/>
    } else if( name === "field"){
      return <Field />
    } else if( name === 'futsal'){
      return <Futsal width={50} height={50}/>
    } else if(name === 'shuttle'){
      return <Badminton marginBottom={5} marginRight={5}/>
    }else{
      return <Football width={35} height={35} marginBottom={5}/>
    }
  }


  const MenuComp = ( {name, title, url , svg}) =>{
    return <TouchableOpacity onPress={() => navigation.navigate(url,{sports:title})}>
      <View style={styles.cmenu}>
        <Svg name={svg}></Svg>
        <Text style={styles.ctitle}>{name}</Text>
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
  const UserBubble = () =>{
      return <View style={[styles.bubbleContainer, styles.purple]}>
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
    const ComponentBubble = ({color, title}) =>{
      return <View style={[styles.bubbleContainer, color]}>
          <Text style={styles.userText}>{title}</Text>
      </View>
    }

    const white = styles.white;
    const red = styles.red;
    const orange = styles.orange;
   
  return (
    <>
      <View style={{flex:0.3, alignItems: 'center', justifyContent: 'flex-start', top: 147}}>
        {/* <ComponentBubble></ComponentBubble>
         */}
         <Swiper 
            showsButtons={true} 
            loop={false} 
            showsPagination={true} 
            nextButton={<Text style={styles.button}>›</Text>}
            prevButton={<Text style={styles.button}>‹</Text>}
            >
            
        <View style={styles.slide1}>
          <UserBubble/>
        </View>
        <View style={styles.slide2}>
          <ComponentBubble color={red} title={"Activity"}/>
        </View>
        <View style={styles.slide3}>
          <ComponentBubble color={orange} title={"Match"}/>
        </View>
      </Swiper>
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
                <MenuComp name="Find Match" url='Forum Stack' title="Forum" svg="match"></MenuComp>
                <MenuComp name="Reserve Venue" url='Post' svg="field"/>

                <MenuComp name="Futsal" url='Reservation Screen' title="Futsal" svg="futsal" />
                <MenuComp name="Football" url='Reservation Screen' title="Football" svg="" />
                <MenuComp name="Badminton" url='Reservation Screen' title="Badminton"svg="shuttle" />
              </View>
        </Animated.View>
      </PanGestureHandler>
    </>
    
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {},
  button:{
    color: "#6C63FF",
    fontSize: 50,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    fontWeight: 'bold',
    color: 'black'
  },
  csheet:{
    flexDirection: 'row',
    flexWrap: 'wrap'
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
    borderRadius: 40,
    padding: 20
  },
  purple:{
    backgroundColor: '#6C63FF',
  },
  orange:{
    backgroundColor: '#FF9400',
  },
  red:{
    backgroundColor: '#e35259',
  },
  white:{
    backgroundColor: '#FFF',
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