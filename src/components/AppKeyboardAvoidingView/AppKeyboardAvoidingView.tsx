import { useHeaderHeight } from "@react-navigation/elements";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { style } from "theme";

type AppKeyboardAvoidingViewProps = {
  autoCalcKeyboardVerticalOffset?: boolean;
} & KeyboardAvoidingView;

export const AppKeyboardAvoidingView: React.FC<AppKeyboardAvoidingViewProps> = (
  props
) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      style={style.flex_1}
      behavior={Platform.select({ ios: "padding", android: undefined })}
      keyboardVerticalOffset={
        props.autoCalcKeyboardVerticalOffset
          ? Platform.select({
              ios: headerHeight - insets.bottom / 2,
              android: 0,
            })
          : 0
      }
      {...props}
    />
  );
};
