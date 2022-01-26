// In App.js in a new project

import * as React from 'react';
import { StyleSheet, View, Text, useWindowDimensions, TouchableOpacity, Image, StatusBar, TouchableOpacityComponent} from 'react-native';
import { useEffect, useState} from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring,} from 'react-native-reanimated';
import pp from '../../../assets/bimay.jpg';
import GopaySVG from '../../../assets/icons/gopay-logo.svg';
import TrophySVG from '../../../assets/icons/trophy.svg';
import Swiper from 'react-native-swiper';
import MenuComponent from '../../../shared/menu';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

function HomeScreen({navigation, route}) {
  const [data, setData] = useState([]);
  const [user_id, setUserId] = useState('');

  useEffect(() => {
    top.value  = 680
    setTimeout(async () =>{
      let user
      try {
        user = await AsyncStorage.getItem('user_id')
      } catch (error) {
        Alert.alert('Sign in needed')
      }
      setUserId(user)
    })

    fetchUserData()
  }, []);

  const fetchUserData = async () => {
    let isMounted = true
    await axios.get(`http://66.42.49.240/api/users/${user_id}`).then(response => {
      let data = response.data[0]
      if(isMounted)
      setData(data)
    })
    .catch(function (error) {
        console.log(error)
    });
    return() => {isMounted = false }
  }

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
        top.value = 680;
      } else {
        top.value = dimensions.height / 2
      }
    }
  });

  const UserBubble = () =>{
      return <View style={[styles.bubbleContainer, styles.purple]}>
        <Image
        style={styles.profilePicture}
        source={pp}
      />
        <View>
          <Text style={styles.userText}>Hi, <Text style={{textTransform: 'capitalize'}}>{data.first_name}</Text>!</Text>
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
                <Text style={{fontSize: 11, fontWeight: 'bold', color: 'black'}}>Matchs</Text>
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

    const sport =[
      {
        name:"Futsal",
        url:'Activity Screen',
        title:"Futsal",
        svg:"futsal"
      },
      {
        name:"Football",
        url:'Activity Screen',
        title:"Football",
        svg:""
      },
      {
        name:"Badminton",
        url:'Activity Screen',
        title:"Badminton",
        svg:"shuttle"
      },
    ]

    function RenderBubble() {
      return sport.map((item) => {
        return (
          <TouchableOpacity key={item.title} onPress={() => 
            navigation.navigate(item.url, {title: item.title})
          }>
              <MenuComponent name={item.name} image={item.svg}></MenuComponent>
          </TouchableOpacity>
        )
      });
    }

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
            
        <View style={styles.slide}>
          {
            UserBubble()
          }
          
        </View>
        <View style={styles.slide}>
          <ComponentBubble color={red} title={"Activity"}/>
        </View>
        <View style={styles.slide}>
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
              {/* <TouchableOpacity onPress={() => navigation.navigate(url,{sports:"Forum"})}>
                <MenuComp name="Create Match" url='Create Match' title="Create Match" svg="field"/>
                <MenuComp name="Find Match" url='Forum Stack' title="Forum" svg="match"></MenuComp>
                <MenuComp name="Futsal" url='Reservation Screen' title="Futsal" svg="futsal" />
                <MenuComp name="Football" url='Reservation Screen' title="Football" svg="" />
                <MenuComp name="Badminton" url='Reservation Screen' title="Badminton"svg="shuttle" />
              </TouchableOpacity> */}
              {
                        RenderBubble()
                  }
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
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    maxHeight: 1000
  },
  csheet:{
    flexDirection: 'row',
    flexWrap: 'wrap'
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