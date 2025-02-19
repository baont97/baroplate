import React, { useCallback, useLayoutEffect } from "react";
import {
  Button,
  StyleProp,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { signIn } from "store";
import { useAppDispatch } from "hooks";
import { useLoader } from "@baont97/rn-loader";
import { AppStackNavigationProps } from "navigators";
import { useNavigation } from "@react-navigation/native";

export const SignInScreen = () => {
  const navigation = useNavigation<AppStackNavigationProps<"SignIn">>();
  const loader = useLoader();

  /// redux
  const dispatch = useAppDispatch();

  /// functions
  const submit = () => {
    loader.show();
    setTimeout(() => {
      dispatch(signIn("sample"));
      loader.hide();
    }, 1000);
  };

  const changeLng = () => {
    navigation.navigate("Language");
  };

  /// navigations
  useLayoutEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => <Button title="Language" onPress={changeLng} />,
      });
    }, [])
  );

  return (
    <View style={$root}>
      <TextInput placeholder="user name" style={$input} />
      <TextInput placeholder="password" style={$input} />
      <Button title="sign in" onPress={submit} />
    </View>
  );
};

const $root: StyleProp<ViewStyle> = {
  flex: 1,
  padding: 12,
};

const $input: StyleProp<TextStyle> = {
  height: 36,
  backgroundColor: "white",
  marginBottom: 12,
  paddingHorizontal: 12,
  borderRadius: 2,
};
