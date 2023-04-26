import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import userSlice from "../pages/Slices/userSlice";
import isAdminSlice from "../pages/Slices/isAdminSlice";
import reloadSlice from "../pages/Slices/reloadSlice";

import thunk from "redux-thunk";

const reducers = combineReducers({
    user: userSlice,
    admin: isAdminSlice,
    reload: reloadSlice
})

const persistConfig = {
    key: 'root',
    storage,
}
    
const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});