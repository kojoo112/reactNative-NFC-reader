import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getData} from '../util/util';

const PasswordTagView = props => {
  const [password, setPassword] = useState(null);
  const navigation = useNavigation();

  const answer = props.answer.toUpperCase();

  const getMoveToPageComponents = async () => {
    const url = `/tagView/${props.moveToPage}/components`;
    return await getData(url);
  };

  const isAnswer = async () => {
    try {
      if (answer == password.toUpperCase()) {
        const components = await getMoveToPageComponents();
        navigation.replace('TagView', {components: components});
      } else {
        Alert.alert('잘못된 입력입니다.', '올바르게 입력해주세요.');
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
    height: 50,
    backgroundColor: 'black',
    color: '#d3d3d3',
    fontSize: 24,
    padding: 10,
    textAlign: 'center',
    letterSpacing: 5,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
