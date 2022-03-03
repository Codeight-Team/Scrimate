import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Loading from '../../../../shared/loading'
import api from '../../../../services/api';
import Post from '../components/post';

const MyMatchList = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [matchList, setMatchList] = useState([]);

    const user_id = route.params.user_id;

    useEffect(() => {
        fetchMyMatchList()
    }, [])

    const fetchMyMatchList = () => {
        api.get('/api/match-making/my-match/'+user_id)
            .then(res => {
                setMatchList(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const RenderMatchList = () => {
        return matchList.map((item) => {
            return <Post key={item.match_id} user_id={user_id} item={item}
                onPress={() => navigation.navigate("Match Detail", { user_id: user_id, match_id: item.match_id })}
            />
        });
    }

    return (
        <View style={styles.container}>
            {
                isLoading ?
                    <Loading />
                    :
                    <ScrollView
                        contentContainerStyle={{
                            backgroundColor: '#F4F8FF',
                        }}>
                        <View style={styles.container}>
                            <View style={styles.subContainer}>
                                {
                                    RenderMatchList()
                                }
                            </View>
                        </View>
                    </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F8FF'
    },
    subContainer: {
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 44
    },
})

export default MyMatchList;