import React from 'react';
import {View, Text, Pressable, Alert, StyleSheet} from 'react-native';

const HintMessageView = ({
  hintMessage1,
  hintMessage2,
  hintVisible,
  setHintVisible,
}) => {
  return (
    <View style={styles.hintView}>
      <View style={styles.hintBoxStyle}>
        <Text style={styles.hintMessage}>
          {hintMessage1 != '' ? hintMessage1 : ''}
        </Text>
      </View>
      <Pressable
        style={styles.hintBoxStyle}
        onPress={() => {
          if (!hintVisible && hintMessage2 !== '')
            Alert.alert(
              '힌트를 보시겠습니까?',
              '',
              [
                {
                  text: '좀 더 생각해본다.',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: '지금 확인한다.',
                  onPress: () => setHintVisible(true),
                },
              ],
              {cancelable: false},
            );
        }}>
        {!hintVisible ? (
          <Text style={{...styles.hintMessage, textAlign: 'center'}}>
            🔒 터치하면 정답이 보입니다.
          </Text>
        ) : (
          <Text style={styles.hintMessage}>{hintMessage2}</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  hintView: {
    flex: 1,
    padding: 20,
    backgroundColor: '#353a40',
  },
  hintBoxStyle: {
    flex: 0.5,
    marginBottom: 5,
    backgroundColor: '#212429',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  hintMessage: {
    color: 'white',
    fontSize: 16,
  },
});

export default HintMessageView;
