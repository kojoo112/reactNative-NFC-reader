import {View, StyleSheet} from 'react-native';
import React from 'react';
import Video from 'react-native-video';

const testVideo = require('../assets/videos/test-video.mp4');

const VideoView = props => {
  console.log(props.url);
  return (
    // <View style={styles.container}>
    <Video
      source={{
        // uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        uri: 'https://vimeo.com/706832745',
        //uri: props.url,
      }}
      // source={testVideo}
      style={styles.backgroundVideo}
      resizeMode={'contain'}
      controls={true}
    />
    // {/* </View> */}
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
    flex: 1,
    // position: 'absolute',
    width: 300,
    height: 300,
    // top: 150,
    // left: 30,
  },
});

export default VideoView;
