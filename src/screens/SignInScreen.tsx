import React, { useCallback, useLayoutEffect } from "react";
import { signIn } from "store";
import { useAppDispatch } from "hooks";
import { useLoader } from "@baont97/rn-loader";
import { AppStackNavigationProps } from "navigators";
import { useNavigation } from "@react-navigation/native";
import { AppButton, AppText, AppTextInput, Layout } from "components";
import { style } from "theme";
import { useTx } from "i18n";
import { PlatformPressable } from "@react-navigation/elements";

export const SignInScreen = () => {
  const navigation = useNavigation<AppStackNavigationProps<"SignIn">>();
  const loader = useLoader();
  const { t } = useTx();

  /// redux
  const dispatch = useAppDispatch();

  /// functions
  const submit = () => {
    loader.show();
    setTimeout(() => {
      dispatch(signIn("sample"));
      loader.hide();
    }, 1000);
  };

  /// navigations
  useLayoutEffect(
    useCallback(() => {
      navigation.setOptions({
        title: t("signIn.title"),
        headerRight: ({ tintColor }) => (
          <PlatformPressable onPress={() => navigation.navigate("Language")}>
            <AppText tx="language.title" style={{ color: tintColor }} />
          </PlatformPressable>
        ),
      });
    }, [])
  );

  return (
    <Layout padding="md" style={style.gap_sm}>
      <AppTextInput
        labelTx="form.username.label"
        placeholderTx="form.username.placeholder"
      />
      <AppTextInput
        labelTx="form.password.label"
        placeholderTx="form.password.placeholder"
      />
      <AppButton titleTx="signIn.submitButton" onPress={submit} />
    </Layout>
  );
};
