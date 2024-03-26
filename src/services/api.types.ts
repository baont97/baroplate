import { AxiosResponse } from "axios";

/**
 * T for data type
 * E for extra data type when error
 */
export type ApiResponse<T, E = {}> =
  | { ok: true; data: T }
  | { ok: false; messageCode: string; extraData?: E };

export type TApiSetupParams = {
  token: string;
};
