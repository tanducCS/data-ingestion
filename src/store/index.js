import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";
import { homeReducers, themeReducers } from "./reducers";
import { API } from "./Services/base";

const reducers = combineReducers({
  api: API.reducer,
  theme: themeReducers,
  home: homeReducers,
});

const persistConfig = {
  key: "root",
  storage, // Sử dụng "redux-persist" mặc định cho web (localStorage)
  whitelist: ["theme"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(API.middleware),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
