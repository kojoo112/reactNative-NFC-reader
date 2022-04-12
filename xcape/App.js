import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import Home from './screens/Home.js';
import FirstPage from './screens/FirstPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SecondPage from './screens/SecondPage.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Page1" component={FirstPage} />
        <Stack.Screen name="Page2" component={SecondPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default App;
