import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Fonts from 'expo-font'
import { composeWithDevTools } from 'redux-devtools-extension';

import ProductsNavigator from './navigation/ProductsNavigator';
import rootReducer from './store/reducers';

const store = createStore(rootReducer, composeWithDevTools());

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
        <ProductsNavigator />
      </Provider>
    );
  }
}
