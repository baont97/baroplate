import React, { useState } from "react";
import { LayoutRectangle, View } from "react-native";
import { TOptions } from "i18next";
import { TxKeyPath } from "i18n";
import { AppText } from "components/AppText";
import { STextStyle, SViewStyle } from "models";
import { spacing, style } from "theme";
import { useAppTheme } from "provider";

type AppInputLabelProps = {
  label?: string;
  labelTx?: TxKeyPath;
  labelTxOptions?: TOptions;
};

export const AppInputLabel: React.FC<AppInputLabelProps> = ({
  label,
  labelTx,
  labelTxOptions,
}) => {
  const { colorScheme } = useAppTheme();
  const [labelLayout, setLabelLayout] = useState<LayoutRectangle>();

  return !!labelTx || !!label ? (
    <View
      style={[
        $labelWrapper,
        {
          opacity: +!!labelLayout,
          top: -((labelLayout?.height || 0) / 2),
          backgroundColor: colorScheme.background,
        },
      ]}
      onLayout={(e) => setLabelLayout(e.nativeEvent.layout)}
    >
      <AppText
        style={[$label, { color: colorScheme.onBackground }]}
        tx={labelTx}
        txOptions={labelTxOptions}
      >
        {label}
      </AppText>
    </View>
  ) : undefined;
};

const $labelWrapper: SViewStyle = [
  style.abs,
  style.zIndex1,
  style.px_xs,
  { left: spacing.md },
];

const $label: STextStyle = [style.tx_size_sm, style.opacity_4];
