"use client"
import React, { ReactNode} from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "../Components/Spinner";



const StoreProvider: React.FC<{children:ReactNode}> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Spinner/>}>
        
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
