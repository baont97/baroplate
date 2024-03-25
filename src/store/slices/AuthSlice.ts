import { RootState } from 'store';
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer, createTransform, PersistedState } from 'redux-persist';
import { reduxStorage, storage, storageKeys } from 'utils';
import type { PayloadAction } from '@reduxjs/toolkit';

export const authSliceKey = 'auth';

type AuthState = {
  token: string;
};

const initialState: AuthState = {
  token: '',
};

export const authSlice = createSlice({
  name: authSliceKey,
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      storage.set(storageKeys.token, action.payload);
      return {
        ...state,
        token: action.payload,
      };
    },
    signOut: state => {
      storage.delete(storageKeys.token);
      return { ...state, token: '' };
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export const selectIsSignedIn = (state: RootState) => Boolean(state.auth.token);

export default persistReducer<AuthState>(
  { key: authSliceKey, blacklist: ['token'], storage: reduxStorage },
  authSlice.reducer,
);
