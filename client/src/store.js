import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session'; // Use session storage
import { userSlice } from './redux/user/user.slice'; // Make sure this is a slice, not just reducer

// Combine reducers
const rootReducer = combineReducers({
  user: userSlice.reducer // Use `.reducer` from slice
});

// Persist config
const persistConfig = {
  key: 'root',
  storage: sessionStorage
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // Fix typo: serializableCheck not "serializablecheck"
    })
});

// Persistor
export const persistor = persistStore(store); // Fix typo: persistStore not "perssiStore"
