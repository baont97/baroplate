import React from "react";
import { Pressable, StyleProp, Text, ViewStyle } from "react-native";
import { useTranslation } from "react-i18next";
import { SupportedLngs } from "i18n/i18n.types";
import { Layout } from "components";

export const LanguageScreen = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (supportedLngs: SupportedLngs) => {
    i18n.changeLanguage(supportedLngs);
  };

  return (
    <Layout>
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
    </Layout>
  );
};

const $press: StyleProp<ViewStyle> = {
  height: 36,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  marginTop: 12,
};
