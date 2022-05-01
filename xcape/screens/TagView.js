import {ScrollView} from 'react-native';
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

  // @Test
  // const components = [
  //   {component: 'ImageView', url: 'https://i.ibb.co/Cw5YYfy/Page10.png'},
  //   {component: 'ImageView', url: 'https://i.ibb.co/sg720jH/Page1.png'},
  // ];
  return (
    <ScrollView>
      {components.map((element, idx) => {
        const Component = componentList[element.component];
        return <Component key={idx} url={element.url} />;
      })}
    </ScrollView>
  );
};

export default TagView;
