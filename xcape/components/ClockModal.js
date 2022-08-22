import {Pressable, StyleSheet, View, Text, Button} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

const ClockModal = ({
  startStopwatch,
  clockModalVisible,
  setClockModalVisible,
}) => {
  return (
    <Modal isVisible={clockModalVisible}>
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            startStopwatch();
            setClockModalVisible(false);
          }}
          style={styles.button}>
          <Text style={styles.text}>조사 시작</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default ClockModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    width: 150,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});
