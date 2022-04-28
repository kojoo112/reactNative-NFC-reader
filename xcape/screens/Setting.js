import {Pressable, StyleSheet, Text, Vibration, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Dropdown from '../components/Dropdown';
import {getData} from '../util/Util';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import NfcRead from '../components/NfcRead';

const Setting = ({setMerchant, setTheme, navigation}) => {
  const [merchantList, setMerchantList] = useState({});
  const [themeList, setThemeList] = useState({});
  const [pageList, setPageList] = useState([]);

  const [merchantValue, setMerchantValue] = useState('mrc001');
  const [themeValue, setThemeValue] = useState('thm001');
  const [pageValue, setPageValue] = useState('page01');

  const [modalVisible, setModalVisible] = useState(false);

  const [hintObject, setHintObject] = useState({});

  const getMerchantList = async () => {
    await getData('/merchants', setMerchantList);
  };

  const getThemeList = async merchantCode => {
    await getData(`/themes/${merchantCode}`, setThemeList);
  };

  const getPageList = async (merchantCode, themeCode) => {
    await getData(
      `/hintImage/${merchantCode}/${themeCode}`,
      setPageList,
      false,
    );
  };

  const createHintObject = () => {
    const hintObject = {
      merchantCode: merchantValue,
      themeCode: themeValue,
      pageName: pageValue,
    };
    setHintObject(hintObject);
  };

  useEffect(() => {
    getMerchantList()
      .then(() => {
        return getThemeList(merchantValue);
      })
      .then(() => {
        return getPageList(merchantValue, themeValue);
      });
  }, [merchantValue]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapperBox}>
        <View style={styles.content}>
          <Text style={styles.label}>가맹점</Text>
          <Dropdown
            state={merchantValue}
            setState={setMerchantValue}
            objectList={merchantList}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>테마</Text>
          <Dropdown
            state={themeValue}
            setState={setThemeValue}
            objectList={themeList}
          />
        </View>
        <View style={styles.content}>
          <Pressable
            onPress={() => {
              setMerchant(merchantValue);
              setTheme(themeValue);
              navigation.navigate('Home');
            }}
            style={styles.button}>
            <Text style={styles.textInButton}>저장</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.wrapperBox}>
        <View style={styles.content}>
          <Text style={styles.label}>Page</Text>
          <Dropdown
            state={pageValue}
            setState={setPageValue}
            objectList={pageList}
          />
        </View>
        <View style={styles.content}>
          <Pressable
            onPress={() => {
              Vibration.vibrate(200, false);
              setModalVisible(!modalVisible);
              createHintObject();
            }}
            style={styles.button}>
            <Text style={styles.textInButton}>태그쓰기</Text>
          </Pressable>
        </View>
      </View>
      <NfcRead
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        action={'writeTag'}
        hintObject={hintObject}
      />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353a40',
  },
  wrapperBox: {
    flex: 0.5,
    backgroundColor: '#212429',
    margin: 20,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: 'white',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  label: {
    flex: 0.2,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dropdown: {
    flex: 1,
  },
  button: {
    flex: 1,
    backgroundColor: '#0095F6',
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
  },
  textInButton: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
  },
});
