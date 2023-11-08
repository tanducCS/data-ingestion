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
import { API } from "../service/base";
import { taskReducer, userReducer } from "./reducers";



const reducers = combineReducers({
  user: userReducer,
  task: taskReducer,  
  api: API.reducer,
});

const persistConfig = {
  key: "root",
  storage, 
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
