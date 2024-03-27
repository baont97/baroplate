import "i18n";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "navigators/AppStack";
import { Provider } from "react-redux";
import { persistor, store } from "store";
import { PersistGate } from "redux-persist/integration/react";
import { LoaderProvider } from "@baont97/rn-loader";
import { api } from "services";

import BootSplash from "react-native-bootsplash";

export const App = () => {
  const boostrapAsync = async () => {
    api.setup({ token: store.getState().auth.token });
  };

  return (
    <LoaderProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} onBeforeLift={boostrapAsync}>
          <NavigationContainer onReady={() => BootSplash.hide()}>
            <AppStack />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </LoaderProvider>
  );
};
