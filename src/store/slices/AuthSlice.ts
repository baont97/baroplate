import { RootState } from "store";
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { reduxSecureStorage, storage, StorageKeys } from "utils";
import type { PayloadAction } from "@reduxjs/toolkit";
import { api } from "services";

export const authSliceKey = "auth";

type AuthState = {
  token: string;
};

const initialState: AuthState = {
  token: "",
};

export const authSlice = createSlice({
  name: authSliceKey,
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      api.injectToken(action.payload);
      return { ...state, token: action.payload };
    },
    signOut: (state) => {
      api.ejectToken();
      return { ...state, token: "" };
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export const selectIsSignedIn = (state: RootState) => Boolean(state.auth.token);

export default persistReducer<AuthState>(
  { key: authSliceKey, storage: reduxSecureStorage },
  authSlice.reducer
);
