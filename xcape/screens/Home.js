import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  ToastAndroid,
  Vibration,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import TagRead from '../components/TagRead';
import Clock from '../components/Clock';
import HintMessageView from '../components/HintMessageView';
import {
  storeSetUseHintList,
  storeSetHintCount,
  storeGetThemeName,
  storeGetHintList,
  storeGetHintCount,
  storeGetUseHintList,
} from '../util/storageUtil';
import ClockModal from '../components/ClockModal';
import SetTimerModal from '../components/SetTimerModal';
import prompt from 'react-native-prompt-android';

const tagingLogo = require('../assets/images/taging-logo.png');

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

  // Stopwatch
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  const [clockModalVisible, setClockModalVisible] = useState(true);
  const [timerModalVisible, setTimerModalVisible] = useState(false);

  const startStopwatch = () => {
    setStart(true);
    setReset(false);
  };

  const resetStopwatch = () => {
    setStart(false);
    setReset(true);
  };

  const toggleStopwatch = () => {
    setStart(!start);
    setReset(false);
  };

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
    resetStopwatch();
    setClockModalVisible(true);
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
          setUseHintList={setUseHintList}
          isRefresh={isRefresh}
          setIsRefresh={setIsRefresh}
        />
        <Pressable
          style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}
          onLongPress={() => {
            Vibration.vibrate(200, false);
            prompt(
              '힌트관리자',
              '관리자 비밀번호를 입력하세요',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: password => {
                    if (password == '5772') {
                      setTimerModalVisible(true);
                    }
                  },
                },
              ],
              {
                type: 'secure-text',
                cancelable: false,
                placeholder: '비밀번호 입력...',
              },
            );
          }}>
          <Clock start={start} reset={reset} />
        </Pressable>
        <ClockModal
          startStopwatch={startStopwatch}
          clockModalVisible={clockModalVisible}
          setClockModalVisible={setClockModalVisible}
        />
        <SetTimerModal
          start={start}
          toggleStopwatch={toggleStopwatch}
          resetStopwatch={resetStopwatch}
          timerModalVisible={timerModalVisible}
          setTimerModalVisible={setTimerModalVisible}
        />
        <View style={{flex: 0.3, paddingHorizontal: 20}}>
          <Pressable
            style={styles.tagButton}
            onPress={() => {
              Vibration.vibrate(200, false);
              setModalVisible(!modalVisible);
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.tagText}>TA</Text>
              <Image source={tagingLogo} style={{width: 50, height: 50}} />
              <Text style={styles.tagText}>GING</Text>
            </View>
          </Pressable>
          <TagRead
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            action={'readTag'}
            hintObject={setComponents}
          />
        </View>
        <HintMessageView
          hintMessage1={hintMessage1}
          hintMessage2={hintMessage2}
          hintVisible={hintVisible}
          setHintVisible={setHintVisible}
        />
        <View
          style={{
            flex: 0.13,
            flexDirection: 'row',
            paddingHorizontal: 20,
            marginBottom: 10,
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
    color: 'white',
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
  tagText: {
    fontSize: 50,
    fontWeight: '700',
    color: 'white',
  },
});

export default Home;
