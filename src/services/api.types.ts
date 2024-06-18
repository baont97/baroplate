/**
 * T for data type
 * E for extra data type when error
 */
export type ApiResponse<T, E = object> =
  | { ok: true; data: T }
  | { ok: false; messageCode: string; extraData?: E };

export type TApiSetupParams = {
  token: string;
};

export type TLinkHeader = {
  page: string;
  rel: string;
  size: string;
  url: string;
};

export type TPaging = {
  first: TLinkHeader;
  last: TLinkHeader;
  next: TLinkHeader;
};
