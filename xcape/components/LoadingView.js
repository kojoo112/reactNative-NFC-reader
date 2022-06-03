import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

const LoadingView = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator color="#0000ff" />
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
