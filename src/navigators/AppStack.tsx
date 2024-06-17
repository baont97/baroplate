import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DemoScreen, SignInScreen, LanguageScreen } from "screens";
import { useAppSelector } from "hooks";
import { selectIsSignedIn } from "store";

export type AppStackParamList = {
  Demo: undefined;
  SignIn: undefined;
  Language: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  const isLoggedIn = useAppSelector(selectIsSignedIn);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen name="Demo" component={DemoScreen} />
      ) : (
        <Stack.Screen name="SignIn" component={SignInScreen} />
      )}
      <Stack.Screen name="Language" component={LanguageScreen} />
    </Stack.Navigator>
  );
};
