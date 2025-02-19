import { Theme } from "@react-navigation/native";
import { TAppTheme } from "provider";
import { typography } from "./Typography";

export const getReactNavigationTheme = ({
  colorSchemeName,
  colorScheme,
}: TAppTheme): Theme => ({
  dark: colorSchemeName === "dark",
  colors: {
    primary: colorScheme.primary.toString(),
    background: colorScheme.background.toString(),
    card: colorScheme.background.toString(),
    text: colorScheme.onBackground.toString(),
    border: colorScheme.onSurface.toString(),
    notification: colorScheme.error.toString(),
  },
  fonts: {
    regular: {
      fontFamily: typography.regular,
      fontWeight: "normal",
    },
    medium: {
      fontFamily: typography.regular,
      fontWeight: "normal",
    },
    bold: {
      fontFamily: typography.regular,
      fontWeight: "normal",
    },
    heavy: {
      fontFamily: typography.regular,
      fontWeight: "normal",
    },
  },
});
