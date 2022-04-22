import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Home from './screens/Home.js';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HintPage from './screens/HintPage.js';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HintPage" component={HintPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
