import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PlayerControls = ({
  playing,
  showPreviousAndNext,
  showSkip,
  previousDisabled,
  nextDisabled,
  onPlay,
  onPause,
  skipForwards,
  skipBackwards,
  onNext,
  onPrevious,
  handleFullscreen,
  fullscreen,
}) => {
  return (
    <View style={fullscreen ? styles.fullScreenWrapper : styles.wrapper}>
      {/* {showPreviousAndNext && (
        <TouchableOpacity
          style={[
            styles.touchable,
            previousDisabled && styles.touchableDisabled,
          ]}
          onPress={onPrevious}
          disabled={previousDisabled}>
          <VideoPrevious />
        </TouchableOpacity>
      )} */}
      <View
        style={
          fullscreen ? {...styles.fullscreenControls} : {...styles.controls}
        }>
        {showSkip && (
          <TouchableOpacity
            style={{...styles.touchable, ...styles.marginControls}}
            onPress={skipBackwards}>
            <Icon name="play-back-outline" size={24} color={'white'} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{...styles.touchable, ...styles.marginControls}}
          onPress={playing ? onPause : onPlay}>
          {playing ? (
            <Icon name="pause-outline" size={24} color={'white'} />
          ) : (
            <Icon name="play-outline" size={24} color={'white'} />
          )}
        </TouchableOpacity>

        {showSkip && (
          <TouchableOpacity
            style={{...styles.touchable, ...styles.marginControls}}
            onPress={skipForwards}>
            <Icon name="play-forward-outline" size={24} color={'white'} />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        onPress={handleFullscreen}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        style={
          fullscreen ? styles.OnFullscreenButton : styles.OffFullscreenButton
        }>
        {fullscreen ? (
          <Icon name="contract-outline" size={24} color={'white'} />
        ) : (
          <Icon name="expand-outline" size={24} color={'white'} />
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  fullScreenWrapper: {
    // paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 0,
  },
  wrapper: {
    // paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 2,
  },
  touchable: {
    padding: 5,
  },
  touchableDisabled: {
    opacity: 0.3,
  },
  fullscreenControls: {
    flexDirection: 'row',
    left: '21.5%',
    marginRight: 10,
  },
  controls: {
    flexDirection: 'row',
    left: '27%',
    marginRight: 10,
  },
  marginControls: {
    marginRight: 30,
  },
  OnFullscreenButton: {
    right: '-300%',
  },
  OnFuOffllscreenButton: {
    right: '50%',
  },
});

export default PlayerControls;
