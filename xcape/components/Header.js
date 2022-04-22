import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text>setting</Text>
      <Text>themeName</Text>
      <View>
        <Text>0</Text>
        <Text>Hint Count</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
