import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "navigators/AppStack";
import { Provider } from "react-redux";
import { persistor, store } from "store";
import { PersistGate } from "redux-persist/integration/react";
import { api } from "services";

export const App = () => {
  const boostrapAsync = async () => {
    api.setup({ token: store.getState().auth.token });
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
