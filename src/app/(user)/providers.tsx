// app/redux/ReduxProvider.tsx
"use client"
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

interface ReduxProviderProps {
  children: React.ReactNode;
}

const Providers: React.FC<ReduxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
     {children}
    </Provider>
  );
};

export default Providers;
