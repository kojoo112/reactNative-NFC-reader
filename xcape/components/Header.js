import {StyleSheet, Text, View, Pressable, Vibration} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import prompt from 'react-native-prompt-android';
import {useNavigation} from '@react-navigation/native';

const Header = ({hintCount, themeName, setHintCount, setThemeName}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          Vibration.vibrate(200, false);
          prompt(
            '힌트관리자',
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
                    navigation.navigate('Setting', {
                      setThemeName: setThemeName,
                    });
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
        <Icon name="settings-sharp" size={24} color={'white'} />
      </Pressable>
      {/* <View style={{width: 40}}></View> */}
      <Text style={styles.themeName}>{themeName}</Text>
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
