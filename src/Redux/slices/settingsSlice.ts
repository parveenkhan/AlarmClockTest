import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  volumeBoost: boolean;
  vibration: boolean;
  showOnLockScreen: boolean;
  darkMode: boolean;
}

const initialState: SettingsState = {
  volumeBoost: true,
  vibration: true,
  showOnLockScreen: true,
  darkMode: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleSetting(state, action: PayloadAction<keyof SettingsState>) {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { toggleSetting } = settingsSlice.actions;
export default settingsSlice.reducer;
