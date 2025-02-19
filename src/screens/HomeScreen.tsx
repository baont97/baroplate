import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Image, Text, View } from "react-native";
import { signOut } from "store";
import { useAppDispatch } from "hooks";
import { TPokemon } from "models";
import { pokemonApi } from "services";
import { useAppNavigation } from "navigators";
import { Layout } from "components/Layout";
import { useTx } from "i18n";
import { PlatformPressable } from "@react-navigation/elements";
import { AppText } from "components";

export const HomeScreen = () => {
  const navigation = useAppNavigation<"Home">();
  const { t } = useTx();

  /// redux
  const dispatch = useAppDispatch();

  /// state
  const [pokemonList, setPokemonList] = useState<TPokemon[]>([]);

  /// effect
  useEffect(() => {
    boostrapAsync();
  }, []);

  /// functions

  /// navigations
  useLayoutEffect(
    useCallback(() => {
      navigation.setOptions({
        title: t("home.title"),
        headerRight: ({ tintColor }) => (
          <PlatformPressable onPress={() => dispatch(signOut())}>
            <AppText tx="common.signOut" style={{ color: tintColor }} />
          </PlatformPressable>
        ),
      });
    }, [])
  );

  const boostrapAsync = async () => {
    const response = await pokemonApi.getList();
    response.ok && setPokemonList(response.data);
  };

  return (
    <Layout>
      {pokemonList.map((x, i) => (
        <View key={i}>
          <Image source={{ uri: x.url }} style={{ width: 20, height: 20 }} />
          <Text>{x.name}</Text>
        </View>
      ))}
    </Layout>
  );
};
