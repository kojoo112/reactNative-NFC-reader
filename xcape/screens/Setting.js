import {
  LogBox,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  Vibration,
  View,
} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import Dropdown from '../components/Dropdown';
import {getData} from '../util/util';
import TagRead from '../components/TagRead';
import {
  INIT_DATA,
  MERCHANT_CHANGED,
  PAGE_CHANGED,
  THEME_CHANGED,
} from '../util/constants';
import {
  storeInitHintCount,
  storeInitUseHintList,
  storeSetHintList,
  storeSetStartTime,
  storeSetTime,
} from '../util/storageUtil';

export const reducer = (state, action) => {
  switch (action.type) {
    case INIT_DATA:
      return {...state, ...action.payload};
    case MERCHANT_CHANGED:
      return {...state, ...action.payload};
    case THEME_CHANGED:
      return {...state, ...action.payload};
    case PAGE_CHANGED:
      return {...state, pageValue: action.payload};
    default:
      return state;
  }
};

const Setting = ({navigation, route}) => {
  LogBox.ignoreAllLogs();
  const setIsRefresh = route.params.setIsRefresh;
  const setTime = route.params.setTime;

  const [timerTime, setTimerTime] = useState(60);
  const [modalVisible, setModalVisible] = useState(false);
  const [hintObject, setHintObject] = useState({});
  const [state, dispatch] = useReducer(reducer, {});

  const getMerchantList = async () => {
    return await getData('/merchants');
  };

  const getThemeList = async merchantCode => {
    return await getData(`/themes/${merchantCode}`);
  };

  const getPageList = async (merchantCode, themeCode) => {
    return await getData(`/tagView/${merchantCode}/${themeCode}`, false);
  };

  const merchantChanged = async merchantCode => {
    const theme = await getThemeList(merchantCode);
    const page = await getPageList(merchantCode, 'thm001');
    const data = {
      merchantList: state.merchantList,
      themeList: theme,
      pageList: page,
      merchantValue: merchantCode,
      themeValue: 'thm001',
      pageValue: 'page01',
    };

    dispatch({type: MERCHANT_CHANGED, payload: data});
  };

  const themeChanged = async themeCode => {
    const page = await getPageList(state.merchantValue, themeCode);
    const data = {
      merchantList: state.merchantList,
      themeList: state.themeList,
      pageList: page,
      merchantValue: state.merchantValue,
      themeValue: themeCode,
      pageValue: 'page01',
    };
    dispatch({type: THEME_CHANGED, payload: data});
  };

  const pageChanged = async pageCode => {
    dispatch({type: PAGE_CHANGED, payload: pageCode});
  };

  useEffect(() => {
    const initList = async () => {
      const merchant = await getMerchantList();
      const merchantValue = Object.keys(await merchant).sort()[0];
      const theme = await getThemeList(await merchantValue);
      const themeValue = Object.keys(await theme).sort()[0];
      const pageList = await getPageList(await merchantValue, await themeValue);

      const data = {
        merchantList: merchant,
        themeList: theme,
        pageList: pageList,
        merchantValue: merchantValue,
        themeValue: themeValue,
        pageValue: 'page01',
      };
      dispatch({type: INIT_DATA, payload: data});
    };
    initList();
  }, []);

  const getHintList = async () => {
    // `/hintCode/${state.merchantValue}/${state.themeValue}`,
    const hintObject = {};
    const hintList = await getData(`/hintCode`);
    Object.values(hintList).map(value => {
      Object.values(value).map(value => {
        Object.entries(value).map(([key, value]) => {
          hintObject[key] = value;
        });
      });
    });
    return hintObject;
  };

  const getThemeName = async () => {
    return await getData(`/themes/${state.merchantValue}/${state.themeValue}`);
  };

  const createHintObject = () => {
    const hintObject = {
      merchantCode: state.merchantValue,
      themeCode: state.themeValue,
      pageName: state.pageValue,
    };
    setHintObject(hintObject);
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 0.4, ...styles.wrapperBox}}>
        <View style={styles.content}>
          <Text style={{flex: 0.5, ...styles.label, marginRight: 25}}>
            시간
          </Text>
          <TextInput
            style={styles.timeTextInput}
            keyboardType={'numeric'}
            placeholder={'분 단위'}
            onChangeText={e => setTimerTime(Number(e))}
            defaultValue={'60'}
            maxLength={3}></TextInput>
          <Pressable
            onPress={() => {
              storeInitUseHintList().then(() => {
                storeInitHintCount().then(() => {
                  setIsRefresh(isRefresh => !isRefresh);
                  setTime(timerTime);
                  storeSetStartTime('')
                    .then(() => {
                      return storeSetTime(timerTime);
                    })
                    .then(() => {
                      navigation.navigate('Home');
                    });
                });
              });
            }}
            style={{...styles.button, flex: 0.7, marginLeft: 30}}>
            <Text style={styles.textInButton}>저장</Text>
          </Pressable>
        </View>
        <View style={styles.content}>
          <Pressable
            style={{...styles.button, height: 40}}
            onPress={() => {
              Vibration.vibrate(200, false);
              getHintList().then(result => {
                storeSetHintList(result);
                if (Object.keys(result).length === 0) {
                  ToastAndroid.show(
                    '동기화에 실패했습니다.',
                    ToastAndroid.SHORT,
                  );
                } else {
                  ToastAndroid.show('동기화 성공!', ToastAndroid.SHORT);
                }
              });
            }}>
            <Text style={styles.textInButton}>힌트 동기화</Text>
          </Pressable>
        </View>
      </View>
      <View style={{flex: 0.6, ...styles.wrapperBox}}>
        <View style={styles.content}>
          <Text style={styles.label}>가맹점</Text>
          <Dropdown
            selectValue={state.merchantValue}
            objectList={state.merchantList}
            action={merchantChanged}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>테마</Text>
          <Dropdown
            selectValue={state.themeValue}
            objectList={state.themeList}
            action={themeChanged}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Page</Text>
          <Dropdown
            selectValue={state.pageValue}
            objectList={state.pageList}
            action={pageChanged}
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
      <TagRead
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
    backgroundColor: '#212429',
    marginHorizontal: 20,
    marginVertical: 40,
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
  timeTextInput: {
    // flex: 0.5,
    width: 100,
    backgroundColor: '#717171',
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});
