import React, { useState } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Fonts from 'expo-font'
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import ShopNavigator from './navigation/ShopNavigator';
import rootReducer from './store/reducers';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Fonts.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [areFontsLoaded, setAreFontsLoaded] = useState(false);

  if (!areFontsLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setAreFontsLoaded(true)} />;
  } else {
    return (
      <Provider store={store}>
        <ShopNavigator />
      </Provider>
    );
  }
}
