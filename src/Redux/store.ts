import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import alarms from './slices/alarmsSlice';
import onboarding from './slices/onboardingSlice';
import user from './slices/userSlice';
import insights from './slices/insightsSlice';
import settings from './slices/settingsSlice';

const rootReducer = combineReducers({
  alarms,
  onboarding,
  user,
  insights,
  settings,
});

const persistConfig = {
  key: 'wayk-v2',
  storage: AsyncStorage,
  whitelist: ['alarms', 'onboarding', 'user', 'settings'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
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
