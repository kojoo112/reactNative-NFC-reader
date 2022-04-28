import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Home from './screens/Home.js';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HintPage from './screens/HintPage.js';
import SplashScreen from 'react-native-splash-screen';
import Setting from './screens/Setting.js';
import TagView from './components/TagView.js';

const Stack = createNativeStackNavigator();

const App = () => {
  const [merchant, setMerchant] = useState('');
  const [theme, setTheme] = useState('');

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
        <Stack.Screen name="HintPage" component={HintPage} />
        <Stack.Screen name="Setting">
          {props => (
            <Setting {...props} setMerchant={setMerchant} setTheme={setTheme} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
