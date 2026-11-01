"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  hellStateReducer,
  loginStateReducer,
  nearStateReducer,
  selectedApiReducer,
  selectedColorReducer,
} from "@/app/redux/reducers";
import { catapi } from "@/app/redux/api/catapi";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { otherAnimalsApiReducer } from "./otherAnimalsApiSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["selectedApi", "selectedColor", "login"],
};

const rootReducer = combineReducers({
  hell: hellStateReducer,
  nearState: nearStateReducer,
  selectedApi: selectedApiReducer,
  selectedColor: selectedColorReducer,
  otheranimalapi: otherAnimalsApiReducer,
  login: loginStateReducer,
  [catapi.reducerPath]: catapi.reducer,
  // shibe.online is gone (domain lapsed) — its slice died with it. The
  // persisted "shibe" selectedApi value now aliases the live cat api.
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
      .concat(catapi.middleware),
});
export const persistor = persistStore(store);
