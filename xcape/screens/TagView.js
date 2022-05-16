import {ScrollView} from 'react-native';
import React from 'react';
import ImageView from '../components/ImageView';
import VideoView from '../components/VideoView';
import AudioView from '../components/AudioView';
import PasswordTagView from '../components/PasswordTagView';

const componentList = {
  ImageView: ImageView,
  VideoView: VideoView,
  AudioView: AudioView,
  PasswordTagView: PasswordTagView,
};

const TagView = props => {
  const components = props.route.params.components;


  return (
    <ScrollView>
      {components.map((element, idx) => {
        const Component = componentList[element.component];
        if (element.answer) {
          return (
            <Component
              key={idx}
              answer={element.answer}
              moveToPage={element.moveToPage}
            />
          );
        } else {
          return <Component key={idx} url={element.url} />;
        }
      })}
    </ScrollView>
  );
};

export default TagView;
