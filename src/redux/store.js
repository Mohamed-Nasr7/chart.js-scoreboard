import { createStore } from "redux";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import teamReducer from "./teamReducer";
import chartDataReducer from "./chartDataReducer";

const rootReducer = combineReducers({
  team: teamReducer,
  chart: chartDataReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["chart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = createStore(persistedReducer);
export let persistor = persistStore(store);
