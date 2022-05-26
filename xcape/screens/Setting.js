import {
  LogBox,
  Pressable,
  StyleSheet,
  Text,
  Vibration,
  View,
} from 'react-native';
import React, {useEffect, useState, useReducer} from 'react';
import Dropdown from '../components/Dropdown';
import {getData} from '../util/util';
import TagRead from '../components/TagRead';
import {
  INIT_DATA,
  MERCHANT_CHANGED,
  THEME_CHANGED,
  PAGE_CHANGED,
} from '../util/constants';
import {
  storeInitHintCount,
  storeInitUseHintList,
  storeSetHintList,
  storeSetThemeName,
} from '../util/storageUtil';

export const reducer = (state, action) => {
  switch (action.type) {
    case INIT_DATA:
      return {...action.payload};
    case MERCHANT_CHANGED:
      return {...action.payload};
    case THEME_CHANGED:
      return {...action.payload};
    case PAGE_CHANGED:
      return {...state, pageValue: action.payload};
    default:
      return state;
  }
};

const Setting = ({navigation, route}) => {
  LogBox.ignoreAllLogs();
  const setThemeName = route.params.setThemeName;

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
    const page = pageCode;

    dispatch({type: PAGE_CHANGED, payload: page});
  };

  useEffect(() => {
    const initList = async () => {
      const merchant = await getMerchantList();
      const theme = await getThemeList('mrc001');
      const page = await getPageList('mrc001', 'thm001');

      const data = {
        merchantList: merchant,
        themeList: theme,
        pageList: page,
        merchantValue: 'mrc001',
        themeValue: 'thm001',
        pageValue: 'page01',
      };
      dispatch({type: INIT_DATA, payload: data});
    };
    initList();
  }, []);

  const getHintList = async () => {
    return await getData(
      `/hintCode/${state.merchantValue}/${state.themeValue}`,
    );
  };

  const getThemeName = async () => {
    const themeName = await getData(
      `/themes/${state.merchantValue}/${state.themeValue}`,
    );
    setThemeName(themeName);
    return themeName;
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
      <View style={styles.wrapperBox}>
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
          <Pressable
            onPress={() => {
              storeInitUseHintList().then(() => {
                storeInitHintCount()
                  .then(() => {
                    return storeSetHintList(getHintList);
                  })
                  .then(() => {
                    return storeSetThemeName(getThemeName);
                  })
                  .then(() => {
                    navigation.navigate('Home');
                  });
              });
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
