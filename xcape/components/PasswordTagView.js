import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

const PasswordTagView = () => {
  const [password, setPassword] = usetState(null);

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder={'* * * *'}
        keyboardType="numeric"
      />
    </View>
  );
};

export default PasswordTagView;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
  },
});
