import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  ToastAndroid,
  Vibration,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import TagRead from '../components/TagRead';
import {
  storeSetUseHintList,
  storeSetHintCount,
  storeGetThemeName,
  storeGetHintList,
  storeGetHintCount,
  storeGetUseHintList,
} from '../util/storageUtil';

const Home = ({navigation}) => {
  const [hintList, setHintList] = useState({});
  const [themeName, setThemeName] = useState('');
  const [hintKey, setHintKey] = useState('');
  const [hintCount, setHintCount] = useState(0);
  const [hintMessage1, setHintMessage1] = useState('');
  const [hintMessage2, setHintMessage2] = useState('');
  const [hintVisible, setHintVisible] = useState(false);
  const [components, setComponents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [useHintList, setUseHintList] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const handleTextChange = e => {
    const {text} = e.nativeEvent;
    setHintKey(text.toUpperCase());
  };

  const getHint = hintKey => {
    Vibration.vibrate(200, false);
    if (hintKey !== '') {
      const hint = hintList[hintKey];
      if (useHintList.includes(hintKey)) {
        setHintMessage1(hint.message1);
        setHintMessage2(hint.message2);
        setHintVisible(false);
      } else if (hint !== undefined) {
        storeSetUseHintList(useHintList, hintKey).then(() => {
          storeSetHintCount(hintCount).then(() => {
            setHintMessage1(hint.message1);
            setHintMessage2(hint.message2);
            setHintCount(hintCount + 1);
            setHintVisible(false);
            setUseHintList(preList => [...preList, hintKey]);
          });
        });
      } else {
        ToastAndroid.show('힌트코드를 확인해주세요.', ToastAndroid.SHORT);
      }
    }
  };

  useEffect(() => {
    storeGetHintList(setHintList);
    storeGetThemeName(setThemeName);
    storeGetHintCount(setHintCount);
    storeGetUseHintList(setUseHintList);
    setHintKey('');
    setHintMessage1('');
    setHintMessage2('');
    setHintVisible(false);
  }, [isRefresh]);

  useEffect(() => {
    if (components.length > 0) {
      navigation.navigate('TagView', {components: components});
    }
  }, [components]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header
          themeName={themeName}
          hintCount={hintCount}
          setHintCount={setHintCount}
          setThemeName={setThemeName}
          setUseHintList={setUseHintList}
          isRefresh={isRefresh}
          setIsRefresh={setIsRefresh}
        />
        <View
          style={{
            flex: 0.085,
            flexDirection: 'row',
            padding: 20,
          }}>
          <TextInput
            autoCapitalize={'characters'}
            maxLength={5}
            onChange={e => handleTextChange(e)}
            value={hintKey}
            keyboardType={'default'}
            returnKeyType={'search'}
            style={styles.textInput}
            onSubmitEditing={() => getHint(hintKey)}
          />
          <Pressable
            style={styles.button}
            onPress={() => {
              Keyboard.dismiss();
              getHint(hintKey);
            }}>
            <Icon name="search-sharp" size={24} color={'white'} />
          </Pressable>
        </View>
        <TagRead
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          action={'readTag'}
          hintObject={setComponents}
        />
        <View style={styles.hintView}>
          <View style={styles.hintBoxStyle}>
            <Text style={styles.hintMessage}>
              {hintMessage1 != '' ? hintMessage1 : ''}
            </Text>
          </View>
          <Pressable
            style={styles.hintBoxStyle}
            onPress={() => {
              if (!hintVisible && hintMessage2 !== '')
                Alert.alert(
                  '힌트를 보시겠습니까?',
                  '',
                  [
                    {
                      text: '좀 더 생각해본다.',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: '지금 확인한다.',
                      onPress: () => setHintVisible(true),
                    },
                  ],
                  {cancelable: false},
                );
            }}>
            {!hintVisible ? (
              <Text style={{...styles.hintMessage, textAlign: 'center'}}>
                🔒 터치하면 정답이 보입니다.
              </Text>
            ) : (
              <Text style={styles.hintMessage}>{hintMessage2}</Text>
            )}
          </Pressable>
        </View>
        <View style={{flex: 0.1, paddingHorizontal: 20, marginBottom: 10}}>
          <Pressable
            style={styles.tagButton}
            onPress={() => {
              Vibration.vibrate(200, false);
              setModalVisible(!modalVisible);
            }}>
            <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
              X-TAG
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              console.log(hintList);
            }}>
            <Text>asdf</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353a40',
  },
  textInput: {
    backgroundColor: '#6c757e',
    flex: 1,
    borderWidth: 1.5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: 'white',
    padding: 10,
  },
  button: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333a44',
    borderWidth: 1.5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'white',
  },
  text: {
    color: 'black',
  },
  hintView: {
    flex: 1,
    padding: 20,
    backgroundColor: '#353a40',
    marginTop: -20,
  },
  hintBoxStyle: {
    flex: 0.5,
    marginBottom: 10,
    backgroundColor: '#212429',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  hintMessage: {
    color: 'white',
    fontSize: 16,
  },
  tagButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212429',
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'white',
  },
});

export default Home;
