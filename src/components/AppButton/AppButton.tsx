import React from "react";
import { AppText, AppTextProps } from "components/AppText";
import { Pressable, PressableProps } from "react-native";
import {
  defaultButtonPressedScale,
  EAppButtonStatus,
  EAppButtonType,
  TAppButtonPresetStyles,
} from "./AppButton.types";
import { useAppTheme } from "provider";
import { STextStyle, SViewStyle } from "models";
import { Loader } from "../Loader";

import * as styles from "./AppButton.styles";

export type AppButtonProps = {
  title?: AppTextProps["children"];
  titleTx?: AppTextProps["tx"];
  titleTxOptions?: AppTextProps["txOptions"];
  type?: EAppButtonType;
  pressedScale?: number;
  style?: SViewStyle;
  titleStyle?: STextStyle;
  loading?: boolean;
} & Omit<PressableProps, "style">;

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  titleTx,
  titleTxOptions,
  type = EAppButtonType.filled,
  disabled,
  pressedScale = defaultButtonPressedScale,
  style,
  titleStyle,
  loading,
  ...rest
}) => {
  const { colorScheme } = useAppTheme();
  const presetStyle = styles.getAppButtonPresetStyles(colorScheme);

  const _disabled = disabled || loading;

  const styleKey: keyof TAppButtonPresetStyles = `${type}_${
    _disabled ? EAppButtonStatus.disabled : EAppButtonStatus.enabled
  }`;

  const $root = [presetStyle.button[styleKey], style];
  const $title = [presetStyle.title[styleKey], titleStyle];

  return (
    <Pressable
      {...rest}
      disabled={_disabled || loading}
      style={({ pressed }) => [
        $root,
        { transform: [{ scale: pressed ? pressedScale : 1 }] },
      ]}
    >
      {loading ? (
        <Loader style={styles.$loader} />
      ) : (
        <AppText tx={titleTx} txOptions={titleTxOptions} style={$title}>
          {title}
        </AppText>
      )}
    </Pressable>
  );
};
