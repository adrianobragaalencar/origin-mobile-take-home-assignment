import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '@store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { MainStack } from '@navigation/index';
import '@i18n';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer theme={MyTheme}>
        <MainStack />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
