import React from "react";

import { Button, StyleProp, Text, View, ViewStyle } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "navigators";
import { signIn } from "store";
import { useAppDispatch } from "hooks";
import { useLoader } from "@baont97/rn-loader";

export const SignInScreen: React.FC<
  NativeStackScreenProps<AppStackParamList, "SignIn">
> = (props) => {
  const loader = useLoader();
  const dispatch = useAppDispatch();

  const _signIn = () => {
    loader.show();
    setTimeout(() => {
      dispatch(signIn("sample"));
      loader.hide();
    }, 1000);
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
  alignItems: "center",
  justifyContent: "center",
};
