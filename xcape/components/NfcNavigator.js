import {useEffect, useState} from 'react';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import NfcReader from './NfcReader';
import database, {firebase} from '@react-native-firebase/database';

const NfcNavigator = () => {
  const navigation = useNavigation();
  const [hintCode, setHintCode] = useState('');
  const [hint, setHint] = useState('');

  const getHint = async () => {
    await firebase
      .app()
      .database(
        'https://xcape-hint-app-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/mrc003/thm005/${hintCode}`)
      .once('value')
      .then(snapshot => {
        navigation.navigate('HintPage', {
          hint: snapshot.val(),
        });
      });
  };

  useEffect(() => {
    if (hintCode !== '') {
      getHint();
    }
  }, [hintCode]);

  return <NfcReader setHintCode={setHintCode} />;
};

export default NfcNavigator;
