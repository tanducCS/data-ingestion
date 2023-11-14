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
import { dataCategoriesReducer, dataSourcesReducer, taskReducer, userReducer } from "./reducers";



const reducers = combineReducers({
  data_categories: dataCategoriesReducer,
  data_sources: dataSourcesReducer,
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
