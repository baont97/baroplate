import React from "react";
import { STextStyle, SViewStyle } from "models";
import { ColorValue, TextInput, TextInputProps, View } from "react-native";
import { useAppTheme } from "provider";
import { style } from "theme";
import { TOptions } from "i18next";
import { TxKeyPath } from "i18n";
import { AppText } from "components/AppText";
import { useTranslation } from "react-i18next";
import { hexToRgbA } from "utils";
import { useAppInputStyle } from "./AppInput.styles";
import { AppInputLabel } from "./AppInputLabel";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export type AppTextInputIconProps = {
  tintColor: ColorValue;
};

export type AppTextInputProps = {
  containerStyle?: SViewStyle;
  inputStyle?: STextStyle;

  label?: string;
  labelTx?: TxKeyPath;
  labelTxOptions?: TOptions;

  placeholder?: string;
  placeholderTx?: TxKeyPath;
  placeholderTxOptions?: TOptions;

  errorMessage?: string | false | undefined;

  Left?: (props: AppTextInputIconProps) => React.ReactNode;
  Right?: (props: AppTextInputIconProps) => React.ReactNode;
} & TextInputProps;

export const AppTextInput: React.FC<AppTextInputProps> = (props) => {
  const {
    containerStyle,
    inputStyle,
    label,
    labelTx,
    labelTxOptions,
    placeholder,
    placeholderTx,
    placeholderTxOptions,
    errorMessage,
    Left,
    Right,
    ...rest
  } = props;
  const { colorScheme } = useAppTheme();
  const { container, input } = useAppInputStyle(props);
  const { t } = useTranslation();

  return (
    <View>
      <View style={container}>
        <AppInputLabel {...{ label, labelTx, labelTxOptions }} />
        {!!Left ? (
          <View style={$left}>
            <Left tintColor={colorScheme.surface} />
          </View>
        ) : undefined}
        <TextInput
          {...rest}
          style={input}
          placeholder={
            placeholder ||
            (placeholderTx ? t(placeholderTx, placeholderTxOptions) : undefined)
          }
          placeholderTextColor={hexToRgbA(
            colorScheme.onBackground.toString(),
            0.5
          )}
          textAlignVertical={props.multiline ? "top" : undefined}
        />
        {!!Right ? (
          <View style={$right}>
            <Right tintColor={colorScheme.surface} />
          </View>
        ) : undefined}
      </View>
      {Boolean(errorMessage) && (
        <Animated.View
          style={$errorWrapper}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <AppText style={$error}>{errorMessage}</AppText>
        </Animated.View>
      )}
    </View>
  );
};

const $left: SViewStyle = [{ height: "100%", aspectRatio: 1 }, style.center];

const $errorWrapper: SViewStyle = [style.py_xxs, style.px_xxs];

const $error: STextStyle = [style.tx_size_sm, style.tx_color_error500];

const $right: SViewStyle = $left;
