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
      <View style={{flexDirection: 'row', padding: 20}}>
        <TextInput
          autoCapitalize={'characters'}
          maxLength={5}
          onChangeText={value => setHintKey(value)}
          style={{backgroundColor: 'skyblue', flex: 1}}
        />
        <Pressable style={styles.button} onPress={() => getHint(hintKey)}>
          <Text>검색</Text>
        </Pressable>
      </View>
      {/* <View style={styles.hintMessage}>
        <Text style={styles.text}>
          {hintMessage1 != '' ? hintMessage1 : ''}
        </Text>
        <Text style={styles.text}>
          {hintMessage2 != '' ? hintMessage2 : ''}
        </Text>
      </View> */}
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  button: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    // padding: 10,
    // marginTop: 10,
  },
  text: {
    color: 'black',
  },
  hintMessage: {
    padding: 20,
    backgroundColor: 'skyblue',
  },
});

export default Home;
