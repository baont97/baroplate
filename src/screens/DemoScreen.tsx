import React from "react";

import { Button, StyleProp, Text, View, ViewStyle } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "navigators";
import { signOut } from "store";
import { useAppDispatch } from "hooks";
import UltimateConfig from "react-native-ultimate-config";

export const DemoScreen: React.FC<
  NativeStackScreenProps<AppStackParamList, "Demo">
> = (props) => {
  const dispatch = useAppDispatch();

  const _signOut = () => {
    dispatch(signOut());
  };

  return (
    <View style={$root}>
      <Text>
        {props.route.name} {UltimateConfig.MY_CONFIG}
      </Text>
      <Button title="sign out" onPress={_signOut} />
    </View>
  );
};

const $root: StyleProp<ViewStyle> = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
};
