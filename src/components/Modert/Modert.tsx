import React from "react";
import { Modal, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { useModert } from "./ModertConfigs";
import { useAppTheme } from "provider";
import { hexToRgbA } from "utils";
import { AppButton, EAppButtonType } from "components/AppButton";
import { spacing, style } from "theme";
import { STextStyle, SViewStyle } from "models";
import { AppText } from "components/AppText";

export const Modert: React.FC = () => {
  const { modert, hide } = useModert();
  const { colorSchemeName } = useAppTheme();

  return (
    <Modal
      visible={modert.visible}
      statusBarTranslucent
      transparent
      animationType="fade"
    >
      <View style={$root}>
        <Pressable
          onPress={modert.disabledBackdropPress ? undefined : hide}
          style={[$backdrop, { backgroundColor: hexToRgbA("#000", 0.2) }]}
        />
        <View
          style={[
            $content,
            { backgroundColor: colorSchemeName === "dark" ? "black" : "white" },
          ]}
        >
          {Boolean(modert.title) && (
            <AppText style={$title}>{modert.title}</AppText>
          )}
          <AppText>{modert.message}</AppText>
          <View
            style={[
              $buttons,
              {
                flexDirection:
                  modert?.buttons?.length > 1 ? "row" : "row-reverse",
              },
            ]}
          >
            {modert.buttons.map((item, key) => (
              <AppButton
                type={EAppButtonType.transparent}
                style={[$button, item.style]}
                {...item}
                key={key}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const padding = spacing.md;

const $root: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
};

const $content: ViewStyle = {
  width: spacing.screenWidth - padding * 2,
  borderRadius: spacing.md,
  padding: spacing.md,
  gap: spacing.md,
};

const $title: STextStyle = [{ fontSize: 18 }, style.tx_font_medium];

const $buttons: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

const $backdrop: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  zIndex: -1,
};

const $button: SViewStyle = [{ height: 32, borderRadius: 0 }, style.px_md];
