import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text, Pressable} from 'react-native';
import NfcNavigator from '../components/NfcNavigator';
import {firebase} from '@react-native-firebase/database';
import Header from '../components/Header';

const Home = ({navigation}) => {
  const [hintKey, setHintKey] = useState();
  const [hintMessage1, setHintMessage1] = useState();
  const [hintMessage2, setHintMessage2] = useState();

  const getHint = hintKey => {
    firebase
      .app()
      .database(
        'https://xcape-hint-app-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(hintKey)
      .once('value')
      .then(snapshot => {
        setHintMessage1(snapshot.val().message1);
        setHintMessage2(snapshot.val().message2);
        console.log(snapshot.val());
      });
  };
  return (
    <View style={styles.container}>
      <NfcNavigator />
      <Header></Header>
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
          style={styles.textInput}
        />
        <Pressable style={styles.button} onPress={() => getHint(hintKey)}>
          <Text>검색</Text>
        </Pressable>
      </View>
      <View style={styles.hintMessage}>
        <Text style={styles.hintBoxStyle}>
          {hintMessage1 != '' ? hintMessage1 : ''}
        </Text>
        <Text style={styles.hintBoxStyle}>
          {hintMessage2 != '' ? hintMessage2 : ''}
        </Text>
      </View>
      <View></View>
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
    padding: 0,
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
  hintMessage: {
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
  },
});

export default Home;
