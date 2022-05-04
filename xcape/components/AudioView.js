import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Sound from 'react-native-sound';
import ImageView from './ImageView';

// 음성파일 props {1}
// audioInit함수 require 하드코딩 수정 {2}
// 이미지 추가 및 스타일시트 수정

const AudioView = props => {
  const [audioFlag, setAudioFlag] = useState(true);
  const [hintAudio, setHintAudio] = useState({});

  let returnAudio;

  const audioInit = () => {
    const tempAudio = new Sound(
      require('./../assets/sound/audio07.mp3'), // {2}
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('play failed!');
        }
      },
    );
    returnAudio = tempAudio;
    setHintAudio(tempAudio);
  };

  useEffect(() => {
    audioInit();
    return () => {
      returnAudio.release();
    };
  }, []);

  const handleAudioFlag = () => {
    if (audioFlag) {
      hintAudio.play();
    } else {
      hintAudio.stop();
      audioInit();
    }
    setAudioFlag(!audioFlag);
  };

  return (
    <View>
      <ImageView url={props.url} />
      <TouchableOpacity
        onPress={() => handleAudioFlag()}
        style={{
          position: 'absolute',
          top: 267,
          left: 208,
          width: 50,
          height: 90,
        }}></TouchableOpacity>
    </View>
  );
};

export default AudioView;
