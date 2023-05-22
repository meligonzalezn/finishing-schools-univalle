import { configureStore, combineReducers } from "@reduxjs/toolkit";
import portfolioSlice from "./reducers/portfolioSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["portfolioState"],
};

const rootReducer = combineReducers({
  portfolioState: portfolioSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: {
    portfolio: persistedReducer,
  },
  middleware: [thunk],
});