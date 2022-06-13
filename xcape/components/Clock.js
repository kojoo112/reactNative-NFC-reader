import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';

const Clock = ({start, reset}) => {
  return (
    <View style={styles.container}>
      <Stopwatch start={start} reset={reset} options={options} msecs />
    </View>
  );
};

export default Clock;

const options = {
  container: {
    padding: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 50,
    color: '#FFF',
    fontWeight: '600',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
