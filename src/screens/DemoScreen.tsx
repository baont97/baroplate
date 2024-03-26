import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Button, Image, StyleProp, Text, View, ViewStyle } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "navigators";
import { signOut } from "store";
import { useAppDispatch } from "hooks";
import { pokemonApi } from "services/api-pokemon";
import { Pokemon } from "models";

export const DemoScreen: React.FC<
  NativeStackScreenProps<AppStackParamList, "Demo">
> = (props) => {
  const { navigation } = props;

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
        headerRight: (props) => <Button title="sign out" onPress={_signOut} />,
      });
    }, [])
  );

  const boostrapAsync = async () => {
    const response = await pokemonApi.getList();
    response.ok && setPokemonList(response.data);
  };

  return (
    <View style={$root}>
      {pokemonList.map((x, i) => (
        <View key={i}>
          <Image source={{ uri: x.url }} style={{ width: 20, height: 20 }} />
          <Text>{x.name}</Text>
        </View>
      ))}
    </View>
  );
};

const $root: StyleProp<ViewStyle> = {
  flex: 1,
  padding: 12,
};
