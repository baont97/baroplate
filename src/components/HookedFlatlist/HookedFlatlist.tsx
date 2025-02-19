import { BlankBox, BlankBoxProps } from "components/BlankBox";
import { Loader } from "components/Loader";
import { UseApiInMountWithLoadmoreResult } from "hooks";
import { SViewStyle } from "models";
import { useAppTheme } from "provider";
import React from "react";
import { FlatList, FlatListProps, RefreshControl, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing, style } from "theme";

type HookedFlatlistProps<T> = {
  blankProps?: BlankBoxProps;
  safeAreaOnBottom?: boolean;
  loadmore?: UseApiInMountWithLoadmoreResult<T>["loadmore"];
  loadingmore?: UseApiInMountWithLoadmoreResult<T>["loadingmore"];
} & FlatListProps<T> &
  Omit<UseApiInMountWithLoadmoreResult<T>, "loadmore" | "loadingmore">;

export function HookedFlatlist<T>({
  data,
  refresh,
  loading,
  loadmore,
  refreshing,
  blankProps,
  isEnableLoadmore,
  safeAreaOnBottom,
  ...rest
}: HookedFlatlistProps<T>) {
  const { colorScheme } = useAppTheme();
  const insets = useSafeAreaInsets();

  return loading ? (
    <Loader style={$loader} />
  ) : (
    <FlatList
      refreshControl={
        <RefreshControl
          tintColor={colorScheme.onBackground}
          refreshing={refreshing}
          onRefresh={refresh}
        />
      }
      data={data}
      onEndReached={loadmore}
      onEndReachedThreshold={0.4}
      ListFooterComponent={() => (
        <>
          {isEnableLoadmore ? <Loader style={style.py_sm} /> : <View />}
          {safeAreaOnBottom && (
            <View style={{ height: insets.bottom || spacing.md }} />
          )}
        </>
      )}
      ListEmptyComponent={() => (
        <BlankBox {...blankProps} style={[$blankBox, blankProps?.style]} />
      )}
      ItemSeparatorComponent={() => <View style={style.h_md} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={style.py_sm}
      style={style.w_screenWidth}
      {...rest}
    />
  );
}
const $loader: SViewStyle = [{ width: "50%" }, style.self_center];

const $blankBox: SViewStyle = [
  style.h_screenWidth,
  style.center,
  { width: "100%" },
];
