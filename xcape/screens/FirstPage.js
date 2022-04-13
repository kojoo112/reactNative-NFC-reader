import React from 'react';
import {Text, Image, ScrollView, StyleSheet} from 'react-native';

const FirstPage = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={{width: '100%', height: 400}}
        source={require('../assets/images/city.jpg')}></Image>
      <Image
        style={{width: '100%', height: 400}}
        source={require('../assets/images/phone.png')}></Image>
      <Image
        style={{width: '100%', height: 400}}
        source={require('../assets/images/lens.jpeg')}></Image>
      <Image
        style={{width: '100%', height: 400}}
        source={require('../assets/images/maskedCat.jpeg')}></Image>
      <Image
        style={{width: '100%', height: 400}}
        source={require('../assets/images/test.jpeg')}></Image>

      <Text>FirstPage</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
  },
});

export default FirstPage;
