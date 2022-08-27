import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';

const SetTimerModal = ({
  start,
  toggleStopwatch,
  resetStopwatch,
  timerModalVisible,
  setTimerModalVisible,
}) => {
  const [isStarted, setIsStarted] = useState(start);
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
        <Pressable onPress={toggleStopwatch} style={styles.button}>
          <Text style={styles.text}>{isStarted}</Text>
        </Pressable>
        <Pressable onPress={resetStopwatch} style={styles.button}>
          <Text style={styles.text}>시간 초기화</Text>
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
  text: {
    color: 'white',
    fontSize: 16,
  },
});
