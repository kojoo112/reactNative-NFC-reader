import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

const NfcReader = ({setPageName}) => {
<<<<<<< Updated upstream
  const readNdef = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      setPageName(Ndef.text.decodePayload(tag.ndefMessage[0].payload));
=======
  const [nfcFlag, setNfcFlag] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      readNdef(setPageName);
    }, 1500);
  }, [nfcFlag]);

  const readNdef = async () => {
    try {
      const supported = await NfcManager.isSupported();
      const nfcScanning = await NfcManager.isEnabled();
      if (supported && nfcScanning) {
        NfcManager.cancelTechnologyRequest();
        await NfcManager.start();
        await NfcManager.requestTechnology([NfcTech.Ndef]);
        const tag = await NfcManager.getTag();
        tag.ndefStatus = await NfcManager.ndefHandler.getNdefStatus();
        await setPageName(Ndef.text.decodePayload(tag.ndefMessage[0].payload));
        NfcManager.cancelTechnologyRequest();
        setNfcFlag(!nfcFlag);
      }
>>>>>>> Stashed changes
    } catch (ex) {
      console.warn('Oops!', ex);
      NfcManager.cancelTechnologyRequest();
      setNfcFlag(!nfcFlag);
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
  },
  text: {
    color: 'black',
  },
});
export default NfcReader;
