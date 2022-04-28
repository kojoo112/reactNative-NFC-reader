import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Sound from 'react-native-sound';

// 음성파일 props {1}
// audioInit함수 require 하드코딩 수정 {2}
// 이미지 추가 및 스타일시트 수정

const AudioView = () /*{1}*/ => {
  const [audioFlag, setAudioFlag] = useState(true);
  const [hintAudio, setHintAudio] = useState({});

  let returnAudio;

  const audioInit = () => {
    const tempAudio = new Sound(
      require('./../assets/sound/testMusic.mp3'), // {2}
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
    <TouchableOpacity onPress={() => handleAudioFlag()}>
      <Text style={{color: 'black', fontSize: 40, backgroundColor: 'green'}}>
        재생정지
      </Text>
    </TouchableOpacity>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
});

export default AudioView;
