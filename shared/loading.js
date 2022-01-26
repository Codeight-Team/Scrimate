import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const Loading = () => (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#6C63FF" />
    </View>
  );

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "column",
      padding: 10
    }
  });

export default Loading;
