// In App.js in a new project

import * as React from 'react';
import { StyleSheet, View, Text, useWindowDimensions, TouchableOpacity, Image, StatusBar, TouchableOpacityComponent } from 'react-native';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, } from 'react-native-reanimated';
import TrophySVG from '../../../assets/icons/trophy.svg';
import Swiper from 'react-native-swiper';
import MenuComponent from '../../../shared/menu';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../../shared/loading';
import axios from 'axios'

function HomeScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useFocusEffect(
    React.useCallback(()=> {
        top.value = (dimensions.height / 1.2)
        let isActive = true
        const fetchUser = async () =>{
          let user
          try {
            user = await AsyncStorage.getItem('user_id')
          } catch (error) {
            Alert.alert('Sign in needed')
          }
          if(isActive)
            fetchUserData(user)
        }
        fetchUser()
        return () =>{isActive = false} 
    },[])
  );


  const fetchUserData = async (user) => {
    await axios.get(`http://66.42.49.240/api/users/${user}`).then(response => {
        setData(response.data.userData)
    })
    .catch(function (error) {
        console.log(error)
    })
    .finally(()=>setLoading(false))
  }

  const dimensions = useWindowDimensions();
  const top = useSharedValue(
    dimensions.height
  );
  const style = useAnimatedStyle(() => {
    return {
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
    onStart(_, context) {
      context.startTop = top.value;
    },
    onActive(event, context) {
      top.value = context.startTop + event.translationY;
    },
    onEnd() {
      if (top.value > dimensions.height / 2 + 200) {
        top.value = dimensions.height / 1.2;
      } else {
        top.value = dimensions.height / 2
      }
    }
  });

  const UserBubble = () => {
    return (
      <View style={[styles.bubbleContainer, styles.purple]}>
        {!isLoading && data &&
          <Image
            style={styles.profilePicture}
            source={{ uri: 'http://66.42.49.240/' + data.image }}
          />
        }

        {!isLoading &&
          <View>
            <Text style={styles.userText}>Hi, <Text style={{ textTransform: 'capitalize' }}>{data.first_name}</Text>!</Text>
            <Text style={{ fontSize: 10, color: '#BCBCBC' }}>What sports you will choose today?</Text>
            <View style={{ width: '100%', height: '50%', justifyContent: 'center' }}>
              <View style={{ marginLeft: 0, margin: 7, width: 120, height: 35, backgroundColor: '#fff', borderRadius: 50, alignItems: 'center', justifyContent: 'flex-end', padding: 4, flexDirection: 'row' }}>
                <View width='27%'>
                  <TrophySVG />
                </View>
                <View style={{ width: '65%', }}>
                  <Text style={{ fontSize: 11, fontWeight: 'bold', color: 'black' }}>Matchs</Text>
                  <Text style={{ fontSize: 10, color: '#BCBCBC' }}>{data.Match_Played ? data.Match_Played : '0'}</Text>
                </View>
              </View>
            </View>
          </View>
        }

      </View>
    )
  }
  const ComponentBubble = ({ color, title }) => {
    return <View style={[styles.bubbleContainer, color]}>
      <Text style={styles.userText}>{title}</Text>
    </View>
  }

  const sport = [
    {
      name: "Futsal",
      url: 'Activity Screen',
      sport: "Futsal",
      svg: "futsal"
    },
    {
      name: "Football",
      url: 'Activity Screen',
      sport: "Football",
      svg: ""
    },
    {
      name: "Badminton",
      url: 'Activity Screen',
      sport: "Badminton",
      svg: "shuttle"
    },
  ]

  function RenderBubble() {
    return sport.map((item) => {
      return (
        <TouchableOpacity key={item.sport} onPress={() =>
          navigation.navigate(item.url, { sport: item.sport, user: data })
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
      {isLoading ?
        <Loading />
        :
        <>
          <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'flex-start', top: 147 }}>
            {/* <ComponentBubble></ComponentBubble>
         */}
            {
              UserBubble()
            }
            <Swiper
              showsButtons={true}
              loop={false}
              showsPagination={false}
              nextButton={<Text style={styles.button}>›</Text>}
              prevButton={<Text style={styles.button}>‹</Text>}
            >
              <View style={styles.slide}>
                <ComponentBubble color={red} title={"Match"} />
              </View>
              <View style={styles.slide}>
                <ComponentBubble color={orange} title={"Upcoming Order"} />
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
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                shadowColor: '#000',
                shadowOffset: {
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
                {
                  RenderBubble()
                }
              </View>
            </Animated.View>
          </PanGestureHandler>
        </>
      }

    </>


  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {},
  button: {
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
  csheet: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  bubbleContainer: {
    flexDirection: 'row',
    width: 300,
    height: 168,
    borderRadius: 40,
    padding: 20,
    elevation: 4
  },
  purple: {
    backgroundColor: '#6C63FF',
  },
  orange: {
    backgroundColor: '#FF9400',
  },
  red: {
    backgroundColor: '#e35259',
  },
  white: {
    backgroundColor: '#FFF',
  },
  userText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21
  },
  profilePicture: {
    width: 72,
    height: 72,
    borderRadius: 50,
    marginRight: 10
  }
})