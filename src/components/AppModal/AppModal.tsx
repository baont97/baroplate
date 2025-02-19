import React, { PropsWithChildren } from "react";
import { Modal, ModalProps, Pressable, View } from "react-native";
import { hexToRgbA } from "utils";
import { SViewStyle } from "models";
import { spacing, style } from "theme";
import { AppText } from "components/AppText";
import { useAppTheme } from "provider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton } from "components/AppButton";

export type AppModalProps = {
  onSave?: () => void;
  maxHeight?: number;
} & ModalProps &
  PropsWithChildren;

export const AppModal: React.FC<AppModalProps> = ({
  visible,
  onRequestClose,
  children,
  onSave,
  maxHeight = spacing.screenWidth,
  ...rest
}) => {
  const insets = useSafeAreaInsets();

  const { colorScheme } = useAppTheme();

  const handleSave = () => {
    onSave?.();
  };

  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      {...rest}
      visible={visible}
    >
      <View style={$modal}>
        <Pressable
          style={[
            $modalBackdrop,
            {
              backgroundColor: hexToRgbA(
                colorScheme.onBackground.toString(),
                0.5
              ),
            },
          ]}
          onPress={onRequestClose}
        />
        <View
          style={[
            $modalContent,
            { backgroundColor: colorScheme.background, maxHeight },
          ]}
        >
          {children}
        </View>
        <View style={$button}>
          <Pressable
            style={({ pressed }) => [
              $modalCancelBtn,
              {
                backgroundColor: colorScheme.background,
                marginBottom: insets.bottom || spacing.md,
                transform: [{ scale: pressed ? 0.99 : 1 }],
              },
            ]}
            onPress={onRequestClose}
          >
            <AppText style={{ color: colorScheme.error }}>Cancel</AppText>
          </Pressable>
          {onSave ? (
            <AppButton
              titleTx="common.save"
              style={style.flex_2}
              onPress={handleSave}
            />
          ) : undefined}
        </View>
      </View>
    </Modal>
  );
};

const $modal: SViewStyle = [style.flex_1, style.justify_end];
const $modalBackdrop: SViewStyle = [style.abs_fo, { zIndex: -1 }];
const $modalContent: SViewStyle = [
  style.mx_md,
  style.mb_xs,
  style.round_md,
  style.overflow_hidden,
];
const $button: SViewStyle = [style.row, style.mx_md, style.gap_xs];
const $modalCancelBtn: SViewStyle = [
  style.inbut,
  style.center,
  style.mb_xs,
  style.round_md,
  style.flex_1,
];
