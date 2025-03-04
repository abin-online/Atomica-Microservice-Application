import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import adminReducer from './features/users/adminSlice';

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
import storage from "redux-persist/lib/storage"; // defaults to localStorage


const persistConfig = {
  key: "root", // Key for localStorage
  storage,
};

// Wrap the reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, userReducer);
const persistedAdminReducer = persistReducer(persistConfig, adminReducer)

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    admin: persistedAdminReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
