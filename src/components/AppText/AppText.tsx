import React, { useMemo } from "react";
import { TxKeyPath } from "i18n";
import { TOptions } from "i18next";
import { STextStyle } from "models";
import { useAppTheme } from "provider";
import { Text, TextProps } from "react-native";
import { spacing, style } from "theme";
import { useTranslation } from "react-i18next";

export type AppTextProps = {
  tx?: TxKeyPath;
  txOptions?: TOptions;
} & TextProps;

export const AppText: React.FC<AppTextProps> = ({
  children,
  tx,
  txOptions,
  style,
  ...rest
}) => {
  const { colorScheme } = useAppTheme();
  const { t } = useTranslation();

  const content = useMemo<AppTextProps["children"]>(
    () => (tx ? t(tx, txOptions) : children),
    [tx, txOptions, children, t]
  );

  return (
    <Text {...rest} style={[$root, { color: colorScheme.onBackground }, style]}>
      {content}
    </Text>
  );
};

const $root: STextStyle = [
  style.tx_font_regular,
  { fontSize: spacing.txBaseSize },
];
