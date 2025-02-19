import { STextStyle, SViewStyle } from "models";
import { useAppTheme } from "provider";
import { scale, spacing, style } from "theme";
import { AppTextInputProps } from "./AppInput";
import { hexToRgbA } from "utils";

export const useAppInputStyle = ({
  inputStyle,
  errorMessage,
  containerStyle,
  Left,
  multiline,
}: AppTextInputProps) => {
  const { colorScheme } = useAppTheme();

  return {
    container: [
      $root,
      { borderColor: errorMessage ? colorScheme.error : colorScheme.surface },
      multiline && { minHeight: scale.y(100, 120), height: null },
      containerStyle,
    ],
    input: [
      { color: colorScheme.onBackground },
      multiline && style.py_md,
      Boolean(Left) && style.pl_zero,
      $input,
      inputStyle,
    ] as SViewStyle,
    placeholderTextColor: hexToRgbA(colorScheme.onBackground.toString(), 0.5),
  };
};

const $root: SViewStyle = [{ borderWidth: 1 }, style.inbut, style.row];
const $input: STextStyle = [
  style.tx_font_regular,
  { fontSize: spacing.txBaseSize, paddingHorizontal: scale.x(20, 20), flex: 1 },
];
