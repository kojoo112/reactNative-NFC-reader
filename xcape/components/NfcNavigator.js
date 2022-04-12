import {useEffect, useState} from 'react';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import NfcReader from './NfcReader';

const NfcNavigator = () => {
  const navigation = useNavigation();
  const [pageName, setPageName] = useState('');

  useEffect(() => {
    if (pageName !== '') {
      navigation.navigate(pageName);
    }
  }, [pageName]);

  return <NfcReader setPageName={setPageName} />;
};

export default NfcNavigator;
