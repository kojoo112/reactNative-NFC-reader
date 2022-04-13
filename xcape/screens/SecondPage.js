import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import VideoPlayer from 'react-native-video-controls';

const testVideo = require('../assets/videos/test-video.mp4');

const SecondPage = () => {
  return (
    <View style={styles.container}>
      <VideoPlayer source={testVideo} disableBack />
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default SecondPage;
