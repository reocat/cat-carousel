"use client"
import React, { ReactNode} from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";



const StoreProvider: React.FC<{children:ReactNode}> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>loading</div>}>
        
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
