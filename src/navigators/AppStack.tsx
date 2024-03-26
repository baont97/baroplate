import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DemoScreen, SignInScreen } from 'screens';
import { selectIsSignedIn } from 'store/slices/auth-slice';
import { useAppSelector } from 'hooks';

export type AppStackParamList = {
  Demo: undefined;
  SignIn: undefined;
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
    </Stack.Navigator>
  );
};
