import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
NfcManager.start();

const NfcReader = ({setPageName}) => {
  const [tag, setTag] = useState(null);

  // useEffect(() => {
  //   readNdef();
  //   console.log('taging');
  // }, [tag]);

  const readNdef = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      await setPageName(Ndef.text.decodePayload(tag.ndefMessage[0].payload));
      setTag(tag);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={readNdef} style={styles.button}>
        <Text style={styles.text}>태그 읽기</Text>
      </TouchableOpacity>
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
