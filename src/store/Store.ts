import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { reduxStorage } from "utils";
import { createLogger } from "redux-logger";
import AuthSlice, { authSliceKey } from "./slices/AuthSlice";

const logger = createLogger({});
const rootReducer = combineReducers({ auth: AuthSlice });

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: reduxStorage,
    blacklist: [authSliceKey],
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const extraMiddlewares = [];
    if (__DEV__) extraMiddlewares.push(logger);
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(extraMiddlewares);
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
