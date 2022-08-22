import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Sound from 'react-native-sound';

// 음성파일 props {1}
// audioInit함수 require 하드코딩 수정 {2}
// 이미지 추가 및 스타일시트 수정
const windowWidth = Dimensions.get('window').width;
const tapeImage = require('../assets/image/tape_template/tape-image1.png');
const tapePlayImage = require('../assets/image/tape_template/tape-play.gif');

const AudioView = props => {
  const [audioFlag, setAudioFlag] = useState(true);
  const [hintAudio, setHintAudio] = useState({});

  let returnAudio;

  const audioInit = () => {
    const sound = new Sound(props.url, undefined, error => {
      if (error) {
        console.error('AudioView >>> play failed!');
      }
    });
    returnAudio = sound;
    setHintAudio(sound);
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
    }
    setAudioFlag(!audioFlag);
  };

  return (
    <View style={styles.backgroundImage}>
      <View style={{backgroundColor: 'black'}}>
        {audioFlag ? (
          <Image source={tapeImage} style={styles.tape} resizeMode={'cover'} />
        ) : (
          <Image
            source={tapePlayImage}
            style={styles.tape}
            resizeMode={'cover'}
          />
        )}
      </View>
      <View style={{backgroundColor: 'red', height: 100}}>
        <ImageBackground
          source={require('../assets/images/tape_template/controller.png')}
          style={styles.tapeController}
          resizeMode={'cover'}
        />
      </ImageBackground>
        <TouchableOpacity
          onPress={() => handleAudioFlag()}
          style={{
            position: 'absolute',
            top: 34,
            left: 210,
            width: 60,
            height: 70,
          }}></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: windowWidth,
  },
  tape: {
    width: null,
    height: 200,
  },
  tapeController: {
    width: null,
    height: 100,
  },
});

export default AudioView;
