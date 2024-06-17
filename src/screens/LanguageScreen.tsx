import React from "react";
import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "navigators";
import { useTranslation } from "react-i18next";
import { SupportedLngs } from "i18n/i18n.types";

export const LanguageScreen: React.FC<
  NativeStackScreenProps<AppStackParamList, "Language">
> = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (supportedLngs: SupportedLngs) => {
    i18n.changeLanguage(supportedLngs);
  };

  return (
    <View style={$root}>
      <Text>Current: {i18n.language}</Text>

      <Pressable
        style={$press}
        onPress={() => changeLanguage(SupportedLngs.vi)}
      >
        <Text>{SupportedLngs.vi}</Text>
      </Pressable>

      <Pressable
        style={$press}
        onPress={() => changeLanguage(SupportedLngs.en)}
      >
        <Text>{SupportedLngs.en}</Text>
      </Pressable>
    </View>
  );
};

const $root: StyleProp<ViewStyle> = {
  flex: 1,
  padding: 12,
};

const $press: StyleProp<ViewStyle> = {
  height: 36,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  marginTop: 12,
};
