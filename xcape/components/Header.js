import {StyleSheet, Text, View, Pressable, Vibration} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import prompt from 'react-native-prompt-android';

const Header = ({hintCount, setHintCount}) => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Icon name="settings-sharp" size={24} color={'white'} />
      </Pressable>
      <Text style={styles.themeName}>운필귀정</Text>
      <View>
        <Pressable
          onLongPress={() => {
            Vibration.vibrate(200, false);
            prompt(
              '힌트카운트 초기화',
              '관리자 비밀번호를 입력하세요',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: password => {
                    if (password == '5772') {
                      setHintCount(0);
                    }
                  },
                },
              ],
              {
                type: 'secure-text',
                cancelable: false,
                placeholder: '비밀번호 입력...',
              },
            );
          }}>
          <Text style={styles.hintCountNumber}>{hintCount}</Text>
          <Text style={styles.hintCount}>Hint Count</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hintCountNumber: {
    textAlign: 'center',
    color: 'white',
    fontSize: 26,
  },
  hintCount: {
    color: 'white',
  },
  themeName: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
});