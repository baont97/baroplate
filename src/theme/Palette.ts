import { ColorValue } from "react-native";

export const palette: Record<string, ColorValue> = {
  transparent: "transparent",
  primary: "#F2DE97",
  black: "#000",
  white: "#FFF",
} as const;

export type KPalette = keyof typeof palette;
