import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import ImageView from '../components/ImageView';
import VideoView from '../components/VideoView';
import AudioView from '../components/AudioView';

const componentList = {
  ImageView: ImageView,
  VideoView: VideoView,
  AudioView: AudioView,
};

const TagView = props => {
  const components = props.route.params.components;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'skyblue',
        flexDirection: 'column',
        width: '100%',
      }}>
      {components.map((element, idx) => {
        console.log(element);
        // const Component = componentList[element[idx].component];
        // return <Component key={idx} url={element[idx].url} />;
      })}
    </ScrollView>
  );
};

export default TagView;

const styles = StyleSheet.create({});
