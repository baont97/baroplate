import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from 'navigators/AppStack';
import { Provider } from 'react-redux';
import { persistor, signIn, store } from 'store';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, View } from 'react-native';
import { storage, storageKeys } from 'utils';

export const App = () => {
  const boostrapAsync = async () => {
    const token = storage.getString(storageKeys.token);
    store.dispatch(signIn(token || ''));
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} onBeforeLift={boostrapAsync}>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
