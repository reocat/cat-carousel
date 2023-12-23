"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  hellStateReducer,
  nearStateReducer,
  selectedApiReducer,
  selectedColorReducer,
} from "@/app/redux/reducers";
import { setupListeners } from "@reduxjs/toolkit/query";
import { catapi } from "@/app/redux/api/catapi";
import { shibeApi } from "@/app/redux/api/shibeApi";
import storage from "redux-persist/lib/storage";
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
import {nekoapi} from "@/app/redux/api/nekoapi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  hell: hellStateReducer,
  nearState: nearStateReducer,
  selectedApi: selectedApiReducer,
  selectedColor: selectedColorReducer,
  [catapi.reducerPath]: catapi.reducer,
  [shibeApi.reducerPath]: shibeApi.reducer,
  [nekoapi.reducerPath]: nekoapi.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(catapi.middleware)
      .concat(shibeApi.middleware)
      .concat(nekoapi.middleware),
});
setupListeners(store.dispatch);
export const persistor = persistStore(store);
