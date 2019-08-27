import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import ProductsNavigator from './navigation/ProductsNavigator';
import rootReducer from './store/reducers';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ProductsNavigator />
    </Provider>
  );
}
