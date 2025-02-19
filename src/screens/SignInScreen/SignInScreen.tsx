import React, { useCallback, useLayoutEffect } from "react";
import { signIn } from "store";
import { useAppDispatch } from "hooks";
import { AppStackNavigationProps } from "navigators";
import { useNavigation } from "@react-navigation/native";
import { AppButton, AppText, AppTextInput, Layout } from "components";
import { style } from "theme";
import { useTx } from "i18n";
import { PlatformPressable } from "@react-navigation/elements";
import { useFormik } from "formik";
import { delay, validators } from "utils";

import * as Types from "./SignInScreen.types";
import * as Yup from "yup";

export const SignInScreen = () => {
  const navigation = useNavigation<AppStackNavigationProps<"SignIn">>();
  const { t } = useTx();

  /// redux
  const dispatch = useAppDispatch();

  const formik = useFormik<Types.TSignInModel>({
    initialValues: Types.dfSignInModel,
    onSubmit: async (values, helpers) => {
      await delay(1000);
      dispatch(signIn("sample"));
    },
    validationSchema: Yup.object().shape({
      email: validators.email(t),
      password: validators.password(t),
    }),
  });

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
        labelTx="input.email.label"
        placeholderTx="input.email.placeholder"
        value={formik.values.email}
        onBlur={formik.handleBlur("email")}
        onChangeText={formik.handleChange("email")}
        errorMessage={formik.touched.email && formik.errors.email}
        editable={!formik.isSubmitting}
      />
      <AppTextInput
        labelTx="input.password.label"
        placeholderTx="input.password.placeholder"
        value={formik.values.password}
        onBlur={formik.handleBlur("password")}
        onChangeText={formik.handleChange("password")}
        errorMessage={formik.touched.password && formik.errors.password}
        secureTextEntry
        editable={!formik.isSubmitting}
      />
      <AppButton
        titleTx="signIn.submitButton"
        onPress={formik.submitForm}
        loading={formik.isSubmitting}
      />
    </Layout>
  );
};
