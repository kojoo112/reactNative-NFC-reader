import {View} from 'react-native';
import React from 'react';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';

const Clock = ({start, reset}) => {
  return (
    <View>
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
