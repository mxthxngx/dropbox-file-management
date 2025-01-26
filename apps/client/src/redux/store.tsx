import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { api } from "./rtk-query/api";
import fileManagementSlice from "./slice/file-management-slice";
import errorManagementSlice from "./slice/error-management-slice";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined,
) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      fileManagement: fileManagementSlice.reducer,
      errorManagement: errorManagementSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
