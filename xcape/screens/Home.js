import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  ToastAndroid,
  Vibration,
  Alert,
} from 'react-native';
import NfcNavigator from '../components/NfcNavigator';
import {firebase} from '@react-native-firebase/database';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = ({navigation}) => {
  const [hintKey, setHintKey] = useState('');
  const [hintCount, setHintCount] = useState(0);
  const [hintMessage1, setHintMessage1] = useState('');
  const [hintMessage2, setHintMessage2] = useState('');
  const [hintVisible, setHintVisible] = useState(false);

  const getHint = hintKey => {
    Vibration.vibrate(100, false);
    if (hintKey !== '') {
      firebase
        .app()
        .database(
          'https://xcape-hint-app-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref(hintKey)
        .once('value')
        .then(snapshot => {
          if (snapshot.val() === null) {
            ToastAndroid.show('힌트키를 확인해 주세요.', ToastAndroid.SHORT);
          } else {
            setHintMessage1(snapshot.val().message1);
            setHintMessage2(snapshot.val().message2);
            setHintCount(hintCount + 1);
            setHintVisible(false);
          }
          console.log(snapshot.val());
        });
    }
  };

  return (
    <View style={styles.container}>
      <NfcNavigator />
      <Header hintCount={hintCount} setHintCount={setHintCount} />
      <View
        style={{
          flex: 0.073,
          flexDirection: 'row',
          padding: 20,
        }}>
        <TextInput
          autoCapitalize={'characters'}
          maxLength={5}
          onChangeText={value => setHintKey(value)}
          keyboardType={'default'}
          returnKeyType={'search'}
          style={styles.textInput}
          onSubmitEditing={() => getHint(hintKey)}
        />
        <Pressable style={styles.button} onPress={() => getHint(hintKey)}>
          <Icon name="search-sharp" size={24} color={'white'} />
        </Pressable>
      </View>
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
                    onPress: () => console.log('아니라는데'),
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353a40',
  },
  textInput: {
    backgroundColor: '#6c757e',
    flex: 1,
    borderWidth: 1.5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: 'white',
    padding: 10,
  },
  button: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333a44',
    borderWidth: 1.5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'white',
  },
  text: {
    color: 'black',
  },
  hintView: {
    flex: 0.95,
    padding: 20,
    backgroundColor: '#353a40',
  },
  hintBoxStyle: {
    flex: 0.5,
    marginBottom: 10,
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

export default Home;
