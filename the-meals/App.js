import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { useScreens } from 'react-native-screens';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Navigators
import MealsNavigator from './navigation/MealsNavigator';

import rootReducer from './store/reducers';

useScreens();

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [areFontsLoaded, setAreFontsLoaded] = useState(false);

  if (!areFontsLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setAreFontsLoaded(true)} />
  }

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}
