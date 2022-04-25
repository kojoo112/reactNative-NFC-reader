import React, {useState, useEffect} from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import {firebase} from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';

const NfcReader = ({modalVisible, setModalVisible}) => {
  const navigation = useNavigation();
  const [hintCode, setHintCode] = useState('');

  const readTag = async () => {
    try {
      await NfcManager.requestTechnology([NfcTech.Ndef]);

      const tag = await NfcManager.getTag();
      tag.ndefStatus = await NfcManager.ndefHandler.getNdefStatus();
      await setHintCode(Ndef.text.decodePayload(tag.ndefMessage[0].payload));
    } catch (ex) {
      // for tag reading, we don't actually need to show any error
      NfcManager.cancelTechnologyRequest();
      console.log(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
      setModalVisible(!modalVisible);
    }
  };

  const getHint = async () => {
    await firebase
      .app()
      .database(
        'https://xcape-hint-app-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/hintImage/mrc003/thm003/${hintCode}`)
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

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onShow={() => readTag()}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            style={styles.modalImage}
            source={require('../assets/image/nfcRead.png')}
          />
          <Text style={styles.modalText}>태그를 해주세요</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>취소</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  modalImage: {
    backgroundColor: 'white',
    marginBottom: 15,
    width: 200,
    height: 200,
  },
  modalText: {
    color: 'black',
    fontSize: 15,
    marginTop: -20,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 100,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default NfcReader;
