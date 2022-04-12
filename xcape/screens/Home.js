import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import NfcNavigator from '../components/NfcNavigator';

const Home = ({navigation}) => {
  return (
    <View>
      <NfcNavigator />
      <Text style={{color: 'black'}}>Home입니당</Text>
      <Button title="Page1 열기" onPress={() => navigation.navigate('Page1')} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Page2')}>
        <Text style={styles.text}>비디오 테스트화면 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 10,
  },
  text: {
    color: 'black',
  },
});

export default Home;
