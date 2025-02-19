import React from "react";
import { AppText } from "components";
import { SViewStyle, TPokemon } from "models";
import { Image, View } from "react-native";
import { spacing, style } from "theme";

type HomeItemProps = {
  data: TPokemon;
};

export const HomeItem: React.FC<HomeItemProps> = ({ data }) => {
  return (
    <View style={$root}>
      <Image
        source={{ uri: data.url }}
        width={spacing.lg}
        height={spacing.lg}
        resizeMode="contain"
      />
      <AppText>{data.name}</AppText>
    </View>
  );
};

const $root: SViewStyle = [
  style.border_width_hairlineWidth,
  style.border_color_gray200,
  style.mx_md,
  style.p_xs,
  style.row,
  style.gap_xs,
  style.round_xs,
  style.align_center,
];
