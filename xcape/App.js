import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Home from './screens/Home.js';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Setting from './screens/Setting.js';
import TagView from './screens/TagView.js';
import {LogBox} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  LogBox.ignoreAllLogs();

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TagView" component={TagView} />
        <Stack.Screen name="Setting" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
