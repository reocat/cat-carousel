"use client";
import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>loading</div>}>
        {children}
      </PersistGate>
    </Provider>
  );
}
