import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getData} from '../util/util';

const PasswordTagView = props => {
  const [password, setPassword] = useState(null);
  const navigation = useNavigation();
  const passwordRef = useRef();

  const answer = props.answer.toUpperCase();

  const getMoveToPageComponents = async () => {
    const url = `/tagView/${props.moveToPage}/components`;
    return await getData(url);
  };

  const isAnswer = async () => {
    try {
      if (answer == password.toUpperCase()) {
        const components = await getMoveToPageComponents();
        navigation.push('TagView', {components: components});
      } else {
        ToastAndroid.show('잘못된 입력입니다.', ToastAndroid.SHORT);
        setPassword('');
        passwordRef.current.clear();
      }
    } catch (e) {
      console.error(e);
    }
  };
  const placeholder = '*'.repeat(props.answer.length);

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder={placeholder}
        maxLength={props.answer.length}
        autoCapitalize="characters"
        multiline={true}
        numberOfLines={1}
        blurOnSubmit={true}
        returnKeyType="search"
        ref={passwordRef}
      />
      <TouchableOpacity style={styles.button} onPress={isAnswer}>
        <Text style={styles.buttonText}>전 송 하 기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordTagView;

const styles = StyleSheet.create({
  input: {
    height: 80,
    backgroundColor: 'black',
    color: '#d3d3d3',
    fontSize: 30,
    padding: 10,
    textAlign: 'center',
    letterSpacing: 10,
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
