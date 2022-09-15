import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {
  storeInitHintCount,
  storeInitUseHintList,
  storeSetStartTime,
} from '../util/storageUtil';

const SetTimerModal = ({
  start,
  toggleStopwatch,
  resetStopwatch,
  timerModalVisible,
  setTimerModalVisible,
  setClockModalVisible,
  isRefresh,
  setIsRefresh,
}) => {
  const [isStarted, setIsStarted] = useState('');
  const closeModal = () => {
    setTimerModalVisible(false);
  };

  useEffect(() => {
    if (start) {
      setIsStarted('일시정지');
    } else {
      setIsStarted('타이머 시작');
    }
  }, [start]);
  return (
    <Modal
      isVisible={timerModalVisible}
      onBackdropPress={() => {
        closeModal();
      }}
      onBackButtonPress={() => {
        closeModal();
      }}>
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            storeSetStartTime('')
              .then(() => {
                return storeInitHintCount();
              })
              .then(() => {
                return storeInitUseHintList();
              })
              .then(() => {
                closeModal();
                resetStopwatch();
                setClockModalVisible(true);
                setIsRefresh(!isRefresh);
              });
          }}
          style={styles.button}>
          <Text>시간 초기화</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default SetTimerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    width: 130,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
