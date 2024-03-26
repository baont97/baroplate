import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { TApiSetupParams } from "./api.types";
import { isTokenExpired } from "utils";
import { signIn, store } from "store";

import UltimateConfig from "react-native-ultimate-config";
import * as AxiosLogger from "axios-logger";

const refreshTokenEndpoint = "";

const config: CreateAxiosDefaults<any> = {
  baseURL: UltimateConfig.BASE_URL,
  timeout: 3000,
  headers: {},
};

class Api {
  _token: string = "";
  _refreshTokenRequest: Promise<string> | null = null;
  _axios: AxiosInstance;

  get: AxiosInstance["get"];
  post: AxiosInstance["post"];
  put: AxiosInstance["put"];
  patch: AxiosInstance["patch"];
  delete: AxiosInstance["delete"];

  constructor() {
    this._axios = axios.create(config);
    this.get = this._axios.get;
    this.post = this._axios.post;
    this.put = this._axios.put;
    this.patch = this._axios.patch;
    this.delete = this._axios.delete;
  }

  injectToken(token: TApiSetupParams["token"]) {
    this._token = token;
  }

  ejectToken() {
    this._token = "";
  }

  injectLogger() {
    if (__DEV__) {
      this._axios.interceptors.request.use(
        AxiosLogger.requestLogger,
        AxiosLogger.errorLogger
      );
      this._axios.interceptors.response.use(
        AxiosLogger.responseLogger,
        AxiosLogger.errorLogger
      );
    }
  }

  async refreshToken(accessToken: string): Promise<string> {
    const refreshToken = "";
    const response = await this._axios.post(refreshTokenEndpoint, {
      accessToken,
      refreshToken,
    });

    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data;

      // Save new tokens
      store.dispatch(signIn(accessToken));

      return accessToken;
    }

    return "";
  }

  setup(params: TApiSetupParams) {
    this.injectToken(params.token);
    this.injectLogger();
    this._axios.interceptors.request.use(async (config) => {
      let token = this._token ?? params.token;
      if (isTokenExpired(this._token) && config.url !== refreshTokenEndpoint) {
        this._refreshTokenRequest = this._refreshTokenRequest
          ? this._refreshTokenRequest
          : this.refreshToken(this._token);
        token = await this._refreshTokenRequest;
        this.injectToken(token);
        this._refreshTokenRequest = null;
      }
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }
}

export const api = new Api();
