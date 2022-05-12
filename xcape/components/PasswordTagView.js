import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

const PasswordTagView = props => {
  const [password, setPassword] = useState(null);
  console.log(props);

  const isAnswer = () => {
    if (props.answer == password) {
      return true;
    } else {
      Alert.alert('잘못된 입력입니다.', '올바르게 입력해주세요.');
    }
  };
  return (
    <View>
      <TextInput style={styles.input} onChangeText={setPassword} />
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
