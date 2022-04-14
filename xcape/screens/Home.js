import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import NfcNavigator from '../components/NfcNavigator';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <NfcNavigator />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('VideoPage')}>
        <Text style={styles.text}>비디오 테스트화면 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
