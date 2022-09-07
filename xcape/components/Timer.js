import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {formatTimeString} from '../util/util';

let interval;

const Timer = React.memo(
  ({timerStart, timerReset, totalTime, startTime, setStartTime, style}) => {
    const [time, setTime] = useState(totalTime);

    useEffect(() => {
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      if (timerStart) {
        start();
      } else {
        stop();
      }
      if (timerReset) {
        reset();
      }
    }, [timerStart, timerReset]);

    useEffect(() => {
      setTime(totalTime * 60000);
    }, [totalTime]);

    const start = () => {
      let endTime = new Date().getTime() + time;
      if (startTime > 0) {
        endTime = endTime - (new Date().getTime() - startTime);
      }
      interval = interval
        ? interval
        : setInterval(() => {
            const remaining = endTime - new Date();
            setTime(remaining);
          }, 10);
    };

    const stop = () => {
      let now = new Date().getTime();
      setStartTime(now);

      clearInterval(interval);
      interval = null;
    };

    const reset = () => {
      setStartTime(0);
      setTime(totalTime * 60000);
    };

    const formatTime = () => {
      return formatTimeString(time);
    };

    return (
      <View>
        <Text style={{...styles.text, ...style}}>{formatTime()} </Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 50,
    backgroundColor: 'red',
    marginHorizontal: 5,
  },
  text: {
    fontSize: 50,
    color: '#FFF',
    fontWeight: '600',
  },
});

export default Timer;
