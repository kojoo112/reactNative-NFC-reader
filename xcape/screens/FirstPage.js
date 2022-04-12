import React from 'react';
import {View, Text, Image} from 'react-native';

const FirstPage = () => {
  return (
    <View>
      <Image source={require('../assets/image/city.jpg')}></Image>
      <Text>FirstPage</Text>
    </View>
  );
};

export default FirstPage;
