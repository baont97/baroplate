import { Dimensions } from "react-native";
import DeviceInfo from "react-native-device-info";

const { width, height } = Dimensions.get("screen");

const mobileHeight = 926;
const mobileWidth = 428;

const tabletHeight = 1366;
const tabletWidth = 1024;

const isTablet = DeviceInfo.isTablet();
const deviceType = isTablet ? "tablet" : "mobile";

export const scale = {
  y: (mobile: number, tablet: number) =>
    ({
      mobile: (mobile * height) / mobileHeight,
      tablet: ((tablet || mobile) * height) / tabletHeight,
    }[deviceType]),
  x: (mobile: number, tablet: number) =>
    ({
      mobile: (mobile * width) / mobileWidth,
      tablet: ((tablet || mobile) * width) / tabletWidth,
    }[deviceType]),
};

export const scaleFontSize = (mobile: number, tablet?: number) =>
  scale.y(mobile, tablet || mobile * 1.5);

/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  screenWidth: width,
  screenHeight: height,
  windowHeight: Dimensions.get("window").height,
  txBaseSize: scaleFontSize(14),
  zero: 0,
  /** 2, 2 * 1.5 */
  xxxs: scale.x(2, 2 * 1.5),
  /** 4, 4 * 1.5 */
  xxs: scale.x(4, 4 * 1.5),
  /** 8, 8 * 1.5 */
  xs: scale.x(8, 8 * 1.5),
  /** 12, 12 * 1.5 */
  sm: scale.x(12, 12 * 1.5),
  /** 16, 16 * 1.5 */
  md: scale.x(16, 16 * 1.5),
  /** 24, 24 * 1.5 */
  lg: scale.x(24, 24 * 1.5),
  /** 32, 32 * 1.5 */
  xl: scale.x(32, 32 * 1.5),
  /** 48, 48 * 1.5 */
  xxl: scale.x(48, 48 * 1.5),
  /** 64, 64 * 1.5 */
  xxxl: scale.x(64, 64 * 1.5),
} as const;

export type KSpacing = keyof typeof spacing;
