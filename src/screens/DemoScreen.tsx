import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Button, Image, Text, View } from "react-native";
import { signOut } from "store";
import { useAppDispatch } from "hooks";
import { Pokemon } from "models";
import { pokemonApi } from "services";
import { useAppNavigation } from "navigators";
import { Layout } from "components/Layout";

export const DemoScreen = () => {
  const navigation = useAppNavigation<"Demo">();

  /// redux
  const dispatch = useAppDispatch();

  /// state
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  /// effect
  useEffect(() => {
    boostrapAsync();
  }, []);

  /// functions
  const _signOut = () => {
    dispatch(signOut());
  };

  /// navigations
  useLayoutEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => <Button title="sign out" onPress={_signOut} />,
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
