import { RootState } from "store";
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { reduxSecureStorage, secureStorage, StorageKeys } from "utils";
import { api } from "services";
import type { PayloadAction } from "@reduxjs/toolkit";

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
      state.token = action.payload;
      secureStorage.setItem(StorageKeys.token, action.payload);
    },
    signOut: (state) => {
      api.ejectToken();
      state.token = "";
      secureStorage.removeItem(StorageKeys.token);
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export const selectIsSignedIn = (state: RootState) => Boolean(state.auth.token);

export default persistReducer<AuthState>(
  {
    key: authSliceKey,
    storage: reduxSecureStorage,
    blacklist: ["token", "user", "datingUser"],
  },
  authSlice.reducer
);
