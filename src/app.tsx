import "i18n";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "navigators/AppStack";
import { Provider } from "react-redux";
import { persistor, store } from "store";
import { PersistGate } from "redux-persist/integration/react";
import { api } from "services";
import { LoaderProvider } from "@baont97/rn-loader";

export const App = () => {
  const boostrapAsync = async () => {
    api.setup({ token: store.getState().auth.token });
  };

  return (
    <LoaderProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} onBeforeLift={boostrapAsync}>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </LoaderProvider>
  );
};
