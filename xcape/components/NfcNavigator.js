import {useEffect, useState} from 'react';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import NfcReader from './NfcReader';
import {firebase} from '@react-native-firebase/database';

const NfcNavigator = () => {
  const navigation = useNavigation();
  const [hintCode, setHintCode] = useState('');
  const [tagMessage, setTagMessage] = useState('');
  const [hint, setHint] = useState('');

  const [merchant, setMerchant] = useState('');
  const [theme, setTheme] = useState('');
  const [page, setPage] = useState('');

  const getImage = async () => {
    await firebase
      .app()
      .database(
        'https://xcape-hint-app-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/${merchant}/${theme}/${page}`)
      .once('value')
      .then(snapshot => {
        navigation.navigate('HintPage', {
          hint: snapshot.val(),
        });
      });
  };

  useEffect(() => {
    if (hintCode !== '') {
      getImage();
    }
  }, [hintCode]);

  return (
    <NfcReader
      setHintCode={setHintCode}
      setMerchant={setMerchant}
      setTheme={setTheme}
      setPage={setPage}
    />
  );
};

export default NfcNavigator;
