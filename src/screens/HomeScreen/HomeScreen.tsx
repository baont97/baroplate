import React, { useCallback, useLayoutEffect } from "react";
import { useApiInMount, useSignOut } from "hooks";
import { TPokemon } from "models";
import { pokemonApi } from "services";
import { useAppNavigation } from "navigators";
import { useTx } from "i18n";
import { PlatformPressable } from "@react-navigation/elements";
import { AppText, HookedFlatlist, Layout } from "components";

import * as Components from "./components";

export const HomeScreen = () => {
  const navigation = useAppNavigation<"Home">();
  const { t } = useTx();

  /// redux
  const signOut = useSignOut();

  /// state
  const hook = useApiInMount<TPokemon[], undefined>(
    async () => {
      const response = await pokemonApi.getList();
      return response.ok ? response.data : [];
    },
    [],
    {
      initData: [],
      initParams: undefined,
    }
  );

  /// navigations
  useLayoutEffect(
    useCallback(() => {
      navigation.setOptions({
        title: t("home.title"),
        headerRight: ({ tintColor }) => (
          <PlatformPressable onPress={signOut.prompt}>
            <AppText tx="common.signOut" style={{ color: tintColor }} />
          </PlatformPressable>
        ),
      });
    }, [])
  );

  return (
    <Layout>
      <HookedFlatlist
        renderItem={({ item }) => <Components.HomeItem data={item} />}
        isEnableLoadmore={false}
        safeAreaOnBottom
        {...hook}
      />
    </Layout>
  );
};
