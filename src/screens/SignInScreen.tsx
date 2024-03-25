import React from 'react';

import { Button, StyleProp, Text, View, ViewStyle } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from 'navigators';
import { signIn } from 'store';
import { useAppDispatch } from 'hooks';

export const SignInScreen: React.FC<
  NativeStackScreenProps<AppStackParamList, 'SignIn'>
> = props => {
  const dispatch = useAppDispatch();

  const _signIn = () => {
    dispatch(signIn('sample'));
  };

  return (
    <View style={$root}>
      <Text>{props.route.name}</Text>
      <Button title="sign in" onPress={_signIn} />
    </View>
  );
};

const $root: StyleProp<ViewStyle> = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};
