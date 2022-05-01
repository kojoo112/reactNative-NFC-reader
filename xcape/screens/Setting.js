import {Pressable, StyleSheet, Text, Vibration, View} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import Dropdown from '../components/Dropdown';
import {getData} from '../util/Util';
import NfcRead from '../components/NfcRead';
import {MERCHANT_CHANGED, THEME_CHANGED} from '../util/Constants';

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

  const reducer = (state, action) => {
    switch (action.type) {
      case MERCHANT_CHANGED:
        console.log(action.value);
        // getThemeList(action.value);
        console.log({...state, merchantCode: action.value});
        return {...state, merchantCode: action.value};

      case THEME_CHANGED:
        console.log(action.value);
        console.log('reducer >>> themeChanged: ', state);
        return {...state, themeCode: action.value};
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    merchantCode: 'mrc001',
    themeCode: 'thm001',
    pageName: 'page01',
  });

  const merchantChanged = merchantCode => {
    console.log('merchantCode: ', merchantCode);
    dispatch({type: MERCHANT_CHANGED, value: merchantCode});
  };

  const themeChanged = themeCode => {
    console.log('themeChanged: ', themeCode);
    dispatch({type: THEME_CHANGED, value: themeCode});
  };

  useEffect(() => {
    getMerchantList().then(() => {
      return getThemeList('mrc001');
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapperBox}>
        <View style={styles.content}>
          <Text style={styles.label}>가맹점</Text>
          <Dropdown
            // state={'mrc001'}
            action={merchantChanged}
            objectList={merchantList}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>테마</Text>
          <Dropdown
            // state={'thm001'}
            action={themeChanged}
            objectList={themeList}
          />
        </View>
        <View style={styles.content}>
          <Pressable
            onPress={() => {
              // setMerchant(state.merchantCode);
              // setTheme(themeValue);
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
          {/* <Dropdown
            state={pageValue}
            setState={setPageValue}
            objectList={pageList}
          /> */}
        </View>
        <View style={styles.content}>
          <Pressable
            onPress={() => {
              Vibration.vibrate(200, false);
              setModalVisible(!modalVisible);
              // createHintObject();
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
