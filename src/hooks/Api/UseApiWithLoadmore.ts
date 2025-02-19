import { isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";
import { LayoutAnimation } from "react-native";
import { TPaging } from "services";

type RefreshParams = {
  keepCurrentParams: boolean;
};

export type UseApiInMountWithLoadmoreOptions<T, P = {}> = {
  useAnimation?: boolean;
  initData: T[];
  initParams: P;
  willEffecWhenParamsChange?: boolean;
};

export type UseApiInMountWithLoadmoreResult<T> = {
  loading: boolean;
  loadingmore: boolean;
  refreshing: boolean;
  data: T[];
  mounted: () => boolean;
  refresh: (params?: RefreshParams) => Promise<void>;
  silentRefresh: (params?: RefreshParams) => Promise<void>;
  loadmore: () => Promise<void>;
  isEnableLoadmore: boolean;
  updateData: React.Dispatch<React.SetStateAction<T[]>>;
};

interface PagingCommon {
  page?: number;
  size?: number;
}

export function useApiInMountWithLoadmore<T, P extends PagingCommon = {}>(
  mountFunction: (
    params: P
  ) => Promise<{ data: T[]; paging: TPaging | undefined }>,
  deps: React.DependencyList,
  options: UseApiInMountWithLoadmoreOptions<T, P>
): UseApiInMountWithLoadmoreResult<T> {
  const _loadingmore = useState<boolean>(false);
  const _loading = useState<boolean>(false);
  const _refreshing = useState<boolean>(false);
  const _data = useState<T[]>(options?.initData);
  const _params = useState<P>(options?.initParams);
  const _paging = useState<TPaging>();

  // refs
  const isLoadingMore = useRef<boolean>(false);
  const mountedRef = useRef<boolean>(false);

  // memos
  const isEnableLoadmore = Boolean(_paging[0]?.next);

  const refresh = async (params?: RefreshParams) => {
    if (_refreshing[0]) return;

    _refreshing[1](true);
    await boostrapAsync(
      params?.keepCurrentParams ? _params[0] : options?.initParams,
      false,
      true
    );
    _refreshing[1](false);
  };
  const silentRefresh = (params?: RefreshParams) =>
    boostrapAsync(
      params?.keepCurrentParams ? _params[0] : options?.initParams,
      false,
      true
    );

  const loadmore = async () => {
    if (isEnableLoadmore && !isLoadingMore.current) {
      const newParams: P = {
        ..._params[0],
        page: _paging[0]?.next?.page,
      };
      isLoadingMore.current = true;
      await boostrapAsync(newParams, true);
      isLoadingMore.current = false;
    }
  };

  const boostrapAsync = async (
    params: P,
    isLoadmore?: boolean,
    isRefresh?: boolean
  ) => {
    if (_loading[0]) return;

    _loading[1](!isLoadmore && !isRefresh);

    if (options?.useAnimation) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    const { data, paging } = await mountFunction(params);

    if (isLoadmore) {
      _data[1]((prev) => [...prev, ...data]);
    } else {
      _data[1](data || options?.initData);
    }
    _paging[1](paging);
    mountedRef.current = true;
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
    loading: _loading[0],
    refreshing: _refreshing[0],
    loadingmore: _loadingmore[0],
    isEnableLoadmore,
    mounted: () => mountedRef.current,
    refresh,
    silentRefresh,
    loadmore,
    updateData: _data[1],
  };
}
