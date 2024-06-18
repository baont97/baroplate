import { useEffect, useState } from "react";
import { LayoutAnimation, Platform } from "react-native";
import { delay } from "utils";
import isEqual from "lodash.isequal";

export type UseApiInMountOptions<T, P> = {
  useAnimation?: boolean;
  delay?: number;
  initData: T;
  initParams: P;
  willEffecWhenParamsChange?: boolean;
};

export type UseApiInMountResult<T, P> = {
  loading: boolean;
  refreshing: boolean;
  mounted: boolean;
  data: T;
  params: P;
  refresh: () => Promise<any>;
  silentRefresh: () => Promise<any>;
  updateParams: React.Dispatch<React.SetStateAction<P>>;
  updateData: React.Dispatch<React.SetStateAction<T>>;
};

export function useApiInMount<T, P>(
  mountFunction: (params: P) => Promise<T>,
  deps: React.DependencyList,
  options: UseApiInMountOptions<T, P>
): UseApiInMountResult<T, P> {
  const _loading = useState<boolean>(false);
  const _refreshing = useState<boolean>(false);
  const _mounted = useState<boolean>(false);
  const _data = useState<T>(options.initData);
  const _params = useState<P>(options.initParams);

  const refresh = async () => {
    if (_refreshing[0]) return;

    _refreshing[1](true);
    await boostrapAsync(_params[0]);
    _refreshing[1](false);
  };

  const silentRefresh = () => boostrapAsync(_params[0]);

  const boostrapAsync = async (params: P) => {
    if (options?.delay) {
      await delay(options.delay);
    }

    if (options?.useAnimation) {
      Platform.OS === "ios" &&
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    const data = await mountFunction(params);

    _data[1](data === undefined || data === null ? options?.initData : data);
    _mounted[1](true);
  };

  useEffect(() => {
    _loading[1](true);
    boostrapAsync(_params[0]).finally(() => _loading[1](false));
  }, [...deps, _params[0]]);

  useEffect(() => {
    if (
      options?.willEffecWhenParamsChange &&
      !isEqual(options?.initParams, _params[0])
    ) {
      _params[1](options?.initParams);
      _loading[1](true);
      boostrapAsync(options?.initParams).finally(() => _loading[1](false));
    }
  }, [options?.initParams, options?.willEffecWhenParamsChange]);

  return {
    data: _data[0],
    updateData: _data[1],
    loading: _loading[0],
    refreshing: _refreshing[0],
    mounted: _mounted[0],
    params: _params[0],
    updateParams: _params[1],
    refresh,
    silentRefresh,
  };
}
