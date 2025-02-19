import { DemoScreen, LanguageScreen, SignInScreen } from "screens";
import { useAppSelector } from "hooks";
import { selectIsSignedIn } from "store";
import { palette, style } from "theme";
import { isAndroid } from "utils";
import { images } from "@assets/index";
import { StaticParamList, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

const useIsSignedIn = () => useAppSelector(selectIsSignedIn);
const useIsSignedOut = () => !useAppSelector(selectIsSignedIn);

export const AppStack = createNativeStackNavigator({
  screenOptions: {
    headerBackImageSource: isAndroid ? images.chevron_left : undefined,
    headerShadowVisible: false,
    headerBackButtonDisplayMode: "minimal",
    headerTitleStyle: style.tx_nav_title,
    headerTintColor: isAndroid ? palette.primary500 : undefined,
  },
  groups: {
    SignedIn: {
      if: useIsSignedIn,
      screens: {
        Demo: DemoScreen,
      },
    },
    SignedOut: {
      if: useIsSignedOut,
      screens: {
        SignIn: SignInScreen,
      },
    },
  },
  screens: {
    Language: LanguageScreen,
  },
});

export type AppStackParamList = StaticParamList<typeof AppStack>;

export type AppStackNavigationProps<T extends keyof AppStackParamList> =
  NativeStackNavigationProp<AppStackParamList, T>;

export function useAppNavigation<T extends keyof AppStackParamList>() {
  return useNavigation<AppStackNavigationProps<T>>();
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
