import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import {getData} from '../util/util';
import {useNavigation} from '@react-navigation/native';

const TagRead = ({modalVisible, setModalVisible, action, hintObject}) => {
  const navigation = useNavigation();
  const [hintCode, setHintCode] = useState('');

  const readTag = async () => {
    try {
      await NfcManager.requestTechnology([NfcTech.Ndef]);
      const tag = await NfcManager.getTag();
      tag.ndefStatus = await NfcManager.ndefHandler.getNdefStatus();
      setHintCode(
        JSON.parse(Ndef.text.decodePayload(tag.ndefMessage[0].payload)),
      );
    } catch (ex) {
      console.log('NfcRead >>> readTag >>> : ', ex);
      ToastAndroid.show('다시 시도해주세요.', ToastAndroid.SHORT);
    } finally {
      NfcManager.cancelTechnologyRequest();
      setModalVisible(false);
    }
  };

  const writeTag = async () => {
    const object = {
      merchantCode: hintObject.merchantCode,
      themeCode: hintObject.themeCode,
      pageName: hintObject.pageName,
    };

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([
        Ndef.textRecord(JSON.stringify(object)),
        Ndef.androidApplicationRecord('com.xcape'),
      ]);
      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
      }
    } catch (ex) {
      console.log('NfcRead >>> writeTag >>> : ', ex);
      ToastAndroid.show('다시 시도해주세요.', ToastAndroid.SHORT);
    } finally {
      closeModal();
    }
  };

  const tagDevide = {
    readTag: readTag,
    writeTag: writeTag,
  };

  const closeModal = () => {
    NfcManager.cancelTechnologyRequest().then(() => {
      setModalVisible(!modalVisible);
    });
  };

  useEffect(() => {
    const getComponents = async () => {
      const merchantCode = hintCode.merchantCode;
      const themeCode = hintCode.themeCode;
      const pageName = hintCode.pageName;
      const url = `/tagView/${merchantCode}/${themeCode}/${pageName}/components`;
      return await getData(url);
    };

    if (hintCode !== '') {
      getComponents().then(res => {
        navigation.navigate('TagView', {components: res});
      });
    }
  }, [hintCode]);

  return (
    <Modal
      onBackdropPress={() => {
        closeModal();
      }}
      onBackButtonPress={() => {
        closeModal();
      }}
      isVisible={modalVisible}
      onShow={tagDevide[action]}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            style={styles.modalImage}
            source={require('../assets/image/xcape-logo.png')}
          />

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              closeModal();
            }}>
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
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#1f1f1f',
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
    backgroundColor: '#1f1f1f',
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
    backgroundColor: '#feb50d',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TagRead;
