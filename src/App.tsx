import "i18n";

import React from "react";
import { createStaticNavigation } from "@react-navigation/native";
import { Provider } from "react-redux";
import { persistor, signIn, store } from "store";
import { PersistGate } from "redux-persist/integration/react";
import { LoaderProvider } from "@baont97/rn-loader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { api } from "services";
import { getReactNavigationTheme, style } from "theme";
import { secureStorage, StorageKeys } from "utils";
import { AppThemeProvider, useAppTheme } from "provider";
import { ModertProvider } from "components";
import { AppStack } from "navigators";

import BootSplash from "react-native-bootsplash";

export const App = () => {
  const boostrapAsync = async () => {
    const token = (await secureStorage.getItem(StorageKeys.token)) || "";
    store.dispatch(signIn(token));
    api.setup({ token: store.getState().auth.token });
  };

  return (
    <AppThemeProvider>
      <GestureHandlerRootView style={style.flex_1}>
        <LoaderProvider>
          <Provider store={store}>
            <PersistGate persistor={persistor} onBeforeLift={boostrapAsync}>
              <ModertProvider>
                <ThemedNavigation />
              </ModertProvider>
            </PersistGate>
          </Provider>
        </LoaderProvider>
      </GestureHandlerRootView>
    </AppThemeProvider>
  );
};

const RootNavigation = createStaticNavigation(AppStack);

const ThemedNavigation = () => {
  const appTheme = useAppTheme();
  const navTheme = getReactNavigationTheme(appTheme);

  return <RootNavigation onReady={() => BootSplash.hide()} theme={navTheme} />;
};
