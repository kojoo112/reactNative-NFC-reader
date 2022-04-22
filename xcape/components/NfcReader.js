import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
NfcManager.start();

const NfcReader = ({setHintCode}) => {
  const [nfcFlag, setNfcFlag] = useState(false);

  useEffect(() => {
    const tagTimer = setTimeout(() => {
      readNdef(setHintCode);
    }, 1500);
    return () => {
      clearTimeout(tagTimer);
    };
  }, [nfcFlag]);

  const readNdef = async () => {
    try {
      const supported = await NfcManager.isSupported();
      const nfcScanning = await NfcManager.isEnabled();
      if (supported && nfcScanning) {
        await NfcManager.requestTechnology([NfcTech.Ndef]);
        const tag = await NfcManager.getTag();
        tag.ndefStatus = await NfcManager.ndefHandler.getNdefStatus();
        await setHintCode(Ndef.text.decodePayload(tag.ndefMessage[0].payload));
        NfcManager.cancelTechnologyRequest();
        setNfcFlag(!nfcFlag);
      }
    } catch (ex) {
      console.warn('다시 태그해주세요.');
      NfcManager.cancelTechnologyRequest();
      setNfcFlag(!nfcFlag);
    } finally {
      setHintCode('');
    }
  };

  return (
    <View>
      {/* <TouchableOpacity onPress={readNdef} style={styles.button}>
        <Text style={styles.text}>태그 읽기</Text>
      </TouchableOpacity> */}
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    backgroundColor: '#0095F6',
  },
  text: {
    color: 'white',
  },
});
export default NfcReader;
