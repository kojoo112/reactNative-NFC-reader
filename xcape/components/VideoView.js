import React, {useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';

const VideoView = ({url}) => {
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(url);

  const [state, setState] = useState({
    fullscreen: false,
    play: false,
    currentTime: 0,
    duration: 0,
    showControls: true,
  });

  const handleFullscreen = () => {
    state.fullscreen
      ? (Orientation.lockToPortrait(),
        setState(s => ({...s, fullscreen: false})),
        StatusBar.setHidden(false))
      : (Orientation.lockToLandscapeLeft(),
        setState(s => ({...s, fullscreen: true})),
        StatusBar.setHidden(true));
  };

  const handlePlayPause = () => {
    if (state.play) {
      setState({...state, play: false, showControls: true});
      return;
    }

    setState({...state, play: true});
    // setTimeout(() => setState(s => ({...s, showControls: false})), 2000);
  };

  const skipBackward = () => {
    if (state.currentTime < 3) {
      videoRef.current.seek(0);
      setState({...state, currentTime: 0});
    } else {
      videoRef.current.seek(state.currentTime - 3);
      setState({...state, currentTime: state.currentTime - 3});
    }
  };

  const skipForward = () => {
    videoRef.current.seek(state.currentTime + 3);
    setState({...state, currentTime: state.currentTime + 3});
  };

  const onSeek = data => {
    // videoRef.current.seek(data.seekTime);
    // setState({...state, currentTime: data.seekTime});
  };

  const onLoadEnd = data => {
    setState(s => ({
      ...s,
      duration: data.duration,
      currentTime: data.currentTime,
    }));
  };

  const onProgress = data => {
    setState(s => ({
      ...s,
      currentTime: data.currentTime,
    }));
  };

  const onEnd = () => {
    setState({...state, play: false});
    videoRef.current.seek(0);
  };

  const showControls = () => {
    state.showControls
      ? setState({...state, showControls: false})
      : setState({...state, showControls: true});
  };

  useEffect(() => {
    const backAction = () => {
      const dim = Dimensions.get('screen');
      if (dim.height >= dim.width) {
        return false;
      } else {
        Orientation.lockToPortrait();
        setState(s => ({...s, fullscreen: false}));
        StatusBar.setHidden(false);
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backHandler.remove();
      Orientation.lockToPortrait();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={showControls}>
        <View>
          <Video
            ref={videoRef}
            style={state.fullscreen ? styles.fullscreenVideo : styles.video}
            controls={false}
            resizeMode={'contain'}
            onLoad={onLoadEnd}
            onProgress={onProgress}
            onEnd={onEnd}
            paused={!state.play}
            onSeek={(e)=> console.log('asdfasdasf',  e)}
            source={{
              uri: videoUrl,
            }}
          />
          {state.showControls && (
            <View
              style={
                state.fullscreen
                  ? styles.fullScreenControlOverlay
                  : styles.controlOverlay
              }>
              <PlayerControls
                onPlay={handlePlayPause}
                onPause={handlePlayPause}
                playing={state.play}
                showPreviousAndNext={false}
                showSkip={true}
                skipBackwards={skipBackward}
                skipForwards={skipForward}
                handleFullscreen={handleFullscreen}
                fullscreen={state.fullscreen}
              />
              <ProgressBar
                currentTime={state.currentTime}
                duration={state.duration > 0 ? state.duration : 0}
                onSlideStart={handlePlayPause}
                onSlideComplete={handlePlayPause}
                onSlideCapture={onSeek}
                fullscreen={state.fullscreen}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  video: {
    height: Dimensions.get('window').width * (9 / 16),
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
  },
  fullscreenVideo: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').height,
    backgroundColor: 'black',
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify',
    color: 'black',
  },
  fullScreenControlOverlay: {
    position: 'absolute',
    top: 285,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
  },
  controlOverlay: {
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
  },
});

export default VideoView;
