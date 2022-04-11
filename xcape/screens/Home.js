import React from 'react';
import {View, Text, Button} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
      <Text>Home입니당</Text>
      <Button title="Page1 열기" onPress={() => navigation.navigate('Page1')} />
    </View>
  );
};

export default Home;
