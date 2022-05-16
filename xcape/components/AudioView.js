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
import ImageView from './ImageView';

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
<<<<<<< Updated upstream
    <View>
      <ImageBackground
        source={{uri: props.url}}
        style={styles.backgroundImage}
        resizeMode={'stretch'}>
        {audioFlag ? (
          <Image
            source={tapeImage}
            style={styles.tape}
            resizeMode={'stretch'}
          />
        ) : (
          <Image
            source={tapePlayImage}
            style={styles.tape}
            resizeMode={'stretch'}
          />
        )}

=======
    <View style={styles.backgroundImage}>
      <View>
        <ImageBackground
          source={tapeImage}
          style={styles.tape}
          resizeMode={'cover'}>
          {audioFlag ? (
            <></>
          ) : (
            <ImageBackground
              source={tapePlayImage}
              style={styles.tape}
              resizeMode={'cover'}
            />
          )}
        </ImageBackground>
      </View>
      <View style={{height: 100}}>
>>>>>>> Stashed changes
        <Image
          source={require('../assets/image/tape_template/controller.png')}
          style={styles.tapeController}
          resizeMode={'stretch'}
        />
<<<<<<< Updated upstream
      </ImageBackground>
      {/* <ImageView url={props.url} /> */}
      <TouchableOpacity
        onPress={() => handleAudioFlag()}
        style={{
          position: 'absolute',
          top: 285,
          left: 204,
          width: 60,
          height: 90,
        }}></TouchableOpacity>
=======
        <Pressable
          onPress={() => handleAudioFlag()}
          style={{
            position: 'absolute',
            top: 34,
            left: 210,
            width: 60,
            height: 70,
          }}></Pressable>
      </View>
>>>>>>> Stashed changes
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: windowWidth,
    height: windowHeight,
  },
  tape: {
    position: 'absolute',
    width: '89%',
    height: '25%',
    top: 77,
    left: 20,
  },
  tapeController: {
    position: 'absolute',
    width: '90%',
    height: '10%',
    top: 285,
    left: 19,
  },
});

export default AudioView;
