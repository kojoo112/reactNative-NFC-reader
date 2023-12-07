import {Pressable, StyleSheet, Text, Vibration, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {storeSetStartTime} from '../util/storageUtil';
import {customPrompt} from "../util/util";
import {useNavigation} from "@react-navigation/native";

const ClockModal = ({
  setTime,
  toggleGameStatus,
  setIsRefresh,
  startStopwatch,
  clockModalVisible,
  setClockModalVisible,
}) => {
  const navigation = useNavigation();

  return (
    <Modal isVisible={clockModalVisible}>
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            storeSetStartTime(new Date().getTime()).then(() => {
              toggleGameStatus(true)
              startStopwatch();
              setClockModalVisible(false);
            });
          }}
          onLongPress={() => {
            Vibration.vibrate(200, false);
            customPrompt('힌트관리자', '관리자 비밀번호를 입력하세요', () => {
              navigation.navigate('Setting', {
                setIsRefresh: setIsRefresh,
                setTime: setTime,
              });
              setClockModalVisible(false);
            });
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
