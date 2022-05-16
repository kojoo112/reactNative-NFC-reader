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
<<<<<<< HEAD
  console.log(components);

=======

  // @Test
  // const components = [
  //   {component: 'ImageView', url: 'https://i.ibb.co/Cw5YYfy/Page10.png'},
  //   {component: 'ImageView', url: 'https://i.ibb.co/sg720jH/Page1.png'},
  // ];
>>>>>>> parent of a39fa2e... Merge pull request #30 from kojoo112/feature/password-tag-view
  return (
    <ScrollView>
      {components.map((element, idx) => {
        const Component = componentList[element.component];
<<<<<<< Updated upstream
        return <Component key={idx} url={element.url} />;
=======
        if (element.answer) {
          return <Component key={idx} answer={element.answer} />;
        } else {
          return <Component key={idx} url={element.url} />;
        }
>>>>>>> Stashed changes
      })}
    </ScrollView>
  );
};

export default TagView;
