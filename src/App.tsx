import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '@store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from '@navigation/index';
import '@i18n';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
